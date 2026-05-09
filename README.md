# PinSpark

视觉灵感关键词生成器 — Chrome 侧边栏插件。

输入一个中文主题（比如「赛博海报」「极简咖啡店」「复古唱片店」），AI 自动给你三个平台的高质量搜索短语：

- **Pinterest** — 9 条英文长尾短语
- **Behance** — 9 条英文项目类关键词
- **花瓣网** — 9 条中文短语

每条点一下复制，可选英文下方带中文注释（复制时只复制英文原文）。

## 安装

### 通用方式（推荐，所有 Chromium 系浏览器）

适用于 Chrome / Edge / Brave / Arc / Opera / Vivaldi 等。

1. 去 [Releases 页](https://github.com/irenerachel/PinSpark/releases) 下最新 `PinSpark-vX.X.X.zip`，解压
2. 浏览器地址栏打开扩展管理页：
   - Chrome：`chrome://extensions/`
   - Edge：`edge://extensions/`
   - Brave：`brave://extensions/`
   - Arc / Opera / Vivaldi：各自类似 `xxx://extensions/`
3. 右上角开「开发者模式」
4. 左上角「加载已解压的扩展程序」→ 选解压后的 PinSpark 文件夹
5. 工具栏出现 PinSpark 图标，可钉到工具栏

### 直接装 CRX（仅限 Brave / Vivaldi）

Chrome 和 Edge 出于安全策略**屏蔽了**第三方 CRX 拖拽安装，必须走上面的"加载已解压"。Brave / Vivaldi 比较宽容：
1. 去 [Releases](https://github.com/irenerachel/PinSpark/releases) 下载 `PinSpark-vX.X.X.crx`
2. 拖到 `brave://extensions/` 或 `vivaldi://extensions/`
3. 点确认安装

### 暂不支持

- **Firefox** — 使用 `sidebar_action` API 而非 `sidePanel`，需要单独移植
- **Safari** — Safari Web Extensions 必须 Xcode 打包，暂未做

## 配置 API Key（首次必做）

1. 点 PinSpark 图标 → 打开侧边栏
2. 右上角齿轮按钮打开设置
3. 选服务商（豆包 · 火山引擎 / DeepSeek / Kimi · 月之暗面）
4. 选模型（默认各自最新旗舰）
5. 粘贴 API Key 保存
   - 豆包 Key：[火山方舟控制台](https://console.volcengine.com/ark) → API Key 管理
   - DeepSeek Key：[platform.deepseek.com/api_keys](https://platform.deepseek.com/api_keys)
   - Kimi Key：[platform.moonshot.cn/console/api-keys](https://platform.moonshot.cn/console/api-keys)

三家 Key 各存各的，切换不会互相覆盖。

## 模型清单

**豆包 · 火山引擎**
- Doubao-Seed-2.0-Pro（默认，旗舰）
- Doubao-Seed-2.0-Lite（均衡，便宜）
- Doubao-Seed-2.0-Mini（低时延高并发）
- Doubao-Seed-2.0-Code（代码向）
- Doubao-Seed-1.6 / Flash（老版兜底）

**DeepSeek**
- DeepSeek-V4-Flash（默认）
- DeepSeek-V4-Pro（推理强）

**Kimi · 月之暗面**
- Kimi-K2.6（默认，最新旗舰）
- Kimi-K2.5（稳定）
- Kimi-K2-Turbo-Preview（快速）
- Kimi-K2-Thinking（推理强）

## 日常使用

1. 输入中文主题
2. 选一个平台（Pinterest / Behance / 花瓣网，单选）
3. 选方向（自动判断 / 海报排版 / 摄影电影感 / 品牌商业 / 插画实验）
4. 回车 / 点箭头按钮
5. 单条点击复制；右上角有「全部复制」
6. 粘到对应站点搜索

## 中英对照

设置面板下方有「中文注释」开关，默认开。

- 开：英文关键词下方多一行简练中文注释，方便看懂每条在描述什么风格
- 关：纯英文单行
- 复制行为：**永远只复制英文原文**，中文注释不会跟着一起复制

花瓣网本身就是中文，不会有中文副行。

## License

MIT
