import AppHeader from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import {
  AimOutlined,
  ClockCircleOutlined,
  DownloadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { createFileRoute } from "@tanstack/react-router";
import { Tag } from "antd";
import { useState } from "react";

export const Route = createFileRoute("/preview/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [searchText, setSearchText] = useState<string | undefined>("");
  const fetchPreviewData = () => {};
  return (
    <div className="w-full h-full flex overflow-hidden">
      <div className="h-full">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col">
        <AppHeader setSearchText={setSearchText} fetchData={fetchPreviewData} />
        <div className="flex-1 p-[24px] bg-background flex flex-col gap-6 overflow-auto">
          <div className="h-[200px] shadow-list rounded-list bg-[#fff] p-[16px] flex justify-between items-center">
            <div className=" flex flex-col justify-center">
              <span className="text-[24px] font-semibold">总算子数</span>
              <span className="text-[24px] font-semibold">150</span>
            </div>
            <AimOutlined className="mr-[10px] text-[48px] text-[rgb(50,153,221)]" />
          </div>
          <div className="h-[200px] shadow-list rounded-list bg-[#fff] p-[16px] flex justify-between items-center">
            <div className="flex flex-col justify-center">
              <span className="text-[24px] font-semibold">待审核</span>
              <span className="text-[24px] font-semibold text-[#ffae00]">
                8
              </span>
            </div>
            <ClockCircleOutlined className="mr-[10px] text-[48px] text-[#ffae00]" />
          </div>
          <div className="h-[200px] shadow-list rounded-list bg-[#fff] p-[16px] flex justify-between items-center">
            <div className="flex flex-col justify-center">
              <span className="text-[24px] font-semibold">活跃用户</span>
              <span className="text-[24px] font-semibold text-[#23af46]">
                8
              </span>
            </div>
            <UserOutlined className="mr-[10px] text-[48px] text-[#23af46]" />
          </div>
          <div className="h-[200px] shadow-list rounded-list bg-[#fff] p-[16px] flex justify-between items-center">
            <div className="flex flex-col justify-center">
              <span className="text-[24px] font-semibold">本月下载</span>
              <span className="text-[24px] font-semibold text-[#932bcf]">
                8
              </span>
            </div>
            <DownloadOutlined className="mr-[10px] text-[48px] text-[#932bcf]" />
          </div>
          <div className="h-[200px] shadow-list rounded-list bg-[#fff] p-[16px] flex flex-col">
            <div className="h-[50px] flex items-center">
              <span className="text-[16px] font-semibold">算子信息更新</span>
            </div>
            <div className="flex flex-1 justify-between items-center">
              <div className="flex flex-col justify-center">
                <span className="text-[16px] font-semibold">图像识别算子</span>
                <span className="text-slate-500">irelia - 2025-06-13</span>
              </div>
              <div>
                <Tag color="green">已发布</Tag>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
