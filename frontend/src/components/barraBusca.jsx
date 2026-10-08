import { Input } from "@/components/ui/input";

export function BarraBusca() {
  return (
    <div className="w-full">
      <Input
        type="search"
        placeholder="Buscar termo ou conceito..."
        className="h-11 w-full"
      />
    </div>
  );
}