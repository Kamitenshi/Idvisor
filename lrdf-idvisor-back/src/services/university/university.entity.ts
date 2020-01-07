import { IsString } from 'class-validator'
import { Curriculum } from 'lrdf-idvisor-model'
import { CurriculumDB } from 'services/curriculum/curriculum.entity'
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm"

@Entity()
export class UniversityDB {
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

    @OneToMany(_ => CurriculumDB, curriculum => curriculum.id)
    public curriculums!: Curriculum[]

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