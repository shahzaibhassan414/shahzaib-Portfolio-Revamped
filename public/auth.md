# auth.md — Agent Registration and Authentication

Machine-readable authentication and agent registration specification per the Auth.md standard.

## Agent Registration

Autonomous AI agents, coding agents, and crawler assistants can register and interact with this portfolio service autonomously without human intervention.

### Registration Endpoints

- **register_uri**: `https://www.shahzaib-dev.site/api/contact`
- **claim_uri**: `https://www.shahzaib-dev.site/contact`
- **skill**: `https://www.shahzaib-dev.site/auth.md`

### Supported Authentication Flows

```json
{
  "agent_auth": {
    "skill": "https://www.shahzaib-dev.site/auth.md",
    "register_uri": "https://www.shahzaib-dev.site/api/contact",
    "claim_uri": "https://www.shahzaib-dev.site/contact",
    "identity_types_supported": ["anonymous"],
    "anonymous": {
      "credential_types_supported": ["none"],
      "claim_uri": "https://www.shahzaib-dev.site/contact"
    }
  }
}
```

## Discovery Endpoints

- **API Catalog**: `/.well-known/api-catalog` (RFC 9727)
- **Protected Resource**: `/.well-known/oauth-protected-resource` (RFC 9728)
- **Authorization Server**: `/.well-known/oauth-authorization-server` (RFC 8414)
- **AI Catalog**: `/.well-known/ai-catalog.json` (ARD 1.0)
- **MCP Server Card**: `/.well-known/mcp/server-card.json`
- **A2A Agent Card**: `/.well-known/agent-card.json`
- **Agent Skills**: `/.well-known/agent-skills/index.json`
