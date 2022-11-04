import { DatabaseService } from '../services/database.service'
import { DatabaseTable } from '../enums/database-table.enum'
import { OfficeMember } from '../models/office-member.model'

export class OfficeMemberDataAccessor {
    private databaseService: DatabaseService = DatabaseService.getInstance()
    private databaseTable = DatabaseTable.OfficeMember

    public async getAllOfficeMembers(): Promise<OfficeMember[]> {
        const offices = await this.databaseService.query(`SELECT * FROM ${this.databaseTable}`)
        return offices.map(x => new OfficeMember(x as Record<string, unknown>))
    }

    public async getOfficeMembers(officeId: number): Promise<OfficeMember[]> {
        const sqlQuery = `
            SELECT * FROM ${this.databaseTable} 
            WHERE office_id = ${officeId}
            ORDER BY first_name, last_name
        `

        const offices = await this.databaseService.query(sqlQuery)
        return offices.map(x => new OfficeMember(x as Record<string, unknown>))
    }

    public async createOfficeMember(officeMember: OfficeMember): Promise<void> {
        const sqlQuery = `
                INSERT INTO ${this.databaseTable} (office_id, first_name, last_name, avatar_id) 
                VALUES (
                    '${officeMember.officeId}', 
                    '${officeMember.firstName}', 
                    '${officeMember.lastName}', 
                    '${officeMember.avatarId}'
                )`

        await this.databaseService.query(sqlQuery)
    }

    public async updateOfficeMember(officeMemberId: number, officeMember: OfficeMember): Promise<void> {
        const sqlQuery = `
            UPDATE ${this.databaseTable} SET
                office_id = '${officeMember.officeId}',
                first_name = '${officeMember.firstName}',
                last_name = '${officeMember.lastName}',
                avatar_id = '${officeMember.avatarId}'
            WHERE id = ${officeMemberId}
        `

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