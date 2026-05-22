"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Award, Brain, Target, Flame, TrendingUp, Edit3 } from "lucide-react";

const RADAR_DATA = [
  { label: "Logic", value: 74 },
  { label: "Persuasion", value: 68 },
  { label: "Clarity", value: 81 },
  { label: "Nuance", value: 62 },
  { label: "Evidence", value: 71 },
  { label: "Open-mind", value: 77 },
];

export default function ProfilePage() {
  const size = 200;
  const center = size / 2;
  const radius = 80;
  const n = RADAR_DATA.length;

  function getPoint(i: number, r: number) {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    return { x: center + r * Math.cos(angle), y: center + r * Math.sin(angle) };
  }

  const gridLevels = [0.25, 0.5, 0.75, 1];
  const dataPoints = RADAR_DATA.map((d, i) => getPoint(i, (d.value / 100) * radius));
  const polygon = dataPoints.map(p => `${p.x},${p.y}`).join(" ");

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-serif text-[32px] text-stone mb-1">Profile</h1>
        <p className="text-stone-muted text-[14px]">Your reasoning fingerprint.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-6 text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold to-[#A8882C] flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(201,168,76,0.3)]">
            <span className="font-serif text-3xl text-[#0B0B0D]">A</span>
          </div>
          <h2 className="text-stone font-semibold text-[18px] mb-1">Adam Glagola</h2>
          <p className="text-stone-ghost text-[13px] mb-3">adam@example.com</p>
          <Badge variant="gold">Pro Member</Badge>
          <div className="divider my-5" />
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-gold font-bold text-[20px]">24</div>
              <div className="text-stone-ghost text-[11px]">Debates</div>
            </div>
            <div>
              <div className="text-gold font-bold text-[20px]">74</div>
              <div className="text-stone-ghost text-[11px]">Avg Score</div>
            </div>
            <div>
              <div className="text-gold font-bold text-[20px]">8</div>
              <div className="text-stone-ghost text-[11px]">Analyses</div>
            </div>
          </div>
          <div className="mt-5">
            <Button variant="ghost" size="sm" icon={<Edit3 className="w-3.5 h-3.5" />} className="w-full justify-center">Edit Profile</Button>
          </div>
        </motion.div>

        {/* Reasoning Radar */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="card p-6 lg:col-span-2">
          <h3 className="text-stone font-semibold text-[15px] mb-5">Reasoning Profile</h3>
          <div className="flex items-center justify-center gap-8">
            <svg width={size} height={size}>
              {/* Grid */}
              {gridLevels.map((level, li) => (
                <polygon
                  key={li}
                  points={RADAR_DATA.map((_, i) => { const p = getPoint(i, radius * level); return `${p.x},${p.y}`; }).join(" ")}
                  fill="none"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="1"
                />
              ))}
              {/* Axes */}
              {RADAR_DATA.map((_, i) => {
                const p = getPoint(i, radius);
                return <line key={i} x1={center} y1={center} x2={p.x} y2={p.y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />;
              })}
              {/* Data */}
              <motion.polygon
                points={polygon}
                fill="rgba(201,168,76,0.15)"
                stroke="#C9A84C"
                strokeWidth="1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              />
              {/* Labels */}
              {RADAR_DATA.map((d, i) => {
                const p = getPoint(i, radius + 18);
                return (
                  <text key={i} x={p.x} y={p.y} textAnchor="middle" dominantBaseline="middle" fontSize="9" fill="rgba(232,228,220,0.5)">
                    {d.label}
                  </text>
                );
              })}
            </svg>
            <div className="space-y-2 min-w-[120px]">
              {RADAR_DATA.map(d => (
                <div key={d.label} className="flex items-center justify-between gap-4">
                  <span className="text-stone-muted text-[12px]">{d.label}</span>
                  <span className="font-semibold text-[13px]" style={{ color: d.value >= 75 ? "#C9A84C" : d.value >= 60 ? "#6B8DC4" : "#C97070" }}>{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Achievements */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mt-6">
        <h3 className="text-stone font-semibold text-[15px] mb-4">Milestones</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: Flame, label: "First Debate", desc: "Begin the examined life", earned: true },
            { icon: Brain, label: "Axiom Seeker", desc: "Complete 5 analyses", earned: true },
            { icon: Target, label: "Precision", desc: "Score 80+ logic", earned: false },
            { icon: Award, label: "Iron Reasoner", desc: "25 debates completed", earned: false },
          ].map((a, i) => {
            const Icon = a.icon;
            return (
              <div key={i} className={`card p-4 text-center ${!a.earned && "opacity-40"}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 ${a.earned ? "bg-[rgba(201,168,76,0.15)] text-gold" : "bg-[rgba(255,255,255,0.04)] text-stone-ghost"}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-stone text-[13px] font-semibold">{a.label}</div>
                <div className="text-stone-ghost text-[11px] mt-0.5">{a.desc}</div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
