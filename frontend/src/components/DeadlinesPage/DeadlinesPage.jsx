import { Link } from "react-router-dom"
import { useState } from "react"

const filters = ["All", "IT 311", "IT 312", "IT 313", "IT 314"]

const deadlines = [
  {
    id: 1,
    subjectCode: "IT 311",
    subjectName: "Systems Administration and Maintenance",
    due: "August 20, 2026",
    status: "Upcoming"
  },
]

function DeadlinesPage() {

  const [activeFilter, setActiveFilter] = useState("All")

  const filteredDeadlines =
    activeFilter === "All"
      ? deadlines
      : deadlines.filter((deadline) => deadline.subjectCode === activeFilter)

  return (
    <div className="deadlinesPage">

      <header className="pageHeader">
        <div>
          <h1>Deadlines</h1>
          <p>View and manage your class deadlines.</p>
        </div>

      </header>

      <div className="deadlineFilters">
        {filters.map((filter) => (
          <button
            key={filter}
            className={
              filter === activeFilter
                ? "filterButton active"
                : "filterButton"
            }
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="deadlineList">

        {filteredDeadlines.length === 0 && (
          <p>No deadlines for {activeFilter}.</p>
        )}

        {filteredDeadlines.map((deadline) => (
          <div className="deadlinePageCard" key={deadline.id}>
            <div className="deadlinePageInfo">
              <h3>{deadline.subjectCode}</h3>
              <p>Subject: {deadline.subjectName}</p>
              <p>Due: {deadline.due}</p>
            </div>

            <span className="deadlineStatus">{deadline.status}</span>

            <Link
              to={`/deadlines/${deadline.id}`}
              className="deadlineButton"
            >
              View Details
            </Link>
          </div>
        ))}

      </div>

    </div>
  )
}

export default DeadlinesPage