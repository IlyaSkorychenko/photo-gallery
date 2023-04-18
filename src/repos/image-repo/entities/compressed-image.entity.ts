import { Timestamp } from 'src/repos/common/base-entities/timestamp.base-entity';
import { Image } from 'src/repos/image-repo/entities/image.entity';
import { ResolutionEnum } from 'src/repos/image-repo/types/resolution.enum';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('compressed_images')
@Unique(['imageId', 'resolution'])
export class CompressedImage extends Timestamp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'image_id',
    type: 'uuid',
    nullable: false
  })
  imageId: string;

  @Column({
    type: 'enum',
    enum: ResolutionEnum,
    nullable: false
  })
  resolution: ResolutionEnum;

  @ManyToOne(() => Image, (image) => image.compressedImages)
  @JoinColumn({
    name: 'image_id'
  })
  image: Image;
}
