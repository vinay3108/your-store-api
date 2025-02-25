import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateShopAddresses1740502992916 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE shop_addresses (
                id SERIAL PRIMARY KEY,
                shop_id INT REFERENCES shops(id) ON DELETE CASCADE,
                address_line1 VARCHAR(255) NOT NULL,
                address_line2 VARCHAR(255),
                city VARCHAR(100),
                state VARCHAR(100),
                postal_code VARCHAR(20),
                country VARCHAR(100),
                latitude DECIMAL(9,6) NOT NULL,
                longitude DECIMAL(9,6) NOT NULL,
                geom geography(Point, 4326) NOT NULL,
                created_at TIMESTAMP DEFAULT now()
            );

            CREATE INDEX idx_shop_addresses_geom ON shop_addresses USING GIST (geom);

            CREATE OR REPLACE FUNCTION update_geom_from_latlong()
            RETURNS TRIGGER AS $$
            BEGIN
                NEW.geom = ST_SetSRID(ST_MakePoint(NEW.longitude, NEW.latitude), 4326);
                RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;

            CREATE TRIGGER trg_update_geom
            BEFORE INSERT OR UPDATE ON shop_addresses
            FOR EACH ROW
            EXECUTE FUNCTION update_geom_from_latlong();
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TRIGGER IF EXISTS trg_update_geom ON shop_addresses;
            DROP FUNCTION IF EXISTS update_geom_from_latlong();
            DROP INDEX IF EXISTS idx_shop_addresses_geom;
            DROP TABLE IF EXISTS shop_addresses;
        `);
    }

}
