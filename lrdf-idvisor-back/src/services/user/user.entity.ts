import { IsEmail, IsIn, IsString } from 'class-validator';
import { Column, Entity, PrimaryColumn } from "typeorm";

export type Role = "admin" | "student" | "advisor";

@Entity()
class User {
  @PrimaryColumn()
  @IsEmail()
  public email!: string;

  @Column()
  @IsIn(['admin', 'advisor', 'student'])
  public role!: Role;

  @Column()
  @IsString()
  public password!: string;
}

export default User;