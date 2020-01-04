import { IsString } from 'class-validator'
import { Entity, PrimaryColumn } from "typeorm"

@Entity()
class UniversityDB {
    @PrimaryColumn()
    public name!: string
}

export class CreatingUniversity {
    @IsString()
    public name!: string
}

export default UniversityDB