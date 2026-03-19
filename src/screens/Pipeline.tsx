import PipelineCards from "../components/PipelineCards";
import PipelineUserCard from "../components/PipelineUserCard";
import "../styles/Pipeline.css"


function Pipeline() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold">Sales Pipeline</h1>
        <p className="text-gray-600">Visual kanban view of all leads by stage</p>
      </div>
      <div>
        <PipelineCards/>
      </div>
      <div>
        <PipelineUserCard/>
      </div>
    </div>
  )
}

export default Pipeline;
