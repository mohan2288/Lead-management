
import Navbar from "../components/Navbar"
import { Outlet } from "react-router-dom"

function Mainlayout() {
  return (
    <>
      <Navbar />
      <div style={{
        padding: '40px 30px',
        maxWidth: "1400px",
        margin: "0 auto",
        width: "100%"
      }}>
        <Outlet />
      </div>
    </>
  )
}

export default Mainlayout
