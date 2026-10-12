# auth.md — Shahzaib Hassan Portfolio

Machine-readable authentication specification for AI agents, crawlers, and automated assistants per the Auth.md standard.

## Overview

This site is the personal developer portfolio and mobile engineering platform of Shahzaib Hassan. All portfolio case studies, technical playbooks, project histories, and contact interfaces are open for autonomous discovery and communication.

- **Origin**: https://www.shahzaib-dev.site
- **Audience**: AI Agents, LLM crawlers, automated code reviewers, client proxy agents.
- **Service Type**: Engineering Portfolio & Client Inquiries.

## Authentication Method

### Anonymous Access (No Credentials Required)

Autonomous agents may access the portfolio and invoke the project inquiry endpoint without user accounts or static API keys.

```json
{
  "identity_types_supported": ["anonymous"],
  "anonymous": {
    "credential_types_supported": ["none"]
  },
  "claim_uri": "https://www.shahzaib-dev.site/contact"
}
```

## Discovery Endpoints

- **RFC 9727 API Catalog**: `/.well-known/api-catalog`
- **ARD 1.0 AI Catalog**: `/.well-known/ai-catalog.json`
- **MCP Server Card**: `/.well-known/mcp/server-card.json`
- **A2A Agent Card**: `/.well-known/agent-card.json`
- **Agent Skills**: `/.well-known/agent-skills/index.json`
- **LLM Summary**: `/llms.txt`
- **LLM Full Dossier**: `/llms-full.txt`
- **Contact API**: `POST /api/contact`
