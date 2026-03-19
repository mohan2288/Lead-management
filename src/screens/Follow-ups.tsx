import { Button, Card } from "antd";
import { PlusOutlined } from '@ant-design/icons'
import Calender from "../components/Calender";
import WeekTasks from "../components/WeekTaskCard";
import FollowUpCard from "../components/FollowUpCard"
import { useState, useEffect } from "react";
import { followCard } from "../services/Followup";
import { toast } from "react-toastify";
import "../styles/followup.css"

interface FollowCard {
  today_count: number
  thisweek_count: number
  overdue_count: number
  completed_count: number
}

function Followups() {
  const [data, SetData] = useState<FollowCard | null>(null)
  const [loading, SetLoading] = useState(true)

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await followCard()
        SetData(response.data)
      }
      catch (error: any) {
        toast.error(error?.response?.data?.message || "card data not fetched")
      }
      finally {
        SetLoading(false)
      }
    }
    fetchdata()
  }, [])

  const style = (title: string) => {
    switch (title) {
      case "overdue_count":
        return { color: 'red' };
      case "completed_count":
        return { color: 'green' };
      default:
        return {}
    }
  }
  const titleMap: Record<string, string> = {
    today_count: "Today",
    thisweek_count: "This Week",
    overdue_count: "Overdue",
    completed_count: "Completed"
  };
  if (loading){
    <div className="loader"></div>
  }
  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-between max-sm:flex-col gap-3 max-sm:items-start">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Follow-ups & Calender</h1>
          <p className="text-gray-700">Manage and track all scheduled follow-ups</p>
        </div>
        <Button type="primary" size="large"><PlusOutlined />Add Follow-up</Button>
      </div>
      <div className="flex justify-between w-full max-sm:flex-col gap-5">
        {
          data &&
          Object.entries(data).map(([key, value], index) => (
            <Card key={index} style={{ flex: '1', gap: '10px' }} className="hover-card">
              <h3 className="text-gray-700">{titleMap[key]}</h3>
              <span style={style(key)} className="text-2xl font-bold">
                {value}
              </span>
            </Card>
          ))
        }
      </div>

      <div className="flex gap-5 max-sm:flex-col w-full">
        <div className="w-3/5  max-sm:w-full">
          <Calender />
        </div>
        <div className="w-2/5 max-sm:w-full">
          <WeekTasks />
        </div>
      </div>
      <div className="w-full">
        <FollowUpCard />
      </div>
    </div>


  )
}

export default Followups;
