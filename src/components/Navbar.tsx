import { NavLink } from "react-router-dom";
import {
  AppstoreOutlined,
  TeamOutlined,
  LineChartOutlined,
  CalendarOutlined,
  SettingOutlined,
  MenuOutlined,
  CloseOutlined
} from "@ant-design/icons";
import Profile from '../assets/image/placeholderimg.jpg'
import '../styles/Navbar.css'
import { useState } from "react";

function Navbar() {

  const [isOpen,setIsopen] =useState<boolean>(false)

  return (
    <header>
      <nav className="nav-bar">
        <div className="flex items-center gap-8 w-3/4">
          <span className="text-xl font-bold">Maestro</span>
          <div className="flex gap-5">
            <NavLink to="/dashboard"  className={({ isActive }) =>
                   isActive ? "nav-links active" : "nav-links"}>
              <AppstoreOutlined style={{ color: 'gray' }} className="nav-icons" />
              <p className="text-sm text-gray-600">Dashboard</p></NavLink>
            <NavLink to='/leads'  className={({ isActive }) =>
                   isActive ? "nav-links active" : "nav-links"}>
              <TeamOutlined style={{ color: 'gray' }} className="nav-icons" />
              <p className="text-sm text-gray-600">Leads</p>
            </NavLink>
            <NavLink to='pipeline'  className={({ isActive }) =>
                  isActive ? "nav-links active" : "nav-links"
                 }>
              <LineChartOutlined style={{ color: 'gray' }} className="nav-icons" />
              <p className="text-sm text-gray-600">Pipeline</p>
            </NavLink>
            <NavLink to='followups'  className={({ isActive }) =>
                  isActive ? "nav-links active" : "nav-links"}>
              <CalendarOutlined style={{ color: 'gray' }} className="nav-icons" />
              <p className="text-sm text-gray-600">Follow-ups</p></NavLink>
            <NavLink to='settings'  className={({ isActive }) =>
                      isActive ? "nav-links active" : "nav-links"}>
              <SettingOutlined style={{ color: 'gray' }} className="nav-icons" />
              <p className="text-sm text-gray-600">Settings</p></NavLink>
          </div>
        </div>
        <div className="nav-img"><img src={Profile} className="h-10 rounded-full" /></div>
        <div className="sidebar-icon" onClick={()=>setIsopen(!isOpen)}>
           {isOpen ? <CloseOutlined /> : <MenuOutlined />}
        </div>
        </nav>

      <nav className="bg-white w-full">
      <div className={isOpen ? "sidebar open" : "sidebar"}>
        <NavLink to="/dashboard"  className={({ isActive }) =>
                   isActive ? "nav-links active" : "nav-links"}>
              <AppstoreOutlined style={{ color: 'gray' }} className="nav-icons" />
              <p className="text-sm text-gray-600">Dashboard</p></NavLink>
            <NavLink to='/leads'  className={({ isActive }) =>
                   isActive ? "nav-links active" : "nav-links"}>
              <TeamOutlined style={{ color: 'gray' }} className="nav-icons" />
              <p className="text-sm text-gray-600">Leads</p>
            </NavLink>
            <NavLink to='pipeline'  className={({ isActive }) =>
                  isActive ? "nav-links active" : "nav-links"
                 }>
              <LineChartOutlined style={{ color: 'gray' }} className="nav-icons" />
              <p className="text-sm text-gray-600">Pipeline</p>
            </NavLink>
            <NavLink to='followups'  className={({ isActive }) =>
                  isActive ? "nav-links active" : "nav-links"}>
              <CalendarOutlined style={{ color: 'gray' }} className="nav-icons" />
              <p className="text-sm text-gray-600">Follow-ups</p></NavLink>
            <NavLink to='settings'  className={({ isActive }) =>
                      isActive ? "nav-links active" : "nav-links"}>
              <SettingOutlined style={{ color: 'gray' }} className="nav-icons" />
              <p className="text-sm text-gray-600">Settings</p></NavLink>
      </div>
      </nav>
    </header>
  )
}

export default Navbar;