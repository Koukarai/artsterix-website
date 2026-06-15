# Design Specification: Vercel Serverless & Resend Email Integration

**Date:** 2026-06-15  
**Project:** Resend API & Vercel Serverless Integration for Artsterix  
**Status:** Approved  

---

## 1. Executive Summary
This design specification details the technical integration of **Vercel Serverless Functions** and the **Resend API** to process the conversational project inquiry form on the Artsterix website. This solution delivers a fully customized, brand-aligned HTML notification email to `artsterix.aa@gmail.com` and supports file attachments, completely free of charge.

---

## 2. Technical Architecture

```mermaid
graph TD
    A[inquire.astro SPA Form] -->|1. AJAX POST multipart/form-data| B[Vercel Serverless Function: /api/inquire]
    B -->|2. Extract Fields & Files| B
    B -->|3. Compile Custom HTML Template| B
    B -->|4. Send via API| C[Resend Email Service]
    C -->|5. Deliver HTML Email with Attachments| D[artsterix.aa@gmail.com]
    B -->|6. JSON Response: Success/Error| A
```

---

## 3. Serverless Integration Details

### 3.1 Vercel Serverless Function (`/api/inquire.js` or `.ts`)
A Node.js function hosted inside the `/api/` directory. Vercel automatically exposes files in this directory as standalone api endpoints.

*   **Request Parsing:** Because the form is submitted as `multipart/form-data` (due to file uploads), the serverless function must parse the request body. We can use a standard parsing library like `busboy` or `formidable` (or Vercel's native helper if supported, but `busboy` is standard and highly reliable for parse-streaming file fields in serverless environments).
*   **Email Formatting:** Generate a beautiful, clean, modern responsive HTML email matching the Artsterix design language (Monochrome off-white `#FBFBF9` background, Charcoal text `#1A1A1A`, Terracotta `#C15C3D` accents, and grid tables).
*   **Resend Dispatch:** Use the `resend` package to send the parsed text and files.

---

## 4. Custom Email Design Spec
The email received by the Artsterix studio will feature:
*   **Palette:** Background `#FBFBF9`, text `#1A1A1A`, headers with `#C15C3D` border-left highlights.
*   **Header:** Minimal logo text `ARTSTERIX` and timestamp metadata.
*   **Sections:**
    *   **01 / Client Identity:** Name, Email, Phone, Preferred contact method.
    *   **02 / Project Scope:** Typology, Services, Build Type.
    *   **03 / Parameters:** Location, Size, Goals Description.
    *   **04 / Preferences:** Vibe, Inspiration Link.
    *   **05 / Budget & Timeline:** Budget range, Target start/completion date, Areas selected.
*   **Attachments Section:** Links or list of attached files.

---

## 5. Security & Env Variable Management
To protect credentials:
*   **RESEND_API_KEY:** Added to Vercel's environment variables dashboard (non-public).
*   A local `.env` file (containing `RESEND_API_KEY="re_..."`) will be created for local dev testing.
*   `.env` will be added to `.gitignore`.

---

## 6. Local Setup & Testing
For local testing of the serverless function:
1.  Use `vercel dev` locally, which runs both Astro and the `/api` serverless function concurrently.
2.  Alternatively, Astro can mock the serverless route or proxy it, but `vercel dev` is the official, most accurate Vercel simulator.
