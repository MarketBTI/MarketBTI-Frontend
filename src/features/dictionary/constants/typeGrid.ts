const typeCodes = [
  'GBFS',
  'GBFV',
  'GBPS',
  'GBPV',
  'GCFS',
  'GCFV',
  'GCPS',
  'GCPV',
  'DBFS',
  'DBFV',
  'DBPS',
  'DBPV',
  'DCFS',
  'DCFV',
  'DCPS',
  'DCPV',
] as const;

export const marketTypes = typeCodes.map((code) => ({
  code,
  imageSrc: `/characters/${code}.svg`,
}));
