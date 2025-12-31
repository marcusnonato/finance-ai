import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isMatch } from "date-fns";
import TransactionsPieChart from "./_components/transactions-pie-chart";
import { getDashboard } from "../_data/get-dashboard";
import ExpensesPerCategory from "./_components/expense-per-category";
import LastTransactions from "./_components/last-transactions";
import { NavBar } from "../_components/navbar";
import { TimeSelect } from "./_components/time-select";
import SummaryCards from "./_components/sumary-cards";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";
import { AiReportButton } from "./_components/ai-report-button";

interface HomeProps {
  searchParams: Promise<{
    month: string;
  }>;
}

const Home = async ({ searchParams }: HomeProps) => {
  const { month } = await searchParams;

  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  const monthIsInvalid = !month || !isMatch(month, "MM");
  if (monthIsInvalid) {
    redirect(`?month=${new Date().getMonth() + 1}`);
  }
  const dashboard = await getDashboard(month);
  const uerCanAddTransaction = await canUserAddTransaction();

  console.log(dashboard);

  return (
    <>
      <NavBar />
      <div className="flex h-full flex-col space-y-6 overflow-y-auto p-4 md:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-xl font-bold md:text-2xl">Dashboard</h1>
          <div className="flex items-center gap-2 sm:gap-3">
            <AiReportButton />
            <TimeSelect />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="flex flex-col gap-6">
            <SummaryCards
              canAddTransaction={uerCanAddTransaction}
              month={month}
              {...dashboard}
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <TransactionsPieChart {...dashboard} />
              <ExpensesPerCategory
                expensesPerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>
          <LastTransactions lastTransactions={dashboard.lastTransactions} />
        </div>
      </div>
    </>
  );
};

export default Home;
