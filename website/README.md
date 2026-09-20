# RunBridge AI 网站源码

本目录是当前已发布版本的完整前端源码，包含新 Logo、单行自适应导航及所有独立页面。

## 技术结构

- `dist/`：可直接部署的静态站点，HTML + CSS + 原生 JavaScript。
- `dist/assets/runbridge-mark.png`：透明背景品牌 Logo，同时用于浏览器图标。
- `scripts/build-pages.py`：页面生成脚本，使用 Python 标准库。
- `scripts/page_content.py`：一级页面的扩展内容。
- `templates/home.html`：首页模板及共享品牌信息。
- `.openai/hosting.json`：仅保留静态目录配置，已移除原站点绑定 ID。

不需要 Node.js、npm 安装或数据库。生成页面需要 Python 3.9 或更新版本。

## 本地预览

进入仓库的 `website/` 目录，执行：

```bash
python -m http.server 8000 --directory dist
```

浏览器打开 http://localhost:8000 。Windows 也可以将 `python` 换为 `py -3`。
请通过本地 HTTP 服务预览，不要直接双击 HTML；站点使用以 `/` 开头的资源和页面路径。

## 修改与重新生成

- 修改首页及字标：`templates/home.html`
- 修改共享导航、页脚、模型数据、页面主体：`scripts/build-pages.py`
- 修改页面扩展内容：`scripts/page_content.py`
- 全站样式：`dist/style.css`、`dist/pages.css`
- 最新导航、Logo 与布局覆盖样式：`dist/navigation.css`
- 交互：`dist/app.js`、`dist/pages.js`

模板或生成脚本修改后运行：

```bash
python scripts/build-pages.py
```

该脚本会重建 HTML 页面。直接修改生成的 HTML 后再运行脚本，会覆盖这些 HTML 修改。
CSS、JavaScript 和图片保存在 dist 内，生成脚本不会覆盖它们。

## 部署

将 `dist/` 内的全部文件部署到任意静态网站服务器的站点根目录，保留目录结构。
服务器应支持目录默认文档 `index.html`，并可将 `404.html` 配置为自定义错误页面。
不要把所有未知路径重写为首页。子目录部署需要相应调整以 `/` 开头的资源与页面路径。

## 当前边界

这是前端品牌网站。模型筛选、预算估算、文档代码切换、博客搜索、错误排查和本地项目简报可用。
真实登录、注册、充值、API 调用、销售提交及客服工单尚未接入；代码示例中的账户配置需自行提供。
预算估算的默认费率是示例，不是正式报价。
Integrations 页面保留，但已从顶部导航移除；Community 页面已移除。
字体通过 Google Fonts 加载，加载失败时使用系统字体回退。
压缩包不包含 API 密钥、Git 凭据或 Git 历史。
