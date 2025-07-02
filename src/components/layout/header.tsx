import { useEffect, useState } from "react";
import { Button, Dropdown, Input, Menu, notification } from "antd";
import { Navigate, useLocation, useNavigate } from "@tanstack/react-router";
import { RouteList } from "@/utils/constant";
import { useAppContext } from "@/context/app-context";
import SearchIcon from "@/assets/icons/search-icon.svg";
import { BellOutlined } from "@ant-design/icons";
import HeaderIcon from "@/assets/img/female.png";

const routes = RouteList;
interface props {
  fetchData: () => void;
  setSearchText: (value: string) => void;
}
const titleList = [
  { label: "算子市场", key: "/operatorMarket" },
  { label: "算子发布", key: "/operatorUpload" },
  { label: "人员管理", key: "/userManage" },
  { label: "平台概览", key: "/preview" },
  { label: "数据上传", key: "/dataUpload" },
  { label: "数据下载", key: "/dataDownload" },
];
const AppHeader = ({ fetchData, setSearchText }: props) => {
  const { activeMenu, setActiveMenu } = useAppContext();
  const location = useLocation();
  const [title, setTitle] = useState<string | undefined>("");
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  useEffect(() => {
    const segments = location.pathname.split("/").filter(Boolean);
    const key = "/" + segments[0];
    const name = titleList.find((item) => item.key === key)?.label;
    setTitle(name);
  }, []);
  return (
    <div className="h-[100px] flex items-center px-[10px]">
      <div>
        <span className="text-[24px] font-bold">{title}</span>
      </div>
      <div className="ml-auto flex items-center gap-4 h-[50px]">
        <div>
          <Input
            placeholder="请输入搜索内容"
            size="large"
            prefix={<img src={SearchIcon} className="ml-2 mr-1" />}
            className="h-[40px]"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                fetchData();
              }
            }}
          />
        </div>
        <div className=" flex items-center justify-center">
          <BellOutlined />
        </div>
        <div className="flex items-center pr-8 h-full">
          <Dropdown
            menu={{
              items: [
                {
                  key: "logout",
                  label: "退出登录",
                },
              ],
              onClick: ({ key }) => {
                navigate({ to: "/login" });
                // if (key === "logout") {
                //   // 退出登录
                //   localStorage.removeItem("token");
                //   localStorage.removeItem("userInfo");
                //   localStorage.removeItem("permissions");
                //   localStorage.removeItem("uid");
                //   localStorage.removeItem("refresh_token");
                //   notification.success({
                //     message: "退出登录成功",
                //   });
                // }
              },
            }}
          >
            <div className="h-full flex items-center gap-4">
              <img
                src={HeaderIcon}
                alt=""
                className="rounded-full h-full cursor-pointer"
              />
              <span className="truncate">{userInfo?.name || "库帕思用户"}</span>
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default AppHeader;
