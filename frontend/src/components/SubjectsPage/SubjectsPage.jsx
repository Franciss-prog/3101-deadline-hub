import { Link } from "react-router-dom"

function SubjectsPage() {
  return (
    <div className="subjectsPage">

      <header className="pageHeader">
        <div>
          <h1>Subjects</h1>
          <p>Manage the subjects for BSIT-3101.</p>
        </div>

        <button className="addButton">
          + Add Subject
        </button>
      </header>


      <div className="subjectList">

        <Link to="/subjects/1" className="subjectCard">
          <div>
            <h2>IT 311</h2>
            <p>Systems Administration and Maintenance</p>
          </div>

          <span>→</span>
        </Link>


        <Link to="/subjects/2" className="subjectCard">
          <div>
            <h2>IT 312</h2>
            <p>System Integration and Architecture</p>
          </div>

          <span>→</span>
        </Link>


      </div>

    </div>
  )
}

export default SubjectsPage