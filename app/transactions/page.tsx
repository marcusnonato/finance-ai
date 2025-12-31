import { db } from "../_lib/prisma";
import { DataTable } from "../_components/ui/data-table";
import AddTransactionButton from "../_components/add-transaction-button";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ScrollArea } from "../_components/ui/scroll-area";
import { canUserAddTransaction } from "../_data/can-user-add-transaction";
import { NavBar } from "../_components/navbar";
import { transactionsColumns } from "./_components/transactions-columns";

const TransactionsPage = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/login");
  }
  const transactions = await db.transaction.findMany({
    where: {
      userId,
    },
    orderBy: {
      date: "desc",
    },
  });
  const userCanAddTransaction = await canUserAddTransaction();
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <NavBar />
      <div className="flex flex-1 flex-col space-y-4 overflow-hidden p-4 md:space-y-6 md:p-6">
        <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-xl font-bold md:text-2xl">Transações</h1>
          <AddTransactionButton userCanAddTransaction={userCanAddTransaction} />
        </div>
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full w-full">
            <DataTable
              columns={transactionsColumns}
              data={JSON.parse(JSON.stringify(transactions))}
            />
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;
