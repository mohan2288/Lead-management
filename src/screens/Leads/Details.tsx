import { Card } from 'antd'
import { useState, useEffect } from 'react'
import { activityDetails } from '../../services/LeadServices'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom';

interface LeadDetails {
  Created_At: string;
  Last_Contacted: string | null;
  Source_Name: string;
  Notes: string;
}

function Details() {

  const {id}=useParams()

  const [details, setDetails] = useState<LeadDetails | null>(null)

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await activityDetails(Number(id))
        console.log(response)
        setDetails(response.data)
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "failed to load Details")
      }
    }
    fetchdata()
  }, [])

  const formatDate = (date: string | null) => {
    if (!date) return "N/A"
    return new Date(date).toLocaleString()
  }

  return (
    <Card style={{ width: "100%" }}>
      <div>
        <h1 className='text-lg font-bold'>Lead Details</h1>

        {details ? (
          <div className='mt-4 space-y-2'>
            <p><strong>Created At:</strong> {formatDate(details.Created_At)}</p>
            <p><strong>Last Contacted:</strong> {formatDate(details.Last_Contacted)}</p>
            <p><strong>Source:</strong> {details.Source_Name}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}

        <div className='mt-4'>
          <h1 className='font-semibold'>Notes</h1>
          <p>{details?.Notes || "No notes available"}</p>
        </div>
      </div>
    </Card>
  )
}

export default Details