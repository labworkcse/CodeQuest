# CodeQuest - Stack Overflow Clone

A modern Q&A platform built with Next.js, Node.js, and MongoDB, featuring multilingual support and social feed functionality.

## Features

- **Question & Answer System**: Ask questions, provide answers, and vote on content
- **User Authentication**: Secure registration and login with JWT
- **Multilingual Support**: Support for 6 languages with OTP verification
- **Social Feed**: Share posts with friends (posting limits based on friend count)
- **User Profiles**: Customizable profiles with reputation and badges
- **Tag System**: Organize questions with tags
- **Real-time Voting**: Upvote/downvote questions and answers
- **File Uploads**: Image and video uploads via Cloudinary
- **Responsive Design**: Mobile-first design with Tailwind CSS

## Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Shadcn/ui** - UI components
- **React Hook Form** - Form handling

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Cloudinary** - File storage
- **Nodemailer** - Email service
- **Twilio** - SMS service

## Deployment

Both frontend and backend are configured for Netlify deployment.

### Backend Deployment

1. Create a new site on Netlify
2. Connect your repository
3. Set build command: `npm run build`
4. Set publish directory: `.`
5. Add environment variables in Netlify dashboard
6. Deploy

### Frontend Deployment

1. Update API_BASE_URL in `src/lib/api.ts` with your backend URL
2. Create a new site on Netlify
3. Connect your repository
4. Set build command: `npm run build`
5. Set publish directory: `.next`
6. Deploy

## Environment Variables

### Backend (.env)
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FRONTEND_URL=https://your-frontend-domain.netlify.app
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=your_twilio_phone
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
NODE_ENV=production
```

## Local Development

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
npm install
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/send-otp` - Send OTP for language change
- `POST /api/auth/verify-otp` - Verify OTP

### Questions
- `GET /api/questions` - Get questions with pagination
- `GET /api/questions/:id` - Get single question
- `POST /api/questions` - Create question
- `POST /api/questions/:id/vote` - Vote on question

### Answers
- `GET /api/answers/question/:questionId` - Get answers for question
- `POST /api/answers` - Create answer
- `POST /api/answers/:id/vote` - Vote on answer

### Users
- `GET /api/users/:username` - Get user profile
- `PUT /api/users/profile` - Update profile
- `POST /api/users/:userId/friend` - Add friend

### Feed
- `GET /api/feed` - Get feed posts
- `POST /api/feed` - Create feed post
- `POST /api/feed/:id/like` - Like/unlike post

### Tags
- `GET /api/tags` - Get all tags
- `GET /api/tags/popular` - Get popular tags

### Upload
- `POST /api/upload` - Upload file

## Features Implementation

### Multilingual Support
- French: Requires email OTP verification
- Hindi, Spanish, Chinese, Portuguese: Require mobile OTP verification
- English: No verification required

### Social Feed Posting Limits
- 0 friends: 0 posts per day
- 1-2 friends: 2 posts per day
- 10+ friends: Unlimited posts per day

### Reputation System
- Upvotes on questions/answers increase reputation
- Downvotes decrease reputation
- Accepted answers provide bonus reputation

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details