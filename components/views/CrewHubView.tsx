'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, RefreshCw, UserPlus } from 'lucide-react';

export default function CrewHubView() {
  const [load, setLoad] = useState<number>(72);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Operational load simulation
    const loadInterval = setInterval(() => {
      setLoad((prevLoad) => {
        const drift = (Math.random() - 0.5) * 2;
        const nextLoad = prevLoad + drift;
        return Math.min(Math.max(nextLoad, 68), 75);
      });
    }, 5000);

    // 2. Micro-interaction: Randomly flicker some data points for "live" feel
    const flickerInterval = setInterval(() => {
      if (!containerRef.current) return;
      const dataSmElements = containerRef.current.querySelectorAll('.flicker-data');
      if (dataSmElements.length === 0) return;

      const target = dataSmElements[Math.floor(Math.random() * dataSmElements.length)];
      target.classList.add('opacity-50');
      setTimeout(() => {
        target.classList.remove('opacity-50');
      }, 150);
    }, 3000);

    return () => {
      clearInterval(loadInterval);
      clearInterval(flickerInterval);
    };
  }, []);

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-12 gap-6">
      {/* Operational Capacity Header */}
      <section className="md:col-span-12 structural-card p-6 relative overflow-hidden rounded-lg">
        <div className="scanline"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <span className="font-mono text-xs font-bold text-[#a98a7d] uppercase tracking-wider">
              Operational Capacity Header
            </span>
            <div className="mt-2 flex flex-col md:flex-row gap-6 items-baseline">
              <div className="flex flex-col">
                <span className="font-mono text-xs text-[#e2bfb0] flicker-data transition-opacity duration-150">
                  TOTAL_CREW_NODES
                </span>
                <span className="text-4xl font-extrabold text-[#ff6b00] leading-none mt-1">
                  08
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-xs text-[#e2bfb0] flicker-data transition-opacity duration-150">
                  CURRENT_LOAD
                </span>
                <span className="text-4xl font-extrabold text-[#e3e2e7] leading-none mt-1">
                  {Math.round(load)}%
                </span>
              </div>
            </div>
          </div>
          <div className="w-full md:w-64 h-8 bg-[#1a1b1f] border border-[#5a4136] relative rounded overflow-hidden">
            <div
              className="stepped-progress h-full transition-all duration-500 ease-out"
              style={{ width: `${load}%` }}
            ></div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-[#5a4136] pt-4">
          <div className="flex flex-col">
            <span className="font-mono text-xs font-bold text-[#a98a7d]">RESONANCE_SYS</span>
            <span className="font-mono text-base font-medium text-[#e3e2e7] mt-1">STABLE</span>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-xs font-bold text-[#a98a7d]">SYNC_THRESHOLD</span>
            <span className="font-mono text-base font-medium text-[#e3e2e7] mt-1">0.992</span>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-xs font-bold text-[#a98a7d]">UPTIME_INDEX</span>
            <span className="font-mono text-base font-medium text-[#e3e2e7] mt-1">99.98%</span>
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-xs font-bold text-[#a98a7d]">UPSTREAM_LATENCY</span>
            <span className="font-mono text-base font-medium text-[#e3e2e7] mt-1">14ms</span>
          </div>
        </div>
      </section>

      {/* Personnel Grid */}
      <section className="md:col-span-8 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="font-mono text-xs font-bold text-[#ffb693] tracking-widest">
            PERSONNEL_GRID_024
          </h2>
          <span className="font-mono text-xs text-[#e2bfb0] opacity-50">
            REF_ID: 8820-X
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Operator Card 1 */}
          <div className="structural-card p-4 status-strip-active flex flex-col gap-3 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-mono text-xs font-bold text-[#a98a7d]">OPERATOR_ID</span>
                <p className="font-mono text-lg font-bold text-[#e3e2e7]">R_MCKEAN</p>
              </div>
              <span className="bg-[#7a92ff] text-[#00248a] text-[10px] px-1.5 py-0.5 font-bold font-mono rounded">
                ACTIVE
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col">
                <span className="font-mono text-xs font-bold text-[#a98a7d]">RESONANCE</span>
                <span className="font-mono text-xs text-[#e3e2e7] flicker-data">1.414</span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-xs font-bold text-[#a98a7d]">ASSIGNMENT</span>
                <span className="font-mono text-xs text-[#e3e2e7] flicker-data">NODE_H4</span>
              </div>
            </div>
            <div className="h-1 bg-[#343539] w-full rounded overflow-hidden">
              <div className="h-full w-full bg-[#b8c3ff]"></div>
            </div>
          </div>

          {/* Operator Card 2 */}
          <div className="structural-card p-4 status-strip-active flex flex-col gap-3 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-mono text-xs font-bold text-[#a98a7d]">OPERATOR_ID</span>
                <p className="font-mono text-lg font-bold text-[#e3e2e7]">V_GIBBS</p>
              </div>
              <span className="bg-[#7a92ff] text-[#00248a] text-[10px] px-1.5 py-0.5 font-bold font-mono rounded">
                ACTIVE
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col">
                <span className="font-mono text-xs font-bold text-[#a98a7d]">RESONANCE</span>
                <span className="font-mono text-xs text-[#e3e2e7] flicker-data">1.414</span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-xs font-bold text-[#a98a7d]">ASSIGNMENT</span>
                <span className="font-mono text-xs text-[#e3e2e7] flicker-data">SECTOR_5</span>
              </div>
            </div>
            <div className="h-1 bg-[#343539] w-full rounded overflow-hidden">
              <div className="h-full w-[92%] bg-[#b8c3ff]"></div>
            </div>
          </div>

          {/* Operator Card 3 */}
          <div className="structural-card p-4 status-strip-standby flex flex-col gap-3 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-mono text-xs font-bold text-[#a98a7d]">OPERATOR_ID</span>
                <p className="font-mono text-lg font-bold text-[#e3e2e7]">M_ARIS</p>
              </div>
              <span className="bg-[#5a4136] text-[#e3e2e7] text-[10px] px-1.5 py-0.5 font-bold font-mono rounded">
                STANDBY
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col">
                <span className="font-mono text-xs font-bold text-[#a98a7d]">RESONANCE</span>
                <span className="font-mono text-xs text-[#e3e2e7] flicker-data">1.414</span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-xs font-bold text-[#a98a7d]">ASSIGNMENT</span>
                <span className="font-mono text-xs text-[#e3e2e7] flicker-data">QUEUE</span>
              </div>
            </div>
            <div className="h-1 bg-[#343539] w-full rounded overflow-hidden">
              <div className="h-full w-[10%] bg-[#ffb693]"></div>
            </div>
          </div>

          {/* Operator Card 4 */}
          <div className="structural-card p-4 status-strip-pending flex flex-col gap-3 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-mono text-xs font-bold text-[#a98a7d]">OPERATOR_ID</span>
                <p className="font-mono text-lg font-bold text-[#e3e2e7]">J_WOLFE</p>
              </div>
              <span className="bg-[#93000a] text-[#ffdad6] text-[10px] px-1.5 py-0.5 font-bold font-mono rounded animate-pulse">
                SYNC_PENDING
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col">
                <span className="font-mono text-xs font-bold text-[#a98a7d]">RESONANCE</span>
                <span className="font-mono text-xs text-[#e3e2e7] flicker-data">0.812</span>
              </div>
              <div className="flex flex-col">
                <span className="font-mono text-xs font-bold text-[#a98a7d]">ASSIGNMENT</span>
                <span className="font-mono text-xs text-[#e3e2e7] flicker-data">INGRESS_1</span>
              </div>
            </div>
            <div className="h-1 bg-[#343539] w-full rounded overflow-hidden">
              <div className="h-full w-[45%] bg-[#ffb4ab]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Sidebar Section: Node Map/List & Quick Actions */}
      <aside className="md:col-span-4 flex flex-col gap-6">
        {/* Quick Actions */}
        <section className="flex flex-col gap-4">
          <h2 className="font-mono text-xs font-bold text-[#ffb693] tracking-widest">
            COMMAND_EXECUTABLES
          </h2>
          <div className="flex flex-col gap-2">
            <button className="bg-[#ff6b00] text-[#561f00] font-mono text-xs font-bold py-3 px-4 flex items-center justify-between active:scale-95 transition-all rounded">
              <span>DISPATCH_PING</span>
              <Send className="h-4.5 w-4.5" />
            </button>
            <button className="border-2 border-[#5a4136] text-[#e3e2e7] font-mono text-xs font-bold py-3 px-4 flex items-center justify-between hover:border-[#ff6b00] active:scale-95 transition-colors rounded">
              <span>SYNC_ALL_NODES</span>
              <RefreshCw className="h-4.5 w-4.5" />
            </button>
            <button className="border-2 border-[#5a4136] text-[#e3e2e7] font-mono text-xs font-bold py-3 px-4 flex items-center justify-between hover:border-[#ff6b00] active:scale-95 transition-colors rounded">
              <span>ADD_AUXILIARY</span>
              <UserPlus className="h-4.5 w-4.5" />
            </button>
          </div>
        </section>

        {/* Node Map/List */}
        <section className="flex flex-col gap-4">
          <h2 className="font-mono text-xs font-bold text-[#ffb693] tracking-widest">
            FIELD_NODE_STATUS
          </h2>
          <div className="structural-card overflow-hidden rounded-lg">
            <div className="h-48 relative bg-[#121317] group">
              <div
                className="absolute inset-0 opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700 bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDvROXvCt8nKAIw_Y2XVaeH48UH18jEA5UKDr0GmfDvMJCxIzfQk2_z_DWNWKmmOHMPYBZn5zU1CxvjfEth7l46PxpPG76SFAT5xYLT0soy271LFk4drtZRjeIGkK7eZn9CBaeNbP4rDJlOGzmDHgNazyhGOwHlRyYHPxvrCkVBd7FULr5x8y-jizwu7idaio0ly2TtqXeEiJ1j-TpsoEOq0OdX9mvmPxkKD74BSehjwKVziZsIyLvF')`,
                }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="border border-[#ff6b00]/50 w-32 h-32 rounded-full animate-ping"></div>
              </div>
              <div className="absolute bottom-2 left-2 bg-[#121317]/80 p-1.5 rounded">
                <span className="font-mono text-[10px] text-[#ffb693]">
                  MAP_COORD: 45.322 // -122.901
                </span>
              </div>
            </div>
            <div className="p-4 flex flex-col gap-2 divide-y divide-[#5a4136]">
              <div className="py-2 flex justify-between items-center first:pt-0">
                <span className="font-mono text-xs text-[#e3e2e7]">McKean Road Hub</span>
                <span className="font-mono text-xs font-bold text-[#b8c3ff]">STABLE</span>
              </div>
              <div className="py-2 flex justify-between items-center">
                <span className="font-mono text-xs text-[#e3e2e7]">Sector 5 Ingress</span>
                <span className="font-mono text-xs font-bold text-[#b8c3ff]">STABLE</span>
              </div>
              <div className="py-2 flex justify-between items-center last:pb-0">
                <span className="font-mono text-xs text-[#ffb4ab]">North Gateway</span>
                <span className="font-mono text-xs font-bold text-[#ffb4ab]">CONGESTED</span>
              </div>
            </div>
          </div>
        </section>
      </aside>
    </div>
  );
}
