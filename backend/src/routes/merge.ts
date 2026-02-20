import { Type } from "@sinclair/typebox";
import {FastifyTypebox} from "../server.js";
import {Company} from "../da/types.js";
import {Da} from "../da/da.js";

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

export function registerMergeRoutes(fastify: FastifyTypebox, da: Da) {
  fastify.put('/merge/company', MergeCompanyRequest, async (request, reply) => {
    const { id1, id2 } = request.query;
    // create the updated company
    const company: Company = {
      id: id1,
      ...request.body
    }
    // update company
    da.company.updateById(id1, company)
    // update users and branches connected to old company
    const users = da.user.getByCompanyId(id2)
    for (const user of users) {
      user.companyId = id1
      da.user.updateById(user.id, user)
    }
    const branches = da.branch.getByCompanyId(id2)
    for (const branch of branches) {
      branch.companyId = id1
      da.branch.updateById(branch.id, branch)
    }
    // delete old company
    da.company.deleteById(id2)

    reply.send({ success: true, mergedCompany: da.company.getById(id1) }).code(200)
  });
}