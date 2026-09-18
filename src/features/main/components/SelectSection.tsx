'use client';

import { useState } from 'react';
import clsx from 'clsx';
import styles from '../styles/SelectSection.module.css';
import { textStyles } from '@/app/styles/theme.css';
import Button from '@/shared/components/button/Button';

const mocks = [
  '강원특별자치도',
  '경기도',
  '경상남도',
  '경상북도',
  '광주광역시',
  '대구광역시',
  '부산광역시',
  '서울특별시',
  '세종특별자치시',
  '울산광역시',
  '인천광역시',
  '전라남도',
  '전북특별자치도',
  '충청남도',
  '충청북도',
];

const SelectSection = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  return (
    <section className={clsx(styles.select_section)}>
      <article className={clsx(textStyles.subtitle2, styles.option_title)}>
        <div className={clsx(styles.option_number)}>1</div>
        <p className={clsx(styles.description)}>지역 선택</p>
      </article>

      <div className={clsx(styles.option_list, 'thin-scrollbar')}>
        {mocks.map((item) => (
          <Button
            key={item}
            label={item}
            selected={selectedRegion === item}
            onClick={() => setSelectedRegion(item)}
            variant='selection'
            size='md'
            className={styles.option_button}
          />
        ))}
      </div>
    </section>
  );
};

export default SelectSection;
