# Serafin Sanchez - Developer Portfolio

A modern, responsive developer portfolio built with Next.js 15, TypeScript, and MDX for easy content management.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15, React 19, TypeScript
- **Content Management**: MDX for easy content updates
- **Design System**: Tailwind CSS with shadcn/ui components
- **Dark/Light Mode**: Automatic theme switching
- **Performance Optimized**: 90+ Lighthouse scores
- **Responsive Design**: Optimized for all devices
- **Contact Form**: Integrated with Resend API
- **Animations**: Smooth interactions with Motion.dev

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Content**: MDX with @next/mdx
- **Forms**: Resend API
- **Animations**: Motion.dev
- **Theme**: next-themes
- **Icons**: Lucide React

## 📁 Project Structure

```
├── content/                 # MDX content files
│   ├── about.mdx           # About page content
│   ├── skills.mdx          # Skills and technologies
│   ├── work/               # Work history entries
│   ├── projects/           # Project case studies
│   └── blog/               # Blog posts (optional)
├── src/
│   ├── app/                # Next.js app router pages
│   ├── components/         # React components
│   │   ├── ui/            # Reusable UI components
│   │   └── sections/      # Page sections
│   ├── lib/               # Utility functions
│   └── types/             # TypeScript type definitions
└── public/                # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.18+ (20/22 LTS recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/serafinsanchez/professional-portfolio.git
cd professional-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📝 Content Management

The portfolio uses MDX for content management, making it easy to update without touching React components:

- **About**: Edit `content/about.mdx`
- **Skills**: Edit `content/skills.mdx`
- **Work History**: Add entries in `content/work/`
- **Projects**: Add case studies in `content/projects/`
- **Blog**: Add posts in `content/blog/` (optional)

## 🎨 Customization

### Colors and Theme

The design system uses CSS custom properties for easy theming. Update the colors in `src/app/globals.css`:

```css
:root {
  --primary: 240 5.9% 10%;
  --primary-foreground: 0 0% 98%;
  /* ... other colors */
}
```

### Components

The project uses shadcn/ui components. Add new components with:

```bash
npx shadcn@latest add [component-name]
```

## 📦 Deployment

The portfolio is optimized for deployment on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

## 📊 Performance

The portfolio is built with performance in mind:

- **Lighthouse Scores**: 90+ across all metrics
- **Core Web Vitals**: Optimized for all metrics
- **Bundle Size**: Minimal JavaScript bundle
- **Image Optimization**: Next.js Image component
- **SEO**: Comprehensive meta tags and structured data

## 🤝 Contributing

This is a personal portfolio project, but suggestions and improvements are welcome!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **Email**: hello@serafinsanchez.dev
- **GitHub**: [@serafinsanchez](https://github.com/serafinsanchez)
- **LinkedIn**: [Serafin Sanchez](https://linkedin.com/in/serafinsanchez)
