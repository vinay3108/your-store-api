import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductKeyFeatures1739949223152 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE product_key_features (
                id SERIAL PRIMARY KEY,
                product_detail_id INT REFERENCES product_details(id) ON DELETE CASCADE,
                feature TEXT NOT NULL,
                display_order INT DEFAULT 0,
                created_at TIMESTAMP DEFAULT now()
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS product_key_features;
        `);
    }

}
