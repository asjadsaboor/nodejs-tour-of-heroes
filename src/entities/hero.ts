import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';

@Entity('heroes')
export class Hero {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({
    type: 'character varying',
    length: 2000,
    unique: true,
    nullable: false,
  })
  public name: string;
}
