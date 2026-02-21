import type {Company, User, Branch} from "@merge-company-problem/shared";
import './CompanyInfo.css'

interface CompanyInfoProps {
  company: Company | null
  users: User[]
  branches: Branch[]
}

export function CompanyInfo(props: CompanyInfoProps) {
  const {company, users, branches} = props

  if (!company) {
    return (
      <div className="cc-card">
        <div className="cc-empty">No company found</div>
      </div>
    )
  }

  return (
    <div className="cc-card" data-company-id={company.id}>
      <h2 className="cc-title">{company.name}</h2>

      <div className="cc-section">
        <div className="cc-section-title">Address</div>
        <div className="cc-address">
          <div>{company.address.line1}</div>
          {company.address.line2 && <div>{company.address.line2}</div>}
          <div>
            {company.address.city}, {company.address.state} {company.address.zip}
          </div>
        </div>
      </div>

      <div className="cc-section">
        <div className="cc-section-title">Users</div>
        {users.length ? (
          <ul className="cc-list">
            {users.map((u) => (
              <li key={u.id}>
                {u.firstName} {u.lastName}
              </li>
            ))}
          </ul>
        ) : (
          <div className="cc-empty">No users</div>
        )}
      </div>

      <div className="cc-section">
        <div className="cc-section-title">Branches</div>
        {branches.length ? (
          <ul className="cc-list">
            {branches.map((b) => (
              <li key={b.id}>{b.name}</li>
            ))}
          </ul>
        ) : (
          <div className="cc-empty">No branches</div>
        )}
      </div>
    </div>
  )
}