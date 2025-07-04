import requestApi from "@/utils/request";
import { Progress, Table, TableProps, Tag } from "antd";
import { useEffect, useState } from "react";

interface IDownloadColumn {
  jobId: string;
  created: string;
  status: string;
  progress: number;
}
const TaskDownload = ({ cancel, success }: any) => {
  const [downloadTaskList, setDownloadTaskList] = useState<IDownloadColumn[]>(
    []
  );
  const downloadColumns: TableProps<IDownloadColumn>["columns"] = [
    {
      title: "任务Id",
      dataIndex: "jobId",
      key: "jobId",
    },
    {
      title: "下载进度",
      dataIndex: "progress",
      key: "progress",
      render: (text, record) => {
        return <Progress percent={text} />;
      },
    },
    {
      title: "下载时间",
      dataIndex: "created",
      key: "created",
    },
    {
      title: "任务状态",
      dataIndex: "status",
      key: "status",
      render: (text, record) => {
        let color =
          record.status === "FAILED"
            ? "volcano"
            : record.status === "SUCCESS"
            ? "green"
            : "blue";
        let content =
          record.status === "FAILED"
            ? "已失败"
            : record.status === "SUCCESS"
            ? "已完成"
            : "进行中";
        return <Tag color={color}>{content}</Tag>;
      },
    },
  ];
  const fetchDownloadList = async () => {
    await requestApi({
      url: "/file-api/jobList",
      method: "GET",
    }).then((res) => {
      if (res.code === 200) {
        setDownloadTaskList(res.data);
      }
    });
  };
  useEffect(() => {
    fetchDownloadList();
  }, []);
  return (
    <div>
      <Table
        columns={downloadColumns}
        dataSource={downloadTaskList}
        pagination={{
          className: "h-8 !mt-5",
          showTotal: (total) => `共 ${total} 条`,
          showQuickJumper: true,
        }}
        rowKey={(record) => record.jobId}
      />
    </div>
  );
};

export default TaskDownload;
