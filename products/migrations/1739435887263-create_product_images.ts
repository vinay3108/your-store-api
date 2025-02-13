import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductImages1739435887263 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE product_images (
                id SERIAL PRIMARY KEY,
                product_id INT REFERENCES products(id) ON DELETE CASCADE,
                image_url TEXT NOT NULL,
                alt_text VARCHAR(255), 
                display_order INT DEFAULT 0,
                created_at TIMESTAMP DEFAULT now()
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`s
            DROP TABLE IF EXISTS product_images;
        `);
    }
}
