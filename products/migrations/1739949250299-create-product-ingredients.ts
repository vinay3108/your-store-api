import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductIngredients1739949250299 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE product_ingredients (
                id SERIAL PRIMARY KEY,
                product_detail_id INT REFERENCES product_details(id) ON DELETE CASCADE,
                ingredient TEXT NOT NULL,
                display_order INT DEFAULT 0,
                created_at TIMESTAMP DEFAULT now()
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS product_ingredients;
        `);
    }

}
