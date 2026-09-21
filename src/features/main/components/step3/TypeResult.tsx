import { BookAlert } from 'lucide-react';
import Image from 'next/image';
import GCFV from '@/assets/image/GCFV.webp';
import { typeMetrics } from '../../mocks/resultData';

const TypeResult = () => {
  return (
    <section className='rounded-xl border border-neutral-400 bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.15)] p-4 space-y-3'>
      <div className='flex items-stretch gap-6 py-3 pl-7'>
        <article className='inline-flex shrink-0 flex-col items-center'>
          <Image
            src={GCFV}
            alt='GCFV 유형 캐릭터'
            width={160}
            height={160}
          />
          <h1 className='text-[40px] font-bold text-black'>GCFV</h1>
          <p className='typo-body-1 text-primary-900'>(인플루언서 원툴형)</p>
        </article>

        <article
          className='grid min-w-0 flex-1 grid-cols-2 grid-rows-2 gap-3'
          aria-label='상권 유형별 분석 비율'
        >
          {typeMetrics.map((metric) => (
            <div
              key={metric.code}
              className='flex min-w-0 flex-col justify-between gap-3 rounded-xl border border-primary-300 px-3 py-2'
            >
              <div className='flex items-center gap-2'>
                <div className='flex h-13 min-w-13 shrink-0 flex-col items-center justify-center rounded-lg bg-primary-200 px-2'>
                  <span className='typo-title-1 text-primary-900'>{metric.code}</span>
                  <span className='whitespace-nowrap typo-caption-2 text-neutral-900'>
                    {metric.label}
                  </span>
                </div>
                <p className='min-w-0 flex-1 typo-caption-2 text-neutral-900'>
                  {metric.description}
                </p>
                <div className='flex h-13 min-w-13 shrink-0 flex-col items-center justify-center rounded-lg bg-neutral-300 px-2'>
                  <span className='typo-title-1 text-neutral-900'>{metric.oppositeCode}</span>
                  <span className='whitespace-nowrap typo-caption-2 text-neutral-900'>
                    {metric.oppositeLabel}
                  </span>
                </div>
              </div>
              <div>
                <div className='mb-0.5 flex justify-between typo-caption-3'>
                  <span className='text-primary-900 typo-caption-2'>{metric.percent}%</span>
                  <span className='text-neutral-700 typo-caption-2'>{100 - metric.percent}%</span>
                </div>
                <div
                  className='h-2 overflow-hidden rounded-full bg-neutral-500'
                  role='img'
                  aria-label={`${metric.label} ${metric.percent}%, ${metric.oppositeLabel} ${100 - metric.percent}%`}
                >
                  <div
                    className='h-full rounded-full bg-primary-600'
                    style={{ width: `${metric.percent}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </article>
      </div>

      <div className='w-full bg-primary-100 rounded-xl p-4 space-y-2'>
        <div className='flex items-center gap-1 text-[#503ED5]'>
          <BookAlert size={20} />
          <p className='typo-body-1'>AI 해석</p>
        </div>
        <p className='text-neutral-800 typo-body-2'>
          현재 상권은 특정 인플루언서나 트렌트에 의존하는 구조로, 트렌드가 식으면 매출이 급격히
          떨어질 위험이 큽니다. 주요 고객층이 한정되어 있고, 방문 빈도가 낮아 안정적인 수익구조를
          기대하기 어렵습니다. 특히 매출 변동성이 크기 때문에, 리스크 분산 전략이 필요합니다.
        </p>
      </div>
    </section>
  );
};

export default TypeResult;
