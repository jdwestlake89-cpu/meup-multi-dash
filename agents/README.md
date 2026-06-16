# MEUP Multi-Dash: Automated Business Operations Engine

The MEUP Multi-Dash is a robust, event-driven backend architecture designed for autonomous business management. Built on n8n, this system orchestrates compliance monitoring, automated bidding/invoicing, and AI-driven field operations.

## Architecture Overview

This system utilizes a modular "Data-Table-as-Source" pattern to ensure consistency across all business functions.

## Core Workflow Modules

| Module | Trigger | Status | Primary Function |
|---|---|---|---|
| **Compliance Watchdog** | Scheduled (Daily) | ✅ Live | Tracks credential expiry; triggers Gmail alerts |
| **Vision-to-SOW** | Form Input | ✅ Live | Converts field data/images into structured SOWs |
| **Bidding & Invoicing** | Form Input | ✅ Live | Captures financial intake; calculates 10% VRO split |
| **SMS AI Assistant** | Twilio Webhook | ⏸️ Parked | Gemini-powered field operations agent |

## Compliance & Forensic Auditability

To ensure business operations are fully transparent and compliant with all federal and state standards, this architecture is built with "forensic auditability" in mind:

* **Data-Driven Accountability**: All business activities, project outcomes, and work hours are logged through the automated "MEUP Multi-Dash" pipeline, providing an objective, time-stamped record of productivity.
* **Proactive Compliance**: The system maintains active LARA registration status and utilizes the "Compliance Watchdog" to ensure that all professional credentials remain valid and aligned with federal standards, including the Davis-Bacon Act and the Copeland "Anti-Kickback" Act.

## Why this works for Copilot:

* **Contextual Hierarchy:** It defines the "what" (business engine), the "how" (n8n/event-driven), and the "why" (forensic auditability).
* **Metadata Alignment:** By explicitly listing your modules and triggers, you give Copilot a map of your codebase, allowing it to provide more accurate suggestions when you write new workflows or modify existing ones.
