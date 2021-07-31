import {MigrationInterface, QueryRunner,Table} from "typeorm";


export class UserMigration1627551150015 implements MigrationInterface {
//create user table with migration run
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'user',
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "firstName",
                    type: "varchar",
                },
                
                {
                    name: "lastName",
                    type: "varchar",
                },
                {
                    name: "age",
                    type: "int",
                },
                {
                    name: "phoneNumber",
                    type: "int",
                }
            ]
        }), true)

    }
//drop user table when migration revert
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user');

    }

}
