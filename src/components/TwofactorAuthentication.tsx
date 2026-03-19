import { Button } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import { TwofathAuthentication } from "../services/SettingServices";

function TwofactorAuthentication() {

  const [enabled, setEnabled] = useState(false);

  const handleToggle = async () => {
    try {

      const newStatus = !enabled;

      await TwofathAuthentication(newStatus);

      setEnabled(newStatus);

      toast.success(
        newStatus
          ? "Two factor authentication enabled"
          : "Two factor authentication disabled"
      );

    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Failed to update 2FA"
      );
    }
  };

  return (
    <div className="flex justify-between items-center w-7/12 
    max-sm:flex-col max-sm:gap-3 max-sm:items-start">

      <div className="flex flex-col">
        <h1 className="font-semibold">Two Factor Authentication</h1>
        <p className="text-base text-mist-600">
          Add an extra layer of security to your account
        </p>
      </div>

      <Button size="large" onClick={handleToggle}>
        {enabled ? "Disable" : "Enable"}
      </Button>

    </div>
  );
}

export default TwofactorAuthentication;