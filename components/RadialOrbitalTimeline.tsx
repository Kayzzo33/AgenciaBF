import React, { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap, Target, TrendingUp, Search, Rocket } from "lucide-react";
import { Badge } from "./ui/Badge";
import { Button } from "./ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

const timelineData: TimelineItem[] = [
  {
    id: 1,
    title: "Estratégia",
    date: "Fase 1",
    content: "Análise profunda do seu negócio e definição de KPIs.",
    category: "Planning",
    icon: Target,
    relatedIds: [2],
    status: "completed",
    energy: 100,
  },
  {
    id: 2,
    title: "Implementação",
    date: "Fase 2",
    content: "Configuração avançada de campanhas e pixel tracking.",
    category: "Design",
    icon: Zap,
    relatedIds: [1, 3],
    status: "completed",
    energy: 90,
  },
  {
    id: 3,
    title: "Otimização",
    date: "Fase 3",
    content: "Monitoramento diário e ajuste de criativos.",
    category: "Development",
    icon: TrendingUp,
    relatedIds: [2, 4],
    status: "in-progress",
    energy: 80,
  },
  {
    id: 4,
    title: "Análise",
    date: "Fase 4",
    content: "Relatórios de dados precisos para tomada de decisão.",
    category: "Testing",
    icon: Search,
    relatedIds: [3, 5],
    status: "pending",
    energy: 60,
  },
  {
    id: 5,
    title: "Escala",
    date: "Fase 5",
    content: "Aumento exponencial de investimento e retorno.",
    category: "Release",
    icon: Rocket,
    relatedIds: [4],
    status: "pending",
    energy: 40,
  },
];

export default function RadialOrbitalTimeline() {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const [viewMode, setViewMode] = useState<"orbital">("orbital");
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset, setCenterOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const currentItem = timelineData.find((item) => item.id === id);
        const relatedItems = currentItem ? currentItem.relatedIds : [];
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: number | undefined;

    if (autoRotate && viewMode === "orbital") {
      rotationTimer = window.setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.2) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer !== undefined) {
        window.clearInterval(rotationTimer);
      }
    };
  }, [autoRotate, viewMode]);

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 140 : 220;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian) + centerOffset.x;
    const y = radius * Math.sin(radian) + centerOffset.y;

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(0.6, Math.min(1, 0.6 + 0.4 * ((1 + Math.sin(radian)) / 2)));

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  return (
    <div
      className="w-full h-[600px] md:h-[700px] flex flex-col items-center justify-center bg-white overflow-hidden relative"
      ref={containerRef}
      onClick={handleContainerClick}
    >
      {/* Background Grid subtle */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]" 
         style={{ 
           backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
           backgroundSize: '40px 40px' 
         }}
      ></div>

      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center transition-transform duration-700 ease-out"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          {/* Center Core */}
          <div className="absolute w-20 h-20 rounded-full bg-brand-yellow animate-pulse flex items-center justify-center z-10 shadow-[0_0_40px_rgba(255,193,7,0.4)]">
            <div className="absolute w-24 h-24 rounded-full border border-black/10 animate-ping opacity-70"></div>
            <div className="absolute w-32 h-32 rounded-full border border-black/5 animate-ping opacity-50" style={{ animationDelay: "0.5s" }}></div>
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
               <div className="w-6 h-6 bg-black rounded-full"></div>
            </div>
          </div>

          {/* Orbit Rings */}
          <div className="absolute w-[280px] h-[280px] md:w-[440px] md:h-[440px] rounded-full border border-black/5"></div>
          <div className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full border border-black/5 opacity-50"></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => { nodeRefs.current[item.id] = el; }}
                className="absolute transition-all duration-700 cursor-pointer"
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                {/* Pulse Effect Ring */}
                <div
                  className={`absolute rounded-full -inset-2 ${isPulsing ? "animate-pulse duration-1000" : ""}`}
                  style={{
                    background: `radial-gradient(circle, rgba(255,193,7,0.4) 0%, rgba(255,193,7,0) 70%)`,
                    width: `${item.energy * 0.8 + 50}px`,
                    height: `${item.energy * 0.8 + 50}px`,
                    left: `-${(item.energy * 0.8 + 50 - 56) / 2}px`,
                    top: `-${(item.energy * 0.8 + 50 - 56) / 2}px`,
                    opacity: 0.6,
                  }}
                ></div>

                {/* Node Icon Circle */}
                <div
                  className={`
                  w-14 h-14 rounded-full flex items-center justify-center
                  ${isExpanded ? "bg-black text-brand-yellow" : isRelated ? "bg-white text-black border-brand-yellow" : "bg-white text-zinc-800"}
                  border-2 
                  ${isExpanded ? "border-brand-yellow shadow-[0_0_20px_rgba(0,0,0,0.3)]" : isRelated ? "border-brand-yellow shadow-[0_0_10px_rgba(255,193,7,0.5)]" : "border-zinc-200 shadow-lg"}
                  transition-all duration-300 transform
                  ${isExpanded ? "scale-125" : "hover:scale-110"}
                `}
                >
                  <Icon size={24} />
                </div>

                {/* Label (visible when not expanded) */}
                <div className={`
                  absolute top-16 left-1/2 -translate-x-1/2 whitespace-nowrap
                  text-xs md:text-sm font-bold tracking-wide
                  transition-all duration-300 bg-white/80 px-2 py-1 rounded-full backdrop-blur-sm
                  ${isExpanded ? "opacity-0 scale-0" : "opacity-100 text-zinc-800"}
                `}>
                  {item.title}
                </div>

                {/* Expanded Content Card */}
                {isExpanded && (
                  <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-72 bg-white/95 backdrop-blur-xl border-zinc-200 shadow-2xl animate-[fadeIn_0.3s_ease-out] z-[300]">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-black/20"></div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <Badge variant="secondary" className="px-2 text-[10px] uppercase tracking-wider">
                          {item.status === "completed" ? "Ativo" : "Em Progresso"}
                        </Badge>
                        <span className="text-xs font-mono text-zinc-400">{item.date}</span>
                      </div>
                      <CardTitle className="text-lg mt-2 font-heading font-bold">{item.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-zinc-600">
                      <p className="mb-4 font-medium">{item.content}</p>

                      <div className="pt-3 border-t border-zinc-100">
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="flex items-center font-bold text-zinc-800">
                            <Zap size={12} className="mr-1 text-brand-yellow fill-brand-yellow" />
                            Impacto
                          </span>
                          <span className="font-mono font-bold">{item.energy}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-brand-yellow"
                            style={{ width: `${item.energy}%` }}
                          ></div>
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-zinc-100">
                          <div className="flex items-center mb-2">
                            <Link size={12} className="text-zinc-400 mr-1" />
                            <h4 className="text-[10px] uppercase tracking-wider font-bold text-zinc-500">Conectado com</h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find((i) => i.id === relatedId);
                              return (
                                <Button
                                  key={relatedId}
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 px-2 text-xs bg-zinc-50 hover:bg-zinc-100 text-zinc-700"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title} <ArrowRight size={8} className="ml-1" />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      <div className="absolute bottom-4 md:bottom-8 text-center pointer-events-none">
        <p className="text-xs md:text-sm text-zinc-400 font-medium uppercase tracking-widest animate-pulse">
           Clique nos ícones para explorar
        </p>
      </div>
    </div>
  );
}