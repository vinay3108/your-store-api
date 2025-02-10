import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
} from "typeorm";
import { Product } from "./products.model";

@Entity({ name: "categories" })
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255, nullable: false })
    name: string;

    @ManyToOne(() => Category, (category) => category.subcategories, {
        nullable: true,
        onDelete: "SET NULL",
    })
    @JoinColumn({ name: "parent_category_id" })
    parentCategory: Category;

    @OneToMany(() => Category, (category) => category.parentCategory)
    subcategories: Category[];

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;
}
