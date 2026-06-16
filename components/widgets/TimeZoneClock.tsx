'use client';

import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

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
    <div className="w-full">
      <div className="flex items-center gap-2 mb-4">
        <Globe size={20} className="text-blue-600" />
        <h2 className="text-lg font-semibold text-slate-900">World Clock</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {TIME_ZONES.map(({ name, label, offset }) => (
          <div
            key={name}
            className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4 shadow-sm"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-semibold text-slate-900 text-sm">{label}</p>
                <p className="text-xs text-slate-600">{offset}</p>
              </div>
            </div>
            <p className="text-2xl font-mono font-bold text-blue-900 tracking-wider">
              {times[name] || '--:--:--'}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 text-xs text-slate-500 text-center">
        <p>Updates every second • Multi-Dash crew coordination</p>
      </div>
    </div>
  );
}
