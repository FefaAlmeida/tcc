"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ArrowLeft,
  Bell,
  Bookmark,
  Check,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  Clock3,
  Compass,
  GraduationCap,
  Home,
  Lightbulb,
  Link2,
  Newspaper,
  Search,
  Settings,
  Share2,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");

const demoEvent = {
  id: "demo-geleiras",
  title: "Estudo aponta aceleração do derretimento das geleiras no mundo",
  description:
    "Pesquisa internacional alerta que o derretimento das geleiras está acontecendo mais rápido do que o previsto, com impactos no clima e no aumento do nível do mar.",
  category: "Meio ambiente",
  publishedAt: "2026-10-01T12:00:00.000Z",
  imageUrl:
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=85",
  saved: false,
  sources: [
    { name: "BBC News", url: "https://www.bbc.com/news" },
    { name: "Reuters", url: "https://www.reuters.com/" },
    { name: "National Geographic", url: "https://www.nationalgeographic.com/" },
  ],
  summary: {
    paragraphs: [
      "Um novo estudo internacional mostrou que as geleiras do planeta estão derretendo mais rápido do que o estimado anteriormente. Esse processo é causado principalmente pelo aumento da temperatura global, resultado das emissões de gases de efeito estufa.",
      "O derretimento das geleiras contribui para o aumento do nível do mar, afeta ecossistemas litorâneos e milhões de pessoas ao redor do mundo. Além disso, influencia o clima global, já que as geleiras ajudam a regular a temperatura do planeta.",
    ],
    whyItMatters:
      "O derretimento das geleiras afeta o clima, a biodiversidade e a vida de milhões de pessoas. Entender esse tema ajuda a compreender melhor os debates sobre mudanças climáticas e suas consequências.",
  },
  concepts: [
    { id: "mudancas-climaticas", title: "Mudanças climáticas", status: "Em revisão", saved: false },
    { id: "gases-efeito-estufa", title: "Gases de efeito estufa", status: "Lacuna", saved: false },
    { id: "aquecimento-global", title: "Aquecimento global", status: "Dominado", saved: false },
    { id: "nivel-do-mar", title: "Nível do mar", status: "Em revisão", saved: false },
    { id: "calotas-polares", title: "Calotas polares", status: "Lacuna", saved: false },
  ],
  timeline: [
    {
      id: "2026",
      year: "2026 · Estudo mais recente",
      title: "Aceleração do derretimento das geleiras",
      detail: "Nova pesquisa aponta que o derretimento está mais rápido do que o previsto.",
      active: true,
    },
    {
      id: "2024",
      year: "2024",
      title: "Recorde de perda de gelo na Antártida",
      detail: "Dados mostram o menor nível de gelo registrado na região.",
    },
    {
      id: "2022",
      year: "2022",
      title: "Relatório da ONU sobre mudanças climáticas",
      detail: "Alerta para o impacto do derretimento das geleiras no nível do mar.",
    },
    {
      id: "2020",
      year: "2020",
      title: "Estudo já indicava aceleração",
      detail: "Pesquisadores apontavam sinais de aumento na taxa de derretimento.",
    },
  ],
};

