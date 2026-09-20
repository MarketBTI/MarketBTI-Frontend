import Chip from '@/shared/components/chip/Chip';
import TitleHeader from '@/shared/layouts/TitleHeader';

const typeAxes = [
  {
    code: 'G / D',
    values: ['성장형', '쇠퇴형'],
    description: '소비금액과 결제건수의 추세를 통해 상권의 성장 여부를 판단합니다.',
  },
  {
    code: 'B / C',
    values: ['균형형', '편중형'],
    description: '고객층의 분포와 소비 집중도를 통해 고객 편중 정도를 판단합니다.',
  },
  {
    code: 'F / P',
    values: ['빈도형', '객단가형'],
    description: '결제건수와 건당 결제금액 중 어떤 것이 성장을 주도하는지 판단합니다.',
  },
  {
    code: 'S / V',
    values: ['안정형', '변동형'],
    description: '소비 흐름의 변동 폭을 통해 상권의 안정성을 판단합니다.',
  },
];

const TypeAxesSection = () => {
  return (
    <section className='flex flex-col gap-10 rounded-xl bg-white p-8'>
      <TitleHeader
        title='4가지 판단 축'
        subtitle='각 축의 두 값을 조합해 16개 상권 유형을 결정합니다.'
      />
      <ul
        className='flex items-center gap-4'
        style={{ width: '100%', maxWidth: 1056, marginInline: 'auto' }}
      >
        {typeAxes.map(({ code, values, description }) => (
          <li
            key={code}
            className='rounded-xl border border-primary-400 bg-primary-100 p-3 flex-1 min-w-0'
          >
            <div className='flex items-center justify-between mb-3'>
              <h2 className='typo-title-1 whitespace-nowrap text-primary-900'>{code}</h2>
              <div className='flex items-center gap-1 text-neutral-800'>
                <Chip label={values[0]} />
                <span aria-hidden='true'>·</span>
                <Chip label={values[1]} />
              </div>
            </div>

            <p className='typo-caption-2 text-neutral-800'>{description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TypeAxesSection;
