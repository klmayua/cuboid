export const isMockMode =
  !process.env.DATABASE_URL ||
  process.env.CUBOID_FORCE_MOCK === 'true';

export function shouldUseMockData(): boolean {
  return isMockMode;
}
