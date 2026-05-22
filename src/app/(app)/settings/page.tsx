"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { User, Bell, Shield, Trash2, Save, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [name, setName] = useState("Adam Glagola");
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-serif text-[32px] text-stone mb-1">Settings</h1>
        <p className="text-stone-muted text-[14px]">Manage your account and preferences.</p>
      </motion.div>

      <div className="space-y-4">
        {/* Account */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-6">
          <div className="flex items-center gap-2 mb-5">
            <User className="w-4 h-4 text-gold" />
            <h2 className="text-stone font-semibold text-[15px]">Account</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-stone-muted text-[12px] block mb-1.5">Display Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} className="input-base" />
            </div>
            <div>
              <label className="text-stone-muted text-[12px] block mb-1.5">Email</label>
              <input type="email" defaultValue="adam@example.com" className="input-base opacity-50 cursor-not-allowed" disabled />
            </div>
          </div>
          <div className="mt-5">
            <Button variant="primary" size="sm" icon={<Save className="w-3.5 h-3.5" />}>Save Changes</Button>
          </div>
        </motion.div>

        {/* Subscription */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="card card-gold p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-4 h-4 text-gold" />
            <h2 className="text-stone font-semibold text-[15px]">Subscription</h2>
            <Badge variant="gold" className="ml-auto">Pro</Badge>
          </div>
          <p className="text-stone-muted text-[13px] mb-4">Your Pro subscription renews on <span className="text-stone">June 20, 2026</span>.</p>
          <Button variant="outline-gold" size="sm" icon={<ChevronRight className="w-3.5 h-3.5" />}>Manage Billing</Button>
        </motion.div>

        {/* Notifications */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-4 h-4 text-gold" />
            <h2 className="text-stone font-semibold text-[15px]">Notifications</h2>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-stone text-[14px]">Weekly reasoning report</div>
              <div className="text-stone-muted text-[12px]">Summary of your progress and patterns</div>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-10 h-5.5 rounded-full transition-colors relative ${notifications ? "bg-gold" : "bg-[rgba(255,255,255,0.1)]"}`}
              style={{ height: "22px", width: "40px" }}
            >
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all ${notifications ? "left-5" : "left-0.5"}`} />
            </button>
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="card p-6 border-[rgba(139,58,58,0.15)]">
          <div className="flex items-center gap-2 mb-4">
            <Trash2 className="w-4 h-4 text-[#C97070]" />
            <h2 className="text-stone font-semibold text-[15px]">Danger Zone</h2>
          </div>
          <p className="text-stone-muted text-[13px] mb-4">Permanently delete your account and all associated data. This cannot be undone.</p>
          <Button variant="danger" size="sm" icon={<Trash2 className="w-3.5 h-3.5" />}>Delete Account</Button>
        </motion.div>
      </div>
    </div>
  );
}
