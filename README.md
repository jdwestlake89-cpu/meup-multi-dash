# MEUP Multi-Dash: Automated Business Operations Engine

The **MEUP Multi-Dash** is a robust, event-driven backend architecture designed for autonomous business management. Built on **n8n**, this system orchestrates compliance monitoring, automated bidding/invoicing, and AI-driven field operations.

## Architecture Overview

This system utilizes a modular "Data-Table-as-Source" pattern to ensure consistency across all business functions.

### Core Workflow Modules

| Module | Trigger | Status | Primary Function |
|---|---|---|---|
| **Compliance Watchdog** | Scheduled (Daily) | ✅ Live | Tracks credential expiry; triggers Gmail alerts |
| **Vision-to-SOW** | Form Input | ✅ Live | Converts field data/images into structured SOWs |
| **Bidding & Invoicing** | Form Input | ✅ Live | Captures financial intake; calculates 10% VRO split |
| **SMS AI Assistant** | Twilio Webhook | ⏸️ Parked | Gemini-powered field operations agent |

## Data Layer (n8n Data Tables)

The backbone of the system consists of three primary data schemas:

- **compliance_credentials**: Tracks holder, ID, and expiry lifecycle.
- **bids_invoices**: Financial records with automated VRO reserve calculations.
- **scope_of_work**: Stores project requirements and material estimates.

## Key Design Principles

1. **Modular Isolation**: Each workflow operates independently, allowing for granular debugging and scaling without system-wide downtime.
2. **Deterministic Logic**: Business rules (like the 10% VRO reserve split) are enforced at the pipeline level before data ingestion.
3. **Human-in-the-Loop**: Critical milestones, such as contract gating and financial disbursement, are designed as external dependencies, keeping the automation layer focused on data integrity.

## Data Schemas

### compliance_credentials
```json
{
  "id": "UUID",
  "holder": "string",
  "credentialType": "string",
  "credentialId": "string",
  "expiryDate": "date",
  "daysRemaining": "number",
  "status": "expired | expiring_soon | valid"
}
```

### bids_invoices
```json
{
  "id": "UUID",
  "client": "string",
  "job": "string",
  "amount": "number",
  "vroReserve": "number (10% of amount)",
  "vroOperating": "number (90% of amount)",
  "status": "draft | submitted | accepted | invoiced",
  "dueDate": "date",
  "paid": "boolean",
  "submittedBy": "string",
  "notes": "string"
}
```

### scope_of_work
```json
{
  "id": "UUID",
  "jobName": "string",
  "imageUrl": "string",
  "scopeItems": "array of strings",
  "estimatedMaterials": "string",
  "createdAt": "timestamp"
}
```

## Frontend Architecture

The frontend is built with **Next.js 14 + TypeScript** and communicates with n8n via:
- **REST API polling** (SWR, 30s intervals) for real-time data table views
- **Form submission** via embedded n8n form endpoints
- **iFrame embedding** for SOW and Bidding forms

### Dashboard Components

- **ComplianceView**: Real-time credential table with expiry status badges
- **BiddingView**: Bid/invoice creation form + VRO split display
- **ScopeOfWorkView**: Job-site image upload + automated SOW preview
- **SMSAssistantView**: Crew messaging interface (Twilio integration placeholder)

## Deployment Strategy

The system is built as a headless automation backend. Frontend interfaces interact directly with these endpoints via secure webhooks and form submission triggers.

### n8n Deployment
- Base URL: `https://jdwestlake89.app.n8n.cloud`
- Form endpoints:
  - `/form/multidash-sow`
  - `/form/multidash-billing`
- Data API: `/api/v1/db/tables/{tableName}/rows`

### Next.js Frontend Deployment
- **Vercel** (recommended): `vercel deploy`
- Environment variables (from `.env.local`):
  ```
  NEXT_PUBLIC_N8N_BASE=https://jdwestlake89.app.n8n.cloud
  NEXT_PUBLIC_N8N_WEBHOOK_BASE=https://jdwestlake89.app.n8n.cloud/webhook
  ```

## Getting Started

### Prerequisites
- Node.js 18+
- n8n instance at https://jdwestlake89.app.n8n.cloud
- Vercel account (for production deployment)

### Development

```bash
git clone https://github.com/jdwestlake89-cpu/meup-multi-dash
cd meup-multi-dash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production Deployment

```bash
npm run build
npm start
```

For Vercel:
```bash
npm install -g vercel
vercel
```

## Integration Points

### Compliance Watchdog → Gmail
- **Trigger**: Daily at 8:00 AM
- **Logic**: Queries `compliance_credentials` table for items expiring within 7 days
- **Output**: Formatted digest email to `jdwestlake89@gmail.com`

### Vision-to-SOW → Gemini Vision API
- **Trigger**: Form submission with image + turnover checklist
- **Logic**: Analyzes image against checklist, generates scope items + material estimates
- **Output**: Stored in `scope_of_work` table, confirmation email sent

### Bidding & Invoicing → Data Storage + Email
- **Trigger**: Form submission with client, job, amount, due date
- **Logic**: Calculates VRO split (10% reserve / 90% operating), stores record
- **Output**: Record in `bids_invoices` table + on-screen confirmation + email to submitter

### SMS AI Assistant → Gemini + Twilio
- **Trigger**: Inbound SMS to crew number
- **Logic**: Gemini interprets message, queries relevant tables, generates reply
- **Output**: SMS reply to crew member (conversation memory per phone number)

## Pro Tips for Extending

### Add Schema Validation
Ask Copilot:
> *"Based on the README.md, suggest a schema validation script for the bids_invoices table to ensure the VRO split calculation is always accurate before it hits the database."*

### Add Data Export
```bash
# Export compliance_credentials to CSV
GET /api/v1/db/tables/compliance_credentials/rows?format=csv
```

### Add Real-Time Updates
Upgrade from SWR polling to WebSocket:
```typescript
// Replace SWR with native fetch + setInterval
const ws = new WebSocket('wss://jdwestlake89.app.n8n.cloud/webhook/watch');
```

## Notes

- **Authentication**: Currently mocked (localStorage). Wire to n8n API key or external auth provider (Firebase, Auth0).
- **Real-time**: Polling uses SWR (30s intervals). Upgrade to WebSocket for true real-time if latency is critical.
- **Financial Movement**: VRO split is reference-only. Actual fund movement requires Stripe/Plaid integration (outside n8n scope).
- **Hard Lock**: Contract gating (blocking new contracts when credentials lapse) is designed as external rule in contract intake system, not in n8n.

## Support & Troubleshooting

- **n8n logs**: Check workflow execution history in n8n dashboard
- **Frontend errors**: Browser console + Next.js server logs
- **Data consistency**: Audit `compliance_credentials`, `bids_invoices`, `scope_of_work` tables directly in n8n Data Tables view
