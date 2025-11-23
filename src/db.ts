import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: !!process.env.DB_SYNC, // true only in development
  logging: false,
  entities: ['src/entities/**/*.ts'],
  migrations: ['src/migrations/**/*.ts'],
});

export const connectDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log('✅ PostgreSQL connected successfully');
  } catch (error) {
    console.error('❌ PostgreSQL connection failed:', error);
    process.exit(1);
  }
};
