interface PreferenceCardProps {
  step: number;
  title: string;
  description?: string;
  children: React.ReactNode;
}

const PreferenceCard = ({ step, title, description, children }: PreferenceCardProps) => {
  return (
    <div className='flex flex-col gap-4 rounded-lg border border-primary-400 bg-white p-4'>
      <div className='flex items-start gap-2'>
        <span
          aria-hidden='true'
          className='flex size-6 shrink-0 min-w-0 items-center justify-center rounded-full bg-primary-800 typo-subtitle-2 text-white'
        >
          {step}
        </span>
        <div className='flex flex-col gap-1'>
          <h3 className='typo-subtitle-2 text-black'>{title}</h3>
          {description && <p className='typo-caption-3 text-neutral-700'>{description}</p>}
        </div>
      </div>
      {children}
    </div>
  );
};

export default PreferenceCard;
