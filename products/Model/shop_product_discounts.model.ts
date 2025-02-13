import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    JoinColumn,
} from "typeorm";
import { ShopProduct } from "./shop_products.model";

@Entity({ name: "shop_product_discounts" })
export class ShopProductDiscount {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ShopProduct, (shopProduct) => shopProduct.discounts, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "shop_product_id" })
    shopProduct: ShopProduct;

    @Column({ type: "decimal", precision: 5, scale: 2, default: 0 })
    discount_percentage: number;

    @Column({ type: "timestamp", nullable: true })
    valid_from: Date;

    @Column({ type: "timestamp", nullable: true })
    valid_to: Date;

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;
}
