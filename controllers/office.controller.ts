import { EndpointControllerInterface } from '../interfaces/endpoint-controller.interface'
import { Express, RequestHandler, Request, Response } from 'express'
import { OfficeService } from '../services/office.service'
import { ErrorHandlerService } from '../services/error-handler.service'
import { Office } from '../models/office.model'

export class OfficeController implements EndpointControllerInterface {
    private officeService = new OfficeService()
    private errorHandlerService = new ErrorHandlerService()

    registerEndpoints(app: Express): void {
        app.get('/api/v1/office', this.getAllOffices.bind(this) as RequestHandler)
        app.put('/api/v1/office', this.createOffice.bind(this) as RequestHandler)
        app.patch('/api/v1/office/:officeId', this.updateOffice.bind(this) as RequestHandler)
        app.delete('/api/v1/office/:officeId', this.deleteOffice.bind(this) as RequestHandler)
    }

    private async getAllOffices(request: Request, response: Response): Promise<void> {
        try {
            const result = await this.officeService.getAllOffices()
            response.send(result)
        } catch (error) {
            this.errorHandlerService.handleError(response, error)
        }
    }

    private async createOffice(request: Request, response: Response): Promise<void> {
        try {
            const officeToCreate = new Office(request.body as { [key: string]: any })
            const result = await this.officeService.createOffice(officeToCreate)
            response.send(result)
        } catch (error) {
            this.errorHandlerService.handleError(response, error)
        }
    }

    private async updateOffice(request: Request, response: Response): Promise<void> {
        try {
            const officeId = Number(request.params.officeId)
            const officeData = new Office(request.body as { [key: string]: any })
            const result = await this.officeService.updateOffice(officeId, officeData)
            response.send(result)
        } catch (error) {
            this.errorHandlerService.handleError(response, error)
        }
    }

    private async deleteOffice(request: Request, response: Response): Promise<void> {
        try {
            const officeId = Number(request.params.officeId)
            const result = await this.officeService.deleteOffice(officeId)
            response.send(result)
        } catch (error) {
            this.errorHandlerService.handleError(response, error)
        }
    }
}