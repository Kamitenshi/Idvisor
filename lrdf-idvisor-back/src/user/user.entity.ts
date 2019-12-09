import { IsEmail, IsIn, IsString } from 'class-validator';
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
class User {
  @PrimaryColumn()
  @IsEmail()
  public mail!: string;

  @Column()
  @IsIn(['admin', 'advisor', 'student'])
  public role!: string;

  @Column()
  @IsString()
  public password!: string;
}

export default User;