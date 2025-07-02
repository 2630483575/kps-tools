import BucketUpload from "@/components/dataUpload/bucketUpload";
import AppHeader from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { PlusOutlined } from "@ant-design/icons";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button, Modal, Table, TableProps } from "antd";
import { useState } from "react";
import styled from "styled-components";
import AddBg from "@/assets/img/add-project-bg.svg";

export const Route = createFileRoute("/dataUpload/_layout/minio")({
  component: RouteComponent,
});

const routeNavs = [
  {
    label: "minio",
    value: "/dataUpload/minio",
  },
  {
    label: "aliyun",
    value: "/dataUpload/aliyun",
  },
];
interface IMinioColumn {
  id: number;
  bucketName: string;
}
const UploadModal = styled(Modal)`
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
function RouteComponent() {
  const [searchFile, setSearchFile] = useState("");
  const [tableData, setTableData] = useState<IMinioColumn[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const fetchFileList = () => {};
  const columns: TableProps<IMinioColumn>["columns"] = [
    {
      title: "桶名",
      dataIndex: "bucketName",
      key: "bucketName",
    },
  ];
  return (
    <>
      <div className="w-full h-full flex overflow-hidden">
        <Sidebar />
        <div className="w-full flex-1 flex flex-col">
          <AppHeader setSearchText={setSearchFile} fetchData={fetchFileList} />
          <div className="flex-1 p-[24px] bg-background h-full w-full overflow-auto">
            <div className="h-full shadow-list rounded-list bg-[#fff] p-[16px] flex flex-col">
              <div className="h-[50px] mb-[5px] flex items-center">
                {routeNavs.map((item, index) => (
                  <Link
                    to={item.value}
                    key={index}
                    className="text-base text-[#8292A3] px-[30px] rounded-md h-9 leading-9 cursor-pointer select-none hover:text-[#4268FF]"
                    activeProps={{ className: "bg-[#E8F2FF] !text-[#4268FF]" }}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="flex flex-col flex-1 w-full">
                <Button
                  size="large"
                  type="primary"
                  className="w-[148px] text-base ml-auto"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    setShowUploadModal(true);
                  }}
                >
                  数据上传
                </Button>
                <div className="w-full h-full flex-1 overflow-auto">
                  <Table
                    columns={columns}
                    dataSource={tableData}
                    rowKey={(record) => record.id}
                    pagination={{
                      className: "h-8 !mt-5",
                      showTotal: (total) => `共 ${total} 条`,
                      showQuickJumper: true,
                    }}
                  ></Table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UploadModal
        title={false}
        open={showUploadModal}
        onCancel={() => {
          setShowUploadModal(false);
        }}
        footer={null}
        closable={false}
        centered
        width={660}
        destroyOnHidden
      >
        <BucketUpload
          cancel={() => {
            setShowUploadModal(false);
          }}
          success={() => {
            setShowUploadModal(false);
            fetchFileList();
          }}
        />
      </UploadModal>
    </>
  );
}
