import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsers1740050733017 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
                phone VARCHAR(20) UNIQUE CHECK (phone ~ '^\+?[1-9]\d{1,14}$'),
                password_hash VARCHAR(255) NOT NULL,
                full_name VARCHAR(255),
                profile_picture TEXT,
                is_active BOOLEAN DEFAULT TRUE,
                role VARCHAR(50) DEFAULT 'customer',
                created_at TIMESTAMP DEFAULT now(),
                updated_at TIMESTAMP DEFAULT now()
            );
        `);

        await queryRunner.query(`
            CREATE UNIQUE INDEX users_email_lower_idx ON users (LOWER(email));
        `);

        await queryRunner.query(`
            CREATE INDEX users_phone_idx ON users (phone);
        `);

        await queryRunner.query(`
            CREATE OR REPLACE FUNCTION update_modified_column()
            RETURNS TRIGGER AS $$
            BEGIN
                NEW.updated_at = NOW();
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
        `);

        await queryRunner.query(`
            CREATE TRIGGER update_users_mod_time
            BEFORE UPDATE ON users
            FOR EACH ROW
            EXECUTE FUNCTION update_modified_column();
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TRIGGER IF EXISTS update_users_mod_time ON users;`);
        await queryRunner.query(`DROP FUNCTION IF EXISTS update_modified_column;`);
        await queryRunner.query(`DROP INDEX IF EXISTS users_phone_idx;`);
        await queryRunner.query(`DROP INDEX IF EXISTS users_email_lower_idx;`);
        await queryRunner.query(`DROP TABLE IF EXISTS users;`);
    }

}
