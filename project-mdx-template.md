# Project.mdx Generation Prompt Template

Use this template when creating new project.mdx files for your developer portfolio to ensure consistency with your existing format.

## Project.mdx Generation Prompt Template

```
Create a project.mdx file for [PROJECT NAME] following this exact structure and format:

## REQUIRED META OBJECT (at top of file):
```javascript
export const meta = {
  title: '[Full Project Name]',
  slug: '[lowercase-hyphenated-slug]',
  date: '[YYYY-MM-DD completion/release date]',
  tags: ['[3-5 main technology tags]'],
  excerpt: '[1-2 sentence compelling description for project cards and previews]',
  stack: ['[Detailed technical stack - all technologies, frameworks, APIs used]'],
  repo: '[GitHub URL or empty string if private]',
  demo: '[Live demo URL or empty string if not available]',
  cover: '/images/projects/[project-slug].[png/gif]'
}
```

## REQUIRED CONTENT SECTIONS:

### 1. Project Overview
- Start with compelling value proposition 
- Explain what problem it solves and for whom
- 2-3 paragraphs maximum

### 2. Key Features  
Structure with emoji bullets (🔍, 🤖, 📊, ⚡, etc.):
- **Feature Category Name**
- Bullet points with **Bold Key Points:** Detailed descriptions
- Include technical specifics and user benefits
- Add image callouts: ![Alt Text](/images/projects/filename.png)
- *Italic image captions explaining what's shown*

### 3. User Flow
Numbered step-by-step journey:
1. **Action:** Description of what user does
2. **Next Step:** Continue the flow
3. **(Admin/Special Role):** Mark special user types when applicable

### 4. Architecture & Backend (for technical projects)
Sub-sections for:
- Backend Infrastructure  
- Frontend Architecture
- Data Management
- Any other relevant technical categories

### 5. Security Measures (when applicable)
- API Security
- Data Protection
- Other security considerations

### 6. UI/UX Details
- Modern interface features
- Accessibility considerations
- Performance optimizations

### 7. Technical Challenges Overcome
- Major problems solved
- Implementation difficulties resolved
- Creative solutions developed

### 8. Tech Stack Breakdown
Organize by categories:
- Frontend Technologies
- Backend Technologies  
- AI & External Services (if applicable)
- Development & Testing

### 9. Impact and Results
- User Empowerment
- Technical Innovation
- Business Value

End with a compelling closing paragraph summarizing the project's success and technical achievement.

## FORMATTING GUIDELINES:
- Use **bold** for sub-headings and key terms
- Use *italics* for image captions
- Use emoji bullets for major feature categories
- Include relevant screenshots with descriptive captions
- Keep descriptions detailed but scannable
- Maintain professional, technical tone while being accessible
```

## Example Usage:
When you're in another repo, use this prompt:

> "Using the project.mdx template format I provided, create a comprehensive project.mdx file for [YOUR PROJECT NAME]. This project is [brief description]. The main technologies used are [list technologies]. The key features include [list main features]. Please follow the exact structure and formatting conventions, including appropriate emoji bullets, detailed technical sections, and professional descriptions that highlight both the technical implementation and user value."

## Notes:
- This template ensures consistency with your existing portfolio structure
- Maintains the high-quality, detailed format you've established
- Adapt sections based on project complexity (e.g., skip Architecture section for simpler projects)
- Always include relevant screenshots and ensure they're properly captioned
- Keep the technical depth appropriate for your target audience