async function requestApi(path, options = {}) {
  if (!API_BASE_URL) throw new Error("Configure NEXT_PUBLIC_API_URL para conectar ao backend.");

  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    ...options,
    headers: {
      Accept: "application/json",
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Erro na API (${response.status}).`);
  }

  return response.status === 204 ? null : response.json();
}

async function getEvento(eventId) {
  if (!API_BASE_URL) return { event: demoEvent, demo: true };
  const payload = await requestApi(`/events/${encodeURIComponent(eventId)}`);
  return { event: payload?.data ?? payload?.event ?? payload, demo: false };
}

function setEventoSalvo(eventId, saved) {
  return requestApi(`/events/${encodeURIComponent(eventId)}/saved`, {
    method: "PUT",
    body: JSON.stringify({ saved }),
  });
}

function setConceitoSalvo(conceptId, saved) {
  return requestApi(`/concepts/${encodeURIComponent(conceptId)}/saved`, {
    method: "PUT",
    body: JSON.stringify({ saved }),
  });
}

function formatarDataEvento(date) {
  if (!date) return "";
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return String(date);
  return new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(parsedDate);
}

const navigation = [
  { label: "Início", icon: Home },
  { label: "Explorar", icon: Compass },
  { label: "Revisões", icon: Clock3 },
  { label: "Meu conhecimento", icon: GraduationCap },
  { label: "Notícias", icon: Newspaper, active: true },
  { label: "Conexões", icon: Link2 },
  { label: "Aprendizado", icon: GraduationCap },
];

const conceptColors = [
  "bg-amber-400",
  "bg-rose-400",
  "bg-emerald-500",
  "bg-yellow-400",
  "bg-red-400",
];

export default function PaginaEvento() {
  const [event, setEvent] = useState(null);
  const [eventId, setEventId] = useState("demo-geleiras");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [demoMode, setDemoMode] = useState(false);
  const [saved, setSaved] = useState(false);
  const [savedConcepts, setSavedConcepts] = useState([]);
  const [pendingAction, setPendingAction] = useState(false);
  const [actionMessage, setActionMessage] = useState("");
  const [search, setSearch] = useState("");

  const loadEvent = useCallback(async (id) => {
    setLoading(true);
    setError("");

    try {
      const result = await getEvento(id);
      setEvent(result.event);
      setDemoMode(result.demo);
      setSaved(Boolean(result.event.saved));
      setSavedConcepts(
        (result.event.concepts ?? [])
          .filter((concept) => concept.saved)
          .map((concept) => concept.id),
      );
    } catch (loadError) {
      setError(loadError.message || "Não foi possível carregar o evento.");
      setEvent(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const id = new URLSearchParams(window.location.search).get("id") || "demo-geleiras";
    setEventId(id);
    loadEvent(id);
  }, [loadEvent]);

  async function toggleSaved() {
    const nextSaved = !saved;
    setPendingAction(true);
    setActionMessage("");

    try {
      if (!demoMode) await setEventoSalvo(eventId, nextSaved);
      setSaved(nextSaved);
      setActionMessage(
        demoMode
          ? "Demonstração: alteração válida apenas nesta sessão."
          : "Evento atualizado.",
      );
    } catch (actionError) {
      setActionMessage(actionError.message || "Não foi possível salvar o evento.");
    } finally {
      setPendingAction(false);
    }
  }

  async function toggleConcept(concept) {
    const nextSaved = !savedConcepts.includes(concept.id);
    setPendingAction(true);
    setActionMessage("");

    try {
      if (!demoMode) await setConceitoSalvo(concept.id, nextSaved);
      setSavedConcepts((current) =>
        nextSaved
          ? [...current, concept.id]
          : current.filter((id) => id !== concept.id),
      );
      setActionMessage(
        demoMode
          ? "Demonstração: alteração válida apenas nesta sessão."
          : "Conceito atualizado.",
      );
    } catch (actionError) {
      setActionMessage(actionError.message || "Não foi possível atualizar o conceito.");
    } finally {
      setPendingAction(false);
    }
  }

  async function shareEvent() {
    const shareData = {
      title: event.title,
      text: event.description,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.url);
        setActionMessage("Link do evento copiado.");
      }
    } catch (shareError) {
      if (shareError.name !== "AbortError") {
        setActionMessage("Não foi possível compartilhar o evento.");
      }
    }
  }

  if (loading) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f1f3f6] text-[#536071]">
        <p role="status">Carregando evento…</p>
      </main>
    );
  }

  if (error || !event) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#f1f3f6] px-5 text-center text-[#536071]">
        <div className="max-w-md rounded-lg border border-[#e4e7eb] bg-white p-6">
          <h1 className="text-lg font-semibold text-[#263246]">Não foi possível abrir o evento</h1>
          <p role="alert" className="mt-2 text-sm">{error || "Evento não encontrado."}</p>
          <Button onClick={() => loadEvent(eventId)} className="mt-4">Tentar novamente</Button>
        </div>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen bg-[#f1f3f6] text-[#202a3b]"
      style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
    >
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-[128px] flex-col bg-[#202d3a] px-2.5 py-5 text-white sm:flex lg:w-[220px] lg:px-4">
        <a href="#" className="mb-8 px-1 text-[20px] font-bold tracking-tight lg:text-[24px]">
          Wisen<span className="align-top text-[9px] text-[#f3d96b]">•</span>
        </a>

        <nav aria-label="Navegação principal" className="flex flex-col gap-1.5">
          {navigation.map(({ label, icon: Icon, active }) => (
            <a
              key={label}
              href="#"
              className={`flex h-10 items-center gap-2 rounded-md px-2 text-[10px] transition-colors lg:gap-3 lg:px-2.5 lg:text-[12px] ${
                active
                  ? "bg-[#fff2bc] font-semibold text-[#25303c]"
                  : "text-[#c5ced8] hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={17} strokeWidth={1.8} />
              <span>{label}</span>
            </a>
          ))}
        </nav>

        <a
          href="#"
          className="mt-auto flex h-10 items-center gap-2 rounded-md px-2 text-[10px] text-[#c5ced8] hover:bg-white/10 hover:text-white lg:gap-3 lg:px-2.5 lg:text-[12px]"
        >
          <Settings size={17} strokeWidth={1.8} />
          <span>Configurações</span>
        </a>
      </aside>

      <div className="min-h-screen sm:ml-[128px] lg:ml-[220px]">
        <header className="sticky top-0 z-10 flex h-[60px] items-center justify-between border-b border-[#e5e8ed] bg-[#f5f6f8]/95 px-4 backdrop-blur sm:px-5 lg:px-7">
          <div className="flex w-full max-w-[420px] items-center gap-2.5">
            <Search className="absolute ml-3 text-[#9099a6]" size={17} />
            <Input
              aria-label="Buscar"
              placeholder="Buscar por notícias, conceitos ou temas..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="h-10 border-[#e2e5e9] bg-white pl-10 text-[13px] shadow-none placeholder:text-[#9aa2ad]"
            />
            <kbd className="hidden shrink-0 rounded border border-[#e0e3e7] bg-white px-2 py-1.5 text-[10px] text-[#818a97] md:block">
              Ctrl K
            </kbd>
          </div>
          <div className="ml-4 flex shrink-0 items-center gap-3">
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Notificações"
              className="relative text-[#536071]"
            >
              <Bell size={19} />
              <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-[#e5c844]" />
            </Button>
            <button
              type="button"
              aria-label="Perfil de NB"
              className="grid size-9 place-items-center rounded-full bg-[#f1e7b9] text-[12px] font-semibold text-[#576071]"
            >
              NB
            </button>
          </div>
        </header>

        <div className="mx-auto grid max-w-[1330px] grid-cols-1 gap-5 px-4 py-5 sm:px-5 md:grid-cols-[minmax(0,1.85fr)_minmax(210px,0.95fr)] md:gap-4 lg:px-7 lg:py-6">
          {(demoMode || actionMessage) && (
            <div
              role="status"
              className="col-span-full rounded-md border border-[#e7dcaa] bg-[#fffbea] px-4 py-2 text-[12px] text-[#756522]"
            >
              {actionMessage || "Modo demonstração: configure NEXT_PUBLIC_API_URL para conectar ao backend."}
            </div>
          )}
          <section className="min-w-0">
            <div className="mb-3 flex items-center justify-between">
              <a
                href="#"
                className="inline-flex items-center gap-2 text-[13px] text-[#707b89] hover:text-[#263448]"
              >
                <ArrowLeft size={16} />
                Voltar para notícias
              </a>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleSaved}
                  disabled={pendingAction}
                  className={`h-9 gap-2 px-3 text-[13px] ${
                    saved ? "text-[#ad8e19]" : "text-[#5e6876]"
                  }`}
                >
                  {saved ? <Check size={16} /> : <Bookmark size={16} />}
                  {saved ? "Salvo" : "Salvar"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={shareEvent}
                  className="h-9 gap-2 px-3 text-[13px] text-[#5e6876]"
                >
                  <Share2 size={16} />
                  Compartilhar
                </Button>
              </div>
            </div>

            <article className="overflow-hidden rounded-lg border border-[#e4e7eb] bg-white shadow-[0_2px_8px_rgba(30,42,56,0.025)]">
              <div className="relative h-[190px] overflow-hidden bg-[#8b9da6] md:h-[170px] lg:h-[210px]">
                <div
                  role="img"
                  aria-label="Geleira e montanhas cobertas de neve ao amanhecer"
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      `linear-gradient(180deg,rgba(18,35,48,.03) 45%,rgba(18,35,48,.48) 100%),url('${event.imageUrl || ""}')`,
                  }}
                />
                <div className="absolute bottom-3 left-4 flex items-center gap-1.5 rounded-full bg-[#263c4dcc] px-3 py-1.5 text-[11px] text-white">
                  <Sparkles size={13} />
                  {event.category}
                </div>
                <span className="absolute bottom-3 right-4 rounded-full bg-[#263c4dcc] px-3 py-1.5 text-[11px] text-white">
                  {formatarDataEvento(event.publishedAt)}
                </span>
              </div>

              <div className="px-5 pb-5 pt-4 sm:px-6">
                <h1 className="max-w-[720px] text-[25px] leading-[1.16] font-bold tracking-[-0.04em] text-[#172338] sm:text-[30px]">
                  {event.title}
                </h1>
                <p className="mt-2 max-w-[720px] text-[14px] leading-[1.55] text-[#687382]">
                  {event.description}
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] text-[#75808c]">
                  <span className="mr-0.5">Fontes originais:</span>
                  {(event.sources ?? []).map((source, index) => (
                    <span
                      key={`${source.name}-${index}`}
                      className="inline-flex min-h-8 items-center gap-1.5 rounded-full border border-[#e9ebed] px-2.5 py-1.5"
                    >
                      <span className={`size-2.5 rounded-[3px] ${["bg-[#c43a3a]", "bg-[#e79d57]", "bg-[#e4c840]"][index % 3]}`} />
                      {source.url ? (
                        <a href={source.url} target="_blank" rel="noreferrer" className="hover:underline">
                          {source.name}
                        </a>
                      ) : source.name}
                      <ChevronRight size={12} />
                    </span>
                  ))}
                </div>
              </div>
            </article>

            <section className="relative mt-4 rounded-lg border border-[#e4e7eb] bg-white px-5 py-5 sm:px-6">
              <div className="flex items-center justify-between gap-3">
                <h2 className="flex items-center gap-2.5 text-[16px] font-semibold text-[#263246]">
                  <Sparkles size={18} className="text-[#dbbd43]" />
                  Resumo para você
                </h2>
                <span className="hidden text-[11px] text-[#9099a3] sm:inline">
                  Adaptado ao seu nível de conhecimento
                </span>
              </div>

              {(event.summary?.paragraphs ?? []).map((paragraph, index) => (
                <p key={index} className="mt-3 text-[14px] leading-[1.65] text-[#697482]">
                  {paragraph}
                </p>
              ))}

              <Separator className="my-4 bg-[#edf0f2]" />

              <div className="flex gap-3">
                <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-[#fff8d9] text-[#d7b92e]">
                  <Lightbulb size={17} />
                </div>
                <div>
                  <h3 className="text-[13px] font-semibold text-[#384354]">
                    Por que isso importa?
                  </h3>
                  <p className="mt-1 text-[13px] leading-[1.55] text-[#7b8490]">
                    {event.summary?.whyItMatters}
                  </p>
                </div>
              </div>

            </section>
          </section>

          <aside className="flex min-w-0 flex-col gap-4">
            <section className="rounded-lg border border-[#e4e7eb] bg-white p-4">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-[15px] font-semibold text-[#303b4c]">
                  Conceitos relacionados
                </h2>
                <CircleHelp size={15} className="text-[#a0a8b1]" />
              </div>
              <div className="flex flex-col">
                {(event.concepts ?? []).map((concept, index) => {
                  const isSaved = savedConcepts.includes(concept.id);
                  const color = conceptColors[index % conceptColors.length];

                  return (
                    <div
                      key={concept.id}
                      className="flex min-h-[48px] items-center gap-2.5 border-b border-[#f0f1f3] last:border-0"
                    >
                      <span className={`size-2 shrink-0 rounded-full ${color}`} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[12px] font-medium text-[#3e4858]">
                          {concept.title}
                        </p>
                        <p className="text-[11px] leading-4 text-[#929aa4]">
                          {concept.status}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleConcept(concept)}
                        disabled={pendingAction}
                        aria-label={`${isSaved ? "Remover" : "Adicionar"} ${concept.title} ${
                          isSaved ? "dos salvos" : "aos salvos"
                        }`}
                        className={`inline-flex h-7 shrink-0 items-center gap-1.5 rounded-full border px-2 text-[10px] transition-colors ${
                          isSaved
                            ? "border-[#e5d78c] bg-[#fff9df] text-[#8d7414]"
                            : "border-[#e7e9ec] text-[#727c89] hover:bg-[#f7f8f9]"
                        }`}
                      >
                        {isSaved ? <Check size={12} /> : <Bookmark size={12} />}
                        {isSaved ? "Salvo" : "Revisar"}
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleConcept(concept)}
                        disabled={pendingAction}
                        aria-label={`Salvar conceito: ${concept.title}`}
                        className="grid size-8 shrink-0 place-items-center text-[#a0a8b1] hover:text-[#8d7414]"
                      >
                        {isSaved ? (
                          <Check size={15} className="text-[#ad8e19]" />
                        ) : (
                          <Bookmark size={15} />
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="rounded-lg border border-[#e4e7eb] bg-white p-4">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-[15px] font-semibold text-[#303b4c]">
                  Linha do tempo do evento
                </h2>
                <ChevronDown size={16} className="text-[#8d96a1]" />
              </div>
              <div className="relative ml-1.5">
                <span className="absolute bottom-2 left-[3px] top-2 w-px bg-[#e6e9ec]" />
                {(event.timeline ?? []).map((item) => (
                  <article
                    key={item.year}
                    className="relative flex gap-3 pb-4 last:pb-0"
                  >
                    <span
                      className={`relative z-[1] mt-1 size-[7px] shrink-0 rounded-full border-2 border-white ${
                        item.active ? "bg-[#d7bd46]" : "bg-[#9ca5af]"
                      }`}
                    />
                    <div className="min-w-0">
                      <p
                        className={`text-[11px] ${
                          item.active
                            ? "font-medium text-[#a68e24]"
                            : "text-[#858e99]"
                        }`}
                      >
                        {item.year}
                      </p>
                      <h3 className="mt-1 text-[12px] leading-[1.4] font-semibold text-[#424d5c]">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-[11px] leading-[1.45] text-[#858e99]">
                        {item.detail}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </aside>
        </div>

        {search && (
          <div className="fixed inset-x-4 top-[68px] z-30 mx-auto flex max-w-[420px] items-center justify-between rounded-md border border-[#e2e5e9] bg-white px-4 py-3 text-[13px] text-[#687382] shadow-md sm:left-[calc(50%+64px)] sm:right-auto sm:-translate-x-1/2 lg:left-[calc(50%+110px)]">
            <span>
              Buscando por <strong className="text-[#303b4c]">{search}</strong>
            </span>
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Limpar busca"
              className="ml-3 text-[#9099a3] hover:text-[#303b4c]"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}