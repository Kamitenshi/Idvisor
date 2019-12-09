import { IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
class User {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  @IsString()
  public role!: string;

  @Column()
  @IsString()
  public password!: string;
}

export default User;