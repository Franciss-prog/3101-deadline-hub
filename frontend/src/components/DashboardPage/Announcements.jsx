import { Link } from "react-router-dom"

function Announcements() {
  return (
    <section className="announcements">
      <div className="sectionHeader">
        <h2>Announcements</h2>
        <Link to = "/announcements" className="viewAllButton">View All</Link>
      </div>

      <div className="announcementCard">
        <h3>Important Class Announcement</h3>
        <p>
          Don't forget to check your upcoming requirements and deadlines.
        </p>
        <small>Posted today</small>
      </div>


    </section>
  )
}

export default Announcements