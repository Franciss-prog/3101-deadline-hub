import { useState } from "react"

function AnnouncementsPage() {

  const [showForm, setShowForm] = useState(false)

  const [editingId, setEditingId] = useState(null)

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    description: ""
  })

  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "BSIT-3101 Meeting",
      description:
        "There will be a class meeting this week. Please check the details and make sure to attend.",
      date: "August 14, 2026"
    }
  ])


  const openAddForm = () => {
    setEditingId(null)
    setNewAnnouncement({ title: "", description: "" })
    setShowForm(true)
  }

  const openEditForm = (announcement) => {
    setEditingId(announcement.id)
    setNewAnnouncement({
      title: announcement.title,
      description: announcement.description
    })
    setShowForm(true)
  }

  const closeForm = () => {
    setShowForm(false)
    setEditingId(null)
    setNewAnnouncement({ title: "", description: "" })
  }

  const saveAnnouncement = () => {

    if (
      !newAnnouncement.title ||
      !newAnnouncement.description
    ) {
      return
    }

    if (editingId !== null) {
      // Update the existing announcement, keep its original date
      setAnnouncements((current) =>
        current.map((announcement) =>
          announcement.id === editingId
            ? {
                ...announcement,
                title: newAnnouncement.title,
                description: newAnnouncement.description
              }
            : announcement
        )
      )
    } else {
      const announcement = {
        id: Date.now(),
        title: newAnnouncement.title,
        description: newAnnouncement.description,
        date: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric"
        })
      }

      setAnnouncements((current) => [...current, announcement])
    }

    closeForm()
  }

  const deleteAnnouncement = (id) => {
    setAnnouncements((current) =>
      current.filter((announcement) => announcement.id !== id)
    )
  }


  return (
    <div className="announcementsPage">

      <header className="pageHeader">

        <div>
          <h1>Announcements</h1>

          <p>
            Stay updated with the latest class announcements.
          </p>
        </div>


        <button
          className="addButton"
          onClick={openAddForm}
        >
          + Add Announcement
        </button>

      </header>


      {showForm && (

        <div className="modalOverlay">

          <div className="activityModal">

            <div className="modalHeader">

              <h2>{editingId !== null ? "Edit Announcement" : "Add Announcement"}</h2>

              <button
                className="closeButton"
                onClick={closeForm}
              >
                ×
              </button>

            </div>


            <div className="formGroup">

              <label>Announcement Title</label>

              <input
                type="text"
                placeholder="Enter announcement title"
                value={newAnnouncement.title}
                onChange={(e) =>
                  setNewAnnouncement({
                    ...newAnnouncement,
                    title: e.target.value
                  })
                }
              />

            </div>


            <div className="formGroup">

              <label>Announcement Details</label>

              <textarea
                placeholder="Enter announcement details"
                rows="5"
                value={newAnnouncement.description}
                onChange={(e) =>
                  setNewAnnouncement({
                    ...newAnnouncement,
                    description: e.target.value
                  })
                }
              ></textarea>

            </div>


            <div className="formActions">

              <button
                className="cancelButton"
                onClick={closeForm}
              >
                Cancel
              </button>


              <button
                className="addButton"
                onClick={saveAnnouncement}
              >
                {editingId !== null ? "Save Changes" : "Add Announcement"}
              </button>

            </div>

          </div>

        </div>

      )}


      <div className="announcementList">

        {announcements.map((announcement) => (

          <div
            className="announcementPageCard"
            key={announcement.id}
          >

            <div>

              <h2>
                {announcement.title}
              </h2>

              <p>
                {announcement.description}
              </p>

              <small>
                Posted {announcement.date}
              </small>

            </div>


            <div className="announcementActions">

              <button
                className="editButton"
                onClick={() => openEditForm(announcement)}
              >
                Edit
              </button>

              <button
                className="deleteButton"
                onClick={() => deleteAnnouncement(announcement.id)}
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}

export default AnnouncementsPage