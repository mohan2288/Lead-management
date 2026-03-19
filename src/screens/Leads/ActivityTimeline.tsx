import { Button, Card, Input } from 'antd'
import { useState, useEffect } from 'react';
import { MailOutlined, PhoneOutlined } from "@ant-design/icons"
import { CreateActivity, getActivity } from '../../services/LeadServices';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { WechatWorkOutlined } from '@ant-design/icons';

function ActivityTimeline() {

  const { id } = useParams();
  const { TextArea } = Input;

  const [notes, setNotes] = useState("");
  const [activities, setActivities] = useState<any[]>([]);

  
  const fetchActivities = async () => {
    try {
      const response = await getActivity(Number(id));

      setActivities(response.data || []);
    } catch (error: any) {
      toast.error("Failed to load activities");
    }
  };

  useEffect(() => {
    if (id) fetchActivities();
  }, [id]);

  const handleActivity = async () => {
    if (!notes) {
      toast.error("Please enter notes");
      return;
    }

    try {
      await CreateActivity(Number(id), {
        Notes: notes,
        scheduled_on: new Date().toISOString()
      });

      toast.success("Activity added");

      setNotes("");       
      fetchActivities(); 

    } catch (error: any) {
      toast.error(error.response?.data?.message || "failed to create activity");
    }
  };

  return (
    <Card style={{ width: "100%" }} className='hover-card max-sm:w-full!'>
      <div className='flex flex-col gap-4 p-5! border-b border-b-blue-100'>
        <h1 className='text-lg font-bold'>Add Activity</h1>

        <TextArea
          rows={4}
          value={notes}
          placeholder='Add a note, log a call, or record an interaction...'
          onChange={(e) => setNotes(e.target.value)}
        />

        <div className='flex gap-3 max-sm:flex-wrap'>
          <Button type='primary' size='large' onClick={handleActivity}>
            Add Activity
          </Button>

          <Button size='large'>
            <PhoneOutlined /> Log Call
          </Button>

          <Button size='large'>
            <MailOutlined /> Log Email
          </Button>
        </div>
      </div>
        {/*  RECENT ACTIVITY */}
      <div>
        <h1 className='text-lg font-bold'>Lead Activity</h1>

        {activities.length > 0 ? (
          activities.map((item: any, index: number) => (
            <div
              key={index}
              className=" flex gap-5 items-center border 
              border-blue-100 p-3!  rounded-lg"
            >
              <div className='text-cyan-400'><WechatWorkOutlined /></div>
              <p> 
              <strong>Note .</strong>{new Date(item.Scheduled_On).toDateString()} <br />
              {item.Notes} by {item.Username}
              </p>
             
            </div>
          ))
        ) : (
          <p>No activity found</p>
        )}
      </div>

    </Card>
  )
}

export default ActivityTimeline;