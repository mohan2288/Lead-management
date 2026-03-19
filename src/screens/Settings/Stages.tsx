import { Button, Card } from 'antd'
import { TagOutlined } from '@ant-design/icons'
import { useState,useEffect } from 'react'
import { Viewstage } from '../../services/SettingServices'
import { toast } from 'react-toastify'


interface Stage {
  Stage_ID: number
  Stage_Name: string
  Created_At: string
  Updated_At: string
}

function Stages() {

      const [data,setData]=useState<Stage[]>([])
      const [loading,setLoading] = useState(true)

      useEffect(()=>{
        const fetchdata = async()=>{
          try{
             const response = await Viewstage()
             setData(response.data)
          }
          catch(error:any){
             toast.error(error?.response?.data?.message || "Viewstage is not fetched")
          }
          finally{
            setLoading(false)
          }
        }
        fetchdata()
      },[])
      
      
  

  return (
   <Card style={{width:"100%"}} loading={loading}>
    <div className='flex flex-col gap-5 w-1/2 max-sm:w-full'>
      <div className='flex flex-col gap-5'>
        <h1 className='text-lg font-semibold'>Lead Stage Configuration</h1>
        <p className='text-gray-600 text-base'>Configure the stages your leads move through in the sales pipeline</p>
      </div>
       {data.map((item)=>(
        <div 
          key={item.Stage_ID}
          className='flex justify-between items-center border p-4! rounded-md border-blue-100'
        >
          <h1 className='text-base font-medium'>{item.Stage_Name}</h1>
         <Button type="link">Edit</Button>
        </div>
      ))}
      
        <Button size='large'> <TagOutlined />Add Custom Stage</Button>
    </div>
   </Card>
  )
}

export default Stages
