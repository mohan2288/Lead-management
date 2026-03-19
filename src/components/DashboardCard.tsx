import React from "react";
import { Card } from "antd";
import {
  TeamOutlined ,
  LineChartOutlined,
  AimOutlined,
  HeartOutlined,
  ExclamationCircleOutlined,
  DollarOutlined
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import { performanceData } from "../services/DashboardService";
import { toast } from "react-toastify";
import "../styles/dashboard.css"
import { formatValue } from "../utils/formatValue";

function DashboardCard() {
  const [data, setData] = useState<any[]>([]);
   const [loading,setLoading] = useState(true)


  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await performanceData();
        setData(response.data);
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Data not fetched");
      }
      finally{
        setLoading(false)
      }
    };
    fetchdata();
  }, []);

  const iconMap: Record<string, React.ReactNode> = {
    "Total Leads":<TeamOutlined />,
    "Leads in Pipeline": <LineChartOutlined />,
    "Conversion Rate": <AimOutlined />,
    "New Leads Today": <HeartOutlined />,
    "High Priority": <ExclamationCircleOutlined />,
    "Total Pipeline Value": <DollarOutlined />
  };

  const typeMap: Record<string, string> = {
  "Total Leads": "number",
  "Leads in Pipeline": "number",
  "Conversion Rate": "percentage",
  "New Leads Today": "number",
  "High Priority": "number",
  "Total Pipeline Value": "currency",
};

  if (loading){
       return <div className="loader"></div>
  }

  return (
    <div className="grid grid-cols-3 gap-5 max-sm:grid-cols-1 max-sm:w-full">
      {data.map((item, index) => (
        <Card key={index} className="card-hover">
          <div style={{ display: "flex ", justifyContent: "space-between" }}>
            <div>
              <p>{item.title}</p>
              <h1 className="text-2xl font-bold">{formatValue(item.value,typeMap[item.title])}</h1>
              {item.percent_vs_last_month && (
                <p>↑ {item.percent_vs_last_month}% vs last month</p>
              )}
            </div>
            <div className="dashboard-icon">{iconMap[item.title]}</div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export default DashboardCard;
