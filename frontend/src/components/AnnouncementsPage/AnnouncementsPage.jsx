function AnnouncementsPage() {
  return (
    <div className="announcementsPage">

      <header className="pageHeader">
        <div>
          <h1>Announcements</h1>
          <p>Stay updated with the latest class announcements.</p>
        </div>

        <button className="addButton">
          + Add Announcement
        </button>
      </header>

      <div className="announcementList">
        <div className="announcementPageCard">
          <div>
            <h2>BSIT-3101 Meeting</h2>
            <p>
              There will be a class meeting this week. Please check the details
              and make sure to attend.
            </p>
            <small>Posted August 14, 2026</small>
          </div>

          <div className="announcementActions">
            <button className="editButton">
              Edit
            </button>

            <button className="deleteButton">
              Delete
            </button>
          </div>
        </div>


        <div className="announcementPageCard">
          <div>
            <h2>Important Class Announcement</h2>
            <p>
              Don't forget to check your upcoming requirements and deadlines.
            </p>
            <small>Posted August 13, 2026</small>
          </div>

          <div className="announcementActions">
            <button className="editButton">
              Edit
            </button>

            <button className="deleteButton">
              Delete
            </button>
          </div>
        </div>

      </div>

    </div>
  )
}

export default AnnouncementsPage