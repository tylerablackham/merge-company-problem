export type Company = {
  id : number
  name: string
  address: Address
}

export type Address = {
  line1: string
  line2?: string
  city: string
  state: string
  zip: string
}

export type User = {
  id: number
  firstName: string
  lastName: string
  companyId: number
}

export type Branch = {
  id: number
  name: string
  companyId: number
}