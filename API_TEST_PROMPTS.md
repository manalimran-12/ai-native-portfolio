# 🧪 Chatbot API Integration Test Prompts

## **Pre-Test Checklist**
- [ ] API key added to `.env.local`: `VITE_GOOGLE_GEMINI_API_KEY=your_key`
- [ ] Run: `npm install`
- [ ] Run: `npm run dev`
- [ ] Dev server running on http://localhost:3000

---

## **Test Category 1: Knowledge Base Questions (Instant - No API)**
These should answer INSTANTLY from the knowledge base:

### Test Prompts:
```
1. "What are your 5-year goals?"
2. "Tell me about your projects"
3. "What's your tech stack?"
4. "What services do you offer?"
5. "What's your experience?"
```

**Expected Behavior:**
- ⚡ Instant response (under 1 second)
- No waiting for API
- Same answer as before

---

## **Test Category 2: Goal Timeframe Variations (API Used)**
These test the improved system prompt that handles different timeframes:

### Test Prompts:
```
1. "What are your 7-year goals?"          ← Different timeframe
2. "What's your 10-year vision?"          ← Longer timeframe
3. "What do you want to achieve in 10 years?"
4. "Where do you see yourself in 7 years?" ← Variation
5. "What are your next 10 years goals?"
```

**Expected Behavior:**
- 🤖 Uses Gemini API (2-5 seconds)
- Acknowledges the 7/10 year timeframe
- Provides 5-year goals as foundation
- Extends vision appropriately
- NOT just copy-paste from knowledge base

**Example Good Response:**
```
In the next 7 years, my goals build on my 5-year vision:
- First 5 years: Lead a technical team, launch AI SaaS products, 
  contribute to open-source, publish technical content, master Web3
- Years 5-7: Expand the AI SaaS business, establish myself as a 
  thought leader, mentor more developers, explore blockchain 
  applications for real-world problems
```

---

## **Test Category 3: Technology Knowledge (API Used)**
Test if AI correctly answers about Manal's technical skills:

### Test Prompts:
```
1. "Does Manal know React?"
2. "Is Manal a frontend developer?"
3. "Can you work with MongoDB?"
4. "Do you have Python experience?"
5. "Are you experienced with Node.js?"
6. "Can you work with TypeScript?"
7. "Do you know Docker?"
8. "Have you used AWS?"
```

**Expected Behavior:**
- 🤖 Uses Gemini API
- Confirms YES with examples/details
- Contextually accurate based on tech stack
- Not generic responses

**Example Good Responses:**
```
"Yes! React is one of my primary frontend technologies. 
I've built multiple production applications with React, 
including e-commerce platforms and analytics dashboards. 
I'm proficient with hooks, state management, and modern React patterns."

"Yes, I have extensive experience with MongoDB - it's one of my 
preferred databases for flexible schema projects. I've used it 
alongside Node.js in several full-stack applications."
```

---

## **Test Category 4: Capability Questions (API Used)**
Test capability and skill variations:

### Test Prompts:
```
1. "Are you good at UI/UX design?"
2. "Can you do mentoring?"
3. "Do you work on remote projects?"
4. "Can you handle complex projects?"
5. "Do you have consulting experience?"
6. "Can you lead a team?"
7. "Are you experienced with databases?"
```

**Expected Behavior:**
- 🤖 Uses Gemini API
- Answers accurately based on knowledge base
- Provides context/examples
- Honest about strengths and limitations

---

## **Test Category 5: Completely New Questions (API Used)**
These are questions NOT in the knowledge base (tests true AI ability):

### Test Prompts:
```
1. "What's your approach to code review?"
2. "How do you handle technical debt?"
3. "What's your philosophy on testing?"
4. "How do you approach new technologies?"
5. "What motivates you in software development?"
6. "How do you handle disagreements in the team?"
7. "What's your experience with agile methodologies?"
```

**Expected Behavior:**
- 🤖 Uses Gemini API
- Generates intelligent responses based on profile
- Responses should be contextually relevant
- Feel natural and professional

---

## **Test Category 6: Quota Exceeded Scenario (Error Handling)**
Test error handling when API quota is exceeded:

### How to Trigger:
```
Send ~30-40 API questions quickly to exceed the 1500 daily limit
(or edit src/lib/geminiClient.js to set quotaExceeded = true for testing)
```

**Expected Behavior:**
- ⚠️ Shows message: "Daily API quota has been exceeded. Please contact Manal directly..."
- Button to scroll to contact form
- User can still interact with knowledge base questions

---

## **Test Sequence (Recommended Order)**

### **Run 1: Basic Function Test** (5 mins)
1. Test a knowledge base question → Should be instant
2. Test a technology question → Should use API
3. Test a new question → Should use API

### **Run 2: Timeframe Variations** (5 mins)
1. Test "5-year goals" → Knowledge base answer
2. Test "7-year goals" → AI enhanced answer
3. Test "10-year vision" → AI enhanced answer

### **Run 3: Comprehensive Coverage** (10 mins)
- Test all 6 categories above
- Note response times
- Check answer quality

---

## **Debugging Tips**

### **Check API Key is Working:**
1. Open browser DevTools (F12)
2. Go to Console tab
3. If you see errors about API key, it's not set correctly

### **Check API Responses:**
1. Open Network tab in DevTools
2. Look for requests to `generativelanguage.googleapis.com`
3. Response should show the AI-generated text

### **Check Request Count:**
Add this to browser console to see how many API requests made:
```javascript
// In useChatbot.js, add console.log
console.log(`API Requests made: ${getRequestCount()}`);
```

---

## **Performance Expectations**

| Type | Response Time | API Used |
|------|---------------|----------|
| Knowledge Base | < 1 second ⚡ | ❌ No |
| Simple Variation | 2-5 seconds | ✅ Yes |
| Complex Question | 5-10 seconds | ✅ Yes |
| Quota Exceeded | Instant | ❌ Error |

---

## **Success Criteria**

✅ All knowledge base questions answer instantly
✅ Goal timeframe variations handled appropriately (7yr/10yr)
✅ Technology questions answer with context
✅ New questions generate intelligent responses
✅ Quota exceeded shows proper error message
✅ Response quality is natural and professional

---

## **If API Doesn't Work**

1. **Check .env.local has API key:**
   ```
   VITE_GOOGLE_GEMINI_API_KEY=your_actual_key
   ```

2. **Restart dev server:**
   ```bash
   Ctrl+C (in terminal)
   npm run dev
   ```

3. **Verify API key is valid:**
   - Go to https://makersuite.google.com/app/apikey
   - Check if key still active
   - Generate new key if needed

4. **Check browser console for errors:**
   - F12 → Console tab
   - Look for error messages

5. **Test with curl (optional):**
   ```bash
   curl -X POST "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_KEY" \
     -H "Content-Type: application/json" \
     -d '{"contents": [{"parts": [{"text": "hello"}]}]}'
   ```

---

## **Next Steps**

After all tests pass:
1. Deploy to production
2. Monitor API usage at: https://makersuite.google.com/
3. Enjoy the advanced chatbot! 🎉
