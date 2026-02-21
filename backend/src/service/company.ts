import {Da} from "../da/da.js";
import {Company, CompanyResponse} from "@merge-company-problem/shared";

export function getCompany(id: number, da: Da): CompanyResponse | null {
  const company = da.company.getById(id)
  if (!company) {
    return null
  }
  const users = da.user.getByCompanyId(company.id)
  const branches = da.branch.getByCompanyId(company.id)
  return {success: true, company, users, branches}
}

export function mergeCompanies(id1: number, id2: number, mergedData: Company, da: Da): CompanyResponse {
  // update company
  da.company.updateById(id1, mergedData)
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
  mergedData.id = id1
  return { success: true, company: mergedData, users, branches }
}