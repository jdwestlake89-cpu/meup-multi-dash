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

### compliance_credentials
Tracks holder, ID, and expiry lifecycle.
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
Financial records with automated VRO reserve calculations.
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
Stores project requirements and material estimates.
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

## Key Design Principles

1. **Modular Isolation**: Each workflow operates independently, allowing for granular debugging and scaling without system-wide downtime.
2. **Deterministic Logic**: Business rules (like the 10% VRO reserve split) are enforced at the pipeline level before data ingestion.
3. **Human-in-the-Loop**: Critical milestones, such as contract gating and financial disbursement, are designed as external dependencies, keeping the automation layer focused on data integrity.

## Deployment Strategy

The system is built as a headless automation backend. Frontend interfaces (Google App Builder or custom UI) interact directly with these endpoints via secure webhooks and form submission triggers.

### MEUP Multi-Dash Frontend

Next.js + TypeScript real-time dashboard for Multi-Dash Maintenance LLC operations.

## Features

- **Real-time Dashboard**: Live views of compliance credentials, bids/invoicing, and scope of work
- **Form Integration**: Embedded n8n forms for SOW generation, bidding, and compliance tracking
- **Crew Authentication**: Role-based access (admin, manager, crew)
- **SMS AI Assistant**: Field-ops assistant via Twilio (setup required)
- **Data Polling**: SWR-powered polling of n8n data tables every 30 seconds

## Getting Started

### Prerequisites
- Node.js 18+
- n8n instance running at https://jdwestlake89.app.n8n.cloud
- Vercel account (for deployment)

### Installation

```bash
npm install
```

## Pro-Tip for Copilot

When you have this in your repository, you can ask Copilot:
> *"Based on the README.md, suggest a schema validation script for the bids_invoices table to ensure the VRO split calculation is always accurate before it hits the database."*

It will immediately understand your architecture and provide specific code to match your existing logic.

---

### n8n Integration Details

- **Base URL**: `https://jdwestlake89.app.n8n.cloud`
- **Form endpoints**:
  - `/form/multidash-sow`
  - `/form/multidash-billing`
- **Data API**: `/api/v1/db/tables/{tableName}/rows`

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
