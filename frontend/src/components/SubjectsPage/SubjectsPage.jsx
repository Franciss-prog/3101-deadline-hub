import { Link } from "react-router-dom"
import { useState } from "react"

function SubjectsPage() {

  const [showForm, setShowForm] = useState(false)

  const [newSubject, setNewSubject] = useState({
    code: "",
    name: ""
  })

  const [subjects, setSubjects] = useState([
    {
      id: 1,
      code: "IT 311",
      name: "Systems Administration and Maintenance"
    },
    {
      id: 2,
      code: "IT 312",
      name: "System Integration and Architecture"
    }
  ])

  const openAddForm = () => {
    setNewSubject({ code: "", name: "" })
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setNewSubject({ code: "", name: "" })
  }

  const addSubject = () => {
    if (!newSubject.code || !newSubject.name) {
      return
    }

    const subject = {
      id: Date.now(),
      code: newSubject.code,
      name: newSubject.name
    }

    setSubjects((current) => [...current, subject])
    closeForm()
  }

  return (
    <div className="subjectsPage">

      <header className="pageHeader">
        <div>
          <h1>Subjects</h1>
          <p>Manage the subjects for BSIT-3101.</p>
        </div>

        <button className="addButton" onClick={openAddForm}>
          + Add Subject
        </button>
      </header>


      {showForm && (
        <div className="modalOverlay">

          <div className="activityModal">

            <div className="modalHeader">
              <h2>Add Subject</h2>

              <button
                className="closeButton"
                onClick={closeForm}
              >
                ×
              </button>
            </div>


            <div className="formGroup">
              <label>Subject Code</label>

              <input
                type="text"
                placeholder="e.g. IT 313"
                value={newSubject.code}
                onChange={(e) =>
                  setNewSubject({
                    ...newSubject,
                    code: e.target.value
                  })
                }
              />
            </div>


            <div className="formGroup">
              <label>Subject Name</label>

              <input
                type="text"
                placeholder="Enter subject name"
                value={newSubject.name}
                onChange={(e) =>
                  setNewSubject({
                    ...newSubject,
                    name: e.target.value
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

              <button className="addButton" onClick={addSubject}>
                Add Subject
              </button>

            </div>

          </div>

        </div>
      )}


      <div className="subjectList">

        {subjects.map((subject) => (
          <Link
            to={`/subjects/${subject.id}`}
            className="subjectCard"
            key={subject.id}
          >
            <div>
              <h2>{subject.code}</h2>
              <p>{subject.name}</p>
            </div>

            <span>→</span>
          </Link>
        ))}

      </div>

    </div>
  )
}

export default SubjectsPage