import { MigrationInterface, QueryRunner } from "typeorm";

export class AddIndexesOnProducts1739176064353 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE INDEX idx_shop_products_shop ON shop_products(shop_id);
        `);
        await queryRunner.query(`
            CREATE INDEX idx_shop_products_product ON shop_products(product_id);
        `);
        await queryRunner.query(`
            CREATE INDEX idx_shop_product_discounts ON shop_product_discounts(shop_product_id);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX idx_shop_products_shop;
        `);
        await queryRunner.query(`
            DROP INDEX idx_shop_products_product;
        `);
        await queryRunner.query(`
            DROP INDEX idx_shop_product_discounts;
        `);
    }

}
