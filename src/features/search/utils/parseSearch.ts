import { districtsByRegion, industryOptions } from '@/features/main/mocks/selectionOptions';

export interface SearchConditions {
  region: string;
  district: string;
  industry: string;
}

export type SearchResult =
  { kind: 'empty' | 'industry-only' | 'invalid' } | { kind: 'valid'; conditions: SearchConditions };

const normalize = (value: string) => value.replace(/\s+/g, '');

export const parseSearch = (value: string): SearchResult => {
  let remaining = normalize(value);
  if (!remaining) return { kind: 'empty' };
  const industry = industryOptions.find((option) => remaining.endsWith(normalize(option))) ?? '';
  if (industry) remaining = remaining.slice(0, -normalize(industry).length);
  if (!remaining) return { kind: 'industry-only' };

  const region = Object.keys(districtsByRegion).find((option) => remaining.startsWith(option));
  if (region) {
    const districtInput = remaining.slice(region.length);
    const district =
      districtsByRegion[region].find((option) => normalize(option) === districtInput) ?? '';
    if (districtInput && !district) return { kind: 'invalid' };
    return { kind: 'valid', conditions: { region, district, industry } };
  }

  // A district name alone is accepted only when its parent region is unambiguous.
  const matches = Object.entries(districtsByRegion).filter(([, districts]) =>
    districts.some((district) => normalize(district) === remaining),
  );
  if (matches.length !== 1) return { kind: 'invalid' };
  const [matchedRegion, districts] = matches[0];
  return {
    kind: 'valid',
    conditions: {
      region: matchedRegion,
      district: districts.find((district) => normalize(district) === remaining)!,
      industry,
    },
  };
};
