import pg from 'pg';

const { Pool } = pg;

let pool: pg.Pool | null = null;

try {
  if (process.env.DATABASE_URL) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });
  }
} catch {
  pool = null;
}

export const pglite = {
  query: async (text: string, params?: any[]) => {
    if (!pool) {
      throw new Error('Database not available');
    }
    const client = await pool.connect();
    try {
      const result = await client.query(text, params);
      return result;
    } finally {
      client.release();
    }
  },
};

export default pool;
