import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateShops1739121140674 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE shops (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                owner_name VARCHAR(255),
                created_at TIMESTAMP DEFAULT now()
            );
        `);}

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE shops;
        `);
    }

}
