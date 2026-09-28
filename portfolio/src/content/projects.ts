import stitch from "./stitch-assets.json";

export type Lang = "zh" | "en";
export type Copy = { zh: string; en: string };
export const bi = (zh: string, en: string): Copy => ({ zh, en });
export const email = "jiachen.sun.design@gmail.com";
export const profile = {
  intro: bi(
    "我通过用户研究、交互设计与实验，探索数字与实体体验。",
    "I design thoughtful digital and physical experiences through user research, interaction design and experimentation.",
  ),
  about: bi(
    "我关注用户研究、数字产品与实体交互，拥有空间设计背景。我希望探索新兴技术如何创造清晰、实用且有人情味的体验。",
    "I work across user research, digital products and physical interaction, with a background in spatial design. I’m interested in how emerging technologies can create experiences that feel clear, useful and human.",
  ),
};
export type Media = { src: string; caption: Copy; example?: boolean };
export type Block = { title: Copy; body: Copy };
export type Project = {
  slug: string;
  title: string;
  index: string;
  accent: "pink" | "blue" | "lime";
  subtitle: Copy;
  summary: Copy;
  role: Copy;
  type: Copy;
  cover: Media;
  hero: Media;
  facts: Block[];
  flow: Block[];
  flowNote?: Copy;
  prototype: Block[];
  testing: Block[];
  research: Block[];
  deliverables: Block[];
  researchMedia: Media[];
  prototypeMedia: Media[];
  testingMedia: Media[];
  finalMedia: Media[];
};
const original = (name: string, zh: string, en: string): Media => ({
  src: `/assets/images/${name}.png`,
  caption: bi(zh, en),
});
const example = (src: string, zh: string, en: string): Media => ({
  src,
  caption: bi(zh, en),
  example: true,
});
const pending = bi(
  "待补充原始记录与具体结论。",
  "Original records and specific findings to be added.",
);
const missingFlow = bi(
  "以下为依据已有项目简介整理的流程示意，详细交互节点待原始流程图补充。",
  "Illustrative sequence based on the existing project overview. Detailed interaction states await the original flow diagram.",
);

