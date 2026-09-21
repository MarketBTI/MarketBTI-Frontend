import { BookAlert } from 'lucide-react';
import Image from 'next/image';
import { Nunito } from 'next/font/google';
import {
  axisOptions,
  getSelectedAxisPercent,
  marketBtiCharacters,
} from '@/features/main/constants/diagnosisResult';
import type { DiagnosisAxis, DiagnosisMarket } from '@/features/main/types/diagnosis';

interface TypeResultProps {
  market: DiagnosisMarket;
  axes: DiagnosisAxis[];
  interpretation: string;
  score: number;
}

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['700', '800'],
});

const SCORE_RADIUS = 50;
const SCORE_CIRCUMFERENCE = 2 * Math.PI * SCORE_RADIUS;

const getScoreColor = (score: number) => {
  if (score >= 67) return '#5DB692';
  if (score >= 34) return '#e9ad36';

  return '#E65360';
};

const TypeResult = ({ market, axes, interpretation, score }: TypeResultProps) => {
  const character = marketBtiCharacters[market.market_bti];
  const normalizedScore = Math.min(100, Math.max(0, Math.round(score)));
  const scoreColor = getScoreColor(normalizedScore);
  const scoreOffset = SCORE_CIRCUMFERENCE * (1 - normalizedScore / 100);
  const typeMetrics = axes.map((axis) => ({
    ...axisOptions[axis.axis][axis.code],
    code: axis.code,
    percent: getSelectedAxisPercent(axis.value, axis.threshold),
    description: axis.description,
  }));

  return (
    <section className='space-y-3 rounded-xl border border-neutral-400 bg-white p-4 shadow-[0_4px_12px_0_rgba(0,0,0,0.15)]'>
      <div className='flex items-stretch gap-4 py-1 max-md:flex-col max-md:pl-0'>
        <article className='inline-flex w-44 shrink-0 flex-col items-center justify-between gap-3 rounded-2xl bg px-3 py-4 bg-primary-100 max-md:w-full'>
          <div className='flex w-full flex-col items-center'>
            <div
              className='relative grid size-29 place-items-center drop-shadow-[0_3px_6px_rgba(56,135,104,0.12)]'
              role='img'
              aria-label={`종합 점수 ${normalizedScore}점`}
            >
              <svg className='absolute inset-0 -rotate-90' viewBox='0 0 120 120' aria-hidden='true'>
                <circle
                  cx='60'
                  cy='60'
                  r={SCORE_RADIUS}
                  fill='#f5fcf9'
                  stroke='var(--color-neutral-400)'
                  strokeWidth='9'
                />
                <circle
                  cx='60'
                  cy='60'
                  r={SCORE_RADIUS}
                  fill='none'
                  stroke={scoreColor}
                  strokeWidth='9'
                  strokeLinecap='round'
                  strokeDasharray={SCORE_CIRCUMFERENCE}
                  strokeDashoffset={scoreOffset}
                />
              </svg>
              <div className='relative flex flex-col items-center gap-1.5'>
                <span className='typo-caption-1 font-semibold leading-none tracking-[-0.01em] text-neutral-900'>
                  종합 점수
                </span>
                <div className={`${nunito.className} flex items-baseline leading-none`}>
                  <strong className='text-[34px] font-extrabold tracking-[-0.04em] text-black'>
                    {normalizedScore}
                  </strong>
                  <span className='ml-0.5 text-[13px] font-bold text-neutral-700'>/100</span>
                </div>
              </div>
            </div>
          </div>

          {character && (
            <Image
              src={character}
              alt={`${market.market_bti} 유형 캐릭터`}
              width={142}
              height={142}
            />
          )}
          <div className='text-center'>
            <h1 className='text-[36px] font-bold leading-none text-black'>{market.market_bti}</h1>
            <p className='mt-1 typo-body-1 text-primary-900'>({market.type_name})</p>
          </div>
        </article>

        <div className='flex min-w-0 flex-1 flex-col gap-3'>
          <article
            className='grid min-w-0 flex-1 grid-cols-2 grid-rows-2 gap-3 max-sm:grid-cols-1 max-sm:grid-rows-none'
            aria-label='상권 유형별 분석 비율'
          >
            {typeMetrics.map((metric) => (
              <div
                key={metric.code}
                className='flex min-w-0 flex-col justify-between gap-3 rounded-xl border border-primary-300 px-3 py-2 max-sm:px-2'
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

          <div className='w-full space-y-2 rounded-xl bg-neutral-100 p-4'>
            <div className='flex items-center gap-1 text-[#503ED5]'>
              <BookAlert size={20} />
              <p className='typo-body-1'>AI 해석</p>
            </div>
            <p className='text-neutral-800 typo-body-2'>{interpretation}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TypeResult;
