import { MigrationInterface, QueryRunner } from 'typeorm';

export class initImage1680696741813 implements MigrationInterface {
  name = 'initImage1680696741813';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TYPE "public"."images_resolution_enum" AS ENUM('full', 'medium', 'low')`);
    await queryRunner.query(`CREATE TABLE "images"
                             (
                                 "created_at"        TIMESTAMP                         NOT NULL DEFAULT now(),
                                 "updated_at"        TIMESTAMP                         NOT NULL DEFAULT now(),
                                 "deleted_at"        TIMESTAMP,
                                 "id"                uuid                              NOT NULL DEFAULT uuid_generate_v4(),
                                 "user_id"           uuid                              NOT NULL,
                                 "name"              character varying                 NOT NULL,
                                 "duplicate_name_id" integer                           NOT NULL DEFAULT '1',
                                 "description"       character varying,
                                 "format"            character varying(4)              NOT NULL,
                                 "resolution"        "public"."images_resolution_enum" NOT NULL,
                                 "parent_id"         uuid,
                                 CONSTRAINT "UQ_da603952818f7df10c3ec658bd8" UNIQUE ("user_id", "name", "duplicate_name_id", "format", "resolution"),
                                 CONSTRAINT "PK_1fe148074c6a1a91b63cb9ee3c9" PRIMARY KEY ("id")
                             )`);
    await queryRunner.query(`ALTER TABLE "images"
        ADD CONSTRAINT "FK_05869d0b3887caeb184afca4dea" FOREIGN KEY ("parent_id") REFERENCES "images" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "images"
        DROP CONSTRAINT "FK_05869d0b3887caeb184afca4dea"`);
    await queryRunner.query(`DROP TABLE "images"`);
    await queryRunner.query(`DROP TYPE "public"."images_resolution_enum"`);
  }
}
