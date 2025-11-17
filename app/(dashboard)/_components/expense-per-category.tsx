import { CardContent, CardHeader, CardTitle } from "@/app/_components/ui/card";
import { Progress } from "@/app/_components/ui/progress";
import { ScrollArea } from "@/app/_components/ui/scroll-area";
import { Separator } from "@/app/_components/ui/separator";
import { TRANSACTION_CATEGORY_LABELS } from "@/app/_constants/transaction";
import { TotalExpensePerCategory } from "@/app/_data/get-dashboard/types";
import { formatCurrency } from "@/app/_utils/currency";

interface ExpensesPerCategoryProps {
  expensesPerCategory: TotalExpensePerCategory[];
}

const ExpensesPerCategory = ({
  expensesPerCategory,
}: ExpensesPerCategoryProps) => {
  return (
    <ScrollArea className="col-span-2 h-full rounded-md border px-1 py-6">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Gastos por Categoria
        </CardTitle>
        <Separator className="mb-4" />
      </CardHeader>

      <CardContent className="space-y-6">
        {expensesPerCategory.map((category) => (
          <div key={category.category} className="space-y-2">
            <div className="flex w-full justify-between">
              <p className="text-sm font-bold">
                {TRANSACTION_CATEGORY_LABELS[category.category]}
              </p>
              <p className="text-sm font-bold">{category.percentageOfTotal}%</p>
            </div>
            <Progress value={category.percentageOfTotal} />
            <p>{formatCurrency(category.totalAmount)}</p>
          </div>
        ))}
      </CardContent>
    </ScrollArea>
  );
};

export default ExpensesPerCategory;
