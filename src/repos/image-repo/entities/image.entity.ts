import { Timestamp } from 'src/repos/common/base-entities/timestamp.base-entity';
import { CompressedImage } from 'src/repos/image-repo/entities/compressed-image.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('images')
@Unique(['userId', 'name', 'duplicateNameId', 'format'])
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
    type: 'smallint',
    nullable: false
  })
  height: number;

  @Column({
    type: 'smallint',
    nullable: false
  })
  width: number;

  @OneToMany(() => CompressedImage, (compressedImage) => compressedImage.image)
  compressedImages: CompressedImage[];
}
