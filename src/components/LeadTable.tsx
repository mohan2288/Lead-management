import { Table,Space, Button } from "antd";
import { EyeOutlined, ExportOutlined } from "@ant-design/icons";
import '../styles/Leads.css'
import { useNavigate } from "react-router-dom";

interface LeadTableProps {
  data: any[];
  page: number;
  size: number;
  total:number;
  onChangePage: (page: number, size: number) => void;
}

function LeadTable({ data,page,size,total,onChangePage }: LeadTableProps) {

  const navigate =useNavigate()

  const getStatusColor = (status: string) => {
  switch (status?.toLowerCase()) {
    case "qualified":
      return "#e6f7ec";
    case "active":
      return "#e6f0ff";
    case "contacted":
      return "#e6f0ff";
    case "archived":
      return "#f5f5f5";
    default:
      return "#f0f0f0";
  }
};

const getStageColor = (stage: string) => {
  switch (stage?.toLowerCase()) {
    case "negotiation":
      return "#fff7e6";
    case "proposal":
      return "#f9f0ff";
    case "new":
      return "#e6f7ff";
    case "won":
      return "#e6fffb";
    case "lost":
      return "#fff1f0";
    default:
      return "#f0f0f0";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority?.toLowerCase()) {
    case "high":
    case "high priority":
      return "#fff1f0";
    case "medium":
      return "#fff7e6";
    case "low":
      return "#f6ffed";
    default:
      return "#f0f0f0";
  }
};

  

 const columns = [
  { title: "Name", dataIndex: "name" },
  { title: "Company", dataIndex: "company" },
  { title: "Contact", dataIndex: "email" },

  {
    title: "Status",
    dataIndex: "status",
    render: (status: string) => (
      <span
        style={{
          backgroundColor: getStatusColor(status),
          padding: "4px 10px",
          borderRadius: "20px",
          fontSize: "12px",
          display: "inline-block",
        }}
      >
        {status}
      </span>
    ),
  },

  {
    title: "Stage",
    dataIndex: "stage",
    render: (stage: string) => (
      <span
        style={{
          backgroundColor: getStageColor(stage),
          padding: "4px 10px",
          borderRadius: "20px",
          fontSize: "12px",
        }}
      >
        {stage}
      </span>
    ),
  },

  {
    title: "Priority",
    dataIndex: "priority",
    render: (priority: string) => (
      <span
        style={{
          backgroundColor: getPriorityColor(priority),
          padding: "4px 10px",
          borderRadius: "20px",
          fontSize: "12px",
        }}
      >
        {priority}
      </span>
    ),
  },

  { title: "Source", dataIndex: "source" },
  { title: "Owner", dataIndex: "owner" },
  { title: "Value", dataIndex: "value" },

  {
    title: "Actions",
    render: (_:any,record:any) => (
      <Space size="middle">
        <Button className="action-icon">
          <EyeOutlined style={{ fontSize: "18px" }} onClick={()=>navigate(`/leads/${record.id}`)} />
        </Button>
        <ExportOutlined style={{ fontSize: "18px" }} />
      </Space>
    ),
  },
];
  return (
    <Table
      columns={columns}
      dataSource={data}
      bordered
      rowKey="id"
      scroll={{ x: "max-content" }}
       pagination={{
        current: page,
        pageSize: size,
        total:total,
        showSizeChanger: true,
        pageSizeOptions: ["10", "20", "30"],
        onChange: (page, pageSize) => {
          onChangePage(page, pageSize);
        },
      }}
    />
  );
}

export default LeadTable;