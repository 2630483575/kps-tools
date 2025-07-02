import AppHeader from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import {
  AppleOutlined,
  EllipsisOutlined,
  EyeOutlined,
  PlusOutlined,
  RiseOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { createFileRoute } from "@tanstack/react-router";
import {
  Button,
  Col,
  Dropdown,
  Radio,
  Row,
  Space,
  Table,
  TableProps,
  Tag,
  Tooltip,
} from "antd";
import type { MenuProps } from "antd";
import { useEffect, useState } from "react";
import DecendIcon from "@/assets/icons/descending.svg?react";

export const Route = createFileRoute("/operatorMarket/")({
  component: RouteComponent,
  staticData: {
    title: "算子管理",
  },
});

interface IOperator {
  id: number;
  name: string;
  description: string;
  rank: number;
  stars: number;
  type: string;
  provider: string;
  createTime: string;
  updateTime: string;
  version: string;
}

const operatorTypes = [
  { label: "全部", value: "all" },
  { label: "内容审核", value: "contentReview" },
  { label: "文档处理", value: "documentProcess" },
  { label: "图像处理", value: "imageProcess" },
  { label: "视频处理", value: "videoProcess" },
  { label: "消息通知", value: "messageNotify" },
  { label: "语音交互", value: "speechInteract" },
  { label: "其他", value: "other" },
];
// 模拟算子提供方选项数据
const providerTypes = [
  { label: "全部", value: "all" },
  { label: "华为", value: "huawei" },
  { label: "第三方", value: "thirdParty" },
];
const orderTypes = [
  { label: "综合排序", value: "mixed" },
  { label: "发布时间", value: "time" },
];
function RouteComponent() {
  const [searchOperator, setSearchOperator] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [operatorList, setOperatorList] = useState<IOperator[]>([]);

  const fetchOperatorList = () => {
    const generateMockOperators = (): IOperator[] => {
      const types = ["API", "SDK", "Plugin", "Service", "Toolkit"];
      const providers = [
        "Tencent",
        "Alibaba",
        "Baidu",
        "Huawei",
        "AWS",
        "Azure",
        "Google",
      ];
      const versions = ["1.0.0", "1.2.3", "2.0.1", "2.1.0", "3.0.0-beta"];

      return Array.from({ length: 100 }, (_, i) => {
        const now = new Date();
        const randomDays = Math.floor(Math.random() * 365);
        const createDate = new Date(now.setDate(now.getDate() - randomDays));
        const updateDate = new Date(
          createDate.getTime() + Math.random() * 15 * 24 * 60 * 60 * 1000
        );

        return {
          id: i + 1,
          name: `Operator-${String(i + 1).padStart(3, "0")}`,
          description: `This is a ${types[i % types.length]} operator for ${
            providers[i % providers.length]
          } services`,
          rank: Math.floor(Math.random() * 5) + 1,
          stars: Math.floor(Math.random() * 500),
          type: types[i % types.length],
          provider: providers[i % providers.length],
          createTime: createDate.toISOString(),
          updateTime: updateDate.toISOString(),
          version: versions[i % versions.length],
        };
      });
    };
    const mockOperators: IOperator[] = generateMockOperators();
    setOperatorList(mockOperators);
  };
  useEffect(() => {
    fetchOperatorList();
  }, []);
  const dropItems: MenuProps["items"] = [
    {
      label: <span className="text-blue-500">编辑</span>,
      key: "edit",
    },
    {
      label: <span className="text-blue-500">详情</span>,
      key: "detail",
    },
  ];
  const onSelectDropItem = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="w-full h-full flex overflow-hidden">
      <Sidebar />
      <div className="w-full flex-1 flex flex-col">
        <AppHeader
          setSearchText={setSearchOperator}
          fetchData={fetchOperatorList}
        />
        <div className="flex-1 p-[24px] bg-background h-full w-full overflow-auto">
          <div className="h-full flex flex-col gap-4">
            <div className="h-[150px] shadow-list rounded-list bg-[#fff] p-[16px]">
              <div className="h-[75px] flex items-center">
                <span className="text-gray-700 w-[100px]">算子类型</span>
                <Radio.Group
                  className="flex items-center gap-4"
                  defaultValue="all"
                >
                  {operatorTypes.map((item) => (
                    <Radio.Button key={item.value} value={item.value}>
                      {item.label}
                    </Radio.Button>
                  ))}
                </Radio.Group>
              </div>
              <div className="flex-1 flex items-center">
                <span className="text-gray-700 w-[100px]">算子提供方</span>
                <Radio.Group
                  className="flex items-center gap-4"
                  defaultValue="all"
                >
                  {providerTypes.map((item) => (
                    <Radio.Button key={item.value} value={item.value}>
                      {item.label}
                    </Radio.Button>
                  ))}
                </Radio.Group>
              </div>
            </div>
            <div className="h-[30px] flex items-center gap-4">
              {orderTypes.map((item) => (
                <Button key={item.value} variant="text" color="default">
                  {item.label}
                  {item.value === "time" && <DecendIcon />}
                </Button>
              ))}
            </div>
            <div className="w-full h-full flex-1 overflow-auto">
              <Row gutter={[16, 16]}>
                {operatorList.map((item) => (
                  <Col key={item.id} span={6}>
                    <div className="w-full h-[250px] shadow-list rounded-list bg-[#fff] p-[16px] flex flex-col">
                      <div className="h-[100px] flex items-center gap-4">
                        <div className="w-[100px] h-full flex items-center justify-center">
                          <AppleOutlined className="text-[80px]" />
                        </div>
                        <div className="h-full flex-1 flex flex-col justify-around gap-2">
                          <div className="w-full flex items-center">
                            <span className="text-[28px]">{item.name}</span>
                            <Dropdown
                              menu={{ items: dropItems }}
                              trigger={["click"]}
                              className="ml-auto"
                              placement="bottom"
                            >
                              <a onClick={(e) => onSelectDropItem(e)}>
                                <Space>
                                  <EllipsisOutlined className="text-[24px] text-blue-500" />
                                </Space>
                              </a>
                            </Dropdown>
                          </div>
                          <Tag color="blue" className="w-[40px]">
                            {item.type}
                          </Tag>
                        </div>
                      </div>
                      <div className="flex-1">{item.description}</div>
                      <div className="h-[30px] flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <RiseOutlined className="text-[24px]" />
                          {item.rank}
                        </div>
                        <div className="flex items-center gap-2">
                          <StarOutlined className="text-[24px]" />
                          {item.stars}
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
