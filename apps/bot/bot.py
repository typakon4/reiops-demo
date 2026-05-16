import asyncio
import logging
import os

from aiogram import Bot, Dispatcher, F, Router
from aiogram.filters import Command
from aiogram.types import CallbackQuery, InlineKeyboardButton, InlineKeyboardMarkup, Message
from dotenv import load_dotenv

from api_client import ReiOpsApi
from scenario import format_trace_event

load_dotenv()

logging.basicConfig(level=logging.INFO)

TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "")
PUBLIC_WEB_URL = os.getenv("PUBLIC_WEB_URL", "http://localhost:3000").rstrip("/")
WEB_DEMO_URL = os.getenv("WEB_DEMO_URL", f"{PUBLIC_WEB_URL}/demo").rstrip("/")
API_URL = os.getenv("API_URL", "http://localhost:8000").rstrip("/")

api = ReiOpsApi(API_URL)
router = Router()
poll_tasks: dict[int, asyncio.Task] = {}


def button(text: str, style: str | None = None, **kwargs) -> InlineKeyboardButton:
    if style:
        kwargs["style"] = style
    return InlineKeyboardButton(text=text, **kwargs)


def is_public_url(url: str) -> bool:
    return not (
        url.startswith("http://localhost")
        or url.startswith("http://127.0.0.1")
        or url.startswith("http://0.0.0.0")
    )


def dashboard_button(text: str = "🖥 Open Dashboard") -> InlineKeyboardButton:
    if is_public_url(WEB_DEMO_URL):
        return button(text, style="primary", url=WEB_DEMO_URL)
    return button(text, style="primary", callback_data="dashboard_local")


def trace_button(run_id: str | None = None) -> InlineKeyboardButton:
    if is_public_url(PUBLIC_WEB_URL) and run_id:
        return button("📋 View Trace", style="primary", url=f"{PUBLIC_WEB_URL}/trace/{run_id}")
    if is_public_url(WEB_DEMO_URL):
        return button("📋 View Current Run", url=WEB_DEMO_URL)
    if run_id:
        return button("📋 View Trace", style="primary", callback_data=f"trace_local:{run_id}")
    return button("📋 View Current Run", callback_data="trace_local:current")


def dashboard_buttons(run_id: str | None = None) -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [button("🚀 Launch Demo Workflow", style="success", callback_data="launch")],
            [dashboard_button("🖥 Open Web Demo")],
            [trace_button(run_id)],
        ]
    )


def approval_buttons(run_id: str) -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [
                button("✅ Approve PR", style="success", callback_data=f"approve:{run_id}"),
                button("📝 Request Changes", style="primary", callback_data=f"changes:{run_id}"),
            ],
            [
                button("❌ Reject", style="danger", callback_data=f"reject:{run_id}"),
                dashboard_button(),
            ],
        ]
    )


def final_buttons(run_id: str) -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        inline_keyboard=[
            [dashboard_button()],
            [trace_button(run_id)],
            [button("🔁 Run Again", style="success", callback_data="launch")],
        ]
    )


@router.message(Command("start"))
async def start(message: Message) -> None:
    await message.answer(
        "Welcome to ReiOps Demo.\n\n"
        "ReiOps makes AI agents safe for businesses.\n\n"
        "This demo shows a managed workflow called GitHub Issue Fixer:\n"
        "1. A GitHub issue is assigned to an AI agent.\n"
        "2. ReiOps runs it in a secure sandbox.\n"
        "3. You watch the execution trace.\n"
        "4. Risky actions are blocked by policy.\n"
        "5. A human approves before the PR opens.\n\n"
        "Demo mode: no real GitHub repo or production system is touched.\n\n"
        "Choose an action:",
        reply_markup=dashboard_buttons(),
    )


@router.message(Command("demo"))
async def demo(message: Message) -> None:
    await launch_for_chat(message.chat.id, message.bot)


@router.message(Command("status"))
async def status(message: Message) -> None:
    state = await api.get_current()
    run = state.get("run")
    if not run:
        await message.answer("No active run. Launch GitHub Issue Fixer to start the demo.", reply_markup=dashboard_buttons())
        return
    await message.answer(
        "📋 Current run\n\n"
        "Workflow: GitHub Issue Fixer\n"
        f"Status: {run['status'].replace('_', ' ')}\n"
        f"Issue: #{run['issue_number']} {run['issue_title']}\n"
        f"Cost: ${state['cost_usd']:.2f}\n"
        f"Risk: {state['risk']}\n"
        f"Events: {len(state.get('events', []))}/11",
        reply_markup=dashboard_buttons(run["id"]),
    )


@router.message(Command("reset"))
async def reset(message: Message) -> None:
    await api.reset()
    task = poll_tasks.pop(message.chat.id, None)
    if task:
        task.cancel()
    await message.answer("Demo state reset.", reply_markup=dashboard_buttons())


