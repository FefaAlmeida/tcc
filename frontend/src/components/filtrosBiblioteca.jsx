import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function FiltrosBiblioteca() {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          className="h-7 rounded-full bg-slate-900 px-3 text-[10px] hover:bg-slate-800"
        >
          Todos (124)
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="h-7 rounded-full border-slate-200 px-3 text-[10px] text-slate-600"
        >
          <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-red-400" />
          Minhas lacunas (28)
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="h-7 rounded-full border-slate-200 px-3 text-[10px] text-slate-600"
        >
          <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-amber-400" />
          Em revisão (36)
        </Button>

        <Button
          variant="outline"
          size="sm"
          className="h-7 rounded-full border-slate-200 px-3 text-[10px] text-slate-600"
        >
          <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Dominado (60)
        </Button>
      </div>

      <Select defaultValue="relevantes">
        <SelectTrigger className="h-7 w-[140px] rounded-md border-slate-200 bg-white text-[10px] text-slate-600">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="relevantes">Mais relevantes</SelectItem>
          <SelectItem value="recentes">Mais recentes</SelectItem>
          <SelectItem value="alfabetica">
            Ordem alfabética
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}