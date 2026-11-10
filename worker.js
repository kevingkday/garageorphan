import { EmailMessage } from "cloudflare:email";

function buildRawMimeEmail({ fromName, fromEmail, toEmail, replyTo, subject, textBody, htmlBody }) {
  const domain = fromEmail.split("@")[1] || "kevinday.ca";
  const boundary = "----=_Part_" + crypto.randomUUID().replace(/-/g, "");
  const msgId = `<${crypto.randomUUID()}@${domain}>`;
  const dateHeader = new Date().toUTCString();
  const safeSubject = subject.replace(/[\r\n]+/g, " ").trim();

  const headers = [
    `From: "${fromName.replace(/"/g, "")}" <${fromEmail}>`,
    `To: <${toEmail}>`,
    ...(replyTo ? [`Reply-To: <${replyTo}>`] : []),
    `Subject: ${safeSubject}`,
    `Message-ID: ${msgId}`,
    `Date: ${dateHeader}`,
    `MIME-Version: 1.0`,
    `Content-Type: multipart/alternative; boundary="${boundary}"`
  ];

  const lines = [
    ...headers,
    "",
    `--${boundary}`,
    `Content-Type: text/plain; charset="UTF-8"`,
    `Content-Transfer-Encoding: 7bit`,
    "",
    textBody,
    "",
    `--${boundary}`,
    `Content-Type: text/html; charset="UTF-8"`,
    `Content-Transfer-Encoding: 7bit`,
    "",
    htmlBody,
    "",
    `--${boundary}--`,
    ""
  ];

  return lines.join("\r\n");
}

function escapeHtml(str) {
  return String(str ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/contact" && request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Accept"
        }
      });
    }

    if (url.pathname === "/api/contact" && request.method === "POST") {
      try {
        const body = await request.json();
        const isAcquisition = body.type === "domain_acquisition_inquiry";

        const toEmail = "kevingkday@gmail.com";
        const fromEmail = "garageorphan@kevinday.ca";
        const submitterName = (body.fullName || body.name || "Visitor").trim();
        const submitterEmail = (body.email || "").trim();
        const timestamp = body.timestamp || new Date().toISOString();

        let subject;
        let textBody;
        let htmlBody;

        if (isAcquisition) {
          const offer = (body.offer || "Not specified").trim();
          subject = `[GarageOrphan.com] Domain Acquisition Inquiry - ${submitterName}`;
          textBody = [
            `New Domain Acquisition Inquiry from GarageOrphan.com`,
            `----------------------------------------------------`,
            `Name / Organization: ${submitterName}`,
            `Email: ${submitterEmail}`,
            `Opening Offer / Inquiry: ${offer}`,
            `Submitted At: ${timestamp}`
          ].join("\r\n");

          htmlBody = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
              <div style="background: #0f172a; color: #ffffff; padding: 18px 24px;">
                <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #34d399; font-weight: bold;">GarageOrphan.com</div>
                <h2 style="margin: 4px 0 0; font-size: 18px;">Domain Acquisition Inquiry</h2>
              </div>
              <div style="padding: 24px; background: #ffffff; color: #1e293b; font-size: 14px; line-height: 1.6;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; width: 40%;">Name / Organization</td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${escapeHtml(submitterName)}</td></tr>
                  <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Email</td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;"><a href="mailto:${escapeHtml(submitterEmail)}">${escapeHtml(submitterEmail)}</a></td></tr>
                  <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Offer / Inquiry</td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${escapeHtml(offer)}</td></tr>
                  <tr><td style="padding: 8px 0; font-weight: bold;">Submitted At</td><td style="padding: 8px 0;">${escapeHtml(timestamp)}</td></tr>
                </table>
              </div>
            </div>`;
        } else {
          const residentType = (body.residentType || "Not specified").trim();
          const location = (body.location || "Not specified").trim();
          const buildingSize = (body.buildingSize || "Not specified").trim();

          subject = `[GarageOrphan.com] HOA Proposal Kit Request - ${submitterName} (${location})`;
          textBody = [
            `New HOA Proposal Kit Request from GarageOrphan.com`,
            `--------------------------------------------------`,
            `Name: ${submitterName}`,
            `Email: ${submitterEmail}`,
            `Living Situation: ${residentType}`,
            `City & State: ${location}`,
            `Building Parking Spots: ${buildingSize}`,
            `Submitted At: ${timestamp}`
          ].join("\r\n");

          htmlBody = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
              <div style="background: #059669; color: #ffffff; padding: 18px 24px;">
                <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #d1fae5; font-weight: bold;">GarageOrphan.com</div>
                <h2 style="margin: 4px 0 0; font-size: 18px;">Free HOA / Landlord Proposal Kit Request</h2>
              </div>
              <div style="padding: 24px; background: #ffffff; color: #1e293b; font-size: 14px; line-height: 1.6;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold; width: 40%;">Name</td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${escapeHtml(submitterName)}</td></tr>
                  <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Email</td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;"><a href="mailto:${escapeHtml(submitterEmail)}">${escapeHtml(submitterEmail)}</a></td></tr>
                  <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Living Situation</td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${escapeHtml(residentType)}</td></tr>
                  <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold;">City &amp; State</td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${escapeHtml(location)}</td></tr>
                  <tr><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-weight: bold;">Building Parking Spots</td><td style="padding: 8px 0; border-bottom: 1px solid #f1f5f9;">${escapeHtml(buildingSize)}</td></tr>
                  <tr><td style="padding: 8px 0; font-weight: bold;">Submitted At</td><td style="padding: 8px 0;">${escapeHtml(timestamp)}</td></tr>
                </table>
              </div>
            </div>`;
        }

        const rawMime = buildRawMimeEmail({
          fromName: "GarageOrphan.com",
          fromEmail,
          toEmail,
          replyTo: submitterEmail,
          subject,
          textBody,
          htmlBody
        });

        const message = new EmailMessage(fromEmail, toEmail, rawMime);
        await env.SEND_EMAIL.send(message);

        return new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        });
      } catch (err) {
        return new Response(JSON.stringify({ ok: false, error: err.message || String(err) }), {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        });
      }
    }

    return env.ASSETS.fetch(request);
  }
};
