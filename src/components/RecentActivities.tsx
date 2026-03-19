import { useEffect, useState } from 'react';
import { recentActivity } from '../services/DashboardService';
import { toast } from 'react-toastify';
import { Card } from 'antd';
import { LineChartOutlined } from '@ant-design/icons';

interface Activity{
  Notes:string
  Lead_Name:string
}

function RecentActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const fetchLeads = async ()=>{
      try{
        const response = await recentActivity()
        setActivities(response.data)
      }
      catch(error:any){
        toast.error(error?.data?.response?.message || "Recentactivity not fetching")
      }
    }
    fetchLeads() 
  }, []);

  return (
    <Card  className='lead-card w-2/5 max-sm:w-full'>
      <div className='flex flex-col gap-5'>
        <h3 className='text-lg font-semibold'>Recent Activity</h3>
      <div>
         <ul className='flex flex-col gap-3'>
        {activities.map((item, index) => (
          <li key={index} className='flex items-center gap-5'>
           <div className='dashboard-icon'>
             <LineChartOutlined />
           </div>
            <p className='text-lg'>{item.Notes}</p>
            <small className='text-base'>{item.Lead_Name}</small>
          </li>
        ))}
      </ul>
      </div>
      </div>
    </Card>
  );
}

export default RecentActivities;
