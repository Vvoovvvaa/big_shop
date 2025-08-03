import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({ default: true })
    is_active: boolean;

    @Column()
    age: number;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    password: string;
}