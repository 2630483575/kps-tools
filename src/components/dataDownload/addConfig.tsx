import requestApi from "@/utils/request";
import { Button, Form, Input, notification, Radio } from "antd";
import { useState } from "react";

const AddConfig = ({ cancel, success, type, configInfo }: any) => {
  const [form] = Form.useForm();
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const onFinish = (values: any) => {
    if (type === "add") {
      const params = {
        ...values,
        userId: userInfo.id,
      };
      requestApi({
        url: "/config-api/addConfig",
        method: "POST",
        data: params,
      }).then((res) => {
        if (res.code === 200) {
          notification.success({ message: res.msg });
          success && success();
        }
      });
    } else {
      const params = {
        ...values,
        id: configInfo.id,
        userId: userInfo.id,
      };
      requestApi({
        url: "/config-api/editConfig",
        method: "POST",
        data: params,
      }).then((res) => {
        if (res.code === 200) {
          notification.success({ message: res.msg });
          success && success();
        }
      });
    }
  };
  return (
    <>
      <h3 className="text-[22px] text-[#333333] font-semibold mb-10">
        {type === "edit" ? "编辑配置" : "新增配置"}
      </h3>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={type === "add" ? { status: 1 } : { ...configInfo }}
      >
        <Form.Item
          label="IP地址"
          name="endpoint"
          rules={[{ required: true, message: "请填写IP地址!" }]}
        >
          <Input placeholder="请输入IP地址" />
        </Form.Item>
        <Form.Item
          label="桶名"
          name="bucket"
          rules={[{ required: true, message: "请填写桶名!" }]}
        >
          <Input placeholder="请输入桶名" />
        </Form.Item>
        <Form.Item
          label="Access Key"
          name="accessKey"
          rules={[{ required: true, message: "请填写Access Key!" }]}
        >
          <Input placeholder="请输入Access Key" />
        </Form.Item>
        <Form.Item
          label="Secret key"
          name="secretKey"
          rules={[{ required: true, message: "请填写Secret key!" }]}
        >
          <Input placeholder="请输入Secret key" />
        </Form.Item>
        <Form.Item label="状态" name="status" rules={[{ required: true }]}>
          <Radio.Group
            options={[
              { label: "启用", value: 1 },
              { label: "禁用", value: 0 },
            ]}
            disabled={type === "add"}
          />
        </Form.Item>
        <div className="flex justify-end mt-[100px]">
          <Button
            type="default"
            className="w-[120px] h-[48px] text-lg text-[#333333] border-[1px] border-[#D2DBE7] mr-[20px] hover:opacity-80"
            onClick={() => {
              cancel && cancel();
            }}
          >
            取消
          </Button>
          <Button
            type="primary"
            className="w-[200px] h-[48px] text-lg text-[#FFFFFF] bg-[#1960F6] hover:opacity-80"
            htmlType="submit"
            loading={confirmLoading}
          >
            确定
          </Button>
        </div>
      </Form>
    </>
  );
};

export default AddConfig;
