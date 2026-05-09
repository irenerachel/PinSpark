// ─── DOM Elements ───
const keywordInput = document.getElementById('keyword');
const generateBtn = document.getElementById('generate');
const resultsDiv = document.getElementById('results');
const emptyState = document.getElementById('empty-state');
const pinterestSection = document.getElementById('pinterest-section');
const behanceSection = document.getElementById('behance-section');
const pinterestKeywords = document.getElementById('pinterest-keywords');
const behanceKeywords = document.getElementById('behance-keywords');
const optPinterest = document.getElementById('opt-pinterest');
const optBehance = document.getElementById('opt-behance');
const optHuaban = document.getElementById('opt-huaban');
const huabanSection = document.getElementById('huaban-section');
const huabanKeywords = document.getElementById('huaban-keywords');
const optTranslate = document.getElementById('opt-translate');
const categorySelect = document.getElementById('category');
const toast = document.getElementById('toast');

// Settings elements
const settingsOverlay = document.getElementById('settings-overlay');
const openSettingsBtn = document.getElementById('open-settings');
const closeSettingsBtn = document.getElementById('close-settings');
const saveSettingsBtn = document.getElementById('save-settings');
const apiKeyInput = document.getElementById('api-key');
const providerSelect = document.getElementById('provider-select');
const modelSelect = document.getElementById('model-select');
const keyHint = document.getElementById('key-hint');

// ─── Provider Configs ───
const PROVIDERS = {
  'doubao': {
    label: '豆包 · 火山引擎',
    endpoint: 'https://ark.cn-beijing.volces.com/api/v3/chat/completions',
    models: [
      { id: 'doubao-seed-2-0-pro-260215', label: 'Doubao-Seed-2.0-Pro（最新旗舰，默认）' },
      { id: 'doubao-seed-2-0-lite-260215', label: 'Doubao-Seed-2.0-Lite（均衡，便宜）' },
      { id: 'doubao-seed-2-0-mini-260215', label: 'Doubao-Seed-2.0-Mini（低时延高并发）' },
      { id: 'doubao-seed-2-0-code-preview-260215', label: 'Doubao-Seed-2.0-Code（代码向）' },
      { id: 'doubao-seed-1-6-250615', label: 'Doubao-Seed-1.6（老版，稳定）' },
      { id: 'doubao-seed-1-6-flash-250715', label: 'Doubao-Seed-1.6-Flash（老版，最便宜）' }
    ],
    defaultModel: 'doubao-seed-2-0-pro-260215',
    keyStorage: 'apiKey_doubao',
    hintLabel: '去火山方舟控制台获取 API Key',
    hintHref: 'https://console.volcengine.com/ark/region:ark+cn-beijing/apiKey'
  },
  'deepseek': {
    label: 'DeepSeek',
    endpoint: 'https://api.deepseek.com/v1/chat/completions',
    models: [
      { id: 'deepseek-v4-flash', label: 'DeepSeek-V4-Flash（最新默认）' },
      { id: 'deepseek-v4-pro', label: 'DeepSeek-V4-Pro（推理强）' },
      { id: 'deepseek-chat', label: 'DeepSeek-Chat（老 alias，2026-07-24 弃用）' },
      { id: 'deepseek-reasoner', label: 'DeepSeek-Reasoner（老 alias，2026-07-24 弃用）' }
    ],
    defaultModel: 'deepseek-v4-flash',
    keyStorage: 'apiKey_deepseek',
    hintLabel: '去 DeepSeek 平台申请 API Key',
    hintHref: 'https://platform.deepseek.com/api_keys'
  },
  'kimi': {
    label: 'Kimi · 月之暗面',
    endpoint: 'https://api.moonshot.cn/v1/chat/completions',
    models: [
      { id: 'kimi-k2.6', label: 'Kimi-K2.6（最新旗舰，默认）' },
      { id: 'kimi-k2.5', label: 'Kimi-K2.5（稳定）' },
      { id: 'kimi-k2-turbo-preview', label: 'Kimi-K2-Turbo-Preview（快速）' },
      { id: 'kimi-k2-thinking', label: 'Kimi-K2-Thinking（推理强）' }
    ],
    defaultModel: 'kimi-k2.6',
    keyStorage: 'apiKey_kimi',
    hintLabel: '去 Kimi 开放平台申请 API Key',
    hintHref: 'https://platform.moonshot.cn/console/api-keys'
  }
};
const DEFAULT_PROVIDER = 'doubao';
let currentProvider = DEFAULT_PROVIDER;

// ─── System Prompt (base, platforms appended dynamically) ───
const SYSTEM_PROMPT_BASE = `你是一个专注于视觉灵感搜索优化的关键词生成助手。根据用户给出的主题，为指定平台生成高质量、具有设计感和审美导向的搜索短语。

## 关键词结构
每条关键词包含 3-5 个维度的组合：主题、设计风格、媒介/材质、构图/版式、情绪氛围、视觉细节。

## 风格词库
- 设计风格: brutalist, bauhaus, editorial, swiss design, cinematic, art deco, modernist, experimental typography, neo-grotesque, constructivist
- 材质/媒介: grain texture, film photography, risograph, halftone, matte paper, screen print, mixed media, collage, digital painting
- 构图/版式: minimal layout, asymmetrical grid, bold composition, centered typography, layered collage, negative space, full bleed, split layout
- 情绪: moody, nostalgic, surreal, poetic, dramatic lighting, dreamlike, raw aesthetic, ethereal, bold, contemplative

## 方向判断
根据主题自动判断方向：
- 海报/排版 → 强化 editorial, typography, grid, poster design
- 摄影/电影感 → 强化 cinematic, film still, moody lighting, photography
- 品牌/商业 → 强化 campaign visual, branding, art direction, commercial photography
- 插画/实验 → 强化 surreal, mixed media, concept art, editorial illustration`;

const PLATFORM_RULES = {
  pinterest: `## Pinterest 关键词规则
- 使用自然语言描述性英文短语（Pinterest 普通搜索不支持引号和减号等运算符）
- 长尾关键词效果更好，如 "minimalist brutalist poster typography black and white" 而非 "poster design"
- 每条 5-10 个英文单词
- 面向视觉灵感发现`,

  behance: `## Behance 关键词规则
- 更偏向作品集和项目搜索
- 可以包含设计类别词如 branding, UI/UX, editorial design, packaging
- 偏向专业设计作品搜索
- 每条 3-7 个英文单词`,

  huaban: `## 花瓣网关键词规则
- 必须使用中文搜索短语
- 结合设计风格和主题的中文描述，如"极简主义排版海报设计"、"复古胶片质感人像摄影"
- 每条 4-12 个中文字
- 面向国内设计灵感发现，关键词要符合中文搜索习惯`
};

function buildSystemPrompt(platforms, withTranslation) {
  let prompt = SYSTEM_PROMPT_BASE + '\n';
  platforms.forEach(p => {
    if (PLATFORM_RULES[p]) prompt += '\n' + PLATFORM_RULES[p] + '\n';
  });

  const example = platforms.map(p => {
    if (withTranslation && (p === 'pinterest' || p === 'behance')) {
      return `  "${p}": [{"en": "english keyword phrase", "zh": "中文注释"}, ...]`;
    }
    return `  "${p}": ["关键词1", "关键词2", ...]`;
  }).join(',\n');

  const translationRule = withTranslation
    ? '\n- Pinterest 和 Behance 每条返回对象 {en, zh}：en 为英文关键词原文，zh 为简练的中文注释（不超过 18 字，点出风格 / 质感 / 构图等核心维度，例："赛博朋克海报：霓虹黑色电影风字体"）'
    : '';

  prompt += `
## 输出格式
严格按以下 JSON 格式输出，不要输出任何其他内容：
{
${example}
}

每个平台生成 9 条关键词。确保：${translationRule}
- Pinterest 和 Behance 英文部分为英文短语
- 花瓣网关键词为中文短语（不需要英文，直接字符串数组）
- 有明确审美方向
- 条目之间有足够差异
- 避免低质量泛词`;
  return prompt;
}

