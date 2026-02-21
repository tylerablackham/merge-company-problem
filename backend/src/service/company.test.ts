import {type Da, initDa} from "../da/da.js";
import {beforeEach, describe, it} from "node:test";
import {getCompany, mergeCompanies} from "./company.js";
import assert from "node:assert/strict";

let da: Da

describe('Service Layer Test Suite', () => {
  beforeEach(() => {
    da = initDa()
  })

  describe('Get Company', () => {
    it("getCompany() Returns Response For Existing Company", () => {
      const response = getCompany(1, da)
      if (response === null) {
        assert.fail('Expected to get company response, but got null')
      }
      assert.equal(response.success, true, 'Expected success to be true')
      assert.equal(response.company.id, 1, 'Expected company id to be 1')
      assert.equal(response.users.filter(u => u.companyId !== 1).length, 0, 'Expected all users to be from correct company')
      assert.equal(response.branches.filter(b => b.companyId !== 1).length, 0, 'Expected all branches to be from correct company')
    })

    it("GetCompany() Returns No Response For Non-Existing Company", () => {
      const response = getCompany(-1, da)
      assert.equal(response, null, 'Expected to get null, but got company response')
    })
  })

  describe('Merge Companies', () => {
    it("mergeCompanies() Returns Correct Response", () => {
      const mergedData = {
        id: 1,
        name: 'New Name',
        address: {
          line1: 'New Line 1',
          line2: 'New Line 2',
          city: 'New City',
          state: 'New State',
          zip: '12345'
        }
      }
      const oldUsers = da.user.getByCompanyId(4).map(u => u.id)
      const oldBranches = da.branch.getByCompanyId(4).map(b => b.id)

      const response = mergeCompanies(1, 4, mergedData, da)

      const mergedCompany = da.company.getById(1)
      assert.deepEqual(mergedCompany, response.company, 'Expected company to have the merged data')

      const mergedUsers = da.user.getByCompanyId(1)
      assert.equal(mergedUsers.length, response.users.length, 'Expected users to have been merged')
      assert.equal(
        oldUsers.every(id => mergedUsers.map(u => u.id).includes(id)),
        true,
        'Expected users from old company to have been merged'
      )

      const mergedBranches = da.branch.getByCompanyId(1)
      assert.equal(mergedBranches.length, response.branches.length, 'Expected branches to have been merged')
      assert.equal(
        oldBranches.every(id => mergedBranches.map(b => b.id).includes(id)),
        true,
        'Expected branches from old company to have been merged'
      )
    })
  })
})