import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const imagens = {
  "Taxa Selic":
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
  Inflação:
    "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80",
  "Política monetária":
    "https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=800&q=80",
  "Gases de efeito estufa":
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
  "Aquecimento global":
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80",
  "Aprendizado de máquina":
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  "Regulação de IA":
    "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=800&q=80",
  "Comércio internacional":
    "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?auto=format&fit=crop&w=800&q=80",
};

const progresso = {
  "Taxa Selic": 60,
  Inflação: 85,
  "Política monetária": 25,
  "Gases de efeito estufa": 55,
  "Aquecimento global": 90,
  "Aprendizado de máquina": 65,
  "Regulação de IA": 30,
  "Comércio internacional": 80,
};

function getStatusStyles(status) {
  if (status === "Dominado") {
    return {
      badge: "border-emerald-200 bg-white text-slate-700",
      ponto: "bg-emerald-500",
      porcentagem: "text-emerald-600",
      barra: "bg-emerald-500",
    };
  }

  if (status === "Lacuna") {
    return {
      badge: "border-red-200 bg-white text-slate-700",
      ponto: "bg-red-500",
      porcentagem: "text-red-500",
      barra: "bg-red-500",
    };
  }

  return {
    badge: "border-amber-200 bg-white text-slate-700",
    ponto: "bg-amber-400",
    porcentagem: "text-amber-500",
    barra: "bg-amber-400",
  };
}

export function CardConceito({
  titulo,
  categoria,
  descricao,
  status,
}) {
  const percentual = progresso[titulo] ?? 0;
  const estilos = getStatusStyles(status);

  return (
    <Card className="overflow-hidden rounded-lg border border-slate-200 bg-white p-0 shadow-sm">
      {/* Imagem — mantida no tamanho original */}
      <div className="relative h-36 w-full overflow-hidden">
        <img
          src={imagens[titulo]}
          alt={titulo}
          className="h-full w-full object-cover"
        />

        <Badge
          className={`absolute left-3 top-3 rounded-full border px-2 py-0.5 text-[9px] font-medium shadow-sm ${estilos.badge}`}
        >
          <span
            className={`mr-1.5 h-1.5 w-1.5 rounded-full ${estilos.ponto}`}
          />
          {status}
        </Badge>
      </div>

      {/* Conteúdo compacto */}
      <CardContent className="p-3">
        <h3 className="text-[14px] font-semibold leading-5 text-[#17245c]">
          {titulo}
        </h3>

        <p className="mt-1 text-[10px] leading-[14px] text-slate-500">
          {descricao}
        </p>

        <div className="mt-3">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[9px] text-slate-500">
              Seu nível de domínio
            </span>

            <span
              className={`text-[10px] font-semibold ${estilos.porcentagem}`}
            >
              {percentual}%
            </span>
          </div>

          <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full ${estilos.barra}`}
              style={{ width: `${percentual}%` }}
            />
          </div>
        </div>

        <div className="mt-2.5 flex items-center gap-1.5 text-[9px] text-slate-400">
          <span className="relative flex h-3 w-3 items-center justify-center rounded-full border border-slate-400">
            <span className="absolute h-[1px] w-1 bg-slate-400" />
            <span className="absolute h-1 w-[1px] bg-slate-400" />
          </span>

          <span>Última revisão: há 2 dias</span>
        </div>
      </CardContent>
    </Card>
  );
}