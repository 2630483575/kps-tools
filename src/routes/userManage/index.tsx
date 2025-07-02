import { createFileRoute } from "@tanstack/react-router";
import AppHeader from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { useEffect, useState } from "react";
import { Button, Table, TableProps, Tag, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import EditIcon from "@/assets/icons/edit.svg?react";
import DeleteIcon from "@/assets/icons/delete.svg?react";
export const Route = createFileRoute("/userManage/")({
  component: RouteComponent,
  staticData: {
    title: "人员管理",
  },
});
interface IUserColumn {
  id: number;
  userName: number;
  userRole: string;
  email: any;
  status: number;
  time: string;
}
function RouteComponent() {
  const [searchUser, setSearchUser] = useState("");
  const [tableData, setTableData] = useState<IUserColumn[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const tableColumns: TableProps<IUserColumn>["columns"] = [
    {
      title: "用户名称",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "用户角色",
      dataIndex: "userRole",
      key: "userRole",
    },
    {
      title: "用户邮箱",
      dataIndex: "email",
      key: "email",
    },
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
      title: "加入时间",
      dataIndex: "time",
      key: "time",
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
                className="text-base text-[#1960F6]"
                onClick={async (e) => {
                  e.stopPropagation();
                }}
              />
            </Tooltip>
            <Tooltip title="删除">
              <DeleteIcon
                className="text-base text-[#1960F6]"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];
  const fetchUserList = () => {
    const users: IUserColumn[] = [];
    for (let i = 1; i <= 100; i++) {
      users.push({
        id: i,
        userName: Math.floor(Math.random() * 9000) + 1000, // 生成1000-9999的随机数
        userRole: "标注员",
        email: `user${i}@example.com`,
        status: i % 2,
        time: "2025-06-12 14:55:20",
      });
    }
    setTableData(users);
  };
  useEffect(() => {
    fetchUserList();
  }, []);
  return (
    <div className="w-full h-full flex overflow-hidden">
      <Sidebar />
      <div className="w-full flex-1 flex flex-col">
        <AppHeader setSearchText={setSearchUser} fetchData={fetchUserList} />
        <div className="flex-1 p-[24px] bg-background h-full w-full overflow-auto">
          <div className="h-full shadow-list rounded-list bg-[#fff] p-[16px] flex flex-col">
            <div className="h-[50px] mb-5 flex items-center justify-between">
              <div>
                <span className="text-[24px] font-semibold">用户列表</span>
              </div>
              <Button
                size="large"
                type="primary"
                className="w-[148px] text-base"
                icon={<PlusOutlined />}
                onClick={() => {}}
              >
                添加用户
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
  );
}
