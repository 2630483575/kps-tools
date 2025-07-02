import { Form, Input, Radio, Select } from "antd";
import { useState } from "react";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const BucketUpload = ({ cancel, success }: any) => {
  const [bucketOptions, setBucketOptions] = useState([]);

  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log(values);
  };
  return (
    <>
      <h3 className="text-[22px] text-[#333333] font-semibold mb-10">
        数据上传
      </h3>
      <Form {...layout} form={form} onFinish={onFinish}>
        <Form.Item label="新建bucket" name="add_bucket">
          <Radio.Group
            options={[
              { label: "是", value: 1 },
              { label: "否", value: 2 },
            ]}
            onChange={(e) => {}}
            defaultValue={1}
          />
        </Form.Item>
        <Form.Item
          noStyle
          shouldUpdate={(prevValues, currentValues) =>
            prevValues.add_bucket !== currentValues.add_bucket
          }
        >
          {({ getFieldValue }) =>
            getFieldValue("add_bucket") === 1 ? (
              <Form.Item label="bucket名称">
                <Input placeholder="请输入bucket名称"></Input>
              </Form.Item>
            ) : (
              <Form.Item label="bucket名称">
                <Select
                  options={bucketOptions}
                  placeholder="请选择bucket名称"
                ></Select>
              </Form.Item>
            )
          }
        </Form.Item>
      </Form>
    </>
  );
};

export default BucketUpload;
