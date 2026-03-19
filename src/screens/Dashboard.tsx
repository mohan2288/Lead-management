import DashboardCard from "../components/DashboardCard"
import LeadDistributionChart from "../components/LeadDistributionChart"
import LeadTrendChart from "../components/LeadTrendChart"
import PipelineChart from "../components/PipelineChart"
import RecentActivities from "../components/RecentActivities"
import RecentLeads from "../components/RecentLeads"

function Dashboard() {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold">Executive Dashboard</h1>
        <p className="text-lg text-gray-600">Welcome back! Here's your sales performance overview.</p>
      </div>
      <div>
        <DashboardCard/>
      </div>
      <div className="flex w-full gap-3 max-sm:flex-col">
        <PipelineChart/>
        <LeadDistributionChart/>
      </div>
      <LeadTrendChart/>
      <div className="flex w-full gap-3 max-sm:flex-col">
        <RecentLeads/>
        <RecentActivities/>
      </div>
    </div>
  )
}

export default Dashboard;
