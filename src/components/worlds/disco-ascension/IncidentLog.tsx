import { DiscoIncidentTerminal } from '../../ui/TerminalInterface';

interface Incident {
  time: string;
  event: string;
  details: string;
}

interface LogProps {
  log: Incident[];
}

export default function IncidentLog({ log }: LogProps) {
  return (
    <div className="world-disco">
      <DiscoIncidentTerminal 
        incidents={log}
        typewriterSpeed={30}
        autoScroll={true}
      />
    </div>
  );
}
