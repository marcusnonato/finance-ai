import { Button } from "@/app/_components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import { BotIcon } from "lucide-react";

export function AiReportButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="font-bold" disabled variant="ghost">
          Relatório IA
          <BotIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Relatório IA</DialogTitle>
          <DialogDescription>
            Use inteligência artificial para gerar relatórios financeiros
            detalhados.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"ghost"}>Cancelar</Button>
          </DialogClose>
          <Button>Gerar Relatório</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
