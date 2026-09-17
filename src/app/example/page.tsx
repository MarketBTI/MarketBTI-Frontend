import Button from '@/shared/components/button/Button';
import Chip from '@/shared/components/chip/Chip';
import Input from '@/shared/components/input/Input';
import SidebarTab from '@/shared/components/navigation/SidebarTab';
import SectionNav from '@/shared/components/navigation/SectionNav';
import styles from './page.module.css';
import ToastExample from './ToastExample';
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
      <section className={styles.showcase} aria-labelledby='sidebar-tab-showcase-title'>
        <h2 id='sidebar-tab-showcase-title' className={styles.title}>
          SidebarTab
        </h2>
        <p className={styles.description}>현재 경로에 해당하는 링크는 선택 색상으로 표시됩니다.</p>
        <div className={styles.sidebarTabRow}>
          <div className={styles.sidebarTabExpanded}>
            <SidebarTab label='상권 진단' icon={<Maximize size={18} />} href='/' />
          </div>
        </div>
      </section>
      <section className={styles.showcase} aria-labelledby='section-nav-showcase-title'>
        <h2 id='section-nav-showcase-title' className={styles.title}>
          SectionNav
        </h2>
        <p className={styles.description}>제목만 표시하는 형태와 하위 단계를 표시하는 형태입니다.</p>
        <div className={styles.variantSection}>
          <h3 className={styles.variantTitle}>기본</h3>
          <SectionNav title='마이페이지' />
        </div>
        <div className={styles.variantSection}>
          <h3 className={styles.variantTitle}>하위 단계</h3>
          <SectionNav title='마이페이지' subTitle='프로필 수정' subStep />
        </div>
      </section>
      <section className={styles.showcase} aria-labelledby='toast-showcase-title'>
        <h2 id='toast-showcase-title' className={styles.title}>
          Toast
        </h2>
        <p className={styles.description}>
          버튼을 누르면 화면 하단 중앙에 토스트가 표시됩니다. 4초 뒤 자동으로 닫히거나 X 버튼으로
          닫을 수 있습니다.
        </p>
        <ToastExample />
      </section>
    </main>
  );
}
