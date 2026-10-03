import { tool } from 'ai';
import { z } from 'zod';

export const getInternship = tool({
  description:
    "Gives a summary of what kind of role or opportunity I'm looking for, plus my contact info and how to reach me. Use this tool when the user asks about my job search, availability, or how to contact me for opportunities.",
  parameters: z.object({}),
  execute: async () => {
    return `Here’s what I’m looking for 👇

- 📅 **Availability**: Open to new roles and freelance projects
- 🌍 **Location**: Based in **Karachi, Pakistan**, open to **remote** and **international** roles
- 🧑‍💻 **Focus**: Full-stack web & mobile development, AI integrations
- 🛠️ **Stack**: React, Next.js, React Native, Node.js, Nest.js, TypeScript, AWS, GCP
- ✅ **What I bring**: 3+ years building web and mobile apps end to end, from Figma designs to deployed microservices, including Stripe subscription billing and cloud deployments.

📬 **Contact me** via:
- Email: manalimran200212@gmail.com
- LinkedIn: [linkedin.com/in/manal-imran-96bb72254](https://www.linkedin.com/in/manal-imran-96bb72254)
- GitHub: [github.com/manalimran-12](https://github.com/manalimran-12)

Would love to hear from you ✌️
    `;
  },
});
