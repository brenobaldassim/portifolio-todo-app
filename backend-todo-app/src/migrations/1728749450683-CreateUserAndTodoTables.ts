import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateUserAndTodoTables1728749450683 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		// Create User Table
		await queryRunner.createTable(
			new Table({
				name: 'user',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment',
					},
					{ name: 'username', type: 'varchar', isUnique: true },
					{ name: 'password', type: 'varchar' },
					{ name: 'createdAt', type: 'timestamp', default: 'now()' },
					{ name: 'updatedAt', type: 'timestamp', default: 'now()' },
				],
			})
		);

		// Create Task Table
		await queryRunner.createTable(
			new Table({
				name: 'todo',
				columns: [
					{
						name: 'id',
						type: 'int',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment',
					},
					{ name: 'title', type: 'varchar' },
					{ name: 'description', type: 'text' },
					{ name: 'status', type: 'varchar' },
					{ name: 'createdAt', type: 'timestamp', default: 'now()' },
					{ name: 'updatedAt', type: 'timestamp', default: 'now()' },
					{ name: 'userId', type: 'int' },
				],
			})
		);

		// Create Foreign Key
		await queryRunner.createForeignKey(
			'todo',
			new TableForeignKey({
				columnNames: ['userId'],
				referencedColumnNames: ['id'],
				referencedTableName: 'user',
				onDelete: 'CASCADE',
			})
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('todo');
		await queryRunner.dropTable('user');
	}
}
