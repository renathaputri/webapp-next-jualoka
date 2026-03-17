import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
})

type OrderItem = { name: string; quantity: number; price: number }

interface OrderEmailData {
    id: string
    orderNumber: string
    customerName: string
    customerWhatsapp: string
    createdAt: string | Date
    orderItems: OrderItem[]
}

function formatRp(n: number) {
    return "Rp " + n.toLocaleString("id-ID")
}

function buildEmailHtml(order: OrderEmailData, storeName: string): string {
    const total = order.orderItems.reduce((s, i) => s + i.price * i.quantity, 0)
    const itemRows = order.orderItems.map(i => `
        <tr>
            <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0">${i.name}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;text-align:center">${i.quantity}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;text-align:right">${formatRp(i.price)}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;text-align:right">${formatRp(i.price * i.quantity)}</td>
        </tr>
    `).join("")

    return `
    <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto;background:#fff">
        <div style="background:linear-gradient(135deg,#16a34a,#22c55e);padding:32px 24px;border-radius:12px 12px 0 0;text-align:center">
            <h1 style="color:#fff;margin:0;font-size:22px">Pesanan Baru Masuk!</h1>
            <p style="color:#dcfce7;margin:8px 0 0">Toko: <strong>${storeName}</strong></p>
        </div>
        <div style="padding:24px;border:1px solid #e5e7eb;border-top:0;border-radius:0 0 12px 12px">
            <table style="width:100%;border-collapse:collapse;margin-bottom:16px">
                <tr><td style="padding:6px 0;color:#6b7280;font-size:13px">Nomor Pesanan</td><td style="font-weight:600">${order.orderNumber}</td></tr>
                <tr><td style="padding:6px 0;color:#6b7280;font-size:13px">Nama Pelanggan</td><td style="font-weight:600">${order.customerName}</td></tr>
                <tr><td style="padding:6px 0;color:#6b7280;font-size:13px">WhatsApp</td><td><a href="https://wa.me/${order.customerWhatsapp.replace(/\D/g, "")}">${order.customerWhatsapp}</a></td></tr>
                <tr><td style="padding:6px 0;color:#6b7280;font-size:13px">Waktu Pesan</td><td>${new Date(order.createdAt).toLocaleString("id-ID")}</td></tr>
            </table>
            <h3 style="margin:16px 0 8px;font-size:14px;color:#374151">Detail Pesanan</h3>
            <table style="width:100%;border-collapse:collapse;font-size:13px">
                <thead><tr style="background:#f9fafb">
                    <th style="padding:8px 12px;text-align:left;color:#6b7280">Produk</th>
                    <th style="padding:8px 12px;text-align:center;color:#6b7280">Qty</th>
                    <th style="padding:8px 12px;text-align:right;color:#6b7280">Harga</th>
                    <th style="padding:8px 12px;text-align:right;color:#6b7280">Subtotal</th>
                </tr></thead>
                <tbody>${itemRows}</tbody>
            </table>
            <div style="text-align:right;margin-top:16px;padding:12px 12px;background:#f0fdf4;border-radius:8px">
                <strong style="font-size:16px;color:#16a34a">Total: ${formatRp(total)}</strong>
            </div>
            <div style="margin-top:24px;text-align:center">
                <a href="${process.env.NEXT_PUBLIC_APP_URL ?? ""}/admin/orders"
                   style="display:inline-block;background:#16a34a;color:#fff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600">
                   Lihat Pesanan di Dashboard →
                </a>
            </div>
        </div>
    </div>`
}

export async function sendOrderEmail(
    toEmail: string,
    order: OrderEmailData,
    storeName: string
): Promise<void> {
    if (!process.env.SMTP_USER) {
        console.warn("SMTP not configured, skipping email.")
        return
    }
    try {
        await transporter.sendMail({
            from: `"Jualoka" <${process.env.SMTP_USER}>`,
            to: toEmail,
            subject: `Pesanan Baru #${order.orderNumber} dari ${order.customerName} – ${storeName}`,
            html: buildEmailHtml(order, storeName),
        })
    } catch (err) {
        console.error("Failed to send order email:", err)
    }
}
