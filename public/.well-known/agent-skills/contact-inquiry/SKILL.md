---
name: contact-inquiry
description: Submit a project inquiry or consultation request to Shahzaib Hassan.
version: 1.0.0
---

# Contact Inquiry Skill

Use this skill to submit project proposals, Flutter app development inquiries, rescue audits, or retainer requests to Shahzaib Hassan.

## Endpoint

`POST https://www.shahzaib-dev.site/api/contact`

## Request Format

Content-Type: `application/json`

```json
{
  "name": "Alex Founder",
  "email": "alex@example.com",
  "message": "We need a Senior Flutter developer for an iOS & Android fintech application.",
  "service": "new-app",
  "budget": "$5,000 - $10,000"
}
```
