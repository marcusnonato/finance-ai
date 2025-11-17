import { redirect } from "next/navigation";
import { NavBar } from "../_components/navbar";
import { auth } from "@clerk/nextjs/server";

async function Subscription() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  return <NavBar />;
}

export default Subscription;
