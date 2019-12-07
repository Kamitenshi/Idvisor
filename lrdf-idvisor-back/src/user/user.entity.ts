import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
class User {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public role!: string;

    @Column()
    public password!: string;
}

export default User;