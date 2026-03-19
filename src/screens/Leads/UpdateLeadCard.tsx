import { Button, Card ,Select } from "antd"
import {
  getStatuses,
  getPriorities,
  getStages,
  updateLead,
  
} from '../../services/LeadServices';
import { useState ,useEffect } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

function UpdateLeadCard() {

      const {id}=useParams()

      const [statuses, setStatuses] = useState<any[]>([]);
      const [priorities, setPriorities] = useState<any[]>([]);
      const [stages, setStages] = useState<any[]>([]);

      const [selectedStatus, setSelectedStatus] = useState<number | null>(null);
      const [selectedPriority, setSelectedPriority] = useState<number | null>(null);
      const [selectedStage, setSelectedStage] = useState<number | null>(null);

       useEffect(() => {
          const fetchDropdowns = async () => {
            try {
              const [statusRes, priorityRes, stageRes] =
                await Promise.all([
                  getStatuses(),
                  getPriorities(),
                  getStages(),
                ]);
      
              setStatuses(statusRes.data || []);
              setPriorities(priorityRes.data || []);
              setStages(stageRes.data || []);
              
      
            } catch (error: any) {
              toast.error(error?.response?.data?.message || "Failed to load dropdown data");
            }
          };
      
          fetchDropdowns();
        }, []);

        const handleChanges = async () => {
  if (!selectedStatus || !selectedStage || !selectedPriority) {
    toast.error("Please select all fields");
    return;
  }

  try {
    await updateLead({
      lead_id: Number(id),
      status_id: selectedStatus,
      stage_id: selectedStage,
      priority_id: selectedPriority
    });

    toast.success("Lead changed successfully");
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Failed to save changes");
  }
};
  return (
    <Card style={{width:"30%"}} className="hover-card max-sm:w-full!">
         <div className="flex flex-col gap-4">
            <h1 className="text-lg font-bold">Update Lead</h1>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                    <label className="text-base font-semibold">Status</label>
                     <Select
              placeholder="Select Status"
               className='custom-leadinput'
              value={selectedStatus}
              onChange={(value) => setSelectedStatus(value)}
              style={{ width: "100%" }}
              options={statuses.map((item: any) => ({
                value: item.Status_ID,
                label: item.Status_Name,
              }))}
            />
                </div>
                <div className="flex flex-col gap-3">
                    <label className="text-base font-semibold">Stage</label>
                    <Select
              placeholder="Select Stage"
               className='custom-leadinput'
              value={selectedStage}
              onChange={(value) => setSelectedStage(value)}
              style={{ width: "100%" }}
              options={stages.map((item: any) => ({
                value: item.Stage_ID,
                label: item.Stage_Name,
              }))}
            />
                </div>
                <div className="flex flex-col gap-3">
                    <label className="text-base font-semibold">Priority</label>
                     <Select
              placeholder="Select Priority"
               className='custom-leadinput'
              value={selectedPriority}
              onChange={(value) => setSelectedPriority(value)}
              style={{ width: "100%" }}
              options={priorities.map((item: any) => ({
                value: item.Priority_ID,
                label: item.Priority_Name,
              }))}
            />
                </div>
            </div>
            <Button type="primary" size="large" onClick={handleChanges}>Save Changes</Button>
         </div>
    </Card>
  )
}

export default UpdateLeadCard;
