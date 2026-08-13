function Dashboard() {
  return (
    <div className="dashboard">

      <aside className="sidebar">
        <h2>Deadline Hub</h2>

        <nav>
          <a href="#">Dashboard</a>
          <a href="#">Deadlines</a>
          <a href="#">Announcements</a>
          <a href="#">Subjects</a>
        </nav>
      </aside>

      <main className="dashboardContent">

        <header className="dashboardHeader">
          <h1>Dashboard</h1>
          <p>Welcome back!</p>
        </header>

        <section className="upcomingDeadlines">
          <div className="sectionHeader">
            <h2>Upcoming Deadlines</h2>
            <button>View All</button>
          </div>

          <div className="deadlineCard">
            <div>
              <h3>Web Systems Project</h3>
              <p>Subject:</p>
              <p>Due:</p>
            </div>

            <button>View Details</button>
          </div>
        </section>

        <section className="announcements">
          <div className="sectionHeader">
            <h2>Announcements</h2>
            <button>View All</button>
          </div>

          <div className="announcementCard">
            <h3>Important Class Announcement</h3>
            <p>
              Don't forget to check your upcoming requirements and deadlines.
            </p>
            <small>Posted today</small>
          </div>

          <div className="announcementCard">
            <h3>BSIT-3101 Meeting</h3>
            <p>
              There will be a class meeting this week. Please check the details.
            </p>
            <small>Posted yesterday</small>
          </div>
        </section>

        

      </main>

    </div>
    )
  }

export default Dashboard