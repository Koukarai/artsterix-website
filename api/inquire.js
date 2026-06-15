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
      console.log('Mock email HTML content generated successfully.');
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
