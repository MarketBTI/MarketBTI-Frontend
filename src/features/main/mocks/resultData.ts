export const monthlyConsumption = [
  { month: 1, day: 1, score: 95 },
  { month: 1, day: 15, score: 112 },
  { month: 2, day: 1, score: 135 },
  { month: 2, day: 15, score: 118 },
  { month: 3, day: 1, score: 148 },
  { month: 3, day: 15, score: 178 },
  { month: 4, day: 1, score: 170 },
  { month: 4, day: 15, score: 210 },
  { month: 5, day: 1, score: 155 },
  { month: 5, day: 15, score: 182 },
  { month: 6, day: 1, score: 220 },
];

export const typeMetrics = [
  {
    code: 'G',
    label: '성장형',
    oppositeCode: 'D',
    oppositeLabel: '쇠퇴형',
    percent: 68,
    description: '매출이 꾸준히 증가하고 있습니다.',
  },
  {
    code: 'C',
    label: '편중형',
    oppositeCode: 'B',
    oppositeLabel: '균형형',
    percent: 57,
    description: '특정 고객층에 소비가 집중되어 있습니다.',
  },
  {
    code: 'F',
    label: '빈도형',
    oppositeCode: 'P',
    oppositeLabel: '객단가형',
    percent: 76,
    description: '활발한 소비가 이루어지고 있습니다.',
  },
  {
    code: 'V',
    label: '변동형',
    oppositeCode: 'S',
    oppositeLabel: '안정형',
    percent: 69,
    description: '시기별 매출 변동이 크게 나타나고 있습니다.',
  },
] as const;