@router.callback_query(F.data == "launch")
async def launch_callback(callback: CallbackQuery) -> None:
    await callback.answer()
    await launch_for_chat(callback.message.chat.id, callback.bot)


@router.callback_query(F.data == "dashboard_local")
async def dashboard_local_callback(callback: CallbackQuery) -> None:
    await callback.answer()
    await callback.message.answer(
        "Dashboard is local in this demo:\n"
        f"{WEB_DEMO_URL}\n\n"
        "Open it on the same computer where the web app is running. Telegram only allows public URLs in inline URL buttons."
    )


@router.callback_query(F.data.startswith("trace_local:"))
async def trace_local_callback(callback: CallbackQuery) -> None:
    await callback.answer()
    run_id = callback.data.split(":", 1)[1]
    url = WEB_DEMO_URL if run_id == "current" else f"{PUBLIC_WEB_URL}/trace/{run_id}"
    await callback.message.answer(
        "Trace view is local in this demo:\n"
        f"{url}\n\n"
        "Open it on the same computer where the web app is running."
    )


@router.callback_query(F.data.startswith("approve:"))
async def approve_callback(callback: CallbackQuery) -> None:
    await callback.answer()
    run_id = callback.data.split(":", 1)[1]
    state = await api.approve(run_id, source="telegram")
    await callback.message.answer(
        "✅ Approved\n\n"
        "Pull Request opened:\n"
        "#341 fix: stabilize login timeout handling\n\n"
        "Tests: passing\n"
        "Trace: saved\n"
        "Cost: $0.61\n"
        "Approved via: Telegram",
        reply_markup=final_buttons(state["run"]["id"]),
    )


@router.callback_query(F.data.startswith("changes:"))
async def changes_callback(callback: CallbackQuery) -> None:
    await callback.answer()
    run_id = callback.data.split(":", 1)[1]
    await api.request_changes(run_id)
    await callback.message.answer("Changes requested. The run remains blocked before PR creation.", reply_markup=dashboard_buttons(run_id))


@router.callback_query(F.data.startswith("reject:"))
async def reject_callback(callback: CallbackQuery) -> None:
    await callback.answer()
    run_id = callback.data.split(":", 1)[1]
    await api.reject(run_id)
    await callback.message.answer("PR creation rejected. Trace saved for review.", reply_markup=dashboard_buttons(run_id))


async def launch_for_chat(chat_id: int, bot: Bot) -> None:
    state = await api.start_run()
    run = state["run"]
    await bot.send_message(
        chat_id,
        "🚀 Managed workflow launched\n\n"
        "Workflow: GitHub Issue Fixer\n"
        "Repo: reiops-demo\n"
        "Issue: #128 Fix flaky login timeout test\n"
        "Sandbox: active\n"
        "Policy: approval required before PR\n"
        "Budget: $2.00",
    )
    task = poll_tasks.pop(chat_id, None)
    if task:
        task.cancel()
    poll_tasks[chat_id] = asyncio.create_task(poll_trace(chat_id, bot, run["id"]))


async def poll_trace(chat_id: int, bot: Bot, run_id: str) -> None:
    seen: set[str] = set()
    while True:
        await asyncio.sleep(1.4)
        state = await api.get_current()
        run = state.get("run")
        if not run or run["id"] != run_id:
            return
        for event in state.get("events", []):
            if event["id"] in seen:
                continue
            seen.add(event["id"])
            if event["message"] == "Waiting for human approval before opening PR":
                msg = format_trace_event(event)
                if msg:
                    await bot.send_message(chat_id, msg)
                await send_approval(chat_id, bot, state)
                return
            msg = format_trace_event(event)
            if msg:
                await bot.send_message(chat_id, msg)
        if run["status"] in {"completed", "rejected"}:
            return


async def send_approval(chat_id: int, bot: Bot, state: dict) -> None:
    run = state["run"]
    await bot.send_message(
        chat_id,
        "⚠️ Approval required\n\n"
        "Workflow: GitHub Issue Fixer\n"
        "Blocked action: open_pull_request\n"
        "Reason: This workflow touches authentication/session logic.\n"
        "Policy: Auth changes require human approval.\n"
        "Cost: $0.61\n"
        "Risk: Medium\n\n"
        "Agent summary:\n"
        "Fixed timeout race condition and added regression coverage.\n\n"
        "Approve PR creation?",
        reply_markup=approval_buttons(run["id"]),
    )


async def main() -> None:
    if not TOKEN:
        logging.warning("TELEGRAM_BOT_TOKEN is not set. Bot service is idle.")
        while True:
            await asyncio.sleep(3600)
    bot = Bot(TOKEN)
    dispatcher = Dispatcher()
    dispatcher.include_router(router)
    await dispatcher.start_polling(bot)


if __name__ == "__main__":
    asyncio.run(main())
