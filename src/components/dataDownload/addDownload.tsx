import { IFileColumn } from "@/routes/dataDownload/$id/_layout/$name/_layout/bucketData";
import requestApi from "@/utils/request";
import { useParams } from "@tanstack/react-router";
import { Button, Form, Input, notification } from "antd";
import { useState } from "react";

const AddDownload = ({ cancel, success, filesSelected }: any) => {
  const { id, name } = useParams({
    from: "/dataDownload/$id/_layout/$name/_layout/bucketData/",
  });
  const [form] = Form.useForm();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const onFinish = async (values: any) => {
    const paths = filesSelected.map((opt: IFileColumn) => opt.objectName);
    const params = { paths, saveDir: values.downloadUrl, configId: id };
    setConfirmLoading(true);
    await requestApi({
      url: "/file-api/download",
      method: "POST",
      data: params,
    }).then((res) => {
      if (res.code === 200) {
        notification.success({ message: `${res.data.jobId}已开始下载` });
        success && success();
      }
    });
  };

  return (
    <>
      <h3 className="text-[22px] text-[#333333] font-semibold mb-10">
        批量下载
      </h3>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          label="下载地址"
          name="downloadUrl"
          rules={[{ required: true, message: "请填写文件下载地址!" }]}
        >
          <Input placeholder="请输入文件下载地址" />
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

export default AddDownload;
