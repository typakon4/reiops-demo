import aiohttp


class ReiOpsApi:
    def __init__(self, base_url: str) -> None:
        self.base_url = base_url.rstrip("/")

    async def get_current(self) -> dict:
        return await self._request("GET", "/api/runs/current")

    async def start_run(self) -> dict:
        return await self._request("POST", "/api/runs/start")

    async def reset(self) -> dict:
        return await self._request("POST", "/api/runs/reset")

    async def approve(self, run_id: str, source: str = "telegram") -> dict:
        return await self._request("POST", f"/api/runs/{run_id}/approve?source={source}")

    async def reject(self, run_id: str) -> dict:
        return await self._request("POST", f"/api/runs/{run_id}/reject")

    async def request_changes(self, run_id: str) -> dict:
        return await self._request("POST", f"/api/runs/{run_id}/request-changes")

    async def _request(self, method: str, path: str) -> dict:
        async with aiohttp.ClientSession() as session:
            async with session.request(method, f"{self.base_url}{path}", timeout=10) as response:
                response.raise_for_status()
                return await response.json()
