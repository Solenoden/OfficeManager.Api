import { OfficeMemberDataAccessor } from '../data-accessors/office-member.data-accessor'
import { OfficeMember } from '../models/office-member.model'

export class OfficeMemberService {
    private officeMemberDataAccessor = new OfficeMemberDataAccessor()

    public async getAllOfficeMembers(): Promise<OfficeMember[]> {
        return this.officeMemberDataAccessor.getAllOfficeMembers()
    }

    public async getOfficeMembers(officeId: number): Promise<OfficeMember[]> {
        return this.officeMemberDataAccessor.getOfficeMembers(officeId)
    }

    public async createOfficeMember(officeMember: OfficeMember): Promise<void> {
        // TODO: Add validation to prevent an office member being added to a full office
        return this.officeMemberDataAccessor.createOfficeMember(officeMember)
    }

    public async deleteOfficeMember(officeMemberId: number): Promise<void> {
        return this.officeMemberDataAccessor.deleteOfficeMember(officeMemberId)
    }
}