export const projects: Project[] = [
  {
    slug: "reclimb",
    title: "Reclimb",
    index: "01",
    accent: "pink",
    subtitle: bi(
      "攀岩可穿戴交互与反馈概念",
      "Wearable interaction for the climbing experience",
    ),
    summary: bi(
      "从真实攀岩情境出发，通过观察、访谈、小组讨论、亲和图、原型和测试，探索可穿戴反馈如何支持攀岩体验。",
      "A wearable interaction concept for climbing, developed through field research, interviews, group discussion, affinity mapping, prototyping and testing.",
    ),
    role: bi("用户研究 / 交互设计", "UX Research / Interaction Design"),
    type: bi("可穿戴交互", "Wearable Interaction"),
    cover: original(
      "reclimb-hero",
      "Reclimb 可穿戴原型",
      "Reclimb wearable prototype",
    ),
    hero: original(
      "reclimb-hero",
      "攀岩情境中的可穿戴原型",
      "Wearable prototype in a climbing context",
    ),
    facts: [
      {
        title: bi("研究重点", "Research focus"),
        body: bi("疲劳、姿态与反馈", "Fatigue, posture & feedback"),
      },
      {
        title: bi("原型形式", "Prototype"),
        body: bi("可穿戴 + 移动体验", "Wearable + mobile experience"),
      },
      {
        title: bi("测试结论", "Testing findings"),
        body: bi("具体结果待补充", "Detailed findings pending"),
      },
    ],
    flow: [
      {
        title: bi("佩戴与准备", "Wear & prepare"),
        body: bi(
          "通过前臂佩戴形式探索设备位置、尺度与使用准备。",
          "Explore device placement, scale and preparation through a forearm-mounted form.",
        ),
      },
      {
        title: bi("感知身体状态", "Sense physical state"),
        body: bi(
          "概念采用 sEMG 关注肌肉疲劳，9 轴 IMU 关注腕部动作与姿态。",
          "The concept explores sEMG for muscle fatigue and a 9-axis IMU for wrist movement and posture.",
        ),
      },
      {
        title: bi("提供可穿戴反馈", "Provide wearable feedback"),
        body: bi(
          "探索通过指示灯提供及时反馈，尽量不打断攀爬动作。",
          "Explore timely indicator-light feedback that supports the climber without interrupting movement.",
        ),
      },
      {
        title: bi("回看移动体验", "Review mobile experience"),
        body: bi(
          "移动应用补充可穿戴体验，具体功能说明待补充。",
          "A mobile application complements the wearable; detailed feature descriptions are pending.",
        ),
      },
    ],
    flowNote: missingFlow,
    prototype: [
      {
        title: bi("感知与位置", "Sensing & placement"),
        body: bi(
          "围绕前臂肌群和腕部姿态，探索传感器布置及可穿戴形式。",
          "Explore sensor placement around the forearm muscle group and wrist posture.",
        ),
      },
      {
        title: bi("从纸模到实体", "From paper to physical"),
        body: bi(
          "低保真纸模探索尺度与佩戴位置，实体原型进一步研究结构与部件关系。",
          "Paper prototypes explore scale and placement; physical builds investigate construction and component relationships.",
        ),
      },
      {
        title: bi("连接交互反馈", "Connecting feedback"),
        body: bi(
          "通过 Arduino 与代码将感知和反馈行为连接，准备进入测试。",
          "Arduino work and code connect sensing and feedback behaviours in preparation for testing.",
        ),
      },
    ],
    testing: [
      {
        title: bi("技术测试", "Technical testing"),
        body: bi(
          "已有 LED 与 sEMG 测试图片，具体测试步骤、条件和结果待补充。",
          "LED and sEMG testing images are available. Test procedures, conditions and results remain to be documented.",
        ),
      },
      {
        title: bi("佩戴体验", "Wearability"),
        body: bi(
          "已有佩戴测试照片；参与人数、用户反馈与迭代结论尚待补充。",
          "Wearability photographs are available; participant counts, feedback and iteration findings are pending.",
        ),
      },
    ],
    research: [
      {
        title: bi("现场观察与访谈", "Observation & interviews"),
        body: bi(
          "在攀岩场景中观察并与攀岩者交流，了解行为、需求与痛点。",
          "In-context observation and conversations explore climbers’ behaviours, needs and pain points.",
        ),
      },
      {
        title: bi("亲和图与洞察", "Affinity mapping"),
        body: bi(
          "将研究记录整理为疲劳、姿态和反馈主题，缩小概念探索范围。",
          "Research notes are grouped into fatigue, posture and feedback themes to focus the concept.",
        ),
      },
      {
        title: bi("概念讨论", "Concept evaluation"),
        body: bi(
          "通过焦点小组讨论早期可穿戴概念，将反馈带回设计过程。",
          "Early wearable concepts are discussed with climbers in a focus group to inform design development.",
        ),
      },
    ],
    deliverables: [
      {
        title: bi("可穿戴原型", "Wearable prototype"),
        body: bi(
          "实体形式、佩戴方式与交互探索。",
          "Physical form, fit and interaction exploration.",
        ),
      },
      {
        title: bi("移动界面", "Mobile interface"),
        body: bi(
          "保留已有应用展示图片，功能说明待补充。",
          "Existing application visuals are preserved; feature descriptions are pending.",
        ),
      },
    ],
    researchMedia: [
      original("reclimb-field-research", "现场观察", "Field observation"),
      original("reclimb-interview", "用户访谈", "User interviews"),
      original("reclimb-affinity", "研究亲和图", "Affinity mapping"),
      original("reclimb-focus-group-concept", "概念讨论", "Concept evaluation"),
    ],
    prototypeMedia: [
      original(
        "reclimb-upload/06-P01",
        "交互硬件开发",
        "Interaction hardware development",
      ),
      original("reclimb-upload/05-P03", "实体原型", "Physical prototype"),
      original("reclimb-sketch", "概念草图", "Concept sketches"),
      ...[1, 2, 4, 5, 6].map((n) =>
        original(
          `reclimb-upload/05-P0${n}`,
          `原型过程 ${n}`,
          `Prototype process ${n}`,
        ),
      ),
      original("reclimb-upload/06-P02", "硬件记录", "Hardware documentation"),
      original("reclimb-upload/06-P03", "代码记录", "Code documentation"),
    ],
    testingMedia: [1, 2, 3, 4, 5].map((n) =>
      original(
        `reclimb-upload/07-P0${n}`,
        `测试记录 ${n}`,
        `Testing record ${n}`,
      ),
    ),
    finalMedia: [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) =>
      original(
        `reclimb-upload/08-P0${n}`,
        n < 3 ? "最终可穿戴展示" : `移动应用展示 ${n - 2}`,
        n < 3
          ? "Final wearable presentation"
          : `Mobile application visual ${n - 2}`,
      ),
    ),
  },
  {
    slug: "reduce-food-waste",
    title: "Reduce Food Waste with Charity",
    index: "02",
    accent: "blue",
    subtitle: bi(
      "连接剩余食物与公益需求的服务设计",
      "A service connecting surplus food with people in need",
    ),
    summary: bi(
      "将食物浪费视为环境与社会问题，通过服务设计和移动应用概念，探索剩余食物与公益用途之间的连接。",
      "A service design and mobile app concept exploring how surplus food can be connected with charitable use.",
    ),
    role: bi(
      "用户研究 / 服务设计 / 界面设计",
      "UX Research / Service Design / UI Design",
    ),
    type: bi("服务设计 / 移动应用", "Service Design / Mobile App"),
    cover: example(
      stitch.home[1],
      "食物服务界面示例",
      "Food service interface example",
    ),
    hero: example(
      stitch.food[0],
      "食物服务场景示例",
      "Food service context example",
    ),
    facts: [
      { title: bi("问题", "Problem"), body: bi("食物浪费", "Food waste") },
      { title: bi("方式", "Approach"), body: bi("服务设计", "Service design") },
      {
        title: bi("载体", "Format"),
        body: bi("移动应用概念", "Mobile app concept"),
      },
      {
        title: bi("验证", "Evidence"),
        body: bi("待补充测试记录", "Test records pending"),
      },
    ],
    flow: [
      {
        title: bi("发现剩余食物", "Identify surplus"),
        body: bi(
          "呈现可供公益利用的剩余食物信息。",
          "Present surplus food information for charitable use.",
        ),
      },
      {
        title: bi("连接需求", "Connect needs"),
        body: bi(
          "通过服务触点连接食物来源与使用需求。",
          "Connect food sources and needs through service touchpoints.",
        ),
      },
      {
        title: bi("安排交接", "Coordinate handoff"),
        body: bi(
          "组织领取与交接信息，帮助参与者理解下一步。",
          "Organise collection and handoff information so participants understand the next step.",
        ),
      },
      {
        title: bi("完成服务", "Complete the service"),
        body: bi(
          "回看服务旅程，进一步明确完成状态与反馈。",
          "Review the service journey to clarify completion states and feedback.",
        ),
      },
    ],
    flowNote: missingFlow,
    prototype: [
      {
        title: bi("纸面原型", "Paper prototypes"),
        body: bi(
          "通过纸面原型和早期屏幕流程，在视觉设计前探索服务结构。",
          "Paper prototypes and early screen flows explore the service structure before visual design.",
        ),
      },
    ],
    testing: [
      {
        title: bi("流程中的阻碍", "Friction in the flow"),
        body: bi(
          "旧资料记录了可用性测试阶段；具体用户困难与证据待补充。",
          "The existing material includes a usability-testing stage; specific difficulties and evidence are pending.",
        ),
      },
      {
        title: bi("从反馈到迭代", "Feedback to iteration"),
        body: bi(
          "保留测试与迭代的展示位置，待补充已记录的改动和原因。",
          "Iteration space is preserved for documented changes and their rationale.",
        ),
      },
    ],
    research: [
      {
        title: bi("桌面研究", "Desk research"),
        body: bi(
          "研究食物浪费的规模、原因与服务情境。",
          "Research explores the scale, causes and service context of food waste.",
        ),
      },
      {
        title: bi("访谈与问卷", "Interviews & questionnaires"),
        body: bi(
          "了解参与者的需求、行为与服务障碍。",
          "Explore participants’ needs, behaviours and service barriers.",
        ),
      },
      {
        title: bi("综合与旅程", "Synthesis & journey"),
        body: bi(
          "通过亲和图、人物画像和用户旅程整理设计机会。",
          "Affinity mapping, personas and user journeys organise design opportunities.",
        ),
      },
    ],
    deliverables: [
      {
        title: bi("移动服务界面", "Mobile service interface"),
        body: bi(
          "连接服务信息与主要操作路径。",
          "Connect service information and key user actions.",
        ),
      },
      {
        title: bi("用户旅程", "User journey"),
        body: bi(
          "组织阶段、触点与服务机会。",
          "Organise stages, touchpoints and service opportunities.",
        ),
      },
      {
        title: bi("服务结构", "Service architecture"),
        body: bi(
          "通过信息架构说明服务关系。",
          "Explain service relationships through information architecture.",
        ),
      },
    ],
    researchMedia: [],
    prototypeMedia: [],
    testingMedia: [],
    finalMedia: stitch.food
      .slice(1, 4)
      .map((src, i) =>
        example(
          src,
          `服务设计视觉示例 ${i + 1}`,
          `Service design visual example ${i + 1}`,
        ),
      ),
  },
  {
    slug: "no-judge",
    title: "No Judge",
    index: "03",
    accent: "pink",
    subtitle: bi(
      "关于外貌焦虑与社会评价的 VR 体验",
      "A VR experience exploring appearance anxiety and social judgement",
    ),
    summary: bi(
      "通过沉浸式互动探索外貌评价如何影响自我感受与社会行为，将关注点从外表判断转向行为与连接。",
      "An immersive VR experience exploring appearance anxiety, social judgement and a world without appearance-based evaluation.",
    ),
    role: bi(
      "用户研究 / 游戏体验 / 交互设计",
      "UX Research / Game UX / Interaction Design",
    ),
    type: bi("VR 体验", "VR Experience"),
    cover: example(
      stitch.home[2],
      "VR 场景视觉示例",
      "VR environment visual example",
    ),
    hero: example(
      stitch.judge[0],
      "空间叙事视觉示例",
      "Spatial narrative visual example",
    ),
    facts: [
      {
        title: bi("主题", "Theme"),
        body: bi("外貌焦虑", "Appearance anxiety"),
      },
      { title: bi("载体", "Format"), body: bi("沉浸式 VR", "Immersive VR") },
      {
        title: bi("重点", "Focus"),
        body: bi("互动与情绪", "Interaction & emotion"),
      },
      {
        title: bi("测试", "Testing"),
        body: bi("具体结果待补充", "Findings pending"),
      },
    ],
    flow: [
      {
        title: bi("进入体验", "Enter the experience"),
        body: bi(
          "通过场景与叙事建立外貌评价的情境。",
          "Introduce appearance-based evaluation through setting and narrative.",
        ),
      },
      {
        title: bi("感受评价", "Experience judgement"),
        body: bi(
          "利用人物和环境互动呈现社会评价的影响。",
          "Use character and environmental interaction to explore social judgement.",
        ),
      },
      {
        title: bi("参与互动", "Take part"),
        body: bi(
          "通过对象与界面操作，引导玩家参与体验。",
          "Invite participation through objects and in-game interfaces.",
        ),
      },
      {
        title: bi("回看与反思", "Reflect"),
        body: bi(
          "通过体验引导对行为、连接与评价方式的思考。",
          "Encourage reflection on behaviour, connection and evaluation.",
        ),
      },
    ],
    flowNote: missingFlow,
    prototype: [
      {
        title: bi("角色与环境", "Characters & environments"),
        body: bi(
          "草图和交互研究探索环境如何回应玩家。",
          "Sketches and interaction studies explore how environments respond to players.",
        ),
      },
      {
        title: bi("对象与界面", "Objects & interfaces"),
        body: bi(
          "在场景中组织可操作对象与游戏内界面。",
          "Organise interactive objects and in-game interfaces within the scene.",
        ),
      },
      {
        title: bi("可玩原型", "Playable prototype"),
        body: bi(
          "将设计判断转化为可体验的 VR 原型。",
          "Translate design decisions into a playable VR prototype.",
        ),
      },
    ],
    testing: [
      {
        title: bi("交互可理解性", "Interaction clarity"),
        body: bi(
          "测试关注交互与叙事线索是否清楚，详细记录待补充。",
          "Testing focuses on interaction and narrative clarity; detailed records are pending.",
        ),
      },
      {
        title: bi("情绪表达", "Emotional framing"),
        body: bi(
          "核对玩家是否理解情绪表达，保留后续反馈和迭代位置。",
          "Evaluate emotional framing and preserve space for documented feedback and refinements.",
        ),
      },
    ],
    research: [
      {
        title: bi("研究问题", "Research question"),
        body: bi(
          "通过桌面研究与访谈了解外貌对自我认知和社会行为的影响。",
          "Desk research and interviews explore how appearance affects self-perception and social behaviour.",
        ),
      },
      {
        title: bi("玩家需求", "Player needs"),
        body: bi(
          "将研究综合为玩家需求、痛点与设计方向。",
          "Synthesise research into player needs, pain points and a design direction.",
        ),
      },
      {
        title: bi("体验结构", "Experience architecture"),
        body: bi(
          "利用旅程与游戏流程呈现情绪变化和交互节点。",
          "Use a player journey and game flow to map emotional progression and interaction moments.",
        ),
      },
    ],
    deliverables: [
      {
        title: bi("VR 原型", "VR prototype"),
        body: bi(
          "可玩场景与交互探索。",
          "Playable scenes and interaction exploration.",
        ),
      },
      {
        title: bi("体验流程", "Experience flow"),
        body: bi("玩家旅程与游戏流程。", "Player journey and game flow."),
      },
      {
        title: bi("故事板", "Storyboard"),
        body: bi(
          "关键玩家时刻与叙事顺序。",
          "Key player moments and narrative sequence.",
        ),
      },
    ],
    researchMedia: [],
    prototypeMedia: stitch.judge
      .slice(1)
      .map((src) =>
        example(src, "原型制作视觉示例", "Prototype visual example"),
      ),
    testingMedia: [],
    finalMedia: [],
  },
  {
    slug: "plantfun-explorer",
    title: "PlantFun Explorer",
    index: "04",
    accent: "lime",
    subtitle: bi(
      "连接植物、实体产品与移动体验",
      "A physical and digital companion for growing plants",
    ),
    summary: bi(
      "结合实体产品与移动应用，通过互动式植物陪伴体验，鼓励探索并建立与自然的日常连接。",
      "An interactive plant-growing companion designed to encourage exploration and a daily connection with nature.",
    ),
    role: bi(
      "用户研究 / 产品设计 / 界面设计",
      "UX Research / Product Design / UI Design",
    ),
    type: bi("实体 + 数字产品", "Physical + Digital Product"),
    cover: example(
      stitch.home[3],
      "植物陪伴产品视觉示例",
      "Plant companion visual example",
    ),
    hero: example(
      stitch.plant[0],
      "植物产品场景示例",
      "Plant product context example",
    ),
    facts: [
      {
        title: bi("目标", "Goal"),
        body: bi("日常自然连接", "Daily nature connection"),
      },
      {
        title: bi("证据", "Evidence"),
        body: bi("测试记录待补充", "Test records pending"),
      },
    ],
    flow: [
      {
        title: bi("接近植物", "Explore the plant"),
        body: bi(
          "通过实体产品探索植物与人的互动机会。",
          "Explore opportunities for interaction between people and plants through a physical product.",
        ),
      },
      {
        title: bi("获得反馈", "Receive feedback"),
        body: bi(
          "研究感知与反馈机制，具体技术参数待补充。",
          "Investigate sensing and feedback mechanisms; technical specifications are pending.",
        ),
      },
      {
        title: bi("查看应用", "Explore the app"),
        body: bi(
          "通过移动界面组织功能、导航和植物相关信息。",
          "Organise features, navigation and plant information in the companion app.",
        ),
      },
      {
        title: bi("融入日常", "Connect to everyday life"),
        body: bi(
          "通过旅程与故事板检查产品如何融入日常使用。",
          "Use a journey map and storyboard to explore everyday use.",
        ),
      },
    ],
    flowNote: missingFlow,
    prototype: [
      {
        title: bi("实体形态", "Physical form"),
        body: bi(
          "草图、形态研究和爆炸图探索实体产品体验。",
          "Sketches, form studies and an exploded view explore the physical product experience.",
        ),
      },
      {
        title: bi("技术探索", "Technical exploration"),
        body: bi(
          "研究可能的感知和交互机制，不将概念参数当成已验证结果。",
          "Investigate possible sensing and interaction mechanisms; concept specifications are not verified results.",
        ),
      },
      {
        title: bi("应用结构", "App architecture"),
        body: bi(
          "通过功能结构、低保真流程与视觉概念连接数字体验。",
          "Connect digital experiences through feature architecture, low-fidelity flows and visual concepts.",
        ),
      },
    ],
    testing: [
      {
        title: bi("实体与应用协同", "Physical + digital use"),
        body: bi(
          "用户测试将产品与应用放回真实使用场景，详细记录待补充。",
          "User testing connects the physical product and app to real use scenarios; detailed records are pending.",
        ),
      },
      {
        title: bi("日常旅程", "Everyday journey"),
        body: bi(
          "通过使用旅程与故事板回看体验，具体迭代结论待补充。",
          "Review the experience through journey mapping and storyboards; specific iteration findings are pending.",
        ),
      },
    ],
    research: [
      {
        title: bi("用户与情境", "Users & context"),
        body: bi(
          "竞品分析、问卷和访谈探索人与植物互动的动机与障碍。",
          "Competitor analysis, questionnaires and interviews explore motivations and barriers around plant engagement.",
        ),
      },
      {
        title: bi("定义机会", "Define the opportunity"),
        body: bi(
          "将研究整理为人物画像、设计陈述与概念方向。",
          "Synthesise research into a persona, design statement and concept direction.",
        ),
      },
      { title: bi("验证与反思", "Validation & reflection"), body: pending },
    ],
    deliverables: [
      {
        title: bi("实体产品概念", "Physical product concept"),
        body: bi(
          "形态探索与产品细节。",
          "Form exploration and product details.",
        ),
      },
      {
        title: bi("技术研究", "Technical research"),
        body: bi(
          "可能的感知与交互机制。",
          "Possible sensing and interaction mechanisms.",
        ),
      },
      {
        title: bi("移动应用", "Mobile companion"),
        body: bi(
          "应用流程与高保真界面。",
          "App flows and high-fidelity interfaces.",
        ),
      },
    ],
    researchMedia: [],
    prototypeMedia: [],
    testingMedia: [],
    finalMedia: stitch.plant
      .slice(1, 4)
      .map((src, i) =>
        example(
          src,
          `产品设计视觉示例 ${i + 1}`,
          `Product design visual example ${i + 1}`,
        ),
      ),
  },
];
