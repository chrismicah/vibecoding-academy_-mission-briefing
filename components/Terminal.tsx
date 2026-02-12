
import React from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon } from 'lucide-react';

interface TerminalProps {
  command: string;
}

const Terminal: React.FC<TerminalProps> = ({ command }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="w-full max-w-2xl mx-auto mt-12 overflow-hidden border border-zinc-800 rounded-xl bg-black/40 backdrop-blur-xl shadow-2xl"
    >
      <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800 bg-zinc-900/20">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
          <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
        </div>
        <div className="flex items-center gap-2 ml-4">
          <TerminalIcon size={14} className="text-zinc-500" strokeWidth={1.5} />
          <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-medium">Terminal — sh</span>
        </div>
      </div>
      <div className="p-6 font-mono text-sm sm:text-base">
        <div className="flex gap-3">
          <span className="text-zinc-500 select-none">$</span>
          <motion.span 
            key={command}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-white"
          >
            {command}
          </motion.span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="w-2 h-5 bg-white ml-0.5 inline-block align-middle"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Terminal;
