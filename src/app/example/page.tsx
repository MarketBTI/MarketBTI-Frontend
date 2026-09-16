import Button from '@/shared/components/button/Button';
import Chip from '@/shared/components/chip/Chip';
import Input from '@/shared/components/input/Input';
import styles from './page.module.css';
import { Maximize } from 'lucide-react';

const variants = ['primary', 'outline', 'selection'] as const;
const sizes = ['sm', 'md', 'lg'] as const;

export default function ExamplePage() {
  return (
    <main className={styles.page}>
      <section className={styles.showcase} aria-labelledby='button-showcase-title'>
        <p className={styles.eyebrow}>Design system</p>
        <h1 id='button-showcase-title' className={styles.title}>
          Button
        </h1>
        <p className={styles.description}>
          각 버튼을 hover하거나 누르면 상태 변화를 확인할 수 있습니다.
        </p>

        {variants.map((variant) => (
          <section key={variant} className={styles.variantSection}>
            <h2 className={styles.variantTitle}>{variant}</h2>
            <div className={styles.buttonRow}>
              {sizes.map((size) => (
                <Button
                  key={size}
                  label='Button'
                  variant={variant}
                  size={size}
                  icon={<Maximize />}
                />
              ))}
              <Button label='Disabled' variant={variant} size='lg' disabled />
            </div>
          </section>
        ))}
      </section>
      <section className={styles.showcase} aria-labelledby='chip-showcase-title'>
        <h2 id='chip-showcase-title' className={styles.title}>
          Chip
        </h2>
        <p className={styles.description}>텍스트 길이에 따라 너비가 달라지는 Chip입니다.</p>
        <div className={styles.buttonRow}>
          <Chip label='텍스트' />
          <Chip label='조금 더 긴 텍스트' />
        </div>
      </section>
      <section className={styles.showcase} aria-labelledby='input-showcase-title'>
        <h2 id='input-showcase-title' className={styles.title}>
          Input
        </h2>
        <p className={styles.description}>
          입력창을 선택하면 초록색 테두리가 표시되고, 지우기 버튼으로 내용을 비울 수 있습니다.
        </p>
        <div className={styles.buttonRow}>
          <Input placeholder='Placeholder' aria-label='검색어' />
        </div>
      </section>
    </main>
  );
}
