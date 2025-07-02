import AppHeader from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { CloudServerOutlined, PlusOutlined } from "@ant-design/icons";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button, Modal, Table, TableProps, Tag, Tooltip } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import AddBg from "@/assets/img/add-project-bg.svg";
import EditIcon from "@/assets/icons/edit.svg?react";
import DeleteIcon from "@/assets/icons/delete.svg?react";
import AddConfig from "@/components/dataDownload/addConfig";
import requestApi from "@/utils/request";

export const Route = createFileRoute("/dataDownload/")({
  component: RouteComponent,
  staticData: {
    title: "数据下载",
  },
});

const ConfigModal = styled(Modal)`
  .ant-modal-content::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 200px;
    border-radius: 24px 24px 0 0;
    background: url("${AddBg}") no-repeat;
    background-size: cover;
  }
  .ant-modal-content {
    padding: 32px;
  }
  .ant-modal-body {
    padding: 0;
    position: relative;
  }
`;

interface IConfigColumn {
  id: number;
  endpoint: string;
  bucket: string;
  accessKey: string;
  secretKey: string;
  status: number;
  // creatorName: string;
  // createTime: string;
}

function RouteComponent() {
  const [searchConfig, setSearchConfig] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editType, setEditType] = useState<"add" | "edit">("add");
  const [configInfo, setConfigInfo] = useState<IConfigColumn | null>(null);
  const navigate = useNavigate();
  const tableColumns: TableProps<IConfigColumn>["columns"] = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "IP",
      dataIndex: "endpoint",
      key: "endpoint",
    },
    {
      title: "桶名",
      dataIndex: "bucket",
      key: "bucket",
    },
    {
      title: "Access Key",
      dataIndex: "accessKey",
      key: "accessKey",
    },
    {
      title: "Secret Key",
      dataIndex: "secretKey",
      key: "secretKey",
    },
    // {
    //   title: "创建人",
    //   dataIndex: "creatorName",
    //   key: "creatorName",
    // },
    // {
    //   title: "创建时间",
    //   dataIndex: "createTime",
    //   key: "createTime",
    // },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (text, record) => {
        let color = record.status === 0 ? "volcano" : "green";
        let content = record.status === 0 ? "已禁用" : "已启用";
        return <Tag color={color}>{content}</Tag>;
      },
    },
    {
      title: "操作",
      dataIndex: "operation",
      key: "operation",
      width: "200px",
      render: (text, record) => {
        return (
          <div className="flex items-center gap-x-[30px]">
            <Tooltip title="编辑">
              <EditIcon
                className="text-base text-[#1960F6] cursor-pointer"
                onClick={(e) => {
                  setEditType("edit");
                  setConfigInfo(record);
                  setShowModal(true);
                }}
              />
            </Tooltip>
            {record.status === 1 ? (
              <Tooltip title="文件列表">
                <CloudServerOutlined
                  className="text-base text-[#1960F6] cursor-pointer"
                  onClick={(e) => {
                    navigate({
                      to: `/dataDownload/${record.id}/${record.bucket}/bucketData`,
                    });
                  }}
                />
              </Tooltip>
            ) : (
              <CloudServerOutlined className="text-base text-[#7e7f82] cursor-not-allowed" />
            )}
          </div>
        );
      },
    },
  ];
  const [tableData, setTableData] = useState<IConfigColumn[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const fetchConfigList = () => {
    requestApi({
      url: "/config-api/listConfig",
      method: "GET",
    }).then((res) => {
      if (res.code === 200) {
        setTableData(res.data);
      }
    });
  };
  useEffect(() => {
    fetchConfigList();
  }, []);
  return (
    <>
      <div className="w-full h-full flex overflow-hidden">
        <Sidebar />
        <div className="w-full flex-1 flex flex-col">
          <AppHeader
            setSearchText={setSearchConfig}
            fetchData={fetchConfigList}
          />
          <div className="flex-1 p-[24px] bg-background h-full w-full overflow-auto">
            <div className="h-full shadow-list rounded-list bg-[#fff] p-[16px] flex flex-col">
              <div className="h-[50px] mb-5 flex items-center justify-between">
                <div>
                  <span className="text-[24px] font-semibold">配置列表</span>
                </div>
                <Button
                  size="large"
                  type="primary"
                  className="w-[148px] text-base"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    setEditType("add");
                    setShowModal(true);
                  }}
                >
                  添加配置
                </Button>
              </div>
              <div className="w-full h-full flex-1 overflow-auto">
                <Table
                  columns={tableColumns}
                  dataSource={tableData ?? []}
                  rowKey={(record) => record.id}
                  className="w-full h-full"
                  pagination={{
                    pageSize,
                    current: page,
                    total,
                    showTotal: (total) => `共 ${total} 条`,
                    showQuickJumper: true,
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "20", "50"],
                    onChange: (page) => {
                      setPage(page);
                    },
                    onShowSizeChange: (page, pageSize) => {
                      setPageSize(pageSize);
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfigModal
        title={false}
        open={showModal}
        onCancel={() => {
          setShowModal(false);
        }}
        footer={null}
        closable={false}
        centered
        width={660}
        destroyOnHidden
      >
        <AddConfig
          cancel={() => {
            setShowModal(false);
          }}
          success={() => {
            setShowModal(false);
            fetchConfigList();
          }}
          type={editType}
          configInfo={configInfo}
        />
      </ConfigModal>
    </>
  );
}
