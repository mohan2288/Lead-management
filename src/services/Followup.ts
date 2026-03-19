import api from "./AxiosInstance";

export const followCard = async()=>{
    return api.get("/lead/track_followups")
}

export const WeekCard = async()=>{
    return api.get("/lead/this_week_followups")
}

export const upcomingFollowup = async()=>{
    return api.get("/lead/upcoming_followups")
}

export const scheduleFollowup = async()=>{
    return api.post("/lead/schedule-followup")
}