import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Product } from "./products.model";

@Entity({ name: "product_details" })
export class ProductDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Product, (product) => product.details, { onDelete: "CASCADE" })
    product: Product;

    @Column({ type: "varchar", length: 255 })
    type: string;

    @Column({ type: "varchar", length: 50 })
    unit: string;

    @Column({ type: "varchar", length: 20, nullable: true })
    fssai_license: string;

    @Column({ type: "varchar", length: 50, nullable: true })
    shelf_life: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    manufacturer_name: string;

    @Column({ type: "text", nullable: true })
    manufacturer_address: string;

    @Column({ type: "varchar", length: 100, nullable: true })
    country_of_origin: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    customer_care: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    seller: string;

    @Column({ type: "varchar", length: 20, nullable: true })
    seller_fssai: string;

    @Column({ type: "text", nullable: true })
    description: string;

    @Column({ type: "text", nullable: true })
    disclaimer: string;
}
