import { NextResponse } from "next/server";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1337";

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").replace(/\D/g, "");

  if (name.length < 2 || !EMAIL.test(email) || phone.length < 7 || phone.length > 15) {
    return NextResponse.json({ error: "Invalid fields" }, { status: 422 });
  }

  // Forward submitted enquiry directly to Strapi CMS Leads Collection
  try {
    const formattedPhone = `${body.countryCode || "+91"} ${phone}`;
    const fullMessage = body.message
      ? `${body.message} | Source: ${body.source || "Website Enquiry Modal"}`
      : `Customer submitted enquiry on official website. Source: ${body.source || "Website Enquiry Modal"}`;

    const strapiRes = await fetch(`${STRAPI_URL}/api/lead-form-submissions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: {
          name,
          email,
          phone: formattedPhone,
          message: fullMessage,
          status: "seen",
        },
      }),
    });

    if (!strapiRes.ok) {
      const errText = await strapiRes.text();
      console.error("Failed to forward lead to Strapi CMS:", errText);
    }
  } catch (err) {
    console.error("Error submitting lead to Strapi CMS:", err);
  }

  return NextResponse.json({ ok: true, success: true });
}
