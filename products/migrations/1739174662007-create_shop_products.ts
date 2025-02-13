import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateShopProducts1739174662007 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE shop_products (
            id SERIAL PRIMARY KEY,
            shop_id INT REFERENCES shops(id) ON DELETE CASCADE,
            product_id INT REFERENCES products(id) ON DELETE CASCADE,
            price DECIMAL(10,2) CHECK (price >= 0) NOT NULL,
            stock INT DEFAULT 0 CHECK (stock >= 0),
            is_active BOOLEAN DEFAULT TRUE,
            created_at TIMESTAMP DEFAULT now(),
            UNIQUE(shop_id, product_id)
        );`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE shop_products
        `);
    }
}
