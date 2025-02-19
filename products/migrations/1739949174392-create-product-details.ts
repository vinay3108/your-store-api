import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductDetails1739949174392 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE product_details (
                id SERIAL PRIMARY KEY,
                product_id INT REFERENCES products(id) ON DELETE CASCADE,
                type VARCHAR(255),
                unit VARCHAR(50),
                fssai_license VARCHAR(50),
                shelf_life VARCHAR(50),
                manufacturer_name VARCHAR(255),
                manufacturer_address TEXT,
                country_of_origin VARCHAR(100),
                customer_care VARCHAR(255),
                seller VARCHAR(255),
                seller_fssai VARCHAR(50),
                description TEXT,
                disclaimer TEXT,
                created_at TIMESTAMP DEFAULT now()
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS product_details;
        `);
    }

}
