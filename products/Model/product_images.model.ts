import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
} from "typeorm";
import { Product } from "./products.model";

@Entity({ name: "product_images" })
export class ProductImages {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Product, (product) => product.images, { onDelete: "CASCADE" })
    @JoinColumn({ name: "product_id" })
    product: Product;

    @Column({ type: "text", nullable: false })
    image_url: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    alt_text: string;

    @Column({ type: "int", default: 0 })
    display_order: number;

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;
}
