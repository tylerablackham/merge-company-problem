import data from "./data.json" with { type: "json" }
import {User} from "@merge-company-problem/shared";

const users = new Map<number, User>()

export function initUser() {
  for (const u of data) {
    users.set(u.id, u)
  }
  return {
    getById,
    getByCompanyId,
    updateById
  }
}

export function getById(id: number) {
  return users.get(id) ?? null
}

export function getByCompanyId(companyId: number) {
  return Array.from(users.values()).filter(u => u.companyId === companyId)
}

export function updateById(id: number, user: User) {
  users.set(id, user)
}

export function deleteById(id: number) {
  users.delete(id)
}

export function deleteByCompanyId(companyId: number) {
  for (const u of getByCompanyId(companyId)) {
    deleteById(u.id)
  }
}

