import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateMessages1620778972948 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name : 'messages',
                columns : [
                    {
                        name : 'id',
                        type : 'uuid',
                        isPrimary : true
                    },
                    {
                        name : 'admin_id',
                        type : 'uuid',
                        isNullable : true,
                    },
                    {
                        name : 'user_id',
                        type : 'uiid',
                    },
                    {
                        name : 'text',
                        type : 'varchar'
                    },
                    {
                        name: 'created_at',
                        type : 'timestamp',
                        default : 'now()'
                    }
                ],
                foreignKeys : [
                    {
                        name : 'FKUser',
                        referencedTableName : 'users',
                        referencedColumnNames : ["id"],
                        columnNames : ['user_id'],
                        onDelete : 'SET NULL',
                        onUpdate : 'SET NULL'
                    }
                ]
            })
        )
    
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('messages')
    }


}