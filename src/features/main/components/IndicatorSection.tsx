import { BookmarkCheck } from 'lucide-react';
import styles from '../styles/IndicatorSection.module.css';
import clsx from 'clsx';
import { textStyles } from '@/app/styles/theme.css';

interface IndicatorSectionProps {
  selectedRegion: string | null;
  selectedDistrict: string | null;
  selectedIndustry: string | null;
}
const steps = [
  { title: '조건 선택', description: '지역과 업종을 선택합니다.' },
  { title: '상권 분석', description: '소비 데이터를 분석합니다.' },
  { title: '진단 결과', description: '상권 유형을 확인합니다.' },
];
const IndicatorSection = ({
  selectedRegion,
  selectedDistrict,
  selectedIndustry,
}: IndicatorSectionProps) => {
  const conditions = [
    { label: '지역', value: selectedRegion },
    { label: '시·구·군', value: selectedDistrict },
    { label: '업종', value: selectedIndustry },
  ];
  return (
    <aside className={styles.indicator_section} aria-label='진단 진행 상황'>
      <ol className={styles.steps}>
        {steps.map((step, index) => (
          <li
            className={styles.step}
            key={step.title}
            aria-current={index === 0 ? 'step' : undefined}
          >
            <span className={styles.step_number}>{index + 1}</span>
            <div>
              <p className={clsx(textStyles.body2, styles.step_title)}>{step.title}</p>
              <p className={clsx(textStyles.caption3, styles.step_description)}>
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <section className={styles.conditions} aria-labelledby='selected-conditions-title'>
        <h2
          id='selected-conditions-title'
          className={clsx(textStyles.body1, styles.conditions_title)}
        >
          <BookmarkCheck size={20} aria-hidden='true' />
          현재 선택한 조건
        </h2>
        <dl className={styles.condition_list}>
          {conditions.map(({ label, value }) => (
            <div className={clsx(textStyles.caption1, styles.condition)} key={label}>
              <dt>{label}</dt>
              <dd>{value ?? '선택 전'}</dd>
            </div>
          ))}
        </dl>
      </section>
    </aside>
  );
};
export default IndicatorSection;
