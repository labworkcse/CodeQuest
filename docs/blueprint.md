# **App Name**: CodeQuest

## Core Features:

- Question Display: Simplified interface like Stack Overflow, with tags, Markdown support, time/date, user info, and answer/comment section below each question.
- Voting: Basic upvote/downvote functionality (like Stack Overflow) that auto-updates user reputation based on votes.
- User Profiles: Profile picture (custom upload or avatar API), bio, badges, rep, questions/answers posted, and friend list functionality.
- Search Functionality: Text-based global search (question title/body/tags), optionally filter by tags or user.
- Public Feed: Post image/video with text caption. Rules: 0 friends → 0 posts/day; 1–2 friends → max 2 posts/day; 10 friends → unlimited posts/day. Support likes, shares, comments.
- Multilanguage Support: Translations using Next-i18next. Supported Languages: English, French, Hindi, Spanish, Chinese, Portuguese. Security Logic: Switching to French: Email OTP via Firebase. Switching to any other language: Mobile OTP (Firebase phone auth)

## Style Guidelines:

- Primary Color: #3B82F6 (Dark Blue)
- Background: #F9FAFB (Light Gray)
- Modern, sans-serif (e.g., Inter or Poppins)
- UI Library: Tailwind CSS (optional: shadcn/ui for React)