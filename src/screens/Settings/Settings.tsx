import { useEffect, useState } from "react"
import Profile from "./Profile"
import Security from "./Security"
import Appearance from "./Appearance"
import Stages from "./Stages"
import Team from "./Team"
import {
  UserOutlined,
  TeamOutlined,
  SafetyOutlined,
  TagOutlined,
  BgColorsOutlined
} from "@ant-design/icons"
import "../../styles/Service.css"
import { Button } from "antd"
import { logoutUser } from "../../services/AuthService"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"


function Settings() {
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState(()=>{
    return localStorage.getItem("activeTab")||"profile";
  })
  useEffect(()=>{
    localStorage.setItem("activeTab",activeTab);
  },[activeTab]);

  const handleLogout = async()=>{
  try {
    await logoutUser();
  } catch (error:any) {
    toast.error(error||"Logout failed");
  } finally {
    navigate("/");
  }
  }
  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between max-sm:flex-col max-sm:items-start gap-3">
        <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-600">Manage your account and application preferences</p>
        </div>
        <Button type="primary" size="large" onClick={handleLogout}>Logout</Button>
      </div>
      <div className="flex flex-col gap-10">
        <div className="flex justify-around max-sm:flex-wrap gap-5">
          <button onClick={() => setActiveTab("profile")}
            className={`setting-button ${activeTab === "profile" ? "active" : ""}`}>
            <div className={`${activeTab === "profile" ? "text-black flex gap-3" : "text-gray-600 flex gap-3"}`}>
              <UserOutlined /><h1 className="visible max-sm:hidden">Profile</h1>
            </div></button>
          <button onClick={() => setActiveTab("appearance")} className={`setting-button ${activeTab === "appearance" ? "active" : ""}`}>
            <div className={`${activeTab === "appearance" ? "text-black flex gap-3" : "text-gray-600 flex gap-3"}`}>
              <BgColorsOutlined />  <h1 className="visible max-sm:hidden">Appearance</h1>
            </div>
          </button>
          <button onClick={() => setActiveTab("stages")} className={`setting-button ${activeTab === "stages" ? "active" : ""}`}>
            <div className={`${activeTab === "stages" ? "text-black flex gap-3" : "text-gray-600 flex gap-3"}`}>
              <TagOutlined />  <h1 className="visible max-sm:hidden">Stages</h1>
            </div>
          </button>
          <button onClick={() => setActiveTab("team")} className={`setting-button ${activeTab === "team" ? "active" : ""}`}>
            <div className={`${activeTab === "team" ? "text-black flex gap-3" : "text-gray-600 flex gap-3"}`}>
              <TeamOutlined />  <h1 className="visible max-sm:hidden">Team</h1></div>
          </button>
          <button onClick={() => setActiveTab("security")} className={`setting-button ${activeTab === "security" ? "active" : ""}`}>
            <div className={`${activeTab === "security" ? "text-black flex gap-3" : "text-gray-600 flex gap-3"}`}>
              <SafetyOutlined /> <h1 className="visible max-sm:hidden">Security</h1> </div>
          </button>
        </div>
        {activeTab === "profile" && <Profile />}
        {activeTab === "appearance" && <Appearance />}
        {activeTab === "stages" && <Stages />}
        {activeTab === "team" && <Team />}
        {activeTab === "security" && <Security />}

      </div>
    </div>
  )
}

export default Settings
