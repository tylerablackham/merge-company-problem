import { Type } from "@sinclair/typebox";
import {FastifyTypebox} from "../server.js";
import {Da} from "../da/da.js";
import {Company, CompanyResponse} from "@merge-company-problem/shared";

export function registerCompanyRoutes(fastify: FastifyTypebox, da: Da) {
  fastify.get('/company/:id', GetCompanyRequest, async (request, reply) => {
    const company = da.company.getById(request.params.id)
    if (!company) {
      reply.send({ success: false, message: 'company not found' }).code(404)
      return
    }
    const users = da.user.getByCompanyId(company.id)
    const branches = da.branch.getByCompanyId(company.id)
    const response: CompanyResponse = { success: true, company, users, branches }
    reply.send(response).code(200)
  })

  fastify.put('/company/merge', MergeCompanyRequest, async (request, reply) => {
    const { id1, id2 } = request.query;
    // create the updated company
    const company: Company = {
      id: id1,
      ...request.body
    }
    // update company
    da.company.updateById(id1, company)
    // update users and branches connected to old company
    const oldUsers = da.user.getByCompanyId(id2)
    for (const user of oldUsers) {
      user.companyId = id1
      da.user.updateById(user.id, user)
    }
    const oldBranches = da.branch.getByCompanyId(id2)
    for (const branch of oldBranches) {
      branch.companyId = id1
      da.branch.updateById(branch.id, branch)
    }
    // delete old company
    da.company.deleteById(id2)

    const users = da.user.getByCompanyId(id1)
    const branches = da.branch.getByCompanyId(id1)
    const mergedCompany = da.company.getById(id1)
    if (!mergedCompany) {
      reply.send({ success: false, message: 'error merging company' }).code(500)
      return
    }
    const response: CompanyResponse = { success: true, company: mergedCompany, users, branches }
    reply.send(response).code(200)
  });
}

const GetCompanyRequest = {
  schema: {
    params: Type.Object({
      id: Type.Number()
    })
  }
}

const MergeCompanyRequest = {
  schema: {
    querystring: Type.Object({
      id1: Type.Number(),
      id2: Type.Number()
    }),
    body: Type.Object({
      name: Type.String(),
      address: Type.Object({
        line1: Type.String(),
        line2: Type.Optional(Type.String()),
        city: Type.String(),
        state: Type.String(),
        zip: Type.String()
      })
    })
  }
}