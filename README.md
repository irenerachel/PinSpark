# PinSpark

视觉灵感关键词生成器 — Chrome 侧边栏插件。

输入一个中文主题（比如「赛博海报」「极简咖啡店」「复古唱片店」），AI 自动给你三个平台的高质量搜索短语：

- **Pinterest** — 9 条英文长尾短语
- **Behance** — 9 条英文项目类关键词
- **花瓣网** — 9 条中文短语

每条点一下复制，可选英文下方带中文注释（复制时只复制英文原文）。

## 安装

1. Clone 这个仓库或下载 ZIP 解压
2. Chrome 地址栏打开 `chrome://extensions/`
3. 右上角打开「开发者模式」
4. 左上角点「加载已解压的扩展程序」，选 PinSpark 文件夹
5. 工具栏出现 PinSpark 图标，可以钉到工具栏

## 配置 API Key（首次必做）

1. 点 PinSpark 图标 → 打开侧边栏
2. 右上角齿轮按钮打开设置
3. 选服务商（豆包 · 火山引擎 / DeepSeek）
4. 选模型（默认各自最新旗舰）
5. 粘贴 API Key 保存
   - 豆包 Key：[火山方舟控制台](https://console.volcengine.com/ark) → API Key 管理
   - DeepSeek Key：[platform.deepseek.com/api_keys](https://platform.deepseek.com/api_keys)

两家 Key 各存各的，切换不会互相覆盖。

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

## 日常使用

1. 输入中文主题
2. 勾选要的平台（Pinterest / Behance / 花瓣网）
3. 选方向（自动判断 / 海报排版 / 摄影电影感 / 品牌商业 / 插画实验）
4. 回车 / 点箭头按钮
5. 单条点击复制；每个平台右上角有「全部复制」
6. 粘到对应站点搜索

## 中英对照

设置面板下方有「中文注释」开关，默认开。

- 开：英文关键词下方多一行简练中文注释，方便看懂每条在描述什么风格
- 关：纯英文单行
- 复制行为：**永远只复制英文原文**，中文注释不会跟着一起复制

花瓣网本身就是中文，不会有中文副行。

## License

MIT
