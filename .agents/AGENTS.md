# Volckan Page Agent Configuration

## Project Scope
This workspace is for the official website of **Volckan** (hosted on [www.volckan.com](http://www.volckan.com)). It consists of static HTML files styled with Tailwind CSS loaded via CDN.

## Production Accounts & Git Configuration
To ensure we deploy code to the correct repository under the correct credentials:
- **Git User Name**: `pasaporteqr1`
- **Git User Email**: `pasaportealacultura@gmail.com`
- **Repository Remote URL**: `https://github.com/pasaporteqr1/volckan-web.git`
- **Authentication**: Authentication uses the Personal Access Token (PAT) configured in the Git origin remote URL. Do not change the remote URL unless explicitly instructed.
- **Production Branch**: `main` (pushes to `origin/main` automatically deploy to the live website on GitHub Pages). Always push to `origin/main` immediately after committing any successful change.

## External Services & Integrations
These are the production parameters and credentials extracted from the codebase (e.g., from `google-apps-script-codigo.js`):
- **Google Calendar ID**: `grupovolckan@gmail.com` (for booking demo slots)
- **Google Spreadsheet ID**: Defined as `SPREADSHEET_ID` in `google-apps-script-codigo.js`
- **Telegram Bot Token**: Defined as `TELEGRAM_BOT_TOKEN` in `google-apps-script-codigo.js`
- **Telegram Chat ID**: Defined as `TELEGRAM_CHAT_ID` in `google-apps-script-codigo.js`

## Code Synchronization & Guidelines
- **Header, Footer & Menu Updates**: The source of truth for the common sections (Head, Header, Footer, Mobile Menu, and Demo Modal) is `index.html`.
- **Synchronization Command**: Whenever you make changes to these common sections in `index.html`, you **MUST** run the synchronization script to propagate changes to all subpages:
  ```bash
  python3 sync_inner_pages.py
  ```
- **List of Synchronized Pages**:
  - `soluciones-sosqr.html`
  - `soluciones-parqueos.html`
  - `soluciones-modulo-ventas.html`
  - `soluciones-modulo-tiendas.html`
  - `soluciones-modulo-personal.html`
  - `soluciones-modulo-nutricion.html`
  - `soluciones-automatizaciones.html`
  - `soluciones-ciberseguridad.html`
  - `agendar-visita.html`
  - `propuestas-landing-tracking.html`

## Isolation & Context Rules
- Ensure no contexts, assets, configuration, or references from other projects (such as "Pasaporte QR" or other workspaces) leak into this repository.
- Always use the credentials and parameters defined above when interacting with APIs or performing git operations.
