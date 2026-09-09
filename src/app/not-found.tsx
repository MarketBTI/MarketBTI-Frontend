'use client';

import { ArrowLeft, Frown, Home } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './not-found.module.css';

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <main className={styles.page}>
      <section className={styles.content} aria-labelledby='not-found-title'>
        <div className={styles.message}>
          <div className={styles.iconWrapper} aria-hidden='true'>
            <Frown className={styles.icon} />
          </div>
          <p className={styles.statusCode}>404</p>
          <h1 id='not-found-title' className={styles.title}>
            페이지를 찾을 수 없습니다
          </h1>
          <p className={styles.description}>
            요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
          </p>
        </div>

        <div className={styles.actions}>
          <Link href='/' className={styles.primaryAction}>
            <Home size={20} aria-hidden='true' />
            <span>메인으로 돌아가기</span>
          </Link>
          <button onClick={() => router.back()} className={styles.secondaryAction}>
            <ArrowLeft size={20} aria-hidden='true' />
            이전 페이지
          </button>
        </div>
      </section>
    </main>
  );
};

export default NotFoundPage;
