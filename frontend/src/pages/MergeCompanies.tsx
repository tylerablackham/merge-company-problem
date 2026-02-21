import {useState} from "react";
import type {Branch, Company, User} from "@merge-company-problem/shared";
import {CompanyInfo} from "../components/CompanyInfo.tsx";
import {getCompany, mergeCompanies} from "../api/companyApi.ts";
import './MergeCompanies.css'

export function MergeCompanies() {
  const [leftId, setLeftId] = useState<string>("1")
  const [rightId, setRightId] = useState<string>("2")

  const [leftData, setLeftData] = useState<{
    company: Company | null
    users: User[]
    branches: Branch[]
  } | null>(null)
  const [rightData, setRightData] = useState<{
    company: Company | null
    users: User[]
    branches: Branch[]
  } | null>(null)
  const [mergedData, setMergedData] = useState<{
    company: Company | null
    users: User[]
    branches: Branch[]
  } | null>(null)

  const [companyUpdate, setCompanyUpdate] = useState<Company>({
    id: 0,
    name: "",
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      zip: ""
    }
  })

  const [loading, setLoading] = useState(false)
  const [merging, setMerging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function startMerge() {
    setCompanyUpdate({
      id: 0,
      name: "",
      address: {
        line1: "",
        line2: "",
        city: "",
        state: "",
        zip: ""
      }
    })
    setMergedData(null)
    setError(null)
    setMerging(true)
    const a = Number(leftId)
    const b = Number(rightId)

    if (!Number.isFinite(a) || !Number.isFinite(b) || a <= 0 || b <= 0) {
      setError("Enter two positive numeric company IDs.")
      return
    }

    setLoading(true)
    setLeftData(null)
    setRightData(null)

    try {
      const [la, rb] = await Promise.all([getCompany(a), getCompany(b)])
      setLeftData(la)
      setRightData(rb)
    } catch (err) {
      console.error(err)
      setError("Error fetching company data.")
      setMerging(false)
    } finally {
      setLoading(false)
    }
  }

  async function cancelMerge() {
    setMerging(false)
    setLeftData(null)
    setRightData(null)
  }

  async function handleMerge() {
    setError(null)
    if (!companyUpdate.name || !companyUpdate.address.line1 || !companyUpdate.address.city || !companyUpdate.address.state || !companyUpdate.address.zip) {
      setError("Please fill out all required fields.")
      return
    }
    companyUpdate.id = Number(leftId)
    try {
      const response = await mergeCompanies(companyUpdate.id, Number(rightId), companyUpdate)
      setMergedData({
        company: response.company,
        users: response.users,
        branches: response.branches
      })
    } catch (err) {
      console.error(err)
      setError("Error merging company data.")
      setMergedData(null)
    } finally {
      setMerging(false)
    }
  }

  return (
    <div className="cm-root">
      <div className="cm-controls">
        <label className="cm-field">
          <span className="cm-label">Company ID A</span>
          <input
            className="cm-input"
            type="number"
            min={1}
            value={leftId}
            onChange={(e) => setLeftId(e.target.value)}
          />
        </label>

        <label className="cm-field">
          <span className="cm-label">Company ID B</span>
          <input
            className="cm-input"
            type="number"
            min={1}
            value={rightId}
            onChange={(e) => setRightId(e.target.value)}
          />
        </label>

        <button className="cm-button" onClick={startMerge} disabled={loading}>
          {loading ? "Loading…" : "Start Merge"}
        </button>
      </div>

      {error && <div className="cm-error">{error}</div>}

      {merging ? (
        <div className="cm-grid">
          <div className="cm-col">
            {loading && !leftData ? (
              <div className="cm-placeholder">Loading…</div>
            ) : (
              <CompanyInfo
                company={leftData?.company ?? null}
                users={leftData?.users ?? []}
                branches={leftData?.branches ?? []}
              />
            )}
          </div>

          <div className="cm-col">
            {loading && !rightData ? (
              <div className="cm-placeholder">Loading…</div>
            ) : (
              <CompanyInfo
                company={rightData?.company ?? null}
                users={rightData?.users ?? []}
                branches={rightData?.branches ?? []}
              />
            )}
          </div>

          <div className="cm-col">
            <div>
              <label className="cm-label">Company Name</label>
              <input className="cm-input" type="text" value={companyUpdate.name} onChange={(e) => setCompanyUpdate({...companyUpdate, name: e.target.value})} />
            </div>

            <div>
              <label className="cm-label">Address Line 1</label>
              <input className="cm-input" type="text" value={companyUpdate.address.line1} onChange={(e) => setCompanyUpdate({...companyUpdate, address: {...companyUpdate.address, line1: e.target.value}})}/>
            </div>

            <div>
              <label className="cm-label">Address Line 2 (optional)</label>
              <input className="cm-input" type="text" value={companyUpdate.address.line2} onChange={(e) => setCompanyUpdate({...companyUpdate, address: {...companyUpdate.address, line2: e.target.value}})}/>
            </div>
          </div>

          <div className="cm-col">
            <div>
              <label className="cm-label">City</label>
              <input className="cm-input" type="text" value={companyUpdate.address.city} onChange={(e) => setCompanyUpdate({...companyUpdate, address: {...companyUpdate.address, city: e.target.value}})}/>
            </div>

            <div>
              <label className="cm-label">State</label>
              <input className="cm-input" type="text" value={companyUpdate.address.state} onChange={(e) => setCompanyUpdate({...companyUpdate, address: {...companyUpdate.address, state: e.target.value}})}/>
            </div>

            <div>
              <label className="cm-label">Zip</label>
              <input className="cm-input" type="text" value={companyUpdate.address.zip} onChange={(e) => setCompanyUpdate({...companyUpdate, address: {...companyUpdate.address, zip: e.target.value}})}/>
            </div>
          </div>

          <button className="cm-button" onClick={cancelMerge}>Cancel</button>
          <button className="cm-button" onClick={handleMerge}>Merge</button>
        </div>

      ) : <div></div>}

      {mergedData !== null && (
        <div className="cm-grid">
          <h2>Successful Merge</h2>
          <div className="cm-col">
            <CompanyInfo
              company={mergedData.company}
              users={mergedData.users}
              branches={mergedData.branches}
            />
          </div>
        </div>
      )}

    </div>
  )
}