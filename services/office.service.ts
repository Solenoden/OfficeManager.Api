import { OfficeDataAccessor } from '../data-accessors/office.data-accessor'
import { Office } from '../models/office.model'

export class OfficeService {
    private officeDataAccessor = new OfficeDataAccessor()

    public async getAllOffices(): Promise<Office[]> {
        // TODO: Possibly add office workers to the offices object
        return this.officeDataAccessor.getAllOffices()
    }

    public async createOffice(office: Office): Promise<void> {
        return this.officeDataAccessor.createOffice(office)
    }

    public async deleteOffice(officeId: number): Promise<void> {
        // TODO: Delete related office workers once implemented
        return this.officeDataAccessor.deleteOffice(officeId)
    }
}