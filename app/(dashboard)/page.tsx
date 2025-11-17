import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { NavBar } from "../_components/navbar";
import { SumarryCards } from "./_components/sumary-cards";
import { TimeSelect } from "./_components/time-select";
import { isMatch } from "date-fns";

interface HomeProps {
  searchParams: Promise<{
    month: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { month } = await searchParams;

  const { userId } = await auth();

  const monthIsInvalid = !month || !isMatch(month, "MM");

  if (monthIsInvalid) {
    redirect("?month=01");
  }

  if (!userId) {
    redirect("/login");
  }

  return (
    <>
      <NavBar />
      <div className="space-y-6 p-6">
        <div className="flex justify-between">
          <h1>Dashboard</h1>
          <TimeSelect />
        </div>
        <SumarryCards month={month} />
      </div>
    </>
  );
}
