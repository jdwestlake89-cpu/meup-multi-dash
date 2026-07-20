'use client';

import { useState, useEffect } from 'react';
import { Globe, Clock } from 'lucide-react';

interface TimeZoneDisplay {
  name: string;
  label: string;
  offset: string;
}

const TIME_ZONES: TimeZoneDisplay[] = [
  { name: 'America/New_York', label: 'Eastern', offset: 'EST/EDT' },
  { name: 'America/Chicago', label: 'Central', offset: 'CST/CDT' },
  { name: 'America/Denver', label: 'Mountain', offset: 'MST/MDT' },
  { name: 'America/Los_Angeles', label: 'Pacific', offset: 'PST/PDT' },
  { name: 'Europe/London', label: 'London', offset: 'GMT/BST' },
  { name: 'Europe/Paris', label: 'Paris', offset: 'CET/CEST' },
  { name: 'Asia/Tokyo', label: 'Tokyo', offset: 'JST' },
  { name: 'Australia/Sydney', label: 'Sydney', offset: 'AEDT/AEST' },
];

export default function TimeZoneClockWidget() {
  const [times, setTimes] = useState<Record<string, string>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updateTimes = () => {
      const newTimes: Record<string, string> = {};

      TIME_ZONES.forEach(({ name }) => {
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: name,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });

        newTimes[name] = formatter.format(new Date());
      });

      setTimes(newTimes);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full space-y-4">
      {/* Widget Header */}
      <div className="structural-card p-6 rounded-lg relative overflow-hidden">
        <div className="scanline"></div>
        <div className="flex items-center gap-2 mb-2">
          <Globe size={18} className="text-[#ff6b00]" />
          <h2 className="text-base font-mono font-bold text-[#ffb693] tracking-wider uppercase">
            WORLD_CLOCK_RESYNC
          </h2>
        </div>
        <p className="text-xs text-[#e2bfb0]">
          Active temporal synchronization across global nodes. Updates every 1000ms.
        </p>
      </div>

      {/* Clocks Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {TIME_ZONES.slice(0, 4).map(({ name, label, offset }) => (
          <div
            key={name}
            className="structural-card p-4 rounded-lg relative overflow-hidden flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-mono text-xs font-bold text-[#e3e2e7]">{label}</p>
                <p className="font-mono text-[9px] text-[#a98a7d] uppercase">{offset}</p>
              </div>
              <Clock className="h-3.5 w-3.5 text-[#ffb693]/40" />
            </div>
            <p className="text-xl font-mono font-bold text-[#ff6b00] tracking-widest mt-3">
              {times[name] || '--:--:--'}
            </p>
          </div>
        ))}
      </div>

      <div className="text-center font-mono text-[10px] text-[#a98a7d] pt-1">
        GLOBAL_TEMPORAL_COORDINATION_LOCK_OK
      </div>
    </div>
  );
}
