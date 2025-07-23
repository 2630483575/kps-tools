import { Button, Form } from "antd";
import { useState } from "react";

const AddApp = ({ cancel, success, type, appInfo }: any) => {
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
        initialValues={type === "add" ? { status: 1 } : { ...appInfo }}
      >
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
