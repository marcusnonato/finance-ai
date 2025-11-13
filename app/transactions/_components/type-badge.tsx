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
      <Badge className="bg-muted/10 text-primary hover:bg-muted/10 font-bold">
        <CircleIcon className="fill-primary mr-2" size={10} />
        Depósito
      </Badge>
    );
  }
  if (transaction.type === TransactionType.EXPENSE) {
    return (
      <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/10 font-bold">
        <CircleIcon className="fill-destructive mr-2" size={10} />
        Despesa
      </Badge>
    );
  }
  return (
    <Badge className="bg-white/10 font-bold text-white hover:bg-white/10">
      <CircleIcon className="fill-destructive mr-2" size={10} />
      Investimento
    </Badge>
  );
}
