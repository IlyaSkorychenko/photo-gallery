import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1681849946702 implements MigrationInterface {
  name = 'init1681849946702';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "images"
                             (
                                 "created_at"        TIMESTAMP            NOT NULL DEFAULT now(),
                                 "updated_at"        TIMESTAMP            NOT NULL DEFAULT now(),
                                 "deleted_at"        TIMESTAMP,
                                 "id"                uuid                 NOT NULL DEFAULT uuid_generate_v4(),
                                 "user_id"           uuid                 NOT NULL,
                                 "name"              character varying    NOT NULL,
                                 "duplicate_name_id" integer              NOT NULL DEFAULT '1',
                                 "description"       character varying,
                                 "format"            character varying(4) NOT NULL,
                                 "height"            smallint             NOT NULL,
                                 "width"             smallint             NOT NULL,
                                 CONSTRAINT "UQ_c51a734f4adb64c41472e687531" UNIQUE ("user_id", "name", "duplicate_name_id", "format"),
                                 CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(
      `CREATE TYPE "public"."compressed_images_resolution_enum" AS ENUM('high', 'medium', 'low')`
    );
    await queryRunner.query(`CREATE TABLE "compressed_images"
                             (
                                 "created_at" TIMESTAMP                                    NOT NULL DEFAULT now(),
                                 "updated_at" TIMESTAMP                                    NOT NULL DEFAULT now(),
                                 "deleted_at" TIMESTAMP,
                                 "id"         uuid                                         NOT NULL DEFAULT uuid_generate_v4(),
                                 "image_id"   uuid                                         NOT NULL,
                                 "resolution" "public"."compressed_images_resolution_enum" NOT NULL,
                                 CONSTRAINT "UQ_e2c4d1c07b849ae8835b1eb9400" UNIQUE ("image_id", "resolution"),
                                 CONSTRAINT "PK_e79438243119b6a9f8b3d67eea5" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`ALTER TABLE "compressed_images"
        ADD CONSTRAINT "FK_3eb4e54130eaaf092a5ea1059d6" FOREIGN KEY ("image_id") REFERENCES "images" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "compressed_images"
        DROP CONSTRAINT "FK_3eb4e54130eaaf092a5ea1059d6"`);
    await queryRunner.query(`DROP TABLE "compressed_images"`);
    await queryRunner.query(`DROP TYPE "public"."compressed_images_resolution_enum"`);
    await queryRunner.query(`DROP TABLE "images"`);
  }
}
