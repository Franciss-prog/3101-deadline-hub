import { useParams } from "react-router-dom"
import { useState } from "react"

function SubjectDetails() {
  const { id } = useParams()

  const subjects = {
    1: {
      code: "IT 311",
      name: "System Administration and Maintenance"
    },

    2: {
      code: "IT 312",
      name: "Database Management"
    },

    3: {
      code: "IT 313",
      name: "Object-Oriented Programming"
    },

    4: {
      code: "IT 314",
      name: "Systems Analysis"
    }
  }

  const subject = subjects[id]

  const [completedActivities, setCompletedActivities] = useState([])

  const [showForm, setShowForm] = useState(false)

  const activities = [
    {
      id: 1,
      title: "Web Systems Project",
      description:
        "Create a responsive webpage using HTML and CSS. Follow the layout provided in class and submit your project as a ZIP file.",
      due: "August 20, 2026"
    },

    {
      id: 2,
      title: "HTML/CSS Activity",
      description:
        "Create a simple webpage using HTML and CSS. Make sure your webpage includes a navigation bar, content section, and footer.",
      due: "August 25, 2026"
    }
  ]

  const markAsDone = (activityId) => {
    setCompletedActivities((current) =>
      current.includes(activityId)
        ? current.filter((id) => id !== activityId)
        : [...current, activityId]
    )
  }

  if (!subject) {
    return <h1>Subject not found</h1>
  }

  return (
    <div className="subjectDetailsPage">

      <header className="pageHeader">
        <div>
          <h1>{subject.name}</h1>
          <p>{subject.code}</p>
        </div>

        <button className="addButton" onClick={() => setShowForm(true)}>

          + Add Activity
        </button>
      </header>

      {showForm && (
        <div className="modalOverlay">

          <div className="activityModal">

            <div className="modalHeader">
              <h2>Add Activity</h2>

              <button
                className="closeButton"
                onClick={() => setShowForm(false)}
              >
                ×
              </button>
            </div>


            <div className="formGroup">
              <label>Activity Title</label>

              <input
                type="text"
                placeholder="Enter activity title"
              />
            </div>


            <div className="formGroup">
              <label>Description</label>

              <textarea
                placeholder="Enter activity description"
                rows="4"
              ></textarea>
            </div>


            <div className="formGroup">
              <label>Due Date</label>

              <input type="date" />
            </div>


            <div className="formActions">

              <button
                className="cancelButton"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

              <button className="addButton">
                Add Activity
              </button>

            </div>

          </div>

        </div>
      )}


      <div className="activityList">

        {activities.map((activity) => {

          const isCompleted =
            completedActivities.includes(activity.id)

          return (
            <div className="activityCard" key={activity.id}>

              <div>
                <h2>{activity.title}</h2>

                <p className="activityDescription">{activity.description}</p>

                <p>
                  Due: {activity.due}
                </p>

                <span
                  className={
                    isCompleted
                      ? "completedStatus"
                      : "pendingStatus"
                  }
                >
                  {isCompleted
                    ? "✓ Completed"
                    : "Not Completed"}
                </span>
              </div>


              <div className="activityActions">

                <button
                  className="doneButton"
                  onClick={() =>
                    markAsDone(activity.id)
                  }
                >
                  {isCompleted
                    ? "Mark as Not Done"
                    : "Mark as Done"}
                </button>

                <button className="editButton">
                  Edit
                </button>

                <button className="deleteButton">
                  Delete
                </button>

              </div>

            </div>
          )
        })}

      </div>

    </div>
  )
}

export default SubjectDetails