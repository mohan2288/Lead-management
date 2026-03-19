import { Card, Select, Button } from "antd";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const { Option } = Select;

function AppearanceSettings() {

  const [theme, setTheme] = useState("light");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  const handleSave = () => {
    setLoading(true);

    try {
      localStorage.setItem("theme", theme);
      document.documentElement.setAttribute("data-theme", theme);

      toast.success("Theme updated successfully");
    } catch (error) {
      toast.error("Failed to save theme");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card style={{ width: "100%" }}>
      <div className="flex flex-col gap-6 w-1/2 max-sm:w-full">

        <h2 className="text-xl font-semibold">Appearance</h2>

        {/* Theme */}
        <div className="flex flex-col gap-2">
          <label className="font-medium">Theme</label>

          <Select
            size="large"
            value={theme}
            onChange={(value) => setTheme(value)}
          >
            <Option value="light">Light</Option>
            <Option value="dark">Dark</Option>
          </Select>

          <p className="text-gray-500 text-sm">
            Choose your preferred color theme
          </p>
        </div>

        <Button
          type="primary"
          size="large"
          loading={loading}
          onClick={handleSave}
          style={{ width: "150px" }}
        >
          Save Changes
        </Button>

      </div>
    </Card>
  );
}

export default AppearanceSettings;