'use client';

import Link from 'next/link';
import styles from './error.module.css';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorProps) {
  return (
    <main className={styles.page}>
      <section className={styles.card} aria-labelledby='error-title'>
        <h1 id='error-title' className={styles.title}>
          문제가 발생했습니다
        </h1>

        <p className={styles.description}>예상치 못한 오류가 발생했습니다.</p>

        <p className={styles.errorMessage}>
          {error?.message || '알 수 없는 오류'}
        </p>

        <div className={styles.actions}>
          <button
            onClick={reset}
            className={styles.retryButton}
            type='button'
          >
            다시 시도
          </button>

          <Link href='/' className={styles.homeLink}>
            메인으로
          </Link>
        </div>
      </section>
    </main>
  );
}
