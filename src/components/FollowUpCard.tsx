import {
  PhoneOutlined,
  VideoCameraOutlined,
  MailOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { Button, Card } from "antd";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { upcomingFollowup } from "../services/Followup";

interface Followup {
 Lead_Name: string
 Company_Name: string
 Contact_Type: string
 Contacted_On:string
 Notes:string
}

function UpcomingFollowups() {

  const [followups, setFollowups] = useState<Followup[]>([]);

  useEffect(() => {
    const fetchFollowups = async () => {
      try {
        const response = await upcomingFollowup();
        console.log(response)
        setFollowups(response.data);
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Followups not fetched");
      }
    };

    fetchFollowups();
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case "Call":
        return <PhoneOutlined />;
      case "Meeting":
        return <VideoCameraOutlined />;
      case "Mail":
        return <MailOutlined />;
      default:
        return <PhoneOutlined />;
    }
  };

  return (
    <Card className="hover-card">
      <div className="flex flex-col gap-10">
        <h2 className="text-2xl font-bold">Upcoming Follow-ups</h2>

        {Array.isArray(followups) && followups.map((item, index) => (
          <div
            key={index}
            className="flex flex-col p-5! items-start sm:flex-row sm:items-center border rounded-xl 
            border-blue-200 justify-between gap-5"
          >

            {/* icon */}
            <div className="flex items-center gap-4">
              <div>{getIcon(item.Lead_Name)}</div>
              {/* content */}
              <div>
                <h3>{item.Company_Name}</h3>

                <div className="flex gap-3">
                  <span>
                    <CalendarOutlined /> {item.Contact_Type}
                  </span>

                  <span>
                    <ClockCircleOutlined /> {item.Contacted_On.split("T")[0]}
                  </span>
                </div>

                <p>{item.Notes}</p>
              </div>
            </div>

            {/* actions */}
            <div className="flex gap-3.5">
              <Button>Edit</Button>
              <Button type="primary">Complete</Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default UpcomingFollowups;