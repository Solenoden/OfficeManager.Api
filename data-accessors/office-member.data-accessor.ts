import { DatabaseService } from '../services/database.service'
import { DatabaseTable } from '../enums/database-table.enum'
import { OfficeMember } from '../models/office-member.model'

export class OfficeMemberDataAccessor {
    private databaseService: DatabaseService = DatabaseService.getInstance()
    private databaseTable = DatabaseTable.OfficeMember

    public async getOfficeMembers(officeId: number): Promise<OfficeMember[]> {
        const offices = await this.databaseService.query(`SELECT * FROM ${this.databaseTable} WHERE office_id = ${officeId}`)
        return offices.map(x => new OfficeMember(x as Record<string, unknown>))
    }

    public async createOfficeMember(office: OfficeMember): Promise<void> {
        const sqlQuery = `
                INSERT INTO ${this.databaseTable} (office_id, first_name, last_name, avatar_id) 
                VALUES (
                    '${office.officeId}', 
                    '${office.firstName}', 
                    '${office.lastName}', 
                    '${office.avatarId}'
                )`

        await this.databaseService.query(sqlQuery)
    }

    public async deleteOfficeMember(officeMemberId: number): Promise<void> {
        const sqlQuery = `
            DELETE FROM ${this.databaseTable}
            WHERE id = ${officeMemberId}
        `

        await this.databaseService.query(sqlQuery)
    }
}