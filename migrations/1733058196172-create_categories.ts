import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateCategories1733058196172 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        `CREATE TABLE Categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        type VARCHAR(100) DEFAULT 'member',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )`
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
