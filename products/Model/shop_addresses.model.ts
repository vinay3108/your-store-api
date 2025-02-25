import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index } from "typeorm";
import { Shop } from "./shop.model";

@Entity("shop_addresses")
@Index("idx_shop_addresses_geom", ["geom"], { spatial: true })
export class ShopAddress {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Shop, (shop) => shop.addresses, { onDelete: "CASCADE" })
    shop: Shop;

    @Column({ type: "varchar", length: 255 })
    address_line1: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    address_line2?: string;

    @Column({ type: "varchar", length: 100 })
    city: string;

    @Column({ type: "varchar", length: 100 })
    state: string;

    @Column({ type: "varchar", length: 20 })
    postal_code: string;

    @Column({ type: "varchar", length: 100 })
    country: string;

    @Column({ type: "decimal", precision: 9, scale: 6 })
    latitude: number;

    @Column({ type: "decimal", precision: 9, scale: 6 })
    longitude: number;

    @Column({ type: "geography", spatialFeatureType: "Point", srid: 4326 })
    geom: string;
}
