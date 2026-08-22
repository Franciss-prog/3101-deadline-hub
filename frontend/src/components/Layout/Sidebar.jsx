import { Link, useNavigate } from "react-router-dom"

function Sidebar() {

  const navigate = useNavigate()

  const handleLogout = () => {
    // TODO: clear auth/session state here once you have real auth
    navigate("/login")
  }

  return (
    <aside className="sidebar">
      <div className="userInfo">
        <span>Student</span>

        <div>
          <strong>Student</strong>
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

      <button className="logoutButton" onClick={handleLogout}>
        Logout
      </button>

    </aside>
  )
}

export default Sidebar