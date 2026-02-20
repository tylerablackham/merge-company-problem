
import data from "./data.json" with { type: "json" }
import {Branch} from "@merge-company-problem/shared";


const branches = new Map<number, Branch>()

export function initBranch() {
  for (const b of data) {
    branches.set(b.id, b)
  }
  return {
    getById,
    getByCompanyId,
    updateById
  }
}

export function getById(id: number) {
  return branches.get(id) ?? null
}

export function getByCompanyId(companyId: number) {
  return Array.from(branches.values()).filter(b => b.companyId === companyId)
}

export function updateById(id: number, branch: Branch) {
  branches.set(id, branch)
}

export function deleteById(id: number) {
  branches.delete(id)
}

export function deleteByCompanyId(companyId: number) {
  for (const b of getByCompanyId(companyId)) {
    deleteById(b.id)
  }
}