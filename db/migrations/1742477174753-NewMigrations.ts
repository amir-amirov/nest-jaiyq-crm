import { MigrationInterface, QueryRunner } from 'typeorm';

export class NewMigrations1742477174753 implements MigrationInterface {
  name = 'NewMigrations1742477174753';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "rental" ADD "duration_minutes" integer`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "rental" DROP COLUMN "duration_minutes"`,
    );
  }
}
