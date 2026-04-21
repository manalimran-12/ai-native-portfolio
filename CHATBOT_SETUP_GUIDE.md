# Advanced Chatbot Setup Guide 🤖

## Quick Setup (2 minutes)

### Step 1: Get Your Free Gemini API Key
1. Visit: **https://makersuite.google.com/app/apikey**
2. Sign in with your Google account
3. Click **"Create API Key"**
4. Select or create a project
5. Click **"Create API Key in new project"**
6. Copy the API key displayed

### Step 2: Add API Key to .env.local
1. Open `.env.local` in your project root
2. Find the line: `VITE_GOOGLE_GEMINI_API_KEY=`
3. Paste your API key after the `=`:
   ```
   VITE_GOOGLE_GEMINI_API_KEY=your_copied_api_key_here
   ```
4. Save the file

### Step 3: Install Dependencies
```bash
npm install
```

### Step 4: Start Development Server
```bash
npm run dev
```

That's it! 🎉 Your chatbot is now powered by Gemini AI!

---

## How It Works

### Smart Response System:
```
User Question
    ↓
Is it in Knowledge Base? → YES → Answer from Knowledge Base (instant)
    ↓ NO
    ↓
Use Gemini API → AI generates contextual answer
    ↓
Display Answer
```

### Examples:

#### Knowledge Base Question (No API Used):
- "What are your 5-year goals?" → Instant answer from database
- "What projects have you built?" → Instant answer from database

#### New/Variation Questions (API Used):
- "Is Manal skilled in React?" → Gemini checks knowledge base + generates answer
- "Does Manal know frontend development?" → Gemini generates contextual answer
- "Can you work with MongoDB?" → Gemini answers based on tech stack

#### After Daily Quota Exceeded:
```
⚠️ Daily API quota has been exceeded. 
Please contact Manal directly for further questions! 
You can reach her through the contact form below. 📧
```

---

## Free Tier Limits

- **60 requests per minute** ✅ (plenty for a chatbot)
- **1500 requests per day** ✅ (covers all typical usage)
- **No credit card required** ✅
- **Free forever** ✅

---

## Troubleshooting

### Issue: "API key not found" error
**Solution:** 
- Make sure `.env.local` has the correct key
- Restart the dev server: `Ctrl+C` then `npm run dev`

### Issue: "API key is invalid"
**Solution:**
- Visit https://makersuite.google.com/app/apikey again
- Generate a NEW API key
- Replace the old one in `.env.local`

### Issue: "Daily quota exceeded"
**Solution:**
- This is expected after ~1500 requests per day
- Users will see "Contact Manal" message
- Quota resets daily at midnight GMT

### Issue: Responses are slow
**Solution:**
- Gemini API takes 2-5 seconds per request (normal)
- Already optimized to only use API for new questions
- Knowledge base answers are instant!

---

## Testing the Chatbot

Try these questions to see it work:

### From Knowledge Base (Instant):
- "What are your 5-year goals?"
- "Tell me about your projects"
- "What's your tech stack?"

### API Powered (Intelligent):
- "Does Manal know React?"
- "Is Manal a frontend developer?"
- "Can you work with databases?"
- "Do you have experience with Python?"
- "Have you worked with startups?"

---

## Production Deployment

When deploying to production:

1. **Add to your hosting environment variables:**
   - Service: Vercel, Netlify, etc.
   - Add: `VITE_GOOGLE_GEMINI_API_KEY` = your API key
   - This keeps the key secure (not in public code)

2. **Monitor API Usage:**
   - Check: https://makersuite.google.com/
   - Monitor requests to stay under 1500/day
   - Consider upgrading to paid plan if needed

3. **Optional: Switch to Paid Plan**
   - If you exceed free limits
   - Visit: https://makersuite.google.com/billing
   - Start at $0.0005 per request (very cheap!)

---

## Need Help?

- **Gemini API Docs:** https://ai.google.dev/
- **Contact Manal:** Use the contact form on the website
- **Google Support:** https://support.google.com/

Happy chatting! 🚀
