import api from "./AxiosInstance";

export const PipelineCard = async()=>{
    return api.post("/salespipeline/count",{});
}

export const UserCard = async()=>{
    return api.post("/salespipeline/view",{});
}