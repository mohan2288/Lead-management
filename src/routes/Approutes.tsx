import Mainlayout from "../layout/Mainlayout";
import { HashRouter, Routes, Route } from "react-router-dom";
import Leads from "../screens/Leads/Leads";
import Login from "../screens/auth/Login";
import ForgetPassword from "../screens/auth/ForgetPassword";
import OTPverification from "../screens/auth/OTPverification";
import Resetpassword from "../screens/auth/Resetpassword";
import Dashboard from "../screens/Dashboard";
import Pipeline from "../screens/Pipeline";
import Followups from "../screens/Follow-ups";
import Settings from "../screens/Settings/Settings";
import Signup from "../screens/auth/Signup";
import Addlead from "../screens/Leads/Addlead";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./Protectedroutes";
import LeadDetails from "../screens/Leads/LeadDetails";

function Approutes() {
  return (
    <HashRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/otp" element={<OTPverification />} />
        <Route path="/resetpassword" element={<Resetpassword />} />

        {/* Protected Routes */}
        <Route
          element={
          <ProtectedRoute>
               <Mainlayout /> 
          </ProtectedRoute>
                
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leads" element={<Leads />} />
          <Route path="/leads/add-lead" element={<Addlead />} />
          <Route path="/leads/:id" element={<LeadDetails/>} />
          <Route path="/pipeline" element={<Pipeline />} />
          <Route path="/followups" element={<Followups />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

      </Routes>

      <ToastContainer />
    </HashRouter>
  );
}

export default Approutes;