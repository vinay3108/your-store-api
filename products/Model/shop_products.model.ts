import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
    JoinColumn,
} from "typeorm";
import { Shop } from "./shop.model";
import { Product } from "./products.model";
import { ShopProductDiscount } from "./shop_product_discounts.model";

@Entity({ name: "shop_products" })
export class ShopProduct {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Shop, (shop) => shop.shopProducts, { onDelete: "CASCADE" })
    @JoinColumn({ name: "shop_id" })
    shop: Shop;

    @ManyToOne(() => Product, (product) => product.shopProducts, {
        onDelete: "CASCADE",
    })
    @JoinColumn({ name: "product_id" })
    product: Product;

    @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
    price: number;

    @OneToMany(() => ShopProductDiscount, (discount) => discount.shopProduct, {
        cascade: true,
    })
    discounts: ShopProductDiscount[];

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;
}
