<div align="center">

# 🌐 Rotary Club of Amravati Ambika — Official Website

### Live • In Production • Actively Used by Rotary Club Amravati Ambika

[![Live Site](https://img.shields.io/badge/Live%20Site-Visit%20Now-brightgreen?style=for-the-badge)](https://rotary-website01.vercel.app/)
[![Made with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)
[![Status](https://img.shields.io/badge/Status-Production-success?style=for-the-badge)]()

**🔗 Live Demo:** [rotary-website01.vercel.app](https://rotary-website01.vercel.app/)

</div>

---

## 🏆 Project Highlight

> **This isn't just a portfolio project — it's live, in production, and actively used by the Rotary Club of Amravati Ambika.**

This website has been officially adopted as the **digital home of the Rotary Club of Amravati Ambika**, serving real members, real events, and real community outreach. Going from a personal build to a platform trusted and used by an established, community-facing organization is a milestone achievement — it reflects real-world reliability, usability, and impact beyond a typical academic or demo project.

---

## 📖 About the Project

The **Rotary Club of Amravati Ambika Website** is a full-featured, modern web platform designed to represent the club's identity, activities, and community service initiatives online. It provides visitors, members, and prospective donors with an easy way to learn about the club, view its leadership, explore ongoing/past projects, and contribute to its mission — all through a clean, responsive, and fast user interface.

The platform is built with performance, accessibility, and maintainability in mind, using a modern JavaScript/React-based stack and deployed on Vercel for continuous, zero-downtime delivery.

---

## ✨ Features

- 🏠 **Home Page** — Club overview, mission statement, and highlights
- 👥 **Board of Directors** — Current leadership team with profiles
- 🎖️ **Past Presidents** — Historical record of club leadership
- 📋 **Projects Showcase** — Community service and outreach initiatives
- 💳 **Donate Section** — Simple, accessible way for supporters to contribute
- 🔐 **Admin / Portal Access** — Restricted area for club administration and content management
- 📜 **Privacy Policy & Terms of Service** — Transparent legal and data-use documentation
- 📱 **Fully Responsive Design** — Optimized for mobile, tablet, and desktop
- ⚡ **Optimized Performance** — Fast loading via Next.js image optimization and static generation
- 🌍 **SEO Friendly** — Structured for discoverability and search engine indexing

---

## 🛠️ Tech Stack

| Category            | Technology                                  |
|----------------------|----------------------------------------------|
| **Framework**        | [Next.js](https://nextjs.org/) (React)       |
| **Styling**           | Tailwind CSS / CSS Modules *(adjust to match repo)* |
| **Language**          | JavaScript / TypeScript *(adjust to match repo)* |
| **Deployment**        | [Vercel](https://vercel.com/)               |
| **Version Control**   | Git & GitHub                                |
| **Image Optimization**| Next.js `next/image`                        |

> ℹ️ *Update the styling/language rows above to reflect the exact packages listed in your `package.json`.*

---

## 📸 Preview

| Home Page | Live Deployment |
|-----------|-----------------|
| Visit the live site to see the full experience | [rotary-website01.vercel.app](https://rotary-website01.vercel.app/) |

---

## 🚀 Getting Started

Follow these steps to run the project locally for development or contribution.

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [npm](https://www.npmjs.com/) / [yarn](https://yarnpkg.com/) / [pnpm](https://pnpm.io/)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/arnavKolhe27/rotary-website.git
   cd rotary-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory and add the required keys (see [Environment Variables](#-environment-variables) below).

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**

   Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🔑 Environment Variables

Create a `.env.local` file in the project root and configure the following (update keys to match your actual integrations, e.g. database, auth, or payment provider for the Donate section):

```env
NEXT_PUBLIC_SITE_URL=https://rotary-website01.vercel.app
NEXT_PUBLIC_ADMIN_EMAIL=your-admin-email@example.com
DATABASE_URL=your-database-connection-string
NEXTAUTH_SECRET=your-auth-secret
```

> ⚠️ Never commit `.env.local` or any file containing secrets to version control. Ensure `.env*` is listed in `.gitignore`.

---

## 📁 Project Structure

```
rotary-website/
├── public/                # Static assets (images, icons, favicon)
├── src/ or app/           # Application source code
│   ├── components/        # Reusable UI components
│   ├── pages/ or app/     # Route-based pages (Home, Board, Projects, Donate, etc.)
│   ├── styles/            # Global and component-level styles
│   └── lib/ or utils/     # Helper functions and utilities
├── .env.local              # Environment variables (not committed)
├── next.config.js          # Next.js configuration
├── package.json            # Project dependencies and scripts
└── README.md                # Project documentation
```

> 📝 *Adjust this tree to exactly match your repository's folder layout.*

---

## 🌍 Deployment

This project is deployed on **[Vercel](https://vercel.com/)**, offering:

- Automatic deployments on every push to `main`
- Preview deployments for pull requests
- Global CDN for fast load times
- Zero-config HTTPS and custom domain support

**Live URL:** [https://rotary-website01.vercel.app/](https://rotary-website01.vercel.app/)

To deploy your own instance:

1. Push your repository to GitHub
2. Import the project into [Vercel](https://vercel.com/new)
3. Add your environment variables in the Vercel dashboard
4. Deploy 🎉

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes
   ```bash
   git commit -m "Add: your feature description"
   ```
4. Push to the branch
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a Pull Request

---

## 🐛 Issues

If you encounter a bug or have a feature request, please [open an issue](https://github.com/arnavKolhe27/rotary-website/issues) with a clear description and steps to reproduce.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

> *(Update this section if the project uses a different license or is proprietary to the Rotary Club.)*

---

## 👤 Author

**Arnav Kolhe**
GitHub: [@arnavKolhe27](https://github.com/arnavKolhe27)

---

## 🙏 Acknowledgements

Special thanks to the **Rotary Club of Amravati Ambika** for trusting and adopting this platform as their official digital presence — turning this project from a development exercise into a real, live tool actively serving the club's members and community.

---

<div align="center">

**⭐ If you found this project useful or inspiring, consider giving it a star on GitHub! ⭐**

</div>
