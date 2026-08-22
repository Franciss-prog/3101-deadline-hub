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

  // null = adding a new activity, otherwise holds the id being edited
  const [editingId, setEditingId] = useState(null)

  const [newActivity, setNewActivity] = useState({
    title: "",
    description: "",
    due: ""
  })

  const [activities, setActivities] = useState([
    {
      id: 1,
      title: "System Administration Activity",
      description:
        "Complete the assigned system administration and maintenance activity.",
      due: "August 20, 2026"
    },

    {
      id: 2,
      title: "Practical Activity",
      description:
        "Complete the practical activity and submit your work before the deadline.",
      due: "August 25, 2026"
    }
  ])

  const markAsDone = (activityId) => {
    setCompletedActivities((current) =>
      current.includes(activityId)
        ? current.filter((id) => id !== activityId)
        : [...current, activityId]
    )
  }

  const openAddForm = () => {
    setEditingId(null)
    setNewActivity({ title: "", description: "", due: "" })
    setShowForm(true)
  }

  const openEditForm = (activity) => {
    setEditingId(activity.id)
    setNewActivity({
      title: activity.title,
      description: activity.description,
      due: activity.due
    })
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setEditingId(null)
    setNewActivity({ title: "", description: "", due: "" })
  }

  const saveActivity = () => {
    if (
      !newActivity.title || !newActivity.description || !newActivity.due
    ) {
      return
    }

    if (editingId !== null) {
      // Editing an existing activity
      setActivities((current) =>
        current.map((activity) =>
          activity.id === editingId
            ? { ...activity, ...newActivity }
            : activity
        )
      )
    } else {
      // Adding a new activity
      const activity = {
        id: Date.now(),
        title: newActivity.title,
        description: newActivity.description,
        due: newActivity.due
      }
      setActivities((current) => [...current, activity])
    }

    closeForm()
  }

  const deleteActivity = (activityId) => {
    setActivities((current) =>
      current.filter((activity) => activity.id !== activityId)
    )
    setCompletedActivities((current) =>
      current.filter((id) => id !== activityId)
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

        <button
          className="addButton"
          onClick={openAddForm}
        >
          + Add Activity
        </button>
      </header>


      {showForm && (
        <div className="modalOverlay">

          <div className="activityModal">

            <div className="modalHeader">
              <h2>{editingId !== null ? "Edit Activity" : "Add Activity"}</h2>

              <button
                className="closeButton"
                onClick={closeForm}
              >
                ×
              </button>
            </div>


            <div className="formGroup">
              <label>Activity Title</label>

              <input
                type="text"
                placeholder="Enter activity title"
                value={newActivity.title}
                onChange={(e) =>
                  setNewActivity({
                    ...newActivity,
                    title: e.target.value
                  })
                }
              />
            </div>


            <div className="formGroup">
              <label>Description</label>

              <textarea
                placeholder="Enter activity description"
                rows="4"
                value={newActivity.description}
                onChange={(e) =>
                  setNewActivity({
                    ...newActivity,
                    description: e.target.value
                  })
                }
              ></textarea>
            </div>


            <div className="formGroup">
              <label>Due Date</label>

              <input
                type="date"
                value={newActivity.due}
                onChange={(e) =>
                  setNewActivity({
                    ...newActivity,
                    due: e.target.value
                  })
                }
              />
            </div>


            <div className="formActions">

              <button
                className="cancelButton"
                onClick={closeForm}
              >
                Cancel
              </button>

              <button className="addButton" onClick={saveActivity}>
                {editingId !== null ? "Save Changes" : "Add Activity"}
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
            <div
              className="activityCard"
              key={activity.id}
            >

              <div>
                <h2>{activity.title}</h2>

                <p className="activityDescription">
                  {activity.description}
                </p>

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

                <button
                  className="editButton"
                  onClick={() => openEditForm(activity)}
                >
                  Edit
                </button>

                <button
                  className="deleteButton"
                  onClick={() => deleteActivity(activity.id)}
                >
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