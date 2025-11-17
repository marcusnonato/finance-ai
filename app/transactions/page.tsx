import { DataTable } from "../_components/ui/data-table";
import { db } from "../_lib/prisma";
import { transactionsColumns } from "./_components/transactions-columns";
import AddTransactionButton from "../_components/add-transaction-button";
import { NavBar } from "../_components/navbar";

async function TransactionsPage() {
  const transactions = await db.transaction.findMany({});

  return (
    <>
      <NavBar />
      <div className="space-y-6 p-6">
        <div className="flex w-full items-center justify-between">
          <h1 className="text-2xl font-bold">Transaçôes</h1>
          <AddTransactionButton />
        </div>
        <DataTable columns={transactionsColumns} data={transactions} />
      </div>
    </>
  );
}

export default TransactionsPage;
