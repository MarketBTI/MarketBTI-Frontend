'use client';

import { ArrowLeft, Frown, Home } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <main className='flex min-h-dvh items-center justify-center p-8 sm:p-4'>
      <section className='w-full max-w-md text-center' aria-labelledby='not-found-title'>
        <div className='mb-8'>
          <div
            className='mb-6 inline-flex size-20 items-center justify-center rounded-full bg-neutral-200 text-neutral-800 sm:size-24'
            aria-hidden='true'
          >
            <Frown className='size-9 sm:size-11' />
          </div>
          <p className='m-0 mb-2 font-sans text-[48px] font-bold leading-[1.2] tracking-normal text-black sm:text-[60px]'>
            404
          </p>
          <h1 id='not-found-title' className='m-0 mb-4 text-title2 text-neutral-900 sm:text-[24px]'>
            페이지를 찾을 수 없습니다
          </h1>
          <p className='m-0 font-sans text-sm font-normal leading-normal tracking-normal text-neutral-700 sm:text-base'>
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </p>
        </div>

        <div className='flex flex-col justify-center gap-3 sm:flex-row'>
          <Link
            href='/'
            className='inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary-700 px-6 py-3 text-body2 text-white no-underline transition-[background-color,border-color] duration-160 ease-[ease] hover:bg-primary-800 focus-visible:outline-3 focus-visible:outline-solid focus-visible:outline-primary-300 focus-visible:outline-offset-3 sm:w-auto'
          >
            <Home size={20} aria-hidden='true' />
            <span>메인으로 돌아가기</span>
          </Link>
          <button
            onClick={() => router.back()}
            className='inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg border-2 border-solid border-neutral-300 bg-white px-6 py-3 text-body2 text-neutral-900 no-underline transition-[background-color,border-color] duration-160 ease-[ease] hover:border-neutral-400 focus-visible:outline-3 focus-visible:outline-solid focus-visible:outline-primary-300 focus-visible:outline-offset-3 sm:w-auto'
          >
            <ArrowLeft size={20} aria-hidden='true' />
            이전 페이지
          </button>
        </div>
      </section>
    </main>
  );
};

export default NotFoundPage;
