# Security Model

This public repository is a simulated ReiOps demo. It does not execute real coding agents against real customer systems.

The security model shown in the demo is the product direction for ReiOps.

## Principles

### 1. Agents should be scoped

Agents should not receive broad access to production systems, customer data, repositories, or internal tools by default.

ReiOps workflows are designed around scoped permissions and workflow-specific access.

### 2. Risky actions should require approval

The demo blocks PR creation when the workflow touches authentication/session logic.

In a real deployment, policy gates could apply to actions such as:

- modifying authentication, billing, or permissions code
- touching production infrastructure
- accessing sensitive customer data
- sending external messages
- spending budget
- creating pull requests or deployments

### 3. Execution should be traceable

Every workflow run should preserve an audit trail:

- source request
- tool calls
- command output
- files changed
- tests run
- model/agent metadata
- approval decisions
- final outcome

### 4. Humans remain in the loop

ReiOps is not trying to remove human responsibility. It gives operators a clear place to inspect, approve, reject, or request changes.

The Telegram operator layer is designed for lightweight approvals without forcing teams to live inside a dashboard all day.

## Public Demo Boundaries

The public demo:

- does not call the GitHub API
- does not call LLM APIs
- does not modify a real repository
- does not access production systems
- uses simulated trace and approval data

## Secrets

Do not commit:

- `.env`
- Telegram bot tokens
- API keys
- database files
- production URLs with credentials
- customer notes or real logs

Use `.env.example` for safe placeholders.
