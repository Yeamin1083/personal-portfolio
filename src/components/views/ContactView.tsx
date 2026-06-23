"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Send, CheckCircle2, ShieldCheck, Terminal, AlertTriangle } from "lucide-react";

interface TerminalLog {
  text: string;
  type: "info" | "warn" | "success" | "command";
  timestamp: string;
}

export default function ContactView() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [logs, setLogs] = useState<TerminalLog[]>([
    { text: "ssh yeamin-portfolio-daemon.local", type: "command", timestamp: "14:42:01" },
    { text: "Connection established. Secure shell active (TLS 1.3).", type: "info", timestamp: "14:42:02" },
    { text: "Awaiting input stream on buffer port [SMTP:587]...", type: "info", timestamp: "14:42:02" }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const addLog = (text: string, type: "info" | "warn" | "success" | "command") => {
    const time = new Date().toLocaleTimeString("en-US", { hour12: false });
    setLogs((prev) => [...prev, { text, type, timestamp: time }]);
  };

  // Log changes on input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (value.length === 1) {
      addLog(`Allocated string buffer memory for field [${name}].`, "info");
    } else if (name === "email" && value.includes("@") && !logs.some(l => l.text.includes("Email pattern verified"))) {
      addLog("Regex validator: Email pattern verified (@ token matched).", "success");
    } else if (value.length % 35 === 0 && value.length > 0) {
      addLog(`Buffer check: [${name}] current size: ${value.length} bytes.`, "info");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addLog("Error: Missing required fields in payload buffer.", "warn");
      return;
    }

    setIsSubmitting(true);
    addLog(`curl -X POST -d "payload=base64_encoded" https://yeamin.dev/api/contact`, "command");
    addLog("Packaging message payload structure...", "info");

    setTimeout(() => {
      addLog("Sending packet payload via https handshake... Syn sent.", "info");
      setTimeout(() => {
        addLog("Ack received. Server accepted message envelope.", "success");
        addLog("Status 200 OK. Mail dispatched to yeaminislamemon02@gmail.com.", "success");
        setIsSubmitting(false);
        setIsSent(true);
        setFormData({ name: "", email: "", message: "" });
      }, 1000);
    }, 800);
  };

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto space-y-8 text-zinc-100">
      
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold font-orbitron text-white flex items-center gap-2">
          <Mail className="text-cyan-400 w-5 h-5" /> Secure Contact
        </h2>
        <p className="text-zinc-400 text-sm mt-1">Submit an encrypted inquiry directly to my operational inbox.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Contact Form */}
        <div className="lg:col-span-6 space-y-6">
          {isSent ? (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="border border-green-500/20 bg-green-950/10 rounded-2xl p-8 text-center space-y-4 shadow-xl"
            >
              <CheckCircle2 size={48} className="text-green-400 mx-auto animate-bounce" />
              <h3 className="text-lg font-bold text-white font-orbitron">Connection Secure</h3>
              <p className="text-zinc-300 text-sm leading-relaxed">
                Message packets have been successfully transmitted. I will respond to your endpoint within 24 operational hours.
              </p>
              <button
                onClick={() => {
                  setIsSent(false);
                  addLog("Buffer cleared. Resetting input listeners.", "info");
                }}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-black text-xs font-mono rounded-lg transition-colors font-bold uppercase"
              >
                Send Another Packet
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-400 uppercase">Sender Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. John Doe"
                  className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 transition-all font-sans"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-400 uppercase">Return Endpoint (Email)</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="e.g. guest@endpoint.org"
                  className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 transition-all font-mono"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-zinc-400 uppercase">Payload Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Type your message body..."
                  rows={4}
                  className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 transition-all font-sans resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-cyan-400 hover:bg-cyan-500 disabled:bg-zinc-800 text-black disabled:text-zinc-500 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(0,229,255,0.1)] hover:scale-[1.02] active:scale-95"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Transmitting Packet...
                  </>
                ) : (
                  <>
                    <Send size={16} /> Dispatch Message Packet
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Live Compilation logs */}
        <div className="lg:col-span-6 flex flex-col border border-white/10 bg-black/80 rounded-2xl overflow-hidden font-mono text-xs shadow-2xl h-80 lg:h-auto">
          {/* Console Header */}
          <div className="bg-zinc-900 px-4 py-2.5 flex items-center justify-between border-b border-white/5">
            <span className="text-zinc-400 flex items-center gap-1.5 font-bold">
              <Terminal size={14} className="text-cyan-400" /> SYSTEM LOG CONSOLE
            </span>
            <span className="text-[10px] text-zinc-500 flex items-center gap-1">
              <ShieldCheck size={12} className="text-green-500" /> SECURE LINK
            </span>
          </div>

          {/* Console Body */}
          <div className="flex-1 p-4 space-y-2 overflow-y-auto max-h-[16.5rem]">
            {logs.map((log, idx) => (
              <div key={idx} className="flex gap-2">
                <span className="text-zinc-600 select-none">[{log.timestamp}]</span>
                {log.type === "command" && (
                  <span className="text-white">
                    guest@yeaminOS:~$ <span className="text-yellow-400">{log.text}</span>
                  </span>
                )}
                {log.type === "info" && (
                  <span className="text-zinc-400">
                    [<span className="text-cyan-400">INFO</span>] {log.text}
                  </span>
                )}
                {log.type === "warn" && (
                  <span className="text-red-400 flex items-center gap-1">
                    <AlertTriangle size={12} /> [WARN] {log.text}
                  </span>
                )}
                {log.type === "success" && (
                  <span className="text-green-400">
                    [<span className="text-green-500">OK</span>] {log.text}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
