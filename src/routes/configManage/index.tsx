import AppHeader from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { createFileRoute } from "@tanstack/react-router";
import { Button, Input, Modal, Select, Table, TableProps, Tooltip } from "antd";
import { useEffect, useState } from "react";
import EditIcon from "@/assets/icons/edit.svg?react";
import DeleteIcon from "@/assets/icons/delete.svg?react";
import AddBg from "@/assets/img/add-project-bg.svg";
import styled from "styled-components";
import AddApp from "@/components/configManage/addApp";

export const Route = createFileRoute("/configManage/")({
  component: RouteComponent,
});
interface IAppColumn {
  id: number;
  name: string;
  env: string;
  keyName: string;
  valueName: string;
  ownerName: string;
}
const AppModal = styled(Modal)`
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

const envOptions = [
  { value: "dev", label: "dev" },
  { value: "test", label: "test" },
  { value: "pre", label: "pre" },
  { value: "prod", label: "prod" },
];

function RouteComponent() {
  const [searchConfig, setSearchConfig] = useState("");
  const [appName, setAppName] = useState("");
  const [modal, contextHolder] = Modal.useModal();
  const [appOptions, setAppOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [envName, setEnvName] = useState("");
  const [ownerOptions, setOwnerOptions] = useState<
    { label: string; value: number }[]
  >([]);
  const [ownerName, setOwnerName] = useState("");

  const [keyName, setKeyName] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editType, setEditType] = useState<"add" | "edit">("add");
  const [appInfo, setAppInfo] = useState<IAppColumn | null>(null);
  const columns: TableProps<IAppColumn>["columns"] = [
    {
      title: "序号",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "App",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Env",
      dataIndex: "env",
      key: "env",
    },
    {
      title: "Key",
      dataIndex: "keyName",
      key: "keyName",
    },
    {
      title: "Value",
      dataIndex: "valueName",
      key: "valueName",
    },
    {
      title: "Owner",
      dataIndex: "ownerName",
      key: "ownerName",
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
                onClick={async (e) => {
                  e.stopPropagation();
                  setEditType("edit");
                  setAppInfo(record);
                  setShowAddModal(true);
                }}
              />
            </Tooltip>
            <Tooltip title="删除">
              <DeleteIcon
                className="text-base text-[#1960F6] cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  modal.confirm({
                    title: "确认删除应用?",
                    content: "删除应用后，应用信息将会被删除，是否确认删除？",
                    okText: "确认",
                    cancelText: "取消",
                    async onOk() {
                      // 掉接口删除
                    },
                    onCancel() {
                      console.log("Cancel");
                    },
                  });
                }}
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];
  const [tableData, setTableData] = useState<IAppColumn[]>([]);
  const fetchAppOptions = () => {
    const options = [
      { value: "app1", label: "app1" },
      { value: "app2", label: "app2" },
      { value: "app3", label: "app3" },
    ];
    setAppOptions(options);
  };
  const fetchOwnerOptions = () => {
    const options = [
      { value: 1, label: "owner1" },
      { value: 2, label: "owner2" },
      { value: 3, label: "owner3" },
    ];
    setOwnerOptions(options);
  };
  const fetchAppList = () => {
    const params = {
      appName: appName,
      envName: envName,
      ownerName: ownerName,
      keyName: keyName,
    };
    // 调用接口获取list
    const mockAppData: IAppColumn[] = Array.from(
      { length: 100 },
      (_, index) => ({
        id: index + 1,
        name: `app-${index + 1}`, // 20个不同的应用名称
        env: ["dev", "test", "prod"][index % 3], // 4种环境
        keyName: `config.key.${String.fromCharCode(97 + (index % 26))}.${
          index + 1
        }`, // 生成key名称如 config.key.a.1
        valueName: `value-${Math.random().toString(36).substring(2, 8)}`, // 随机值
        ownerName: ["admin", "user", "system", "devops"][index % 4], // 4种所有者
      })
    );
    setTableData(mockAppData);
  };
  useEffect(() => {
    fetchAppOptions();
    fetchOwnerOptions();
    fetchAppList();
  }, []);
  return (
    <>
      {contextHolder}
      <div className="w-full h-full flex overflow-hidden">
        <Sidebar />
        <div className="w-full flex-1 flex flex-col">
          <AppHeader setSearchText={setSearchConfig} fetchData={fetchAppList} />
          <div className="flex-1 p-[24px] bg-background h-full w-full overflow-auto">
            <div className="h-full shadow-list rounded-list bg-[#fff] p-[16px] flex flex-col">
              <div className="h-[50px] mb-5 flex items-center">
                <div>
                  <span className="text-[24px] font-semibold">配置列表</span>
                </div>
              </div>
              <div className="flex flex-col flex-1 w-full gap-4">
                <div className="h-[50px] flex items-center gap-4">
                  <Select
                    size="large"
                    showSearch
                    placeholder="请选择App名称"
                    optionFilterProp="label"
                    onChange={(value) => setAppName(value)}
                    options={appOptions}
                  />
                  <Select
                    size="large"
                    showSearch
                    placeholder="请选择Env名称"
                    optionFilterProp="label"
                    onChange={(value) => setEnvName(value)}
                    options={envOptions}
                  />
                  <Select
                    size="large"
                    showSearch
                    placeholder="请选择用户名称"
                    optionFilterProp="label"
                    onChange={(value) => setOwnerName(value)}
                    options={ownerOptions}
                  />
                  <Input
                    size="large"
                    placeholder="情输入Key的名称"
                    className="w-[200px]"
                    value={keyName}
                    onChange={(e) => setKeyName(e.target.value)}
                  />
                  <Button
                    size="large"
                    icon={<SearchOutlined />}
                    onClick={() => {
                      fetchAppList();
                    }}
                  >
                    查询
                  </Button>
                  <Button
                    size="large"
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => {
                      setEditType("add");
                      setShowAddModal(true);
                    }}
                  >
                    新增
                  </Button>
                </div>
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
      <AppModal
        title={false}
        open={showAddModal}
        onCancel={() => {
          setShowAddModal(false);
        }}
        footer={null}
        closable={false}
        centered
        width={660}
        destroyOnHidden
      >
        <AddApp
          cancel={() => {
            setShowAddModal(false);
          }}
          success={() => {
            setShowAddModal(false);
            fetchAppList();
          }}
          type={editType}
          appInfo={appInfo}
          appOptions={appOptions}
          envOptions={envOptions}
          ownerOptions={ownerOptions}
        />
      </AppModal>
    </>
  );
}
