import { apiFetch } from "./client";
import type {Branch, Company, User} from "@merge-company-problem/shared";

type CompanyResponse = {
  success: boolean
  company: Company
  users: User[]
  branches: Branch[]
}

export async function getCompany(id: string): Promise<CompanyResponse> {
  return apiFetch<CompanyResponse>(`/company/${id}`)
}

export async function mergeCompanies(id1: string, id2: string, info: Company): Promise<CompanyResponse> {
  return apiFetch<CompanyResponse>(`/company/merge?id1=${id1}&id2=${id2}`, {
    method: 'PUT',
    body: JSON.stringify(info)
  })
}