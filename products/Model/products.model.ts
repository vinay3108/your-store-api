import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, CreateDateColumn } from "typeorm";
import { Category } from "./categories.model";
import { Brand } from "./brand.model";
import { ShopProduct } from "./shop_products.model";
import { ProductImages } from "./product_images.model";
@Entity({ name: "products" })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255, nullable: false })
  name: string;

  @ManyToOne(() => Brand, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "brand_id" })
  brand: Brand;

  @ManyToOne(() => Category, (category) => category.products, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "category_id" })
  category: Category;

  @OneToMany(() => ProductImages, (image) => image.product)
  images: ProductImages[];

  @OneToMany(() => ShopProduct, (shopProduct) => shopProduct.product)
  shopProducts: ShopProduct[];

  @Column({ type: "text", nullable: true })
  description: string;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  base_price: number;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;
}
