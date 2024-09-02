import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';

@Entity('translations')
export class Translation {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column('text')
  originalText: string;

  @Column('varchar', { length: 2 })
  language: string;

  @Column('text')
  translatedText: string;
}
