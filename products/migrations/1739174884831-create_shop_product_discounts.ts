import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateShopProductDiscounts1739174884831 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE shop_product_discounts (
            id SERIAL PRIMARY KEY,
            shop_product_id INT REFERENCES shop_products(id) ON DELETE CASCADE,
            discount_percentage DECIMAL(5,2) CHECK (discount_percentage >= 0 AND discount_percentage <= 100) DEFAULT 0, -- Discount in percentage
            valid_from TIMESTAMP,
            valid_to TIMESTAMP,
            created_at TIMESTAMP DEFAULT now()
        );`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE shop_product_discounts;
        `)
    }

}
