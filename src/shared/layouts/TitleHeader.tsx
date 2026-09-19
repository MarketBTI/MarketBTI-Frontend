interface TitleHeaderProps {
  title: React.ReactNode;
  subtitle: string;
}

const TitleHeader = ({ title, subtitle }: TitleHeaderProps) => {
  return (
    <header className='inline-flex flex-col items-start gap-2'>
      <h1 className='typo-headline-1'>{title}</h1>
      <p className='typo-body-3 text-neutral-800'>{subtitle}</p>
    </header>
  );
};

export default TitleHeader;
