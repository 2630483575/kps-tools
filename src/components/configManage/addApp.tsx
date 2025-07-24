import { Button, Form, Input, Select } from "antd";
import { useState } from "react";

const AddApp = ({
  cancel,
  success,
  type,
  appInfo,
  appOptions,
  envOptions,
  ownerOptions,
}: any) => {
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const onFinish = (values: any) => {};
  return (
    <>
      <h3 className="text-[22px] text-[#333333] font-semibold mb-10">
        {type === "edit" ? "编辑应用" : "新增应用"}
      </h3>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={type === "add" ? {} : { ...appInfo }}
      >
        <Form.Item
          label="App"
          name="appName"
          rules={[{ required: true, message: "请选择App!" }]}
        >
          <Select
            size="large"
            showSearch
            placeholder="请选择App"
            optionFilterProp="label"
            options={appOptions}
          />
        </Form.Item>
        <Form.Item
          label="Env"
          name="envName"
          rules={[{ required: true, message: "请选择Env!" }]}
        >
          <Select
            size="large"
            showSearch
            placeholder="请选择Env"
            optionFilterProp="label"
            options={envOptions}
          />
        </Form.Item>
        <Form.Item
          label="Key"
          name="keyName"
          rules={[{ required: true, message: "请填写Key!" }]}
        >
          <Input placeholder="请输入Key" />
        </Form.Item>
        <Form.Item
          label="value"
          name="valueName"
          rules={[{ required: true, message: "请填写Value!" }]}
        >
          <Input placeholder="请输入Value" />
        </Form.Item>
        <Form.Item
          label="Owner"
          name="ownerName"
          rules={[{ required: true, message: "请选择Owner!" }]}
        >
          <Select
            mode="multiple"
            size="large"
            showSearch
            placeholder="请选择Owner"
            optionFilterProp="label"
            options={ownerOptions}
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
export default AddApp;
