import { ChevronRight } from 'lucide-react';
import * as styles from './SectionNav.css';

interface SectionNavProps {
  title: string;
  subTitle?: string;
  subStep?: boolean;
}

const SectionNav = ({ title, subTitle, subStep = false }: SectionNavProps) => {
  return (
    <div className={styles.sectionNavStyles}>
      <span>{title}</span>
      {subStep && (
        <span className={styles.icon} aria-hidden='true'>
          <ChevronRight size={24} />
        </span>
      )}
      {subStep && <span>{subTitle}</span>}
    </div>
  );
};

export default SectionNav;
