import { Card } from 'antd'
import { useEffect, useState } from 'react'
import { UpdateProfile, ViewProfile } from '../../services/SettingServices'
import { toast } from 'react-toastify'
import CustomUploadButton from '../../components/CustomUploadButton'
import UpdateProfileForm from '../../components/UpdateProfileForm'

interface ProfilePayload {
    first_name: string,
    last_name: string,
    email:string,
    phone: string,
    role_id:string,
  }

function Profile() {

   const [profile,setProfile] = useState<ProfilePayload | null>(null)

  const fetchProfile = async()=>{
    try {
      const response = await ViewProfile()
    

      const data =response.data

     const formattedProfile = {
      first_name: data.First_Name,
      last_name: data.Last_Name,
      email: data.Email,
      phone: data.Phone,
      role_id: data.Role_Name,
      profile_pic_URL:data.profile_pic_URL
    }
      setProfile(formattedProfile);
    }
    catch(error:any){
       toast.error(error.message||"Failed to load profile")
    }
  }
  useEffect(()=>{
    fetchProfile()
  },[])

  const handleUpload = (file: File) => {
  setPhoto(file)
}

  const handleUpdate = async (values: any) => {

  const formData = new FormData()

  formData.append("first_name",values.first_name)
  formData.append("last_name",values.last_name)
   formData.append("email",values.email)
    formData.append("phone",values.phone)
  try {
    const response = await UpdateProfile(formData)
    toast.success("Profile updated successfully")
    console.log (response)

  } catch (error:any) {
    toast.error(error.message || "Update failed")
  }
}

 return (
    
      <Card>
        <div className='flex flex-col gap-5'>
          <h1 className='text-2xl font-semibold'>Profile Information</h1>
         <CustomUploadButton onUpload={handleUpload}/>
         {profile &&  <UpdateProfileForm profile={profile} onSubmit={handleUpdate}/>}
        </div> 
       </Card>

  )
}

export default Profile;
