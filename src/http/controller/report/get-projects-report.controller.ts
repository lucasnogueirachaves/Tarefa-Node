import type { FastifyReply, FastifyRequest } from "fastify"
import { makeGetProjectsReportUseCase } from "@/use-cases/factories/make-get-projects-report-use-case.js"

export async function getProjectsReport(_request: FastifyRequest, reply: FastifyReply) {
    const getProjectsReportUseCase = makeGetProjectsReportUseCase()
    const report = await getProjectsReportUseCase.execute()

    return reply.status(200).send(report)
}