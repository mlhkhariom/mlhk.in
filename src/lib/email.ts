import { Resend } from "resend";
import { getCloudflareContext } from "@opennextjs/cloudflare";

function getResend(): Resend {
  const { env } = getCloudflareContext();
  return new Resend(env.RESEND_API_KEY);
}

const FROM = "MLHK Infotech <hello@mlhk.in>";

export async function sendEmail(opts: {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const resend = getResend();
  return resend.emails.send({
    from: FROM,
    to: opts.to,
    subject: opts.subject,
    html: opts.html,
    ...(opts.replyTo ? { replyTo: opts.replyTo } : {}),
  });
}

/** Lead auto-reply after contact form submission. */
export async function sendLeadReply(name: string, email: string) {
  return sendEmail({
    to: email,
    subject: "Thank you for reaching out — MLHK Infotech",
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#2563eb;">Hi ${name},</h2>
        <p>Thank you for contacting <strong>MLHK Infotech</strong>. We've received your inquiry and will get back to you within 24 hours.</p>
        <p>In the meantime, feel free to explore our <a href="https://mlhk.in/portfolio">portfolio</a> or <a href="https://mlhk.in/services">services</a>.</p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
        <p style="font-size:12px;color:#6b7280;">MLHK Infotech · Barnawad, Shajapur, MP · <a href="https://mlhk.in">mlhk.in</a></p>
      </div>
    `,
  });
}

/** Notify admin of new lead. */
export async function sendLeadNotification(name: string, email: string, message: string) {
  return sendEmail({
    to: "admin@mlhk.in",
    subject: `New Lead: ${name}`,
    html: `
      <div style="font-family:sans-serif;">
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-wrap;">${message}</p>
      </div>
    `,
    replyTo: email,
  });
}

/** Invoice send notification to client. */
export async function sendInvoiceEmail(to: string, invoiceNumber: string, total: number, dueDate: string) {
  return sendEmail({
    to,
    subject: `Invoice ${invoiceNumber} — MLHK Infotech`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#2563eb;">Invoice ${invoiceNumber}</h2>
        <p>Dear Client,</p>
        <p>Please find your invoice details below:</p>
        <table style="width:100%;border-collapse:collapse;margin:16px 0;">
          <tr><td style="padding:8px;border:1px solid #e5e7eb;"><strong>Invoice #</strong></td><td style="padding:8px;border:1px solid #e5e7eb;">${invoiceNumber}</td></tr>
          <tr><td style="padding:8px;border:1px solid #e5e7eb;"><strong>Total Amount</strong></td><td style="padding:8px;border:1px solid #e5e7eb;">₹${total.toLocaleString("en-IN")}</td></tr>
          <tr><td style="padding:8px;border:1px solid #e5e7eb;"><strong>Due Date</strong></td><td style="padding:8px;border:1px solid #e5e7eb;">${dueDate}</td></tr>
        </table>
        <p>Please arrange payment at the earliest. For queries, reply to this email.</p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
        <p style="font-size:12px;color:#6b7280;">MLHK Infotech · Barnawad, Shajapur, MP</p>
      </div>
    `,
  });
}

/** Ticket update notification. */
export async function sendTicketUpdateEmail(to: string, ticketTitle: string, message: string) {
  return sendEmail({
    to,
    subject: `Ticket Update: ${ticketTitle}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <h3 style="color:#2563eb;">Update on: ${ticketTitle}</h3>
        <p>${message}</p>
        <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />
        <p style="font-size:12px;color:#6b7280;">MLHK Infotech Support · <a href="https://mlhk.in/portal/tickets">View in Portal</a></p>
      </div>
    `,
  });
}
