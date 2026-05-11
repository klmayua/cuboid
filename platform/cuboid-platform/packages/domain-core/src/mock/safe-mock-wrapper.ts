export async function withMockFallback<T>(
  mockFactory: () => T,
  realFactory: () => Promise<T>
): Promise<T> {
  try {
    if (
      process.env.CUBOID_FORCE_MOCK === 'true' ||
      !process.env.DATABASE_URL
    ) {
      return mockFactory();
    }

    return await realFactory();
  } catch {
    return mockFactory();
  }
}
