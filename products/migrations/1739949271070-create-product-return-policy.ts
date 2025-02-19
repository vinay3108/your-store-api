import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateProductReturnPolicy1739949271070 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE product_return_policy (
                id SERIAL PRIMARY KEY,
                product_detail_id INT REFERENCES product_details(id) ON DELETE CASCADE,
                policy TEXT NOT NULL,
                display_order INT DEFAULT 0,
                created_at TIMESTAMP DEFAULT now()
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE IF EXISTS product_return_policy;
        `);
    }

}
