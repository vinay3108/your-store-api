import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ProductDetail } from "./product_details.model";

@Entity({ name: "product_key_features" })
export class ProductKeyFeature {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ProductDetail, (productDetail) => productDetail.id, { onDelete: "CASCADE" })
    productDetail: ProductDetail;

    @Column({ type: "text" })
    feature: string;

    @Column({ type: "int", default: 1 })
    display_order: number;
}
