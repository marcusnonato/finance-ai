"use client";

import { Button } from "@/app/_components/ui/button";
import { createStripeCheckout } from "../_actions/create-stripe-checkout";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

const AcquirePlanButton = () => {
  const { user } = useUser();
  const handleAcquirePlanClick = async () => {
    const { session } = await createStripeCheckout();

    if (!session.url) {
      throw new Error("Stripe checkout URL not found");
    }
    window.location.href = session.url;
  };
  const hasPremiumPlan = user?.publicMetadata.subscriptionPlan == "premium";
  if (hasPremiumPlan) {
    return (
      <Button className="w-full rounded-full font-bold" variant="link">
        <Link
          target="_blank"
          href={`${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL as string}?prefilled_email=${user.emailAddresses[0].emailAddress}`}
        >
          Gerenciar plano
        </Link>
      </Button>
    );
  }
  return (
    <Button
      className="w-full rounded-full font-bold text-white"
      onClick={handleAcquirePlanClick}
    >
      Adquirir plano
    </Button>
  );
};

export default AcquirePlanButton;
