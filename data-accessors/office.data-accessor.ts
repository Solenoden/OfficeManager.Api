import { DatabaseService } from '../services/database.service'
import { DatabaseTable } from '../enums/database-table.enum'
import { Office } from '../models/office.model'

export class OfficeDataAccessor {
    private databaseService: DatabaseService = DatabaseService.getInstance()
    private databaseTable = DatabaseTable.Office

    public async getAllOffices(): Promise<Office[]> {
        const offices = await this.databaseService.query(`SELECT * FROM ${this.databaseTable}`)
        return offices.map(x => new Office(x as Record<string, unknown>))
    }

    public async createOffice(office: Office): Promise<void> {
        const sqlQuery = `
                INSERT INTO ${this.databaseTable} (name, address, phone_number, email_address, maximum_capacity, colour) 
                VALUES (
                    '${office.name}', 
                    '${office.address}', 
                    '${office.phoneNumber}', 
                    '${office.emailAddress}', 
                    ${office.maximumCapacity}, 
                    '${office.colour}'
                )`

        await this.databaseService.query(sqlQuery)
    }

    public async deleteOffice(officeId: number): Promise<void> {
        const sqlQuery = `
            DELETE FROM ${this.databaseTable}
            WHERE id = ${officeId}
        `

        await this.databaseService.query(sqlQuery)
    }
}