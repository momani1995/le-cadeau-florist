"use server";

type TapWebhookPayload = {
  id?: string;
  status?: string;
  amount?: {
    value?: number;
    currency?: string;
  };
  reference?: {
    order?: string;
  };
  customer?: {
    name?: string;
    email?: string;
    phone?: {
      country_code?: string;
      number?: string;
    };
  };
  [key: string]: unknown;
};

type FormspreePayload = {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  totalAmount: string;
  rawStatus: string;
};

async function sendWhatsAppNotification(
  orderId: string,
  amount: string,
  currency: string,
) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const toNumber = process.env.OWNER_PHONE_NUMBER;
  const fromNumber = process.env.TWILIO_WHATSAPP_FROM;

  if (!accountSid || !authToken || !toNumber || !fromNumber) {
    console.error(
      "[Tap Webhook] Twilio environment variables missing; skipping WhatsApp notification.",
    );
    return;
  }

  const body = `🌸 New Paid Order! Order ID: ${orderId}, Amount: ${amount} ${currency}. Please start preparing the bouquet.`;

  const creds = Buffer.from(`${accountSid}:${authToken}`).toString("base64");

  try {
    const res = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${creds}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          To: `whatsapp:${toNumber}`,
          From: `whatsapp:${fromNumber}`,
          Body: body,
        }).toString(),
      },
    );

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error(
        "[Tap Webhook] WhatsApp notification failed",
        res.status,
        text,
      );
    }
  } catch (error) {
    console.error(
      "[Tap Webhook] Error sending WhatsApp notification via Twilio",
      error,
    );
  }
}

async function verifyTapSignature(_request: Request): Promise<boolean> {
  // TODO: Implement Tap webhook signature verification based on Tap's
  // documentation (e.g. HMAC using a webhook secret and a header from Tap).
  // For now we assume the request is valid.
  return true;
}

async function markOrderPaid(orderId: string) {
  // TODO: Replace this placeholder with your real database update logic.
  // Example (pseudo-code):
  // await db.order.update({ where: { id: orderId }, data: { status: "PAID" } });
  console.log(`[Tap Webhook] Marking order ${orderId} as Paid`);
}

async function sendFormspreeNotification(data: FormspreePayload) {
  const endpoint = process.env.FORMSPREE_ENDPOINT;

  if (!endpoint) {
    console.error(
      "[Tap Webhook] FORMSPREE_ENDPOINT is not configured. Skipping email notification."
    );
    return;
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      console.error(
        "[Tap Webhook] Formspree notification failed",
        res.status,
        await res.text().catch(() => "")
      );
    }
  } catch (error) {
    console.error("[Tap Webhook] Error sending Formspree notification", error);
  }
}

export async function POST(request: Request) {
  let payload: TapWebhookPayload;

  try {
    payload = (await request.json()) as TapWebhookPayload;
  } catch (error) {
    console.error("[Tap Webhook] Failed to parse JSON payload", error);
    return new Response("Invalid payload", { status: 400 });
  }

  const isValid = await verifyTapSignature(request);
  if (!isValid) {
    console.error("[Tap Webhook] Signature verification failed");
    return new Response("Invalid signature", { status: 401 });
  }

  const status = payload.status;

  if (status === "CAPTURED") {
    const orderId =
      payload.reference?.order || payload.id || "Unknown Order";

    const customerName =
      payload.customer?.name?.trim() || "Unknown Customer";

    const customerEmail =
      payload.customer?.email?.trim() || "Unknown Email";

    const phone =
      payload.customer?.phone?.number &&
      payload.customer?.phone?.country_code
        ? `+${payload.customer.phone.country_code} ${payload.customer.phone.number}`
        : payload.customer?.phone?.number || "Unknown Phone";

    const amountValue = payload.amount?.value ?? 0;
    const currency = payload.amount?.currency ?? "USD";
    const totalAmount = `${amountValue.toFixed(2)} ${currency}`;

    try {
      await markOrderPaid(orderId);
    } catch (error) {
      console.error(
        "[Tap Webhook] Failed to mark order as paid",
        orderId,
        error,
      );
    }

    try {
      await sendFormspreeNotification({
        orderId,
        customerName,
        customerEmail,
        customerPhone: phone,
        totalAmount,
        rawStatus: status ?? "UNKNOWN",
      });
    } catch (error) {
      console.error(
        "[Tap Webhook] Failed to send Formspree notification",
        error,
      );
    }

    try {
      await sendWhatsAppNotification(orderId, amountValue.toFixed(2), currency);
    } catch (error) {
      console.error(
        "[Tap Webhook] Failed to send WhatsApp notification",
        error,
      );
    }
  }

  return new Response("OK", { status: 200 });
}

