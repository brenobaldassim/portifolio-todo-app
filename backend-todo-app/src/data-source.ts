import 'reflect-metadata';
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();
export const AppDataSource = new DataSource({
	type: 'postgres',
	host: process.env.DB_HOST,
	port: Number(process.env.DB_WINDOWS_PORT) || 5432,
	username: process.env.POSTGRES_USER,
	password: process.env.POSTGRES_PASSWORD,
	database: process.env.POSTGRES_DB,
	synchronize: false,
	logging: false,
	entities: ['src/entities/**/*.ts'],
	migrations: ['src/migrations/**/*.ts'],
});
