import api from "./AxiosInstance";


export const performanceData = async()=>{
    return api.post("/Dashboard/",{
        headers :{
             'Accept': 'application/json'
        }
    })
}

export const stageData = async()=>{
    return api.post("/Dashboard/Pipeline_by_Stage")
}

export const Distribution = async()=>{
    return api.post("/Dashboard/Lead_Distribution")
}

export const Graph = async()=>{
    return api.post("/Dashboard/graph")
}

export const recentLeads = async()=>{
    return api.post("/Dashboard/Recentleads")
}

export const recentActivity = async()=>{
    return api.get("/Dashboard/view_all_lead_notes")
}