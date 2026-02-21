import { Type } from "@sinclair/typebox";
import {FastifyTypebox} from "../server.js";
import {Da} from "../da/da.js";
import {Company, CompanyResponse} from "@merge-company-problem/shared";
import {getCompany, mergeCompanies} from "../service/company.js";

export function registerCompanyRoutes(fastify: FastifyTypebox, da: Da) {
  fastify.get('/company/:id', GetCompanyRequest, async (request, reply) => {
    const response = getCompany(request.params.id, da)
    if (response == null) {
      reply.send({ success: false, message: 'company not found' }).code(404)
      return
    }
    reply.send(response).code(200)
  })

  fastify.put('/company/merge', MergeCompanyRequest, async (request, reply) => {
    const { id1, id2 } = request.query;
    // create the updated company
    const mergedData: Company = {
      id: id1,
      ...request.body
    }
    const response = mergeCompanies(id1, id2, mergedData, da)
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