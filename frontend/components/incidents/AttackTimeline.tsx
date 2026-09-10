type TimelineEvent = {
  time: string;
  event: string;
};

type AttackTimelineProps = {
  timeline: TimelineEvent[];
};

export default function AttackTimeline({ timeline }: AttackTimelineProps) {
  return (
    <div>
      <p className="text-xs tracking-[0.3em] text-zinc-600 uppercase">
        Attack Timeline
      </p>

      <div className="mt-4 space-y-3 text-sm">
        {timeline.map((event, index) => (
          <div key={index} className="flex gap-6">
            <span className="text-zinc-600 w-16">{event.time}</span>
            <span className="text-zinc-300">{event.event}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
