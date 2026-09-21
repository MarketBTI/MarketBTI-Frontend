const riskList = [
  'SNS 트랜드 의존',
  '10~20대 단일 고객층 쏠림',
  '경쟁 상권 출현 시 이탈 속도 빠름',
];

const RiskSignal = () => {
  return (
    <section className='w-60.5 shrink-0 space-y-3 rounded-xl border border-neutral-400 bg-white p-4 shadow-[0_4px_12px_0_rgba(0,0,0,0.15)] max-md:w-full'>
      <h1 className='text-black typo-subtitle-1'>주요 위험 신호</h1>

      <div className='space-y-2'>
        {riskList.map((item, idx) => (
          <article
            key={item}
            className='bg-neutral-100 h-12 px-3 flex items-center gap-2 rounded-lg'
          >
            <div className='h-4.5 w-4.5 shrink-0 min-w-0 bg-primary-800 flex justify-center items-center typo-caption-2 rounded-full text-white'>
              {idx + 1}
            </div>
            <p className='typo-caption-2 text-neutral-900'>{item}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default RiskSignal;
