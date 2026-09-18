import clsx from 'clsx';
import { useId } from 'react';
import styles from '../styles/SelectionGroup.module.css';
import { textStyles } from '@/app/styles/theme.css';
import Button from '@/shared/components/button/Button';

interface SelectionGroupProps {
  step: number;
  title: string;
  options: readonly string[];
  selected: string | null;
  onSelect: (value: string) => void;
}

const SelectionGroup = ({ step, title, options, selected, onSelect }: SelectionGroupProps) => {
  const titleId = useId();

  return (
    <section
      aria-labelledby={titleId}
      className={clsx(styles.selection_group, step !== 1 && styles.selection_group_compact)}
    >
      <div className={clsx(textStyles.subtitle2, styles.group_header)}>
        <span aria-hidden='true' className={styles.step_badge}>
          {step}
        </span>
        <h2 id={titleId} className={styles.group_title}>
          {title}
        </h2>
      </div>
      <div
        className={clsx(
          styles.option_grid,
          step !== 1 && styles.option_grid_six_columns,
          'thin-scrollbar',
        )}
      >
        {options.map((item) => (
          <Button
            key={item}
            label={item}
            selected={selected === item}
            onClick={() => onSelect(item)}
            variant='selection'
            size='md'
            className={styles.option_button}
          />
        ))}
      </div>
    </section>
  );
};

export default SelectionGroup;
