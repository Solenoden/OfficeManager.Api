export class Office {
    id: number
    name: string
    address: string
    phoneNumber: string
    emailAddress: string
    maximumCapacity: number
    colour: string

    constructor(jsonObject: {
        id?: number,
        name?: string,
        address?: string,
        phoneNumber?: string,
        phone_number?: string,
        emailAddress?: string,
        email_address?: string,
        maximumCapacity?: number,
        maximum_capacity?: number,
        colour?: string
    }) {
        this.id = jsonObject.id
        this.name = jsonObject.name
        this.address = jsonObject.address
        this.phoneNumber = jsonObject.phoneNumber || jsonObject.phone_number
        this.emailAddress = jsonObject.emailAddress || jsonObject.email_address
        this.maximumCapacity = jsonObject.maximumCapacity || jsonObject.maximum_capacity
        this.colour = jsonObject.colour
    }
}