export const getMockMarketStats = (region: string, district: string, industry: string) => {
  const seed = Array.from(`${region}/${district}/${industry}`).reduce(
    (hash, character) => (hash * 31 + character.charCodeAt(0)) >>> 0,
    0,
  );
  const operating = 80 + (seed % 420);
  const closed = 3 + (seed % 35);
  return {
    operating,
    closed,
    closureRate: ((closed / (operating + closed)) * 100).toFixed(1),
  };
};
