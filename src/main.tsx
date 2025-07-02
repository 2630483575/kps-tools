import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { ConfigProvider, Spin } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import { setLoadingHandler } from "@/utils/request";
import "./index.css";
import theme from "@/lib/antdThemeConfig";

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
});

// Register things for typesafety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("app")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  const Root = () => {
    const [loading, setLoading] = useState(false); // 新增：全局 loading 状态

    // 设置全局 loading 回调
    setLoadingHandler((val: boolean) => {
      setLoading(val);
    });

    return (
      <ConfigProvider locale={zhCN} theme={theme}>
        <>
          <RouterProvider router={router} />
          <Spin
            spinning={loading}
            tip="Loading..."
            size="large"
            fullscreen
            className="!z-[2000]"
          ></Spin>
        </>
      </ConfigProvider>
    );
  };

  root.render(<Root />);
}
