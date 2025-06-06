# Markdown to Medium

A modern web application that converts Markdown format to HTML that's compatible with [Medium.com](https://medium.com/) editor. Built with React, TypeScript, and Vite.

This project is inspired by [markdown-to-medium-tool](https://github.com/fanderzon/markdown-to-medium-tool).

## 🌟 Features

- **Real-time Preview**: See your Markdown converted to Medium-compatible HTML in real-time
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Mode Support**: Toggle between light and dark themes
- **Internationalization**: Supports English and Japanese languages
- **Copy-Optimized Output**: Generated HTML is optimized for copying and pasting into Medium
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components
- **Markdown Syntax Help**: Built-in help dialog with syntax examples

## 🚀 Live Demo

The application is hosted at: https://hayata-yamamoto.github.io/Markdown-to-Medium/

## 📦 GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Initial Setup Steps

**IMPORTANT**: Follow these steps in order to avoid the "Not Found" error:

1. **Enable GitHub Pages first**:
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under "Build and deployment", select **GitHub Actions** as the source
   - Click **Save**

2. **Create the workflow file**:
   - Ensure the `.github/workflows/deploy.yml` file exists in your repository
   - If you're setting this up for the first time, commit and push the workflow file

3. **Trigger the deployment**:
   - Push to the `main` branch, or
   - Go to **Actions** tab and manually run the "Build and Deploy to GitHub Pages" workflow

4. **Verify deployment**:
   - Check the **Actions** tab for workflow status
   - Once successful, your site will be available at: `https://[username].github.io/[repository-name]/`

### Troubleshooting

If you encounter the "Not Found" error:
- Ensure GitHub Pages is enabled in repository settings **before** running the workflow
- Check that your repository is public, or you have GitHub Pro/Team for private repo Pages
- Verify the workflow has the correct permissions (already configured in the workflow file)

The GitHub Actions workflow will automatically:
- Install dependencies using Node.js 20
- Build the project with Vite
- Deploy the `dist` folder to GitHub Pages

## 🛠️ Technology Stack

- **Frontend Framework**: React 19
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4.x
- **UI Components**: shadcn/ui with Radix UI primitives
- **Markdown Parser**: marked
- **Internationalization**: react-i18next
- **Icons**: Lucide React
- **Code Quality**: Biome (ESLint + Prettier alternative)
- **Git Hooks**: Lefthook

## 📦 Installation

### Prerequisites

- Node.js (see `.node-version` for the exact version)
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd markdown-to-medium-tool
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000` and will automatically open in your browser.

## 🎯 Usage

1. **Write Markdown**: Enter your Markdown content in the left editor panel
2. **Preview**: Click the "Preview Mode" button to see how it will look in Medium
3. **Copy**: Select all content (Cmd/Ctrl+A) in the preview and copy it
4. **Paste**: Paste the copied content directly into Medium's post editor

### Supported Markdown Syntax

- **Headings**: `# H1` through `###### H6`
- **Text Formatting**:
  - `**bold**` for **bold text**
  - `*italic*` for *italic text*
  - `***bold italic***` for ***bold italic text***
- **Lists**:
  - Unordered lists with `-` or `*`
  - Ordered lists with numbers
  - Nested lists supported
- **Links**: `[text](url)` format
- **Code**:
  - Inline code with backticks
  - Code blocks with triple backticks
- **Quotes**: `>` for blockquotes

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

### Code Quality

The project uses Biome for code formatting and linting:

- **Formatting**: 2-space indentation, double quotes
- **Linting**: Recommended rules with strict unused import/variable detection
- **Git Hooks**: Automatic code formatting on commit via Lefthook

### Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   └── app-sidebar.tsx # Application sidebar
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── app.tsx             # Main application component
├── i18n.ts             # Internationalization setup
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

### Internationalization

The app supports multiple languages:
- English (default)
- Japanese

Language is automatically detected from browser settings and stored in localStorage. Translation files are managed in `src/i18n.ts`.

## 🎨 Design System

The application uses a modern design system with:
- **Color Scheme**: Support for light and dark modes
- **Typography**: Medium-inspired fonts and spacing
- **Components**: Consistent UI components from shadcn/ui
- **Responsive**: Mobile-first responsive design
- **Accessibility**: WCAG compliant components

## 🐛 Known Issues

Medium's import function often fails with formatting, which is why this tool exists. The generated HTML is specifically optimized to work well when copied and pasted into Medium's editor.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Run the linter: `npx biome check`
5. Commit your changes: `git commit -m 'Add some feature'`
6. Push to the branch: `git push origin feature/your-feature`
7. Submit a pull request

### Development Guidelines

- Follow the existing code style (enforced by Biome)
- Add appropriate TypeScript types
- Update tests if applicable
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Original concept inspired by the need for better Medium import functionality
- Built with modern React ecosystem tools
- UI components from the excellent shadcn/ui library

## 📞 Support

If you encounter any issues or have questions:
1. Check the existing GitHub issues
2. Create a new issue with detailed information
3. Include steps to reproduce any bugs

---

Made with ❤️ for writers who love Markdown and Medium
