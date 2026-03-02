export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tapId = searchParams.get("tap_id");

  if (!tapId) {
    return new Response("Missing tap_id", { status: 400 });
  }

  const secretKey = process.env.TAP_SECRET_KEY;
  if (!secretKey) {
    console.error("[Tap Verify] TAP_SECRET_KEY is not configured");
    return new Response("Server configuration error", { status: 500 });
  }

  try {
    const tapRes = await fetch(
      `https://api.tap.company/v2/charges/${encodeURIComponent(tapId)}`,
      {
        headers: {
          Authorization: `Bearer ${secretKey}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!tapRes.ok) {
      const text = await tapRes.text().catch(() => "");
      console.error("[Tap Verify] Tap API error", tapRes.status, text);
      return new Response("Failed to verify charge", { status: 502 });
    }

    const data = (await tapRes.json()) as any;
    const status = data.status ?? "UNKNOWN";

    const normalized = {
      success: status === "CAPTURED",
      status,
      orderId: data.reference?.order ?? data.id ?? "Unknown",
      amount: data.amount?.value ?? 0,
      currency: data.amount?.currency ?? "JOD",
      customerName: data.customer?.name ?? "",
      customerEmail: data.customer?.email ?? "",
    };

    return new Response(JSON.stringify(normalized), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[Tap Verify] Unexpected error", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

