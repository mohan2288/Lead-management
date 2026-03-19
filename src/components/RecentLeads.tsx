import { Card, Tag } from "antd";
import { useEffect, useState } from "react";
import { recentLeads } from "../services/DashboardService";
import placeholder from "../assets/image/placeholderimg.jpg"
import {Button} from "antd"
import {useNavigate} from "react-router-dom"

interface Lead {
  Lead_ID: number;
  Lead_Name: string;
  Company_Name: string;
  Stage_Name: string;
  Priority_Name: string;
}

function RecentLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchLeads() {
      const response = await recentLeads();
      setLeads(response.data);
    }

    fetchLeads();
  }, []);

  const getTagColor = (value: string) => {
  switch (value) {
    case "Active":
      return "#3B82F6";

    case "Qualified":
      return "#14B8A6";

    case "Contacted":
      return "#2563EB";

    case "Proposal":
      return "#8B5CF6";

    case "New":
      return "#60A5FA";

    case "Won":
      return "#22C55E";

    case "Lost":
      return "#EF4444";

    case "Archived":
      return "#9CA3AF";

    case "High":
    case "High Priority":
      return "#EF4444";

    case "Medium":
      return "#F59E0B";

    case "Low":
      return "#22C55E";

    default:
      return "#d9d9d9";
  }
};

  return (
    <Card className="lead-card w-3/5 max-sm:w-full">
      <div className="flex flex-col gap-3">
            {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Recent Leads</h1>
        <Button onClick={()=>{navigate("/leads")}} className="lead-button">View All</Button>
      </div>

      {/* Leads List */}
      <div className="flex flex-col gap-5">
        {leads.map((lead) => (
          <div key={lead.Lead_ID} className="recent-lead flex justify-between p-4!
           rounded-lg">
            <div className="flex items-center gap-3 ">
               <img src={placeholder} alt="" className="h-10"/>
            {/* Lead Info */}
              <p>{lead.Lead_Name}</p>
              <p>{lead.Company_Name}</p>
            </div>

            {/* Status & Priority */}
            <div className="flex gap-3">
              <Tag className="px-2! py-2!" color={getTagColor(lead.Stage_Name)}>{lead.Stage_Name}</Tag>
              <Tag className="px-2! py-2!" color={getTagColor(lead.Priority_Name)}>{lead.Priority_Name}</Tag>
            </div>

          </div>
        ))}
      </div>
      </div> 
    </Card>
  );
}

export default RecentLeads;