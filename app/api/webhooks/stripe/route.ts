import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature")!;
  if (!signature) {
    return new Response("Missing Stripe signature", { status: 400 });
  }
  const text = await request.text();

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET as string,
  );

  switch (event.type) {
    case "invoice.paid":
      const { customer, subscription, subscription_details } =
        event.data.object;

      const clerkUserId = subscription_details?.metadata?.clerkUserId;
      (await clerkClient()).users.updateUser(clerkUserId as string, {
        privateMetadata: {
          stripeCustomerId: customer as string,
          stripeSubscriptionId: subscription as string,
        },
        publicMetadata: {
          subscriptionPlan: "premium",
        },
      });
      break;
  }

  return NextResponse.json({ received: true });
}
