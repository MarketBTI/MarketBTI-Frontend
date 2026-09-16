import clsx from 'clsx';
import { chip } from './Chip.css';

interface ChipProps {
  label: string;
  className?: string;
}

const Chip = ({ label, className }: ChipProps) => {
  return <span className={clsx(chip, className)}>{label}</span>;
};

export default Chip;
