import { BarraBusca } from "@/components/barraBusca";
import { FiltrosBiblioteca } from "@/components/filtrosBiblioteca";
import { CardConceito } from "@/components/cardConceito";

const conceitos = [
  {
    titulo: "Taxa Selic",
    categoria: "Economia",
    descricao:
      "Taxa básica de juros da economia brasileira, definida pelo Banco Central.",
    status: "Em revisão",
  },
  {
    titulo: "Inflação",
    categoria: "Economia",
    descricao:
      "Aumento generalizado e contínuo dos preços de bens e serviços.",
    status: "Dominado",
  },
  {
    titulo: "Política monetária",
    categoria: "Economia",
    descricao:
      "Conjunto de medidas utilizadas para controlar a moeda e os juros.",
    status: "Lacuna",
  },
  {
    titulo: "Gases de efeito estufa",
    categoria: "Meio ambiente",
    descricao:
      "Gases que contribuem para a retenção de calor na atmosfera.",
    status: "Em revisão",
  },
  {
    titulo: "Aquecimento global",
    categoria: "Meio ambiente",
    descricao:
      "Aumento da temperatura média do planeta causado principalmente pela emissão de gases.",
    status: "Dominado",
  },
  {
    titulo: "Aprendizado de máquina",
    categoria: "Tecnologia",
    descricao:
      "Área da inteligência artificial que permite que sistemas aprendam com dados.",
    status: "Em revisão",
  },
  {
    titulo: "Regulação de IA",
    categoria: "Tecnologia",
    descricao:
      "Conjunto de normas e diretrizes para o desenvolvimento e utilização da inteligência artificial.",
    status: "Lacuna",
  },
  {
    titulo: "Comércio internacional",
    categoria: "Economia",
    descricao:
      "Troca de bens, serviços e capitais entre diferentes países.",
    status: "Dominado",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#eef3f9] px-6 py-5">
      <div className="mx-auto w-full max-w-[1450px]">

        {/* Cabeçalho */}
        <section className="relative h-[115px]">
          <div className="relative z-10 max-w-[620px] pt-1">
            <h1 className="text-[32px] font-bold leading-[1.1] tracking-tight text-[#151b46]">
              Biblioteca de conceitos
            </h1>

            <p className="mt-2 text-[13px] leading-[18px] text-[#7b849b]">
              Navegue por todos os conceitos mapeados pela plataforma.
            </p>

            <p className="text-[13px] leading-[18px] text-[#7b849b]">
              Aprofunde seu conhecimento e acompanhe seu progresso em cada tema.
            </p>
          </div>

          <img
            src="/bibliotecaHero.png"
            alt=""
            className="pointer-events-none absolute right-0 top-[-8px] h-[145px] w-auto object-contain"
          />
        </section>

        {/* Busca */}
        <section className="mb-3 w-[55%]">
          <BarraBusca />
        </section>

        {/* Filtros */}
        <section className="mb-4">
          <FiltrosBiblioteca />
        </section>

        {/* Cards */}
        <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {conceitos.map((conceito) => (
            <CardConceito
              key={conceito.titulo}
              titulo={conceito.titulo}
              categoria={conceito.categoria}
              descricao={conceito.descricao}
              status={conceito.status}
            />
          ))}
        </section>
      </div>
    </main>
  );
}