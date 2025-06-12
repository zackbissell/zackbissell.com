import { useState } from 'react';

interface Incident {
  time: string;
  event: string;
  details: string;
}

interface LogProps {
  log: Incident[];
}

export default function IncidentLog({ log }: LogProps) {
  const [open, setOpen] = useState(false);
  return (
    <div className="my-8">
      <button
        onClick={() => setOpen(!open)}
        className="mb-4 px-4 py-2 border border-green-500/30 rounded bg-green-500/10 font-mono text-green-300"
      >
        {open ? 'Hide Files' : 'Access Classified Research Files'}
      </button>
      {open && (
        <div className="bg-black text-green-400 font-mono space-y-2 p-4 border border-green-500/30 animate-fade-in">
          {log.map((item, idx) => (
            <div key={idx} className="border-b border-green-700/30 py-1">
              <span className="mr-2">[{item.time}]</span>
              {item.event} - {item.details}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
