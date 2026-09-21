export const customerAgeOptions = [
  '20대 미만',
  '20대',
  '30대',
  '40대',
  '50대',
  '60대 이상',
] as const;

export const monthlySalesOptions = [
  '500만 원 미만',
  '500만 ~ 1,000만 원',
  '1,000만 ~ 2,000만 원',
  '2,000만 ~ 3,000만 원',
  '3,000만 ~ 5,000만 원',
  '5,000만 원 이상',
] as const;

export const customerAgeCodes: Record<string, number> = {
  '20대 미만': 1,
  '20대': 2,
  '30대': 3,
  '40대': 4,
  '50대': 5,
  '60대 이상': 6,
};

export const monthlySalesRanges: Record<string, string> = {
  '500만 원 미만': 'under_500',
  '500만 ~ 1,000만 원': '500_1000',
  '1,000만 ~ 2,000만 원': '1000_2000',
  '2,000만 ~ 3,000만 원': '2000_3000',
  '3,000만 ~ 5,000만 원': '3000_5000',
  '5,000만 원 이상': '5000_plus',
};
