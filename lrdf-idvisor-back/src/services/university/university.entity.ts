import { IsString } from 'class-validator'
import { Column, Entity, PrimaryColumn } from "typeorm"

@Entity()
class UniversityDB {
    @PrimaryColumn()
    public name!: string

    @Column()
    public description!: string

    @Column()
    public address!: string

    @Column()
    public city!: string

    @Column()
    public postalCode!: string
}


export class CreatingUniversity {
    @IsString()
    public name!: string

    @IsString()
    public description!: string

    @IsString()
    public address!: string

    @IsString()
    public city!: string

    @IsString()
    public postalCode!: string
}

export default UniversityDB