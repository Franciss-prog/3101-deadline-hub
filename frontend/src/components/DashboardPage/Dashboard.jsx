import Sidebar from '../Layout/Sidebar'
import Deadlines from './Deadlines'
import Announcements from './Announcements'

function Dashboard() {
  return (
    <div className="dashboard">

      <main className="dashboardContent">

        <header className="dashboardHeader">
          <div>
            <h1>Dashboard</h1>
          </div>

        </header>

        <section className="summaryCards">
          <div className="summaryCard">
            <h2>5</h2>
            <p>Deadlines</p>
          </div>

          <div className="summaryCard">
            <h2>2</h2>
            <p>Due Soon</p>
          </div>

          <div className="summaryCard">
            <h2>3</h2>
            <p>Completed</p>
          </div>
        </section>

        <Deadlines />

        <Announcements />

      </main>

    </div>
  )
}

export default Dashboard