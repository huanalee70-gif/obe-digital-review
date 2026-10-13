# OBE Digital Review — 独立部署项目

此包包含实际网站文件，可在 Render 或普通静态服务器独立运行，无需登录 ChatGPT。

## 文件

- `public/`：可编辑的完整 HTML、CSS、JavaScript、图片、字体及 PDF；这是本项目的完整运行源文件。
- `dist/`：已生成的可直接部署版本。
- `render.yaml`：Render Static Site 配置。
- `package.json`、`scripts/`：无第三方安装依赖的构建、本地服务器及检查脚本。
- `asset-manifest.json`：文件清单和 SHA-256 校验值。

页面：主页、Privacy、Terms、Accessibility、Cookies。包括 14 张本地图片（Logo、原照片、分享封面）、11 个本地字体文件和 capability statement PDF。

保留原版视觉样式、布局、文字、导航、原首屏动画、折叠按钮及手机响应式 CSS。所有照片均随包提供；照片可点击或按 Enter/空格放大，按 Escape、关闭按钮或背景关闭。

## Render 部署

1. 解压，把项目根目录的内容上传到你自己的 GitHub/GitLab/Bitbucket 仓库。
2. Render 选择 New → Static Site，连接仓库。
3. Build Command：`npm run build`。
4. Publish Directory：`dist`。
5. 无需 Start Command。也可通过 Blueprint 使用根目录 `render.yaml`。
6. 若手动创建 Static Site，在 Redirects/Rewrites 中添加以下四条 Rewrite：
   - `/privacy` → `/privacy/index.html`
   - `/terms` → `/terms/index.html`
   - `/accessibility` → `/accessibility/index.html`
   - `/cookies` → `/cookies/index.html`
7. 如需完善分享预览的绝对 URL，给构建环境设置 `SITE_URL` 为你最终的网站 HTTPS 域名，然后重新构建。若 Render 提供 `RENDER_EXTERNAL_URL`，构建会自动使用它。无需密钥。

Render 通过 Git 仓库部署，本 ZIP 不是 Render 控制台的直接上传包。网站的所有资源已经包含在 ZIP 内；部署不会访问原 ChatGPT 网站下载图片或脚本。

## 本地使用

需要 Node.js 20 或更高版本（建议 22/24）：

```
npm run build
npm run check
npm start
```

浏览器访问 `http://localhost:3000`。不要通过双击 HTML 的 file:// 模式运行，因为 ES modules 和根路径资源需要 HTTP 服务。

## 导出范围与验证

导出来自已发布项目的真实运行文件。保留生成时使用的 HTML、CSS 和打包后的 JavaScript；不包含无法取得的旧账号原始 TSX 或构建前源码。现有文件已足够完整独立运行与部署，应用代码在 `public/assets/page-Cl0bWD8w.js`，入口在 `public/assets/replica.js`。

原照片二进制保持不变。独立副本仅将外部照片依赖本地化、去掉托管平台导航依赖，增加照片放大功能，并提供可移植部署配置；未重新设计或删减内容。

已验证五页与核心资源 HTTP 200、JavaScript 语法、React 运行模块、160 个本地资源引用、图片完整性及首页文字。没有在 Render 实际发布，也没有完成独立导出版本的浏览器视觉与交互验收。

未修改现有已发布网站或任何 DNS。包内无账号密码、访问令牌、旧 Sites 项目绑定或 Git 凭据。
