import { Timestamp } from 'src/repos/common/base-entities/timestamp.base-entity';
import { ResolutionEnum } from 'src/repos/image-repo/types/resolution.enum';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('images')
export class Image extends Timestamp {
  @PrimaryColumn('uuid')
  id: string;

  @Column({
    type: 'uuid',
    nullable: false,
    name: 'user_id'
  })
  userId: string;

  @Column({
    type: 'string',
    nullable: false
  })
  name: string;

  @Column({
    type: 'string',
    nullable: true
  })
  description?: string;

  @Column({
    enum: ResolutionEnum
  })
  resolution: ResolutionEnum;
}