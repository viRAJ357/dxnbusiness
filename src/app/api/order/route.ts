import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customerName, customerPhone, customerEmail, address, paymentMethod, items, total } = body;

    // --- Build Order ID ---
    const orderId = `DXN-${Date.now().toString().slice(-6)}`;

    // --- Build product table for email ---
    const itemRows = items
      .map(
        (item: { name: string; price: number; quantity: number }) =>
          `<tr>
            <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;">${item.name}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;text-align:center;">${item.quantity}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;text-align:right;">₹${item.price * item.quantity}</td>
          </tr>`
      )
      .join("");

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f8f9fa;">
          <div style="max-width:620px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">
            
            <!-- Header -->
            <div style="background:linear-gradient(135deg,#1d4ed8,#3b82f6);padding:40px;text-align:center;">
              <h1 style="color:#fff;margin:0;font-size:28px;font-weight:800;">🎉 New Order Received!</h1>
              <p style="color:#bfdbfe;margin:8px 0 0;">Order ID: <strong style="color:#fff;">${orderId}</strong></p>
            </div>

            <!-- Customer Info -->
            <div style="padding:32px;border-bottom:1px solid #f0f0f0;">
              <h2 style="margin:0 0 16px;font-size:18px;color:#111827;">👤 Customer Details</h2>
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:6px 0;color:#6b7280;width:140px;">Name:</td><td style="padding:6px 0;font-weight:600;color:#111827;">${customerName}</td></tr>
                <tr><td style="padding:6px 0;color:#6b7280;">Phone:</td><td style="padding:6px 0;font-weight:600;color:#111827;">${customerPhone}</td></tr>
                <tr><td style="padding:6px 0;color:#6b7280;">Email:</td><td style="padding:6px 0;font-weight:600;color:#111827;">${customerEmail}</td></tr>
                <tr><td style="padding:6px 0;color:#6b7280;">Address:</td><td style="padding:6px 0;font-weight:600;color:#111827;">${address}</td></tr>
                <tr><td style="padding:6px 0;color:#6b7280;">Payment:</td>
                  <td style="padding:6px 0;">
                    <span style="background:#dbeafe;color:#1d4ed8;padding:3px 10px;border-radius:20px;font-size:13px;font-weight:600;text-transform:uppercase;">${paymentMethod}</span>
                  </td>
                </tr>
              </table>
            </div>

            <!-- Order Items -->
            <div style="padding:32px;border-bottom:1px solid #f0f0f0;">
              <h2 style="margin:0 0 16px;font-size:18px;color:#111827;">🛒 Order Items</h2>
              <table style="width:100%;border-collapse:collapse;">
                <thead>
                  <tr style="background:#f8f9fa;">
                    <th style="padding:10px 12px;text-align:left;font-size:13px;color:#6b7280;border-bottom:2px solid #e5e7eb;">Product</th>
                    <th style="padding:10px 12px;text-align:center;font-size:13px;color:#6b7280;border-bottom:2px solid #e5e7eb;">Qty</th>
                    <th style="padding:10px 12px;text-align:right;font-size:13px;color:#6b7280;border-bottom:2px solid #e5e7eb;">Amount</th>
                  </tr>
                </thead>
                <tbody>${itemRows}</tbody>
              </table>
            </div>

            <!-- Total -->
            <div style="padding:24px 32px;background:#f8f9fa;">
              <div style="display:flex;justify-content:space-between;align-items:center;">
                <span style="font-size:20px;font-weight:700;color:#111827;">Total Amount</span>
                <span style="font-size:24px;font-weight:800;color:#1d4ed8;">₹${total}</span>
              </div>
            </div>

            <!-- Footer -->
            <div style="padding:24px 32px;text-align:center;background:#1e293b;">
              <p style="color:#94a3b8;margin:0;font-size:13px;">DXN Store | 📱 +91 7258902556 | ✉️ shubhamk73407@gmail.com</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // --- Send email using Gmail SMTP ---
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"DXN Store Orders" <${process.env.GMAIL_USER}>`,
      to: "shubhamk73407@gmail.com",
      subject: `🛒 New Order ${orderId} from ${customerName} — ₹${total}`,
      html: emailHtml,
    });

    // Also send confirmation to customer
    await transporter.sendMail({
      from: `"DXN Store" <${process.env.GMAIL_USER}>`,
      to: customerEmail,
      subject: `✅ Order Confirmed! ${orderId} — DXN Store`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:500px;margin:auto;padding:40px 20px;">
          <h2 style="color:#1d4ed8;">Hi ${customerName}, your order is confirmed! 🎉</h2>
          <p style="color:#4b5563;">Thank you for ordering from DXN Store. We've received your order <strong>${orderId}</strong> and will process it shortly.</p>
          <p style="color:#4b5563;"><strong>Order Total:</strong> ₹${total}</p>
          <p style="color:#4b5563;"><strong>Payment Method:</strong> ${paymentMethod.toUpperCase()}</p>
          <p style="color:#4b5563;"><strong>Delivery Address:</strong> ${address}</p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;"/>
          <p style="color:#6b7280;font-size:14px;">Questions? WhatsApp us at <a href="https://wa.me/917258902556">+91 7258902556</a></p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, orderId });
  } catch (error) {
    console.error("Order email error:", error);
    return NextResponse.json({ success: false, error: "Failed to process order" }, { status: 500 });
  }
}
