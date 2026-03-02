export async function POST(request: Request) {
  try {
    const { amount, currency, customer } = await request.json();

    if (
      typeof amount !== "number" ||
      !currency ||
      !customer ||
      typeof customer.name !== "string" ||
      typeof customer.email !== "string"
    ) {
      return new Response("Invalid request body", { status: 400 });
    }

    const secretKey = process.env.TAP_SECRET_KEY;
    if (!secretKey) {
      console.error("[Checkout] TAP_SECRET_KEY is not configured");
      return new Response("Server configuration error", { status: 500 });
    }

    const tapResponse = await fetch("https://api.tap.company/v2/charges", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${secretKey}`,
      },
      body: JSON.stringify({
        amount,
        currency,
        customer: {
          name: customer.name,
          email: customer.email,
        },
        // Source can be adjusted based on your Tap setup.
        source: {
          id: "src_all",
        },
      }),
    });

    if (!tapResponse.ok) {
      const errorText = await tapResponse.text().catch(() => "");
      console.error("[Checkout] Tap API error", tapResponse.status, errorText);
      return new Response("Failed to create charge", { status: 502 });
    }

    const tapData = (await tapResponse.json()) as {
      transaction?: { url?: string };
      [key: string]: unknown;
    };

    const url = tapData.transaction?.url;
    if (!url) {
      console.error("[Checkout] Tap response missing transaction.url");
      return new Response("Invalid Tap response", { status: 502 });
    }

    return new Response(JSON.stringify({ url }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[Checkout] Unexpected error", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

