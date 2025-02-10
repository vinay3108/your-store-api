import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCategories1739174325142 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE categories (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                parent_category_id INT REFERENCES categories(id) ON DELETE SET NULL,
                created_at TIMESTAMP DEFAULT now()
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE categories;
        `);
    }

}
