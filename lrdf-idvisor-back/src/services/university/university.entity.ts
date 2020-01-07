import { IsString, IsUrl } from 'class-validator'
import { Curriculum } from 'lrdf-idvisor-model'
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm"
import { CurriculumDB } from '../../services/curriculum/curriculum.entity'

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

    @Column()
    public url!: string

    @OneToMany(_ => CurriculumDB, curriculum => curriculum.university)
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

    @IsUrl()
    public url!: string

    @IsString()
    public postalCode!: string
}

export default UniversityDB