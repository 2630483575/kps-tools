import requestApi from "@/utils/request";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button, Form, Input } from "antd";
import { useState } from "react";

export const Route = createFileRoute("/login/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    const params = { username: values.username, password: values.password };
    await requestApi({
      url: "/login-api",
      method: "POST",
      data: params,
    }).then((res) => {
      if (res.code === 200) {
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        localStorage.setItem("token", res.data.token);
        navigate({
          to: "/dataDownload",
        });
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      {/* 背景装饰元素 */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500 opacity-20 blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full bg-purple-500 opacity-20 blur-3xl"></div>
      </div>

      {/* 毛玻璃登录卡片 */}
      <div className="relative z-10 w-full max-w-md">
        <div className="backdrop-blur-lg bg-white/10 rounded-2xl shadow-xl overflow-hidden border border-white/10">
          <div className="px-10 py-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white">登录</h2>
              {/* <p className="mt-2 text-white/80">请输入您的账号密码登录系统</p> */}
            </div>
            <Form onFinish={onFinish} className="space-y-6">
              <Form.Item
                name="username"
                rules={[{ required: true, message: "请填写用户名!" }]}
              >
                <Input
                  type="text"
                  className="w-full "
                  placeholder="用户名"
                  size="large"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[{ required: true, message: "请填写密码!" }]}
              >
                <Input
                  type="password"
                  className="w-full"
                  placeholder="密码"
                  size="large"
                />
              </Form.Item>
              <div>
                <Button
                  htmlType="submit"
                  type="primary"
                  size="large"
                  className="w-full"
                >
                  登录
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
