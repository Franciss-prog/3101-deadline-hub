import { Link } from "react-router-dom"

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="userInfo">
        <span>JV</span>

        <div>
          <strong>JV</strong>
          <p>Welcome back!</p>
        </div>
      </div>

      <h2>Deadline Hub</h2>

      <nav>
        <Link to="/dashboard" className="active">Dashboard</Link>
        <Link to="/deadlines">Deadlines</Link>
        <Link to="/announcements">Announcements</Link>
        <Link to="/subjects">Subjects</Link>
      </nav>

    </aside>
  )
}

export default Sidebar