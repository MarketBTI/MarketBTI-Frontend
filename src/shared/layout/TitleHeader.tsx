import clsx from 'clsx';
import styles from './TitleHeader.module.css';
import { textStyles } from '@/app/styles/theme.css';

const TitleHeader = () => {
  return (
    <div className={styles.title_header}>
      <h1 className={clsx(textStyles.headline1, styles.title)}>
        희망 <span className={styles.highlight}>지역</span>과
        <span className={styles.highlight}> 업종</span>을 선택하세요.
      </h1>
      <p className={styles.description}>선택한 조건으로 상권 유형을 진단합니다.</p>
    </div>
  );
};

export default TitleHeader;
