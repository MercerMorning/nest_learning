import { MigrationInterface, QueryRunner } from "typeorm";

export class Gen1705873252250 implements MigrationInterface {
    name = 'Gen1705873252250'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "coffees" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "brand" character varying, "recommendations" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_2c43a32ab6534261322aa94a76a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event_entity" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, "name" character varying NOT NULL, "payload" json NOT NULL, CONSTRAINT "PK_c5675e66b601bd4d0882054a430" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5df196f818afbc82f75a1879ec" ON "event_entity" ("name") `);
        await queryRunner.query(`CREATE INDEX "IDX_7bfa75714e6fc79a495b2a7259" ON "event_entity" ("name", "type") `);
        await queryRunner.query(`CREATE TABLE "coffees_flavors_coffees" ("coffeesId_1" integer NOT NULL, "coffeesId_2" integer NOT NULL, CONSTRAINT "PK_cc593c5b537aa3a24a43f0cc240" PRIMARY KEY ("coffeesId_1", "coffeesId_2"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fff3e85e3c84e7ece5279be4d2" ON "coffees_flavors_coffees" ("coffeesId_1") `);
        await queryRunner.query(`CREATE INDEX "IDX_afeda7851a21c3fd5ec3d651a7" ON "coffees_flavors_coffees" ("coffeesId_2") `);
        await queryRunner.query(`ALTER TABLE "coffees" DROP COLUMN "brand"`);
        await queryRunner.query(`ALTER TABLE "coffees" DROP COLUMN "recommendations"`);
        await queryRunner.query(`ALTER TABLE "coffees" ADD "brand" character varying`);
        await queryRunner.query(`ALTER TABLE "coffees" ADD "recommendations" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "coffees_flavors_coffees" ADD CONSTRAINT "FK_fff3e85e3c84e7ece5279be4d28" FOREIGN KEY ("coffeesId_1") REFERENCES "coffees"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "coffees_flavors_coffees" ADD CONSTRAINT "FK_afeda7851a21c3fd5ec3d651a77" FOREIGN KEY ("coffeesId_2") REFERENCES "coffees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coffees_flavors_coffees" DROP CONSTRAINT "FK_afeda7851a21c3fd5ec3d651a77"`);
        await queryRunner.query(`ALTER TABLE "coffees_flavors_coffees" DROP CONSTRAINT "FK_fff3e85e3c84e7ece5279be4d28"`);
        await queryRunner.query(`ALTER TABLE "coffees" DROP COLUMN "recommendations"`);
        await queryRunner.query(`ALTER TABLE "coffees" DROP COLUMN "brand"`);
        await queryRunner.query(`ALTER TABLE "coffees" ADD "recommendations" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "coffees" ADD "brand" character varying`);
        await queryRunner.query(`DROP INDEX "public"."IDX_afeda7851a21c3fd5ec3d651a7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fff3e85e3c84e7ece5279be4d2"`);
        await queryRunner.query(`DROP TABLE "coffees_flavors_coffees"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7bfa75714e6fc79a495b2a7259"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5df196f818afbc82f75a1879ec"`);
        await queryRunner.query(`DROP TABLE "event_entity"`);
        await queryRunner.query(`DROP TABLE "coffees"`);
    }

}
