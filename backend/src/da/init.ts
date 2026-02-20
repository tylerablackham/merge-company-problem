import {initBranch} from "./branch/branch.js";
import {initUser} from "./user/user.js";
import {initCompany} from "./company/company.js";

export type Da = ReturnType<typeof initDa>

export function initDa() {
  const company = initCompany()
  const user = initUser()
  const branch = initBranch()
  return {
    company,
    user,
    branch
  }
}