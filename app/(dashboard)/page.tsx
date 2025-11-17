import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { dark } from "@clerk/themes";
import { redirect } from "next/navigation";
import { NavBar } from "../_components/navbar";

export default async function Home() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  return (
    <>
      <NavBar />
      <div className="flex min-h-screen items-center justify-center">
        <UserButton
          showName
          appearance={{
            theme: dark,
          }}
        />
      </div>
    </>
  );
}
