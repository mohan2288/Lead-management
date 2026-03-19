import api from './AxiosInstance';

export const lead = (params: any) => {
  return api.get("/lead/show?page=1&size=10", { params });
};

export const addLead = async(data:any)=>{
    return api.post("/lead/create",data)
}

export const Viewlead = async(id:any)=>{
  return api.get(`/lead/view/${id}`)
}

export const updateLead = async(data:any)=>{
  return api.put(`/lead/update`,data)
}

export const CreateActivity = async(id:number,data:any)=>{
  return api.post(`/lead/add_Activity/${id}`,data)
}

export const getActivity = async(id:number)=>{
  return api.get(`/lead/view_Activity?lead_id=${id}`)
}

export const activityDetails = async(id:number)=>{
  return api.get(`/lead/activity_Details?lead_id=${id}`)
}

export const CreateFile = async(id:number,file:File)=>{
   const formData = new FormData();
  formData.append("file", file);
  return api.post(`/lead/add_File?activity_id=${id}`,formData,{
     headers: {
      "Content-Type": "multipart/form-data",
    },
  })
}

export const ViewFile = async (id?: number) => {
  if (id) {
    return api.get(`/lead/view_Files?activity_id=${id}`);
  }
  return api.get(`/lead/view_Files`);
};

{/* dropdowns */}

export const getStatuses =async() =>{
  return  api.get("/lead/view_Status");
}
export const getPriorities =async () =>{
  return  api.get("/lead/view_Priority");
} 
export const getStages =async () =>{
  return api.get("/lead/view_Stage");
} 
export const getOwners = async() =>{
  return  api.post("/lead/view_owner");
}
export const getSources = async() => {
  return api.get("/lead/view_Source");
}

export const SearchLead = async (params: {
  input: string;
  page: number;
  size: number;
}) => {
  return api.get("/lead/SerchLead", {
    params,
  });
};