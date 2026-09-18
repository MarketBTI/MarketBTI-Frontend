'use client';

import Link from 'next/link';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorProps) {
  return (
    <main className='flex min-h-dvh items-center justify-center bg-white p-4'>
      <section
        className='w-full max-w-md rounded-2xl border border-solid border-neutral-200 bg-white p-8 text-center shadow-[0_1px_2px_rgb(17_17_17/0.08)]'
        aria-labelledby='error-title'
      >
        <h1 id='error-title' className='m-0 mb-2 text-title1 text-neutral-900 sm:text-[24px]'>
          문제가 발생했습니다
        </h1>

        <p className='m-0 mb-4 text-caption3 text-neutral-700 sm:text-[16px]'>
          예상치 못한 오류가 발생했습니다.
        </p>

        <p className='m-0 mb-8 rounded-lg bg-neutral-100 p-3 text-left font-mono text-xs font-normal leading-normal text-neutral-700 wrap-anywhere sm:text-sm'>
          {error?.message || '알 수 없는 오류'}
        </p>

        <div className='flex flex-col gap-3 sm:flex-row sm:justify-center'>
          <button
            onClick={reset}
            className='inline-flex min-h-11 items-center justify-center rounded-lg border-0 bg-primary-700 px-5 py-2.5 text-body2 text-white no-underline transition-[background-color,border-color,transform] duration-160 ease-[ease] hover:bg-primary-800 active:scale-95 focus-visible:outline-3 focus-visible:outline-solid focus-visible:outline-primary-300 focus-visible:outline-offset-3'
            type='button'
          >
            다시 시도
          </button>

          <Link
            href='/'
            className='inline-flex min-h-11 items-center justify-center rounded-lg border border-solid border-neutral-300 bg-white px-5 py-2.5 text-body2 text-neutral-800 no-underline transition-[background-color,border-color,transform] duration-160 ease-[ease] hover:bg-neutral-100 focus-visible:outline-3 focus-visible:outline-solid focus-visible:outline-primary-300 focus-visible:outline-offset-3'
          >
            메인으로
          </Link>
        </div>
      </section>
    </main>
  );
}
