import { Link } from "react-router-dom"

function DeadlinesPage() {
  return (
    <div className="deadlinesPage">

      <header className="pageHeader">
        <div>
          <h1>Deadlines</h1>
          <p>View and manage your class deadlines.</p>
        </div>

        <button className="addButton">+ Add Deadline</button>
      </header>

      <div className="deadlineFilters">
        <button className="filterButton active">All</button>
        <button className="filterButton ">IT 311</button>
        <button className="filterButton ">IT 312</button>
        <button className="filterButton ">IT 313</button>
        <button className="filterButton ">IT 314</button>

      </div>

      <div className="deadlineList">
        <div className="deadlinePageCard">
          <div className="deadlinePageInfo">
            <h3>IT 311</h3>
            <p>Subject: Systems Administration and Maintenance</p>
            <p>Due: August 20, 2026</p>
          </div>
          <span className="deadlineStatus">Upcoming</span>

          <Link to = "/deadlines/1" className = "deadlineButton">View Details</Link>
        </div>

        <div className="deadlinePageCard">
          <div className="deadlinePageInfo">
            <h3>IT 312</h3>
            <p>Subject: System Integration and Architecture</p>
            <p>Due: August 23, 2026</p>
          </div>

          <span className="deadlineStatus">Upcoming</span>

          <Link to = "/deadlines/2" className = "deadlineButton">View Details</Link>
        </div>

      </div>



    </div>
  )
}

export default DeadlinesPage