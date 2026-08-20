import { Link } from "react-router-dom"

function Deadlines() {
  return (
    <section className="deadlines">

      <div className="sectionHeader">
        <h2>Upcoming Deadlines</h2>
        <Link to = "/deadlines" className = "viewAllButton">View All</Link>
      </div>

      <div className="deadlineCard">
        <div className="deadlineInfo">
          <h3>IT 311</h3>
          <p>Subject: Systems Administration and Maintenance</p>
          <p>Due: August 20, 2026</p>
        </div>
        <span className="deadlineStatus">Upcoming</span>

        <button className="deadlineButton">View Details</button>
      </div>

    </section>
  )
}

export default Deadlines