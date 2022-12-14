import { Client } from 'pg'
import { DatabaseTable } from '../enums/database-table.enum'
import { DatabaseError } from '../errors/app-errors'

export class DatabaseService {
    private static instance: DatabaseService

    private dbClient: Client

    private constructor() {
        this.connectToDatabase().then(() => {
            return this.initializeDatabase()
        }).catch(error => {
            // eslint-disable-next-line no-console
            console.error(new DatabaseError(error, this.constructor.name))
        })
    }

    public static getInstance(): DatabaseService {
        if (!DatabaseService.instance) {
            DatabaseService.instance = new DatabaseService()
        }

        return DatabaseService.instance
    }

    private async connectToDatabase(): Promise<void> {
        this.dbClient = new Client({
            host: 'localhost',
            user: 'postgres',
            password: 'postgres',
            database: 'officemanagerdb',
            port: 5432
        })
        await this.dbClient.connect()
        // eslint-disable-next-line no-console
        console.log('DatabaseService: Successfully connected to database')
    }

    private async initializeDatabase(): Promise<void> {
        const promises: Promise<any>[] = []
        promises.push(this.query(`
           CREATE TABLE IF NOT EXISTS ${DatabaseTable.Office} (
                id SERIAL PRIMARY KEY,
                name VARCHAR(50) NOT NULL, 
                address VARCHAR(120) NOT NULL, 
                phone_number VARCHAR(10) NOT NULL, 
                email_address VARCHAR(70) NOT NULL, 
                maximum_capacity INTEGER NOT NULL, 
                colour VARCHAR(10) NOT NULL
           )
        `))
        promises.push(this.query(`
            CREATE TABLE IF NOT EXISTS ${DatabaseTable.OfficeMember} (
                id SERIAL PRIMARY KEY,
                office_id INTEGER REFERENCES ${DatabaseTable.Office} (id) NOT NULL,
                first_name VARCHAR(50) NOT NULL,
                last_name VARCHAR(50) NOT NULL,
                avatar_id INTEGER NOT NULL
            )
        `))
        await Promise.all(promises)

        // eslint-disable-next-line no-console
        console.log('Database Service: Successfully initialized database')
    }

    public async query(sqlQuery: string): Promise<any[]> {
        const result = await this.dbClient.query(sqlQuery)
        if (result?.command?.toUpperCase() === 'SELECT') {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            return result.rows
        }

        return null
    }
}