import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
} from "typeorm";
import { ShopProduct } from "./shop_products.model";

@Entity({ name: "shops" })
export class Shop {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255 })
    name: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    owner_name: string;

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @OneToMany(() => ShopProduct, (shopProduct) => shopProduct.shop)
    shopProducts: ShopProduct[];
}
