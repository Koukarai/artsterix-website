# Resend & Vercel Serverless Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate Vercel serverless functions with Resend to process client project inquiries on `/inquire` with custom styled email dispatches containing file attachments.

**Architecture:** A Vercel Node.js Serverless Function parses `multipart/form-data` using `busboy`, compiles a brand-matched HTML email with the inline logo and user attachments, and calls Resend's Node SDK.

**Tech Stack:** Node.js, Vercel Serverless, Resend SDK, Busboy, Astro

---

## Plan Checklist

### Task 1: Environment & Dependency Setup
*Set up required packages and configure the gitignore and local environment.*

**Files:**
- Modify: `c:\Users\terry\test-website\.gitignore`
- Create: `c:\Users\terry\test-website\.env` (local configuration, ignored by Git)
- Modify: `c:\Users\terry\test-website\package.json`

- [ ] **Step 1: Update .gitignore**
  Append `.env` and `.env.*` to `.gitignore` to prevent secret leaks.
  
  *Code changes in `c:\Users\terry\test-website\.gitignore`:*
  ```diff
  +.env
  +.env.*
  ```

- [ ] **Step 2: Create local .env file**
  Create `.env` inside `c:\Users\terry\test-website\` containing placeholder credentials.
  
  *Code in `c:\Users\terry\test-website\.env`:*
  ```env
  RESEND_API_KEY="re_mock_test_key"
  ```

- [ ] **Step 3: Install resend and busboy**
  Install the Resend Node.js SDK and Busboy parser.
  
  Run: `npm install resend busboy` inside `c:\Users\terry\test-website\`
  Expected output: Package dependencies resolved and installed successfully.

- [ ] **Step 4: Commit dependencies and ignore changes**
  Run:
  ```bash
  git add package.json package-lock.json .gitignore
  git commit -m "chore: setup dependencies and gitignore for Resend integration"
  ```

---

### Task 2: Implement Vercel Serverless API Handler
*Create the serverless function that handles the multipart form parsing, formats the HTML, and sends the email.*

**Files:**
- Create: `c:\Users\terry\test-website\api\inquire.js`

- [ ] **Step 1: Write the serverless handler code**
  Create the Node.js function inside `c:\Users\terry\test-website\api\inquire.js`. It will parse text fields, binary attachments, embed `logo.png` inline via CID, and trigger the email dispatch.

  *Code in `c:\Users\terry\test-website\api\inquire.js`:*
  ```javascript
  import fs from 'fs';
  import path from 'path';
  import Busboy from 'busboy';
  import { Resend } from 'resend';

  export const config = {
    api: {
      bodyParser: false,
    },
  };

  export default async function handler(req, res) {
    if (req.method !== 'POST') {
      res.setHeader('Allow', ['POST']);
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey || apiKey === 're_mock_test_key') {
      console.log('Using local mock mode (No active Resend API key set)');
    }

    const resend = new Resend(apiKey || 're_mock_test_key');

    try {
      const fields = {};
      const files = [];

      await new Promise((resolve, reject) => {
        const busboy = Busboy({ headers: req.headers });

        busboy.on('file', (name, file, info) => {
          const { filename, mimeType } = info;
          const chunks = [];
          file.on('data', (data) => {
            chunks.push(data);
          });
          file.on('end', () => {
            if (chunks.length > 0 && filename) {
              files.push({
                filename,
                content: Buffer.concat(chunks),
                contentType: mimeType,
              });
            }
          });
        });

        busboy.on('field', (name, val) => {
          if (name === 'areas') {
            if (!fields[name]) fields[name] = [];
            fields[name].push(val);
          } else {
            fields[name] = val;
          }
        });

        busboy.on('finish', resolve);
        busboy.on('error', reject);

        req.pipe(busboy);
      });

      // Prepare attachments (Inline logo image)
      const logoPath = path.join(process.cwd(), 'public', 'logo.png');
      const attachments = [];

      if (fs.existsSync(logoPath)) {
        attachments.push({
          filename: 'logo.png',
          content: fs.readFileSync(logoPath),
          cid: 'logo',
        });
      }

      // Add uploaded files as attachments
      files.forEach((f) => {
        attachments.push({
          filename: f.filename,
          content: f.content,
          contentType: f.contentType,
        });
      });

      const areasList = Array.isArray(fields.areas) ? fields.areas.join(', ') : (fields.areas || 'None');

      // Custom editorial HTML design matching Artsterix branding
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
              background-color: #FBFBF9;
              color: #1A1A1A;
              margin: 0;
              padding: 40px 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #ffffff;
              border: 1px solid #E5E5E0;
              padding: 40px;
            }
            .header {
              border-bottom: 1px solid #E5E5E0;
              padding-bottom: 20px;
              margin-bottom: 30px;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .section {
              margin-bottom: 30px;
            }
            .section-title {
              font-family: monospace;
              font-size: 11px;
              text-transform: uppercase;
              letter-spacing: 0.1em;
              color: #C15C3D;
              border-left: 2px solid #C15C3D;
              padding-left: 10px;
              margin-bottom: 15px;
            }
            .field-group {
              margin-bottom: 15px;
            }
            .field-label {
              font-size: 10px;
              font-family: monospace;
              text-transform: uppercase;
              color: #6E6E6E;
              margin-bottom: 4px;
              letter-spacing: 0.05em;
            }
            .field-value {
              font-size: 14px;
              line-height: 1.5;
              font-weight: 500;
            }
            .footer {
              font-family: monospace;
              font-size: 10px;
              color: #6E6E6E;
              text-align: center;
              margin-top: 40px;
              border-top: 1px solid #E5E5E0;
              padding-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="cid:logo" alt="ARTSTERIX" height="32" style="display:block; max-height:32px;" />
              <span style="font-family:monospace; font-size:10px; color:#6E6E6E;">
                ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
            </div>

            <div class="section">
              <div class="section-title">01 / Identity</div>
              <div class="field-group">
                <div class="field-label">Full Name</div>
                <div class="field-value">${fields.fullname || 'N/A'}</div>
              </div>
              <div class="field-group">
                <div class="field-label">Email</div>
                <div class="field-value"><a href="mailto:${fields.email}" style="color:#1A1A1A; text-decoration:underline;">${fields.email || 'N/A'}</a></div>
              </div>
              <div class="field-group">
                <div class="field-label">Phone</div>
                <div class="field-value">${fields.phone || 'N/A'}</div>
              </div>
              <div class="field-group">
                <div class="field-label">Preferred Communication</div>
                <div class="field-value">${fields.pref_communication || 'N/A'}</div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">02 / Scope</div>
              <div class="field-group">
                <div class="field-label">Project Typology</div>
                <div class="field-value">${fields.project_type || 'N/A'}</div>
              </div>
              <div class="field-group">
                <div class="field-label">Services Requested</div>
                <div class="field-value">${fields.service || 'N/A'}</div>
              </div>
              <div class="field-group">
                <div class="field-label">Build Type</div>
                <div class="field-value">${fields.build_type || 'N/A'}</div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">03 / Parameters</div>
              <div class="field-group">
                <div class="field-label">Location</div>
                <div class="field-value">${fields.location || 'N/A'}</div>
              </div>
              <div class="field-group">
                <div class="field-label">Estimated Size</div>
                <div class="field-value">${fields.size || 'N/A'}</div>
              </div>
              <div class="field-group">
                <div class="field-label">Goals / Description</div>
                <div class="field-value" style="white-space: pre-wrap;">${fields.description || 'N/A'}</div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">04 / Preferences</div>
              <div class="field-group">
                <div class="field-label">Aesthetic Feel</div>
                <div class="field-value">${fields.vibe || 'N/A'}</div>
              </div>
              <div class="field-group">
                <div class="field-label">Inspiration Reference</div>
                <div class="field-value">
                  ${fields.inspiration ? `<a href="${fields.inspiration}" target="_blank" style="color:#C15C3D; text-decoration:underline;">${fields.inspiration}</a>` : 'N/A'}
                </div>
              </div>
              <div class="field-group">
                <div class="field-label">Specific Materials / Details</div>
                <div class="field-value" style="white-space: pre-wrap;">${fields.materials || 'N/A'}</div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">05 / Budget & Timeline</div>
              <div class="field-group">
                <div class="field-label">Budget Range</div>
                <div class="field-value">${fields.budget || 'N/A'}</div>
              </div>
              <div class="field-group">
                <div class="field-label">Target Start Date</div>
                <div class="field-value">${fields.start_date || 'N/A'}</div>
              </div>
              <div class="field-group">
                <div class="field-label">Target Completion Date</div>
                <div class="field-value">${fields.completion_date || 'N/A'}</div>
              </div>
              <div class="field-group">
                <div class="field-label">Areas to Design</div>
                <div class="field-value">${areasList}</div>
              </div>
            </div>

            <div class="footer">
              ARTSTERIX DESIGN STUDIO &copy; ${new Date().getFullYear()}
            </div>
          </div>
        </body>
        </html>
      `;

      if (!apiKey || apiKey === 're_mock_test_key') {
        console.log('Mock email HTML:', htmlContent);
        console.log('Attachments to send:', attachments.map(a => a.filename));
        return res.status(200).json({ success: true, mock: true });
      }

      await resend.emails.send({
        from: 'Artsterix Website <onboarding@resend.dev>',
        to: 'artsterix.aa@gmail.com',
        subject: `Spatial Design Inquiry - ${fields.fullname || 'New Client'}`,
        html: htmlContent,
        attachments: attachments,
      });

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Serverless submission error:', error);
      return res.status(500).json({ error: 'Failed to process inquiry submission: ' + error.message });
    }
  }
  ```

- [ ] **Step 2: Commit API Route Handler**
  Run:
  ```bash
  git add api/inquire.js
  git commit -m "feat: implement Vercel serverless inquiry receiver api"
  ```

---

### Task 3: Enhance the Frontend Form & Interactive File Uploader
*Update `inquire.astro` layout and client-side logic to handle visual drag-and-drop feedback, file list feedback, and post FormData.*

**Files:**
- Modify: `c:\Users\terry\test-website\src\pages\inquire.astro`

- [ ] **Step 1: Modify HTML Upload Zone**
  Update the drag-and-drop HTML structure in `inquire.astro` to add `name="reference_files"` and include a file listing container. Also update the form to use `enctype="multipart/form-data"`.

  *Target lines in `inquire.astro` (around 165-175):*
  ```html
              <!-- Upload option -->
              <div class="space-y-2">
                <label class="text-xs uppercase font-mono tracking-wider text-brand-muted block">Or upload reference files</label>
                <div 
                  id="drop-zone" 
                  class="border border-dashed border-brand-border p-6 text-center cursor-pointer hover:border-brand-accent transition-colors relative"
                >
                  <input type="file" id="reference-files" name="reference_files" multiple class="hidden" />
                  <label for="reference-files" class="cursor-pointer font-mono text-[11px] tracking-wide text-brand-muted block">
                    Drag and drop files here or click to browse
                  </label>
                  <div id="file-list" class="mt-3 hidden text-left space-y-1 max-w-md mx-auto"></div>
                </div>
              </div>
  ```

- [ ] **Step 2: Add Drag-and-Drop + File List Client Logic**
  Insert event listeners in the `<script>` tag inside `inquire.astro` to list files when selected and wire up dragover, dragleave, and drop event handlers.

  *Target code to add in `<script>`:*
  ```javascript
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('reference-files') as HTMLInputElement;
    const fileList = document.getElementById('file-list');

    const updateFileList = () => {
      if (!fileList || !fileInput) return;
      fileList.innerHTML = '';
      const files = fileInput.files;
      if (files && files.length > 0) {
        fileList.classList.remove('hidden');
        const header = document.createElement('div');
        header.className = 'font-mono text-[10px] text-brand-muted uppercase tracking-wider mb-1';
        header.textContent = `Selected Files (${files.length}):`;
        fileList.appendChild(header);

        Array.from(files).forEach((file) => {
          const item = document.createElement('div');
          item.className = 'flex justify-between items-center text-xs font-mono border-b border-brand-border py-1 text-brand-text';
          
          const nameSpan = document.createElement('span');
          nameSpan.className = 'truncate max-w-[200px]';
          nameSpan.textContent = file.name;
          
          const sizeSpan = document.createElement('span');
          sizeSpan.className = 'text-brand-muted';
          sizeSpan.textContent = `${(file.size / 1024).toFixed(1)} KB`;
          
          item.appendChild(nameSpan);
          item.appendChild(sizeSpan);
          fileList.appendChild(item);
        });
      } else {
        fileList.classList.add('hidden');
      }
    };

    fileInput?.addEventListener('change', updateFileList);

    ['dragenter', 'dragover'].forEach(eventName => {
      dropZone?.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropZone.classList.add('border-brand-accent');
        dropZone.classList.remove('border-brand-border');
      }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropZone?.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropZone.classList.remove('border-brand-accent');
        dropZone.classList.add('border-brand-border');
      }, false);
    });

    dropZone?.addEventListener('drop', (e: DragEvent) => {
      const dt = e.dataTransfer;
      if (dt && dt.files && fileInput) {
        fileInput.files = dt.files;
        updateFileList();
      }
    });
  ```

- [ ] **Step 3: Modify `handleSubmit` to POST FormData to Vercel Endpoint**
  Replace the fetch function inside `inquire.astro` (around 526-566) with a POST request targeting `/api/inquire` sending the `FormData` object.

  *Target code replacement:*
  ```javascript
    const handleSubmit = () => {
      const formData = new FormData(form);

      // Disable button controls during submit
      nextBtn.disabled = true;
      const originalText = nextBtn.textContent;
      nextBtn.textContent = 'Submitting...';

      fetch('/api/inquire', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then((response) => {
        if (response.ok) {
          showSuccessState();
        } else {
          response.json().then(data => {
            alert('There was a problem submitting your inquiry: ' + (data.error || 'Unknown error'));
          }).catch(() => {
            alert('There was a problem submitting your inquiry. Please try again.');
          });
        }
      })
      .catch((error) => {
        console.error('Submission error:', error);
        alert('There was an error sending your inquiry. Please check your connection.');
      })
      .finally(() => {
        nextBtn.disabled = false;
        if (originalText) nextBtn.textContent = originalText;
      });
    };
  ```

- [ ] **Step 4: Commit changes to inquire.astro**
  Run:
  ```bash
  git add src/pages/inquire.astro
  git commit -m "feat: wire frontend submit handler to serverless endpoint & add file upload feedback"
  ```

---

## Verification & Deployment Guidelines

### Verification Steps
To verify that everything works correctly locally before pushing to Vercel:
1.  **Simulated submission test:**
    Fill out the form on `http://localhost:4321/inquire`. When you click submit on Step 5, check the terminal logs. In local dev mode (without `vercel dev` simulation or an active Resend Key), the browser will log `Mock email HTML:` and the attachments to send.
2.  **Astro Build check:**
    Run: `npm run build`
    Expected output: Successful build with zero errors.

### Vercel Deployment Checklist
1.  Sign up for a free account on [Resend](https://resend.com) with the email `artsterix.aa@gmail.com` or `terryokeke@gmail.com`.
2.  Verify the sending email/domain on Resend.
    *Note: Resend free tier sends to the account owner's email address by default. Since you are sending to `artsterix.aa@gmail.com`, registering the account with `artsterix.aa@gmail.com` directly will allow sending to it immediately without setting up a custom domain.*
3.  Go to **API Keys** in Resend dashboard and create a new key. Copy it.
4.  Log in to [Vercel](https://vercel.com) and import the GitHub repository.
5.  Under **Environment Variables** in Vercel config, add:
    *   **Key:** `RESEND_API_KEY`
    *   **Value:** *[Your Resend API Key starting with re_]*
6.  Click **Deploy**.
