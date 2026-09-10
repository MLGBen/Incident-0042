type EvidenceFindingsProps = {
  evidence: string[];
};

export default function EvidenceFindings({
  evidence,
}: EvidenceFindingsProps) {
  return (
    <div className="mt-8 border-t border-zinc-800 pt-6">
      <p className="text-xs text-zinc-600 tracking-widest">
        EVIDENCE & FINDINGS
      </p>

      <div className="mt-4 space-y-4 text-sm">
        {evidence.map((item, index) => (
          <div
            key={index}
            className="border-l-2 border-green-500 pl-4"
          >
            <p className="text-zinc-300">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
