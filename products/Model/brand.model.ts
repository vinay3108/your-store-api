import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    OneToMany,
} from "typeorm";
import { Product } from "./products.model";

@Entity({ name: "brands" })
export class Brand {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255 })
    name: string;

    @Column({ type: "text", nullable: true })
    description: string;

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @OneToMany(() => Product, (product) => product.brand)
    products: Product[];
}
