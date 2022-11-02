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

    public createOffice(office: Office): Promise<any> {
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

        return this.databaseService.query(sqlQuery)
    }

    public deleteOffice(officeId: number): Promise<any[]> {
        const sqlQuery = `
            DELETE FROM ${this.databaseTable}
            WHERE id = ${officeId}
        `

        return this.databaseService.query(sqlQuery)
    }
}