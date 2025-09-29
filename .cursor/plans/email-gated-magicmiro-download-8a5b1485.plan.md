<!-- 8a5b1485-b58d-4e80-a570-62924814273a ffb954a1-c83e-40ac-a365-06d34b26ca9c -->
# Email-gated Download Feature

## Overview

Replace static download links in the MagicMiro blog post with an email signup form that reveals the download link after successful signup, with localStorage persistence and download source tracking.

## Implementation Steps

### 1. Update InstantDB Schema

**File**: `instant.schema.ts`

Add `source` field to the `signups` entity to track where signups originated:

signups: i.entity({
  name: i.string(),
  email: i.string().unique().indexed(),
  source: i.string().indexed().optional(), // e.g., "magicmiro-download", "newsletter"
  createdAt: i.number().indexed(),
}),
Push schema changes using the Instant CLI.

### 2. Update Signup API Route

**File**: `src/app/api/signup/route.ts`

Update the schema validation and database transaction to accept and store the `source` field:

```typescript
const SignupSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(254),
  source: z.string().max(50).optional(), // Add source tracking
})

// In the transaction:
await db.transact(
  db.tx.signups[id].update({ 
    name, 
    email, 
    source: source || 'newsletter', // Default to newsletter
    createdAt: Date.now() 
  })
)
```

### 3. Create Generic DownloadWithEmail Component

**File**: `src/components/DownloadWithEmail.tsx` (new file)

Create a reusable component with:

- Props: `downloadUrl`, `fileName`, `source`, `title`, `description`, `fileSize`
- Form using same validation as `EmailSignupForm` (name + email)
- On mount: check localStorage for `download_${source}` to show link immediately
- On successful signup: save to localStorage and reveal download link
- Clean, non-salesy copy explaining the value exchange
- Prominent download button once revealed

Component structure:
interface DownloadWithEmailProps {
  downloadUrl: string
  fileName: string
  source: string
  title?: string
  description?: string
  fileSize?: string
}

### 4. Update Component Exports

**File**: `src/components/index.ts`

Export the new `DownloadWithEmail` component.

### 5. Update MagicMiro Blog Post

**File**: `src/content/blog/magicmiro.mdx`

Replace the two download link sections (lines 36-43 and 83-90) with the new component:

<DownloadWithEmail
  downloadUrl="/MagicMiro.dmg"
  fileName="MagicMiro.dmg"
  source="magicmiro-download"
  title="Download MagicMiro"
  description="Get notified about updates and new features"
  fileSize="4.8MB"
/>
Update the text around the download sections to set expectations about the email signup.

## Technical Notes

- **localStorage key format**: `download_${source}` stores boolean
- **Form validation**: Reuse same zod schema from EmailSignupForm
- **Success state**: Show download button + confirmation message
- **Error handling**: Show user-friendly error if API fails
- **Security note**: Keep the same security note about macOS warning after download section

### To-dos

- [ ] Update InstantDB schema to add source field to signups entity
- [ ] Update signup API route to accept and store source field
- [ ] Create generic DownloadWithEmail component with form, localStorage, and reveal logic
- [ ] Export DownloadWithEmail component from components index
- [ ] Replace download links in magicmiro.mdx with DownloadWithEmail component