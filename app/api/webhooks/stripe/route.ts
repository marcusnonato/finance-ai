import { clerkClient } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (request: Request) => {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.error();
  }
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.error();
  }
  const text = await request.text();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET,
  );

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;

      if (session.mode !== "subscription") {
        break;
      }

      const subscriptionId = session.subscription as string;
      if (!subscriptionId) {
        break;
      }

      const subscription = await stripe.subscriptions.retrieve(subscriptionId);

      const clerkUserId = subscription.metadata.clerk_user_id;

      if (!clerkUserId) {
        console.log("No clerk user ID found in subscription metadata");
        return NextResponse.error();
      }

      await (
        await clerkClient()
      ).users.updateUser(clerkUserId, {
        privateMetadata: {
          stripeCustomerId: session.customer as string,
          stripeSubscriptionId: subscriptionId,
        },
        publicMetadata: {
          subscriptionPlan: "premium",
        },
      });

      break;
    }
    case "invoice.paid": {
      const invoice = event.data.object;

      const customerId = invoice.customer as string;

      const clerkUserId = invoice.lines?.data?.[0]?.metadata?.clerk_user_id;

      if (!clerkUserId) {
        break;
      }

      const subscriptionItemId =
        invoice.lines?.data?.[0]?.parent?.subscription_item_details
          ?.subscription_item;

      //@ts-ignore
      let subscriptionId = invoice.subscription;

      if (!subscriptionId && subscriptionItemId) {
        const subscriptionItem =
          await stripe.subscriptionItems.retrieve(subscriptionItemId);
        subscriptionId = subscriptionItem.subscription;
      }

      await (
        await clerkClient()
      ).users.updateUser(clerkUserId, {
        privateMetadata: {
          stripeCustomerId: customerId,
          stripeSubscriptionId: subscriptionId || null,
        },
        publicMetadata: {
          subscriptionPlan: "premium",
        },
      });

      break;
    }
    case "customer.subscription.deleted": {
      const subscription = await stripe.subscriptions.retrieve(
        event.data.object.id,
      );
      const clerkUserId = subscription.metadata.clerk_user_id;

      if (!clerkUserId) {
        return NextResponse.error();
      }

      await (
        await clerkClient()
      ).users.updateUser(clerkUserId, {
        privateMetadata: {
          stripeCustomerId: null,
          stripeSubscriptionId: null,
        },
        publicMetadata: {
          subscriptionPlan: null,
        },
      });

      break;
    }
  }
  return NextResponse.json({ received: true });
};