// ─── Settings ───
openSettingsBtn.addEventListener('click', () => settingsOverlay.classList.remove('hidden'));
closeSettingsBtn.addEventListener('click', () => settingsOverlay.classList.add('hidden'));
settingsOverlay.addEventListener('click', (e) => {
  if (e.target === settingsOverlay) settingsOverlay.classList.add('hidden');
});

function makeLink(href, text) {
  const a = document.createElement('a');
  a.href = href;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  a.textContent = text;
  return a;
}

async function syncProviderUI() {
  const cfg = PROVIDERS[currentProvider];
  // Rebuild model dropdown for this provider
  modelSelect.innerHTML = '';
  cfg.models.forEach(m => {
    const opt = document.createElement('option');
    opt.value = m.id;
    opt.textContent = m.label;
    modelSelect.appendChild(opt);
  });
  // Restore saved model selection (or default)
  const modelStorageKey = `selectedModel_${currentProvider}`;
  const data = await chrome.storage.local.get([cfg.keyStorage, modelStorageKey]);
  const savedModel = data[modelStorageKey];
  modelSelect.value = (savedModel && cfg.models.some(m => m.id === savedModel)) ? savedModel : cfg.defaultModel;
  // Hint link below API Key input
  keyHint.innerHTML = '';
  keyHint.appendChild(makeLink(cfg.hintHref, `${cfg.hintLabel} →`));
  apiKeyInput.value = data[cfg.keyStorage] || '';
}

providerSelect.addEventListener('change', async () => {
  currentProvider = providerSelect.value;
  await chrome.storage.local.set({ activeProvider: currentProvider });
  syncProviderUI();
});

modelSelect.addEventListener('change', async () => {
  await chrome.storage.local.set({ [`selectedModel_${currentProvider}`]: modelSelect.value });
});

saveSettingsBtn.addEventListener('click', async () => {
  const key = apiKeyInput.value.trim();
  if (!key) { showToast('请输入 API Key'); return; }
  const cfg = PROVIDERS[currentProvider];
  await chrome.storage.local.set({
    [cfg.keyStorage]: key,
    activeProvider: currentProvider,
    [`selectedModel_${currentProvider}`]: modelSelect.value,
    apiEndpoint: cfg.endpoint,
    apiKey: key,
    apiModel: modelSelect.value
  });
  showToast('已保存');
  settingsOverlay.classList.add('hidden');
});

// Persist translate toggle
optTranslate.addEventListener('change', async () => {
  await chrome.storage.local.set({ withTranslation: optTranslate.checked });
});

// Load active provider + key + translate flag on init
(async () => {
  const data = await chrome.storage.local.get(['activeProvider', 'withTranslation']);
  currentProvider = (data.activeProvider && PROVIDERS[data.activeProvider]) ? data.activeProvider : DEFAULT_PROVIDER;
  providerSelect.value = currentProvider;
  optTranslate.checked = data.withTranslation !== false;
  await syncProviderUI();
})();

// ─── API Call ───
async function callAPI(topic, category, platforms, withTranslation) {
  const cfg = PROVIDERS[currentProvider];
  const modelStorageKey = `selectedModel_${currentProvider}`;
  const data = await chrome.storage.local.get([cfg.keyStorage, modelStorageKey]);
  const apiKey = data[cfg.keyStorage];
  const modelId = data[modelStorageKey] || cfg.defaultModel;

  if (!apiKey) {
    throw new Error('NO_KEY');
  }

  let userContent = `主题：${topic}`;
  if (category !== 'auto') {
    const catMap = {
      poster: '方向：海报 / 排版 / 版式',
      photo: '方向：摄影 / 电影感 / 情绪氛围',
      brand: '方向：品牌 / 广告 / 商业视觉',
      art: '方向：插画 / 艺术图像 / 实验风格'
    };
    userContent += `\n${catMap[category]}`;
  }

  const systemPrompt = buildSystemPrompt(platforms, withTranslation);

  const response = await fetch(cfg.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: modelId,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userContent }
      ],
      temperature: 0.8,
      max_tokens: 4096
    })
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`API 错误 (${response.status}): ${errText.slice(0, 200)}`);
  }

  const result = await response.json();
  const content = result.choices?.[0]?.message?.content;
  if (!content) throw new Error('API 返回为空');

  // Parse JSON from response
  const strategies = [
    () => { const m = content.match(/```(?:json)?\s*([\s\S]*?)```/); return m ? JSON.parse(m[1].trim()) : null; },
    () => { const m = content.match(/\{[\s\S]*\}/); return m ? JSON.parse(m[0]) : null; },
    () => JSON.parse(content.trim())
  ];
  for (const strategy of strategies) {
    try { const parsed = strategy(); if (parsed) return parsed; } catch (_) {}
  }
  throw new Error('返回解析失败，请重试');
}

