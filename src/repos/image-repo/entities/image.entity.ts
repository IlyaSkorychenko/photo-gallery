import { Timestamp } from 'src/repos/common/base-entities/timestamp.base-entity';
import { ResolutionEnum } from 'src/repos/image-repo/types/resolution.enum';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('images')
@Unique(['userId', 'name', 'duplicateNameId', 'format', 'resolution'])
export class Image extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'uuid',
    name: 'user_id',
    nullable: false
  })
  userId: string;

  @Column({
    type: 'varchar',
    nullable: false
  })
  name: string;

  @Column({
    type: 'integer',
    name: 'duplicate_name_id',
    default: 1
  })
  duplicateNameId: number;

  @Column({
    type: 'varchar',
    nullable: true
  })
  description?: string;

  @Column({
    type: 'varchar',
    length: 4,
    nullable: false
  })
  format: string;

  @Column({
    type: 'enum',
    enum: ResolutionEnum,
    nullable: false
  })
  resolution: ResolutionEnum;

  @Column({
    name: 'parent_id',
    type: 'uuid',
    nullable: true
  })
  parentId: string;

  @OneToMany(() => Image, (image) => image.parent)
  children: Image[];

  @ManyToOne(() => Image, (image) => image.children)
  @JoinColumn({
    name: 'parent_id'
  })
  parent: Image;
}
