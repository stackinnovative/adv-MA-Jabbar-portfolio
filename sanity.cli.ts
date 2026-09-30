import { defineCliConfig } from 'sanity/cli';

// The Sanity CLI does not read Next.js env files itself.
try {
  process.loadEnvFile('.env.local');
} catch {
  // no .env.local — rely on the real environment
}

export default defineCliConfig({
  api: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  },
});
