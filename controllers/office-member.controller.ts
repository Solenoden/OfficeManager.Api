import { EndpointControllerInterface } from '../interfaces/endpoint-controller.interface'
import { Express, RequestHandler, Request, Response } from 'express'
import { ErrorHandlerService } from '../services/error-handler.service'
import { OfficeMemberService } from '../services/office-member.service'
import { OfficeMember } from '../models/office-member.model'

export class OfficeMemberController implements EndpointControllerInterface {
    private officeMemberService = new OfficeMemberService()
    private errorHandlerService = new ErrorHandlerService()

    registerEndpoints(app: Express): void {
        app.get('/api/v1/office-member', this.getOfficeMembers.bind(this) as RequestHandler)
        app.put('/api/v1/office-member', this.createOfficeMember.bind(this) as RequestHandler)
        app.patch('/api/v1/office-member/:officeMemberId', this.updateOfficeMember.bind(this) as RequestHandler)
        app.delete('/api/v1/office-member/:officeMemberId', this.deleteOfficeMember.bind(this) as RequestHandler)
    }

    private async getOfficeMembers(request: Request, response: Response): Promise<void> {
        try {
            const officeId = Number(request.query.officeId)
            const result = await this.officeMemberService.getOfficeMembers(officeId)
            response.send(result)
        } catch (error) {
            this.errorHandlerService.handleError(response, error)
        }
    }

    private async createOfficeMember(request: Request, response: Response): Promise<void> {
        try {
            const officeMemberToCreate = new OfficeMember(request.body as { [key: string]: any })
            const result = await this.officeMemberService.createOfficeMember(officeMemberToCreate)
            response.send(result)
        } catch (error) {
            this.errorHandlerService.handleError(response, error)
        }
    }

    private async updateOfficeMember(request: Request, response: Response): Promise<void> {
        try {
            const officeMemberId = Number(request.params.officeMemberId)
            const officeMemberData = new OfficeMember(request.body as { [key: string]: any })
            const result = await this.officeMemberService.updateOfficeMember(officeMemberId, officeMemberData)
            response.send(result)
        } catch (error) {
            this.errorHandlerService.handleError(response, error)
        }
    }

    private async deleteOfficeMember(request: Request, response: Response): Promise<void> {
        try {
            const officeId = Number(request.params.officeMemberId)
            const result = await this.officeMemberService.deleteOfficeMember(officeId)
            response.send(result)
        } catch (error) {
            this.errorHandlerService.handleError(response, error)
        }
    }
}