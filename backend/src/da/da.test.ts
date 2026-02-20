import {beforeEach, describe, it} from "node:test";
import assert from "node:assert/strict";
import {type Da, initDa} from "./da.js";

let da: Da

describe('DA Test Suite', () => {
  beforeEach(() => {
    da = initDa()
  })

  describe('Company DA Tests', () => {
    it('Get By Id', () => {
      const notNullResult = da.company.getById(4)
      if (!notNullResult) {
        assert.fail('Expected to get company, but got null')
      }
      assert.equal(notNullResult.id, 4)
      assert.equal(notNullResult.name, 'Summit Peak Technology')

      const nullResult = da.company.getById(100)
      assert.equal(nullResult, null, 'Expected to get null, but got company')
    })

    it('Update By Id', () => {
      const newCompany = {
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
      da.company.updateById(1, newCompany)
      const updatedResult = da.company.getById(1)
      if (!updatedResult) {
        assert.fail('Expected to get company, but got null')
      }
      assert.deepEqual(updatedResult, newCompany, 'Expected company to have been updated')
    })

    it('Delete By Id', () => {
      da.company.deleteById(1)
      const deletedResult = da.company.getById(1)
      assert.equal(deletedResult, null, 'Expected company to have been deleted')
      const companyUsers = da.user.getByCompanyId(1)
      assert.equal(companyUsers.length, 0, 'Expected company users to have been deleted')
      const companyBranches = da.branch.getByCompanyId(1)
      assert.equal(companyBranches.length, 0, 'Expected company branches to have been deleted')
    })
  })

  describe('User DA Tests', () => {
    it('Get By Id', () => {
      const notNullResult = da.user.getById(1)
      if (!notNullResult) {
        assert.fail('Expected to get user, but got null')
      }
      assert.equal(notNullResult.id, 1)
      assert.equal(notNullResult.firstName, 'Emily')

      const nullResult = da.user.getById(100)
      assert.equal(nullResult, null, 'Expected to get null, but got user')
    })

    it('Get By Company Id', () => {
      const result = da.user.getByCompanyId(1)
      assert.equal(result.filter(u => u.companyId === 1).length, result.length, 'Expected all users returned to be from company')
    })

    it('Update By Id', () => {
      const newUser = {
        id: 1,
        firstName: 'New First Name',
        lastName: 'New Last Name',
        companyId: 1
      }
      da.user.updateById(1, newUser)
      const updatedResult = da.user.getById(1)
      if (!updatedResult) {
        assert.fail('Expected to get user, but got null')
      }
      assert.deepEqual(updatedResult, newUser, 'Expected user to have been updated')
    })
  })

  describe('Branch DA Tests', () => {
    it('Get By Id', () => {
      const notNullResult = da.branch.getById(1)
      if (!notNullResult) {
        assert.fail('Expected to get branch, but got null')
      }
      assert.equal(notNullResult.id, 1)
      assert.equal(notNullResult.name, 'Head Office')

      const nullResult = da.branch.getById(100)
      assert.equal(nullResult, null, 'Expected to get null, but got branch')
    })

    it('Get By Company Id', () => {
      const result = da.branch.getByCompanyId(1)
      assert.equal(result.filter(b => b.companyId === 1).length, result.length, 'Expected all branches returned to be from company')
    })

    it('Update By Id', () => {
      const newBranch = {
        id: 1,
        name: 'New Name',
        companyId: 1
      }
      da.branch.updateById(1, newBranch)
      const updatedResult = da.branch.getById(1)
      if (!updatedResult) {
        assert.fail('Expected to get branch, but got null')
      }
      assert.deepEqual(updatedResult, newBranch, 'Expected branch to have been updated')
    })
  })
})