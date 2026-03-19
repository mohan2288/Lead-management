import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Card } from "antd";
import { toast } from "react-toastify";
import { Graph } from "../services/DashboardService";

interface MonthData {
  month: string;
  Total_Count: number;
}

const LeadTrendChart = () => {

  const [series, setSeries] = useState<any[]>([]);

  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      type: "line",
      height: 350
    },
    stroke: {
      curve: "smooth"
    },
    dataLabels: {
      enabled: true
    },
    xaxis: {
      categories: []
    },
    title: {
      text: "Monthly Lead Trend"
    },
    tooltip: {
      shared: true,
      intersect: false
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {

        const response = await Graph();
        const data = response.data;

        const totalLeads: MonthData[] = data["Total Leads per Month"];
        const wonLeads: MonthData[] = data["Won Leads per month"];

        const months = Array.from(
          new Set([
            ...totalLeads.map(i => i.month),
            ...wonLeads.map(i => i.month)
          ])
        );

        const totalCounts = months.map(
          m => totalLeads.find(i => i.month === m)?.Total_Count || 0
        );

        const wonCounts = months.map(
          m => wonLeads.find(i => i.month === m)?.Total_Count || 0
        );

        setSeries([
          {
            name: "Total Leads",
            data: totalCounts
          },
          {
            name: "Won Deals",
            data: wonCounts
          }
        ]);

        setOptions(prev => ({
          ...prev,
          xaxis: {
            categories: months
          }
        }));

      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Chart data not fetched");
      }
    };

    fetchData();
  }, []);

  return (
    <Card id="chart" className="lead-card">
      <ReactApexChart options={options} series={series} type="line" height={350}/>
    </Card>
  );
};

export default LeadTrendChart;