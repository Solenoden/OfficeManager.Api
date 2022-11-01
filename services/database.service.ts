import { Client } from 'pg'
import { DatabaseTable } from '../enums/database-table.enum'
import { DatabaseError } from '../errors/app-errors'

export class DatabaseService {
    private static instance: DatabaseService

    private dbClient: Client

    private constructor() {
        this.connectToDatabase().then(() => {
            void this.initializeDatabase()
        }).catch(error => {
            // eslint-disable-next-line no-console
            console.error(new DatabaseError(error, this.constructor.name))
        })
    }

    public static getInstance(): DatabaseService {
        if (DatabaseService.instance) {
            DatabaseService.instance = new DatabaseService()
        }

        return DatabaseService.instance
    }

    private async connectToDatabase(): Promise<void> {
        this.dbClient = new Client({
            user: 'postgres',
            host: 'localhost',
            password: 'postgres',
            port: 5432
        })
        await this.dbClient.connect()
    }

    private async initializeDatabase(): Promise<void> {
        await this.dbClient.query(`CREATE TABLE IF NOT EXISTS ${DatabaseTable.Office}`)
        await this.dbClient.query(`CREATE TABLE IF NOT EXISTS ${DatabaseTable.OfficeWorker}`)
    }
}