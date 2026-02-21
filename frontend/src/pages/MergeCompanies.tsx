import {useState} from "react";
import type {Branch, Company, User} from "@merge-company-problem/shared";
import {CompanyInfo} from "../components/CompanyInfo.tsx";
import {getCompany} from "../api/companyApi.ts";

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

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleMerge() {
    setError(null)
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
    } finally {
      setLoading(false)
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

        <button className="cm-button" onClick={handleMerge} disabled={loading}>
          {loading ? "Loading…" : "Merge"}
        </button>
      </div>

      {error && <div className="cm-error">{error}</div>}

      <div className="cm-grid">
        <div className="cm-col">
          <div className="cm-col-title">Company A</div>
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
          <div className="cm-col-title">Company B</div>
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
      </div>
    </div>
  )
}