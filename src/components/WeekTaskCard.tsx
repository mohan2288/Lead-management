 import { Card } from "antd";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { WeekCard } from "../services/Followup";
import { toast } from "react-toastify";

interface Weekcard{
    Lead_Name : string
    Company_Name: string
    Contact_Type : string
    Contacted_On :string
    Notes :string
}

function WeekTasks() {

  const [data,setData]=useState<Weekcard[]>([])

  useEffect(()=>{
    const fetchdata = async()=>{
      try{
        const response = await WeekCard()
        setData(response.data)
      }
      catch(error:any){
        toast.error(error?.response?.data?.message || "weekcard data not fetching")
      }
    }
    fetchdata()
  },[])

  return (
    <Card className="hover-card">
    <div className="p-10 rounded-xl w-full">
      <h2 className="text-2xl font-bold">This Week</h2><br />

      <div className="flex flex-col gap-5 p-5">
        {data.map((task, index) => (
          <div
            key={index}
            className="flex gap-4 border border-blue-200 rounded-2xl p-5! w-full"
          >
            {/* Icon */}
            <div
              className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-lg ${task}`}
            >
              {task.Lead_Name}
            </div>

            {/* Content */}
            <div className="flex-1">
              <h3 className="font-medium text-gray-800 text-sm sm:text-base">
                {task.Company_Name}
              </h3>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-500 mt-1">
                <span className="flex items-center gap-1">
                  <CalendarOutlined /> {task.Contact_Type}
                </span>

                <span className="flex items-center gap-1">
                  <ClockCircleOutlined /> {task.Contacted_On.split("T")[0]}
                </span>
              </div>

              <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 mt-1">
                <UserOutlined /> {task.Notes}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </Card>
  )
}

export default WeekTasks; 