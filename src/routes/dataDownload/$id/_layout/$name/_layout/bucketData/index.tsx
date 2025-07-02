import AppHeader from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import {
  createFileRoute,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import {
  Breadcrumb,
  Button,
  Drawer,
  Modal,
  Table,
  TableProps,
  Tooltip,
} from "antd";
import { useEffect, useState } from "react";
import backIcon from "@/assets/img/back.svg";
import AddBg from "@/assets/img/add-project-bg.svg";
import {
  BarsOutlined,
  DownloadOutlined,
  FileUnknownOutlined,
  FolderAddOutlined,
  FolderOutlined,
} from "@ant-design/icons";
import { TableRowSelection } from "antd/es/table/interface";
import styled from "styled-components";
import AddDownload from "@/components/dataDownload/addDownload";
import TaskDownload from "@/components/dataDownload/taskDownload";
import requestApi from "@/utils/request";

export const Route = createFileRoute(
  "/dataDownload/$id/_layout/$name/_layout/bucketData/"
)({
  component: RouteComponent,
});
const DownloadModal = styled(Modal)`
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

export interface IFileColumn {
  objectName: string;
  size: string;
  fullPath: string;
  type: string;
}

const bytesToMB = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return "0 MB";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const mb = bytes / Math.pow(k, 2); // bytes / (1024*1024)

  return parseFloat(mb.toFixed(dm)) + " MB";
};

const getLastSegment = (path: string): string => {
  const segments = path.split("/").filter(Boolean);
  return segments.length > 0 ? segments[segments.length - 1] : "";
};

function RouteComponent() {
  const { id, name } = useParams({
    from: "/dataDownload/$id/_layout/$name/_layout/bucketData/",
  });
  const [searchFile, setSearchFile] = useState("");
  const [breadcrumbItems, setBreadcrumbItems] = useState<any>([]);
  const navigate = useNavigate();
  const [currentPath, setCurrentPath] = useState([{ title: name, key: "" }]);
  const [tableData, setTableData] = useState<IFileColumn[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [filesSelected, setFilesSelected] = useState<IFileColumn[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showDownloadTable, setShowDownloadTable] = useState(false);

  const fetchFileList = (folderUrl: string = "") => {
    const params = {
      page,
      pageSize,
      configId: id,
      prefix: folderUrl,
    };
    requestApi({ url: "/file-api/list", method: "POST", data: params }).then(
      (res) => {
        if (res.code === 200) {
          setTableData(res.data.records);
          setTotal(res.data.total);
        }
      }
    );
  };
  const folderPreview = (record: any) => {
    const newPath = record.objectName
      ? [
          ...currentPath,
          { title: getLastSegment(record.objectName), key: record.objectName },
        ]
      : currentPath;
    setCurrentPath(newPath);
    getBreadcrumbItems(newPath);
    fetchFileList(record.objectName);
  };
  const getBreadcrumbItems = (newPath: { title: string; key: string }[]) => {
    const items = newPath.map((item, index) => ({
      title:
        index === 0 ? (
          <a onClick={() => navigateToFolder(0, "")}>{item.title}</a>
        ) : (
          <a onClick={() => navigateToFolder(index, item.key)}>{item.title}</a>
        ),
      key: item.key,
    }));
    setBreadcrumbItems(items);
  };
  const navigateToFolder = (index: number, url: string) => {
    const newPath = [...currentPath.slice(0, index + 1)];
    setCurrentPath(newPath);
    getBreadcrumbItems(newPath);
    fetchFileList(url);
  };
  const tableColumns: TableProps<IFileColumn>["columns"] = [
    {
      title: "文件名称",
      dataIndex: "objectName",
      key: "objectName",
      render: (text, record) => {
        if (record.type === "folder") {
          return (
            <div className="flex gap-2 items-center">
              <FolderOutlined className="text-base w-[32px] h-[32px] text-[#faad14]" />
              <Tooltip title={text}>
                <span
                  className="truncate cursor-pointer"
                  onClick={() => {
                    folderPreview(record);
                  }}
                >
                  {getLastSegment(text)}
                </span>
              </Tooltip>
            </div>
          );
        } else {
          return (
            <div className="flex gap-2 items-center">
              <FileUnknownOutlined className="text-base w-[32px] h-[32px] text-[#1960F6]" />
              <Tooltip title={text}>
                <span className="truncate ">{getLastSegment(text)}</span>
              </Tooltip>
            </div>
          );
        }
      },
    },
    {
      title: "文件大小",
      dataIndex: "size",
      key: "size",
      render: (text, record) => {
        return <span>{bytesToMB(text)}</span>;
      },
    },
    {
      title: "文件地址",
      dataIndex: "fullPath",
      key: "fullPath",
      render: (text, record) => {
        return (
          <Tooltip title={text}>
            <span className="truncate">{text}</span>
          </Tooltip>
        );
      },
    },
  ];
  const onSelectChange = (
    newSelectedRowKeys: React.Key[],
    selectedRows: IFileColumn[]
  ) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setFilesSelected(selectedRows);
  };
  const rowSelection: TableRowSelection<IFileColumn> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  useEffect(() => {
    folderPreview({ objectName: "" });
  }, []);

  return (
    <>
      <div className="w-full h-full flex overflow-hidden">
        <Sidebar />
        <div className="w-full flex-1 flex flex-col">
          <AppHeader setSearchText={setSearchFile} fetchData={fetchFileList} />
          <div className="flex-1 p-[24px] bg-background h-full w-full overflow-auto">
            <div className="h-full shadow-list rounded-list bg-[#fff] p-[16px] flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={backIcon}
                  alt=""
                  className="cursor-pointer font-semibold text-[32px]"
                  onClick={() => {
                    navigate({ to: `/dataDownload` });
                  }}
                />
                <span className="font-semibold text-[16px]">配置列表</span>
              </div>
              <div className="flex items-center justify-between">
                <Breadcrumb separator=">" items={breadcrumbItems}></Breadcrumb>
                <div>
                  <Button
                    size="large"
                    className="mr-[30px] px-[30px]"
                    type="primary"
                    icon={<DownloadOutlined />}
                    onClick={() => {
                      setShowModal(true);
                    }}
                    disabled={filesSelected.length === 0}
                  >
                    批量下载
                  </Button>
                  <Button
                    size="large"
                    className="mr-[30px] px-[30px]"
                    type="primary"
                    icon={<BarsOutlined />}
                    onClick={() => {
                      setShowDownloadTable(true);
                    }}
                  >
                    下载列表
                  </Button>
                </div>
              </div>
              <div className="flex-1 h-full">
                <Table
                  columns={tableColumns}
                  dataSource={tableData ?? []}
                  rowKey={(record) => record.objectName}
                  rowSelection={{ type: "checkbox", ...rowSelection }}
                  pagination={{
                    className: "h-8 !mt-5",
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
      <DownloadModal
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
        <AddDownload
          cancel={() => {
            setShowModal(false);
          }}
          success={() => {
            setShowModal(false);
            setSelectedRowKeys([]);
            setFilesSelected([]);
            fetchFileList();
          }}
          filesSelected={filesSelected}
        />
      </DownloadModal>
      <Drawer
        width={880}
        className="data-drawer invite-drawer"
        title="下载列表"
        onClose={() => {
          setShowDownloadTable(false);
        }}
        open={showDownloadTable}
        destroyOnHidden
      >
        <TaskDownload
          cancel={() => {
            setShowDownloadTable(false);
          }}
          success={() => {
            setShowDownloadTable(false);
            fetchFileList();
          }}
        />
      </Drawer>
    </>
  );
}
