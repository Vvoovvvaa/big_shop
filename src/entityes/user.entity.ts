import { Entity, Column} from 'typeorm';
import { Base } from './base';
import { Roles } from './role.enum';

@Entity()
export class User extends Base {
    @Column({ type: 'enum', enum: Roles, default: Roles.user})
    role: Roles;

    @Column({name:"first_name"})
    firstName: string;

    @Column({name:"last_name"})
    lastName: string;

    @Column({ default: true,name:"is_active" })
    isActive: boolean;

    @Column()
    age: number;

    @Column()
    email: string;

    @Column()
    phone: string;

    @Column()
    password: string;
}