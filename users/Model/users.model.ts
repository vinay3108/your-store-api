import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from "typeorm";

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255, unique: true })
    @Index({ unique: true })
    email: string;

    @Column({ type: "varchar", length: 20, unique: true, nullable: true })
    @Index()
    phone: string;

    @Column({ type: "varchar", length: 255, nullable: false })
    password_hash: string;

    @Column({ type: "varchar", length: 255, nullable: true })
    full_name: string;

    @Column({ type: "text", nullable: true })
    profile_picture: string;

    @Column({ type: "boolean", default: true })
    is_active: boolean;

    @Column({ type: "varchar", length: 50, default: "customer" })
    role: string; // e.g., 'customer', 'admin', 'vendor'

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;
}
