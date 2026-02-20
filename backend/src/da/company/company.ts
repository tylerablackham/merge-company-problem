import type {Company} from "../types.js";
import data from "./data.json" with { type: "json" }

const companies = new Map<number, Company>

export function initCompany() {
  for (const c of data) {
    companies.set(c.id, c)
  }
  return {
    getById,
    updateById,
    deleteById
  }
}

export function getById(id: number) {
  return companies.get(id) ?? null
}

export function updateById(id: number, company: Company) {
  companies.set(id, company)
}

export function deleteById(id: number) {
  companies.delete(id)
}

