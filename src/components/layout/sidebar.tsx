import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import { RouteList } from "@/utils/constant";
import { useAppContext } from "@/context/app-context";
import {
  DatabaseOutlined,
  CloudUploadOutlined,
  TeamOutlined,
  AimOutlined,
  UploadOutlined,
  DownloadOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";

const { Sider } = Layout;
const routes = RouteList;
type MenuItem = Required<MenuProps>["items"][number];
const items: MenuItem[] = [
  {
    key: "/preview",
    icon: <AimOutlined />,
    label: "预览",
  },
  {
    key: "/operatorMarket",
    icon: <DatabaseOutlined />,
    label: "算子管理",
  },
  {
    key: "/operatorUpload",
    icon: <CloudUploadOutlined />,
    label: "算子发布",
  },
  {
    key: "/dataUpload",
    icon: <UploadOutlined />,
    label: "数据上传",
  },
  {
    key: "/dataDownload",
    icon: <DownloadOutlined />,
    label: "数据下载",
  },
  {
    key: "/userManage",
    icon: <TeamOutlined />,
    label: "人员管理",
  },
  {
    key: "/configManage",
    icon: <ProfileOutlined />,
    label: "配置中心",
  },
  // {
  //   key: "userManage",
  //   icon: <TeamOutlined />,
  //   label: "审核中心",
  // },
  // {
  //   key: "userManage",
  //   icon: <TeamOutlined />,
  //   label: "测试中心",
  // },
  // {
  //   key: "userManage",
  //   icon: <TeamOutlined />,
  //   label: "系统设置",
  // },
];
const Sidebar = () => {
  const navigate = useNavigate();
  const { activeMenu, setActiveMenu } = useAppContext();
  const [currentKey, setCurrentKey] = useState<string[]>([activeMenu]);
  const location = useLocation();
  const onSwitchMenu = ({
    key,
    keyPath,
  }: {
    key: string;
    keyPath: string[];
  }) => {
    setCurrentKey([key]);
    setActiveMenu(key);
    navigate({ to: "/" + key });
  };
  useEffect(() => {
    const segments = location.pathname.split("/").filter(Boolean);
    const key = "/" + segments[0];
    setCurrentKey([key]);
  }, [location.pathname]);
  return (
    <div className="h-full w-[200px]">
      <div className="font-semibold w-full text-[#fff] p-[20px] text-[20px] bg-[#001529]">
        工具平台
      </div>
      <Menu
        selectedKeys={currentKey}
        defaultSelectedKeys={currentKey}
        mode="inline"
        items={items}
        className="h-full"
        onClick={onSwitchMenu}
        theme="dark"
      />
    </div>
  );
};

export default Sidebar;
