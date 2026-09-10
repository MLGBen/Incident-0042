type RecommendedRemediationProps = {
  remediation: string[];
};

export default function RecommendedRemediation({
  remediation,
}: RecommendedRemediationProps) {
  return (
    <div className="mt-8 border-t border-zinc-800 pt-6">
      <p className="text-xs text-zinc-600 tracking-widest">
        RECOMMENDED REMEDIATION
      </p>

      <div className="mt-4 space-y-4 text-sm">
        <div className="border-l-2 border-red-500 pl-4">
          {remediation.map((step, index) => (
            <p key={index} className="text-zinc-300">
              {index + 1}. {step}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
