import { apiFetch } from "./client";
import type {Company, CompanyResponse} from "@merge-company-problem/shared";

export async function getCompany(id: number): Promise<CompanyResponse> {
  return apiFetch<CompanyResponse>(`/company/${id}`)
}

export async function mergeCompanies(id1: number, id2: number, info: Company): Promise<CompanyResponse> {
  return apiFetch<CompanyResponse>(`/company/merge?id1=${id1}&id2=${id2}`, {
    method: 'PUT',
    body: JSON.stringify(info)
  })
}