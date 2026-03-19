import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Card } from "antd";
import { stageData } from "../services/DashboardService";
import { toast } from "react-toastify";

interface ApiData {
  stage_name: string;
  lead_count: number;
}

interface SeriesType {
  name: string;
  data: number[];
}

const PipelineChart = () => {

  const [series, setSeries] = useState<SeriesType[]>([]);

  const [options, setOptions] = useState<ApexOptions>({
    chart: {
      type: "bar",
      height: 380
    },
    xaxis: {
      categories: []
    },
    title: {
      text: "Pipeline by Stage"
    },
    plotOptions: {
      bar: {
        borderRadius: 4
      }
    },
    dataLabels: {
      enabled: true
    }
  });

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await stageData();

        const apiData: ApiData[] = response.data;

        const categories = apiData.map((item) => item.stage_name);
        const counts = apiData.map((item) => item.lead_count);

        setSeries([
          {
            name: "Pipeline",
            data: counts
          }
        ]);

        setOptions((prev) => ({
          ...prev,
          xaxis: {
            categories
          }
        }));

      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Chart data not fetched");
      }
    };

    fetchdata();
  }, []);

  return (
    <Card id="chart" style={{width:"60%"}} className="pipeline-card max-sm:w-full!">
      <ReactApexChart options={options} series={series} type="bar" height={380} />
    </Card>
  );
};

export default PipelineChart;