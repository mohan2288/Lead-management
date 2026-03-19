import { Card, Upload, message, Button, List } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CreateFile, ViewFile } from "../../services/LeadServices";

interface FileItem {
  file_id?: number;
  file_name?: string;
  file_url?: string;
}

function Files() {
  const { id } = useParams();
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(false);

  
  const fetchFiles = async () => {
    try {
      setLoading(true);

      const res = id
        ? await ViewFile(Number(id))
        : await ViewFile();

      setFiles(res.data || []);
    } catch (err) {
      message.error("Failed to fetch files");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [id]);

  
  const uploadProps = {
    showUploadList: false,
    beforeUpload: async (file: File) => {
      if (!id) {
        message.error("Activity ID required");
        return false;
      }

      try {
        await CreateFile(Number(id), file);
        message.success("File uploaded successfully");
        fetchFiles();
      } catch (err) {
        message.error("Upload failed");
      }

      return false;
    },
  };

  return (
    <Card style={{ width: "100%",display:"flex",alignItems:"center",justifyContent:"center" }}>
      
      {/* ✅ EMPTY UI */}
      {files.length === 0 ? (
        <Upload {...uploadProps}>
          <div
            style={{
              padding: "60px 20px",
              textAlign: "center",
              background: "#fafafa",
              cursor: "pointer",
            }}
          >
            <InboxOutlined style={{ fontSize: "40px", color: "#999" }} />
            <p style={{ marginTop: "10px", color: "#888" }}>
              No files attached yet
            </p>
            <Button style={{ marginTop: "10px" }}>
              Upload Files
            </Button>
          </div>
        </Upload>
      ) : (
        <>
          {/* ✅ Upload button when files exist */}
          <Upload {...uploadProps}>
            <Button style={{ marginBottom: "15px" }}>
              Upload More Files
            </Button>
          </Upload>

          {/* ✅ FILE LIST */}
          <List
            loading={loading}
            dataSource={files}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button
                    type="link"
                    href={item.file_url}
                    target="_blank"
                  >
                    View
                  </Button>,
                  <Button
                    type="link"
                    href={item.file_url}
                    download
                  >
                    Download
                  </Button>,
                ]}
              >
                {item.file_name || "Unnamed File"}
              </List.Item>
            )}
          />
        </>
      )}
    </Card>
  );
}

export default Files;