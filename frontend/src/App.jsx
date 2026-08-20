import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import Dashboard from "./components/DashboardPage/Dashboard"
import DeadlinesPage from "./components/DeadlinesPage/DeadlinesPage"
import AnnouncementsPage from "./components/AnnouncementsPage/AnnouncementsPage"
import SubjectsPage from "./components/SubjectsPage/SubjectsPage"
import SubjectDetails from "./components/SubjectsPage/SubjectDetails"


import "./App.css"

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/deadlines" element={<DeadlinesPage />} />
        <Route path="/announcements" element={<AnnouncementsPage />} />
        <Route path="/subjects" element={<SubjectsPage />} />
        <Route path="/subjects/:id" element={<SubjectDetails />} />

      </Route>

    </Routes>
  )
}

export default App