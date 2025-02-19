import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ProductDetail } from "./product_details.model";

@Entity({ name: "product_ingredients" })
export class ProductIngredient {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ProductDetail, (productDetail) => productDetail.id, { onDelete: "CASCADE" })
    productDetail: ProductDetail;

    @Column({ type: "text" })
    ingredient: string;

    @Column({ type: "int", default: 1 })
    display_order: number;
}
