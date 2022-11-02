import { OfficeDataAccessor } from '../data-accessors/office.data-accessor'
import { Office } from '../models/office.model'
import { OfficeMemberService } from './office-member.service'
import { OfficeMember } from '../models/office-member.model'
import { UnexpectedError } from '../errors/app-errors'

export class OfficeService {
    private officeDataAccessor = new OfficeDataAccessor()
    private officeMemberService = new OfficeMemberService()

    public async getAllOffices(): Promise<Office[]> {
        try {
            const [offices, officeMembers]: [Office[], OfficeMember[]] = await Promise.all([
                this.officeDataAccessor.getAllOffices(),
                this.officeMemberService.getAllOfficeMembers()
            ])

            offices.forEach(office => {
                office.officeMembers = officeMembers.filter(officeMember => officeMember.officeId === office.id)
            })

            return offices
        } catch (error) {
            throw new UnexpectedError(error, this.constructor.name + '.getAllOffices()')
        }
    }

    public createOffice(office: Office): Promise<void> {
        return this.officeDataAccessor.createOffice(office)
    }

    public async deleteOffice(officeId: number): Promise<void> {
        try {
            const officeMembers: OfficeMember[] = await this.officeMemberService.getOfficeMembers(officeId)
            const deletionPromises = officeMembers.map(officeMember => {
                return this.officeMemberService.deleteOfficeMember(officeMember.id)
            })

            await Promise.all(deletionPromises)
            await this.officeDataAccessor.deleteOffice(officeId)
        } catch (error) {
            throw new UnexpectedError(error, this.constructor.name + '.deleteOffice()')
        }

    }
}