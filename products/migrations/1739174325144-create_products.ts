import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProducts1739174325144 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE products (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                brand_id INT REFERENCES brands(id),
                category_id INT REFERENCES categories(id),
                description TEXT,
                base_price DECIMAL(10,2) CHECK (base_price >= 0),
                created_at TIMESTAMP DEFAULT now()
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE products;
        `);
    }
}
