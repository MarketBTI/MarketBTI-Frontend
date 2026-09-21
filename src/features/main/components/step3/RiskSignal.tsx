interface RiskSignalProps {
  riskSignals: string[];
}

const RiskSignal = ({ riskSignals }: RiskSignalProps) => {
  return (
    <section className='w-72 shrink-0 space-y-4 rounded-xl border border-neutral-400 bg-white p-5 shadow-[0_4px_12px_0_rgba(0,0,0,0.15)] max-md:w-full'>
      <h1 className='text-black typo-subtitle-1'>주요 위험 신호</h1>

      <div className='space-y-3'>
        {riskSignals.map((item, idx) => (
          <article
            key={item}
            className='flex min-h-16 items-center gap-2.5 rounded-lg bg-neutral-100 px-3 py-3'
          >
            <div className='flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-primary-800 text-white typo-caption-2'>
              {idx + 1}
            </div>
            <p className='min-w-0 flex-1 break-keep typo-caption-2 text-neutral-900'>{item}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default RiskSignal;
