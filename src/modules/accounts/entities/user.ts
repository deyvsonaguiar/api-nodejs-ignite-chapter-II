import { v4 as uuid } from "uuid";
import { Column, Entity, PrimaryColumn, CreateDateColumn } from 'typeorm';

@Entity("users")
class User {

    @PrimaryColumn()
    id?: string;

    @Column()
    name: string;
    IsUnique: true;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @Column()
    driver_license: string;

    @Column()
    isAdmin: boolean;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if(!this.id) {
            this.id = uuid()
        }
    }
}

export { User }