// 火山引擎 · 产品矩阵 / 解决方案 数据模型
export interface Product {
  name: string;
  en: string;
  desc: string;
  metrics: { value: string; label: string }[];
  features: string[];
}

export interface Zone {
  glyph: string;
  name: string;
  en: string;
  metaphor: string;
  gradient: string;
  accent: string;
  blurb: string;
  products: Product[];
}

export const zones: Zone[] = [
  {
    glyph: "智",
    name: "豆包大模型",
    en: "FOUNDATION MODEL",
    metaphor: "喷发的火山口 —— 智能之源",
    gradient: "radial-gradient(120% 120% at 30% 20%, #2B1A0E 0%, #141017 55%, #0B0E16 100%)",
    accent: "#FF6A00",
    blurb: "字节跳动自研大模型体系，把抖音同款的智能，开放给每一家企业。",
    products: [
      {
        name: "豆包 · 通用模型", en: "Doubao LLM",
        desc: "万亿参数 MoE 架构，企业级推理服务",
        metrics: [{ value: "50+", label: "评测维度行业领先" }, { value: "毫秒级", label: "首字响应" }, { value: "99.99%", label: "服务可用性" }],
        features: ["长上下文 256K", "函数调用与 Agent", "私有化/VPC 部署", "按 token 弹性计费"],
      },
      {
        name: "语音大模型", en: "Speech Model",
        desc: "语音识别与合成，媲美真人对话节奏",
        metrics: [{ value: "5ms", label: "流式首包延迟" }, { value: "40+", label: "语种与方言" }],
        features: ["实时双向打断", "情绪与音色克隆", "电话/会议场景优化"],
      },
      {
        name: "视频生成模型", en: "Video Generation",
        desc: "Seedance 视频生成，镜头语言级的生成控制",
        metrics: [{ value: "1080P", label: "高清输出" }, { value: "多镜头", label: "一致性叙事" }],
        features: ["文生视频 / 图生视频", "运镜与节奏控制", "多风格多比例"],
      },
      {
        name: "火山方舟", en: "Ark Platform",
        desc: "大模型服务平台，一站式模型精调与推理",
        metrics: [{ value: "1站", label: "训练到推理" }, { value: "多模型", label: "统一接入" }],
        features: ["微调与继续训练", "知识库 RAG", "评测与灰度发布"],
      },
    ],
  },
  {
    glyph: "擎",
    name: "机器学习平台",
    en: "ML PLATFORM",
    metaphor: "传递能量的岩浆通道 —— 工程之力",
    gradient: "radial-gradient(120% 120% at 70% 25%, #12233F 0%, #0E1524 55%, #0B0E16 100%)",
    accent: "#3D7BFF",
    blurb: "MLOps 全流程平台，让算法团队像字节一样高效迭代。",
    products: [
      {
        name: "机器学习平台", en: "ML Platform",
        desc: "从数据准备到上线监控的全生命周期管理",
        metrics: [{ value: "10倍", label: "迭代效率提升" }, { value: "万卡", label: "分布式训练" }],
        features: ["分布式训练框架", "实验管理与对比", "Pipeline 编排"],
      },
      {
        name: "智能推荐", en: "Recommendation",
        desc: "抖音同款推荐算法，开箱即用",
        metrics: [{ value: "抖音", label: "同款内核" }, { value: "+30%", label: "客户转化率均值" }],
        features: ["千人千面召回排序", "实时特征计算", "AB 实验平台内置"],
      },
      {
        name: "A/B 测试", en: "DataTester",
        desc: "字节增长方法论的元工具",
        metrics: [{ value: "日均", label: "万级实验并发" }, { value: "字节", label: "内部同源" }],
        features: ["多层分流", "统计显著性引擎", "全端 SDK"],
      },
    ],
  },
  {
    glyph: "基",
    name: "云基础设施",
    en: "CLOUD INFRA",
    metaphor: "沉稳的地壳板块 —— 承载之稳",
    gradient: "radial-gradient(120% 120% at 40% 80%, #1A2233 0%, #10141F 55%, #0B0E16 100%)",
    accent: "#8FA3C0",
    blurb: "弹性、可靠、高性价比的算力底座，全球多区域布局。",
    products: [
      {
        name: "云服务器", en: "ECS",
        desc: "通用与 GPU 算力，分钟级弹性伸缩",
        metrics: [{ value: "秒级", label: "弹性伸缩" }, { value: "99.995%", label: "单实例 SLA" }],
        features: ["HPN 高性能网络", "spot 竞价实例", "多可用区容灾"],
      },
      {
        name: "对象存储", en: "TOS",
        desc: "海量非结构化数据存储",
        metrics: [{ value: "12个9", label: "数据持久性" }, { value: "EB级", label: "单桶容量" }],
        features: ["冷热分层", "图片/视频处理", "跨地域复制"],
      },
      {
        name: "全球网络", en: "Global Network",
        desc: "CDN 与专线，覆盖全球主要市场",
        metrics: [{ value: "200ms", label: "全球平均延迟" }, { value: "百万级", label: "并发承载" }],
        features: ["全球 1000+ 边缘节点", "智能调度", "动静态加速"],
      },
    ],
  },
  {
    glyph: "流",
    name: "数据与视频云",
    en: "DATA & VIDEO",
    metaphor: "地表奔流的熔岩河 —— 增长之脉",
    gradient: "radial-gradient(120% 120% at 60% 60%, #241228 0%, #13101D 55%, #0B0E16 100%)",
    accent: "#B36BFF",
    blurb: "实时数据驱动决策，视频能力贯穿创作到分发。",
    products: [
      {
        name: "实时数仓", en: "ByteHouse",
        desc: "ClickHouse 内核的企业级实时分析",
        metrics: [{ value: "PB级", label: "单集群数据量" }, { value: "亚秒", label: "查询响应" }],
        features: ["实时摄入", "湖仓一体", "兼容 MySQL 协议"],
      },
      {
        name: "视频直播", en: "Live",
        desc: "从推流到播放的全链路直播方案",
        metrics: [{ value: "毫秒", label: "端到端延迟" }, { value: "亿级", label: "并发观看验证" }],
        features: ["低延迟直播 LL-HLS", "互动连麦", "AI 实时字幕"],
      },
      {
        name: "内容分发 CDN", en: "CDN",
        desc: "静态与动态内容全球加速",
        metrics: [{ value: "90%+", label: "缓存命中率" }, { value: "-40%", label: "回源成本" }],
        features: ["智能压缩", "边缘脚本", "全链路监控"],
      },
    ],
  },
];

export interface Solution {
  glyph: string;
  industry: string;
  en: string;
  headline: string;
  gradient: string;
  accent: string;
  metrics: { value: string; label: string }[];
  story: string;
}

export const solutions: Solution[] = [
  {
    glyph: "互", industry: "互联网", en: "INTERNET", headline: "AI 原生应用的加速引擎",
    gradient: "linear-gradient(160deg, #12233F 0%, #0B1220 100%)", accent: "#3D7BFF",
    metrics: [{ value: "+32%", label: "转化率提升" }, { value: "-45%", label: "推理成本下降" }, { value: "天级", label: "AIGC 上线周期" }],
    story: "某头部内容平台接入豆包大模型后，客服首次响应从分钟级降至秒级，人工成本下降 80%。",
  },
  {
    glyph: "金", industry: "金融", en: "FINANCE", headline: "安全合规的智能升级",
    gradient: "linear-gradient(160deg, #1A2233 0%, #0D1017 100%)", accent: "#8FA3C0",
    metrics: [{ value: "等保三级", label: "合规认证" }, { value: "毫秒级", label: "风险拦截" }, { value: "60%", label: "运营成本下降" }],
    story: "某股份制银行基于火山引擎构建智能投顾与风控中台，在强监管环境下实现模型私有化部署。",
  },
  {
    glyph: "车", industry: "汽车", en: "AUTOMOTIVE", headline: "从制造到出行的智能化",
    gradient: "linear-gradient(160deg, #2B1A0E 0%, #141017 100%)", accent: "#FF6A00",
    metrics: [{ value: "2倍", label: "模型迭代效率" }, { value: "99.9%", label: "OTA 成功率" }, { value: "<300ms", label: "座舱语音延迟" }],
    story: "某新能源车企与火山引擎联合定义智能座舱，豆包大模型上车，让汽车成为持续进化的 AI 伙伴。",
  },
  {
    glyph: "医", industry: "医疗", en: "HEALTHCARE", headline: "可信的 AI 辅助诊断",
    gradient: "linear-gradient(160deg, #0E1F1A 0%, #0B0E16 100%)", accent: "#3BD9A7",
    metrics: [{ value: "50%", label: "医生文书时间下降" }, { value: "私有化", label: "数据不出院" }],
    story: "某三甲医院部署语音病历与影像辅助分析，患者数据全程私有化，效率与合规兼得。",
  },
  {
    glyph: "消", industry: "大消费", en: "RETAIL", headline: "数据驱动的增长引擎",
    gradient: "linear-gradient(160deg, #241228 0%, #13101D 100%)", accent: "#B36BFF",
    metrics: [{ value: "+40%", label: "营销 ROI" }, { value: "10倍", label: "素材产出效率" }],
    story: "某连锁零售品牌用实时数仓打通全渠道数据，AIGC 批量生成营销素材，活动周期从周缩短到天。",
  },
];
