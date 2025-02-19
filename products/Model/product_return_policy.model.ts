import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { ProductDetail } from "./product_details.model";

@Entity({ name: "product_return_policy" })
export class ProductReturnPolicy {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ProductDetail, (productDetail) => productDetail.id, { onDelete: "CASCADE" })
    productDetail: ProductDetail;

    @Column({ type: "text" })
    policy: string;

    @Column({ type: "int", default: 1 })
    display_order: number;
}
