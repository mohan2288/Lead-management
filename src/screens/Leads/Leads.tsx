import { Button, Card, Input, Dropdown, Space } from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  DownOutlined,
  FilterOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import type { MenuProps } from "antd";
import "../../styles/Leads.css";
import LeadTable from "../../components/LeadTable";
import { lead } from "../../services/LeadServices";
import { toast } from "react-toastify";

function Leads() {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [total, setTotal] = useState(0);

  const [leads, setLeads] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [status, setStatus] = useState("All Status");
  const [priority, setPriority] = useState("All Priority");
  const [stage, setStage] = useState("All Stages");

  // ✅ Dropdown Items
  const statusItems: MenuProps["items"] = [
    { key: "All Status", label: "All Status" },
    { key: "Active", label: "Active" },
    { key: "Contacted", label: "Contacted" },
    { key: "Qualified", label: "Qualified" },
    { key: "Unqualified", label: "Unqualified" },
    { key: "Archived", label: "Archived" },
  ];

  const priorityItems: MenuProps["items"] = [
    { key: "All Priority", label: "All Priority" },
    { key: "High", label: "High" },
    { key: "Medium", label: "Medium" },
    { key: "Low", label: "Low" },
  ];

  const stageItems: MenuProps["items"] = [
    { key: "All Stages", label: "All Stages" },
    { key: "New", label: "New" },
    { key: "Qualified", label: "Qualified" },
    { key: "Negotiation", label: "Negotiation" },
    { key: "Proposal", label: "Proposal" },
    { key: "Won", label: "Won" },
    { key: "Lost", label: "Lost" },
  ];

  // ✅ Dropdown handlers
  const statusMenu = {
    items: statusItems,
    onClick: ({ key }: { key: string }) => {
      setStatus(key);
      setPage(1);
    },
  };

  const priorityMenu = {
    items: priorityItems,
    onClick: ({ key }: { key: string }) => {
      setPriority(key);
      setPage(1);
    },
  };

  const stageMenu = {
    items: stageItems,
    onClick: ({ key }: { key: string }) => {
      setStage(key);
      setPage(1);
    },
  };

  // ✅ Debounce ONLY search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText]);

  // ✅ Fetch Leads
  const fetchLeads = async () => {
    try {
      const response = await lead({
        input: debouncedSearch,
        status: status === "All Status" ? "" : status,
        priority: priority === "All Priority" ? "" : priority,
        stage: stage === "All Stages" ? "" : stage,
        page,
        size,
      });

      const data = response?.data || [];

      const formattedLeads = data.map((item: any) => ({
        id: item.Lead_ID,
        name: item.lead_name,
        company: item.company,
        email: item.Email,
        status: item.Status_Name,
        stage: item.Stage_Name,
        priority: item.Priority_Name,
        source: item.Source_Name,
        owner: item.owner,
        value: item.Value,
      }));

      setLeads(formattedLeads);
      setTotal(response?.data?.total || data.length);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Error fetching leads");
    }
  };

  // ✅ Trigger API (filters + pagination + debounced search)
  useEffect(() => {
    fetchLeads();
  }, [status, priority, stage, page, size, debouncedSearch]);

  return (
    <div className="w-full m-auto flex flex-col gap-10">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
        <div>
          <span className="text-3xl font-bold">Lead Management</span>
          <p style={{ color: "#666" }}>
            Manage and track all your leads in one place
          </p>
        </div>

        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
          onClick={() => navigate("/leads/add-lead")}
          style={{ borderRadius: "8px" }}
        >
          Add Lead
        </Button>
      </div>

      {/* Filters */}
      <Card style={{ borderRadius: "10px" }} className="hover-card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >

          {/* Search */}
          <Input
            placeholder="Search leads by name, company or email"
            prefix={<SearchOutlined />}
            allowClear
            size="large"
            className="custom-leadinput"
            style={{ minWidth: "150px", flex: "1" }}
            onChange={(e) => setSearchText(e.target.value)}
          />

          {/* Filters */}
          <Space style={{ flexWrap: "wrap" }}>
            <Dropdown menu={statusMenu}>
              <span>
                <Button size="large">
                  {status} <DownOutlined />
                </Button>
              </span>
            </Dropdown>

            <Dropdown menu={priorityMenu}>
              <span>
                <Button size="large">
                  {priority} <DownOutlined />
                </Button>
              </span>
            </Dropdown>

            <Dropdown menu={stageMenu}>
              <span>
                <Button size="large">
                  {stage} <DownOutlined />
                </Button>
              </span>
            </Dropdown>

            <Button icon={<FilterOutlined />} size="large" />
          </Space>

        </div>
      </Card>

      {/* Table */}
      <div style={{ marginTop: "20px", overflowX: "auto" }}>
        <LeadTable
          data={leads}
          page={page}
          size={size}
          total={total}
          onChangePage={(p, s) => {
            setPage(p);
            setSize(s);
          }}
        />
      </div>

    </div>
  );
}

export default Leads;