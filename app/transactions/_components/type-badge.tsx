import { Badge } from "@/app/_components/ui/badge";
import { Transaction, TransactionType } from "@prisma/client";
import { CircleIcon } from "lucide-react";

interface TransactionTypeBadgeProps {
  transaction: Transaction;
}

export function TransactionTypeBadge({
  transaction,
}: TransactionTypeBadgeProps) {
  if (transaction.type === TransactionType.DEPOSIT) {
    return (
      <Badge className="text-primary hover:bg-muted/10 w-32 bg-green-800/15 px-4 py-2 font-bold">
        <CircleIcon className="fill-primary mr-2" size={10} />
        Depósito
      </Badge>
    );
  }
  if (transaction.type === TransactionType.EXPENSE) {
    return (
      <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/10 w-32 px-4 py-2 font-bold">
        <CircleIcon className="fill-destructive mr-2" size={10} />
        Despesa
      </Badge>
    );
  }
  return (
    <Badge className="w-32 bg-white/10 px-4 py-2 font-bold text-white hover:bg-white/10">
      <CircleIcon className="mr-2 fill-blue-700" size={10} />
      Investimento
    </Badge>
  );
}