// ─── Generate Keywords ───
let isGenerating = false;

async function generate() {
  const topic = keywordInput.value.trim();
  if (!topic || isGenerating) return;

  const showPin = optPinterest.checked;
  const showBe = optBehance.checked;
  const showHb = optHuaban.checked;

  const platforms = [];
  if (showPin) platforms.push('pinterest');
  if (showBe) platforms.push('behance');
  if (showHb) platforms.push('huaban');

  isGenerating = true;
  generateBtn.disabled = true;
  generateBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>`;

  try {
    const result = await callAPI(topic, categorySelect.value, platforms, optTranslate.checked);

    emptyState.classList.add('hidden');
    resultsDiv.classList.remove('hidden');

    pinterestSection.style.display = showPin ? 'block' : 'none';
    behanceSection.style.display = showBe ? 'block' : 'none';
    huabanSection.style.display = showHb ? 'block' : 'none';

    if (showPin && result.pinterest) {
      renderKeywords(pinterestKeywords, result.pinterest, 'pinterest');
    }
    if (showBe && result.behance) {
      renderKeywords(behanceKeywords, result.behance, 'behance');
    }
    if (showHb && result.huaban) {
      renderKeywords(huabanKeywords, result.huaban, 'huaban');
    }
  } catch (err) {
    if (err.message === 'NO_KEY') {
      settingsOverlay.classList.remove('hidden');
      showToast('请先配置 API Key');
    } else {
      showToast(err.message);
    }
  } finally {
    isGenerating = false;
    generateBtn.disabled = false;
    generateBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`;
  }
}

function renderKeywords(container, keywords, platform) {
  container.innerHTML = '';
  const allowSub = platform !== 'huaban';
  keywords.forEach((kw) => {
    const isObj = typeof kw === 'object' && kw !== null && kw.en;
    const mainText = isObj ? String(kw.en) : String(kw);
    const subText = (isObj && allowSub) ? String(kw.zh || '') : '';

    const item = document.createElement('div');
    item.className = 'keyword-item';
    item.dataset.copyText = mainText;
    item.innerHTML = `
      <div class="kw-content">
        <span class="kw-text">${escapeHtml(mainText)}</span>
        ${subText ? `<span class="kw-sub">${escapeHtml(subText)}</span>` : ''}
      </div>
      <span class="copy-icon">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="14" height="14" x="8" y="8" rx="2"/>
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
        </svg>
      </span>
    `;
    item.addEventListener('click', () => copyKeyword(item, mainText));
    container.appendChild(item);
  });
}

// ─── Copy ───
function copyKeyword(item, text) {
  navigator.clipboard.writeText(text).then(() => {
    item.classList.add('copied');
    showToast('已复制');
    setTimeout(() => item.classList.remove('copied'), 1500);
  });
}

// Copy all keywords for a platform (only the en/原文 part, never the zh subtitle)
document.querySelectorAll('.copy-all-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const platform = btn.dataset.platform;
    const container = document.getElementById(`${platform}-keywords`);
    const texts = Array.from(container.querySelectorAll('.keyword-item')).map(el => el.dataset.copyText || '');
    const filtered = texts.filter(t => t);
    if (filtered.length === 0) return;
    navigator.clipboard.writeText(filtered.join('\n')).then(() => {
      showToast(`已复制全部 ${filtered.length} 条`);
    });
  });
});

// ─── Toast ───
let toastTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.remove('hidden');
  requestAnimationFrame(() => toast.classList.add('show'));
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.classList.add('hidden'), 300);
  }, 2000);
}

// ─── Events ───
generateBtn.addEventListener('click', generate);
keywordInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') generate();
});

// ─── Utilities ───
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
