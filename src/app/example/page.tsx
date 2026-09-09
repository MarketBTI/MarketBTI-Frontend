import Button from '@/shared/components/button/Button';
import styles from './page.module.css';

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
                <Button key={size} label={`Button ${size}`} variant={variant} size={size} />
              ))}
              <Button label='Disabled' variant={variant} size='lg' disabled />
            </div>
          </section>
        ))}
      </section>
    </main>
  );
}
