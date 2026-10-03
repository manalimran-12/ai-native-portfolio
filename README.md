# Hey, I'm Manal 👋

This is my portfolio. You can talk to it.

I'm a software engineer from Karachi, Pakistan. I've spent the last 3+ years building web and mobile apps. Whenever I sent someone a regular portfolio, I felt it didn't really show who I am. A long page of bullet points makes people scroll and guess. So I built one that lets you ask questions instead.

🔗 **Live site:** [manal-imran.vercel.app](https://manal-imran.vercel.app)

---

## What it does

When you open the site, a chat greets you in my voice. You can ask what I've worked on, which tools I like, what I do outside of code, or how to reach me, and it answers the way I would.

- **Chat instead of scroll.** Ask about my projects, skills, or experience and get a direct answer.
- **Answers from what I wrote.** The AI uses a knowledge file about me that I wrote and keep up to date, so it doesn't make things up.
- **Quick sections.** If you'd rather not type, use the shortcuts for Me, Projects, Skills, Fun, and Contact.
- **Live GitHub data.** Project cards pull details straight from GitHub.
- **Light and dark mode**, smooth animations, and it works well on phones.

---

## Built with

- **Next.js 15** and **React 19**
- **Tailwind CSS**, **Framer Motion**, and **GSAP** for the UI and motion
- **React Three Fiber** for the 3D bits
- **Mistral** through the **Vercel AI SDK** for the chat
- **GitHub API** for project data
- Deployed on **Vercel**

---

## Running it locally

You'll need Node.js 18 or newer, a Mistral API key, and a GitHub token.

```sh
git clone https://github.com/manalimran-12/ai-native-portfolio.git
cd ai-native-portfolio
npm install
```

Create a `.env.local` file in the project root:

```env
MISTRAL_API_KEY="your_mistral_api_key"
GITHUB_TOKEN="your_github_token"
```

- Get a Mistral key at [admin.mistral.ai](https://admin.mistral.ai/organization/api-keys)
- Create a GitHub token at [github.com/settings/tokens](https://github.com/settings/personal-access-tokens)

Then start it:

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and say hi.

If you want to use this as your own portfolio, most of the "me" content lives in `src/data/chatbotKnowledge.js` and the chat prompt under `src/app/api/chat/`. Swap in your own story there.

---

## What's next

Things I'd like to add when I have time:

- [ ] A voice assistant, so you can talk to it out loud
- [ ] Live demos inside the project showcase
- [ ] Multilingual chat (English and Urdu to start)

---

## Let's talk

If you're hiring, want to work on something together, or just want to say hello, I'd love to hear from you.

[![Portfolio](https://img.shields.io/badge/Portfolio-manal--imran.vercel.app-2ea44f?style=for-the-badge&logo=vercel)](https://manal-imran.vercel.app)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Manal_Imran-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/manal-imran-96bb72254)
[![GitHub](https://img.shields.io/badge/GitHub-manalimran--12-181717?style=for-the-badge&logo=github)](https://github.com/manalimran-12)

— Manal Imran
