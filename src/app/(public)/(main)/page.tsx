import TitleHeader from '@/shared/layout/TitleHeader';
import styles from './page.module.css';
import SelectSection from '@/features/main/components/SelectSection';

const RiskAssessmentPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.panel}>
        <TitleHeader />
        <SelectSection />
      </div>
    </div>
  );
};

export default RiskAssessmentPage;
