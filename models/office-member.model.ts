export class OfficeMember {
    id: number
    officeId: number
    firstName: string
    lastName: string
    avatarId: number

    constructor(jsonObject: {
        id?: number,
        officeId?: number,
        office_id?: number,
        firstName?: string,
        first_name?: string,
        lastName?: string,
        last_name?: string,
        avatarId?: number,
        avatar_id?: number,
    }) {
        this.id = jsonObject.id
        this.officeId = jsonObject.officeId || jsonObject.office_id
        this.firstName = jsonObject.firstName || jsonObject.first_name
        this.lastName = jsonObject.lastName || jsonObject.last_name
        this.avatarId = jsonObject.avatarId || jsonObject.avatar_id
    }
}