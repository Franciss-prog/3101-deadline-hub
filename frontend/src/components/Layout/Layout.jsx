import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"

function Layout() {
  return (
    <div className="appLayout">

      <Sidebar />

      <main className="pageContent">
        <Outlet />
      </main>

    </div>
  )
}

export default Layout