// Complete README.md and Next.js project setup for a Financial Advisory Bot

# Financial Advisory Chatbot

## Introduction
A financial advisory chatbot that provides insights on investment strategies, budgeting, and retirement planning using RAG (Retrieval-Augmented Generation) technology.

## Features
- Ask financial questions and get accurate responses.
- Covers topics like mutual funds, budgeting, tax-saving strategies, and retirement planning.
- Uses LangChain.js for document retrieval and OpenAI for response generation.
- Logs interactions and responses using Groclake for monitoring and analytics.

## Tech Stack
- **Frontend:** Next.js
- **Backend:** Node.js (API routes in Next.js)
- **RAG Framework:** LangChain.js
- **Vector Database:** Pinecone
- **LLM:** OpenAI GPT
- **Monitoring:** Groclake
- **Deployment:** Vercel

---

## Project Structure
```bash
finance-advisory-bot/
  ├── pages/
  │   ├── index.js             # Frontend UI for the chatbot
  │   └── api/
  │       └── financeBot.js    # Backend logic with LangChain and Pinecone
  ├── public/                  # Static assets (if any)
  ├── styles/                  # Optional: Add custom CSS for UI styling
  ├── .env.example             # Example file for environment variables
  ├── README.md                # Documentation for the project
  ├── package.json             # Project dependencies
  └── vercel.json              # Configuration for Vercel deployment (optional)
```

---

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/finance-advisory-bot.git
   cd finance-advisory-bot
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**  
   Create a `.env` file in the root directory with the following:
   ```env
   OPENAI_API_KEY=your-openai-api-key
   PINECONE_API_KEY=your-pinecone-api-key
   PINECONE_ENV=your-pinecone-environment
   GROCLAKE_API_KEY=your-groclake-api-key
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Deploy to Vercel (optional):**
   ```bash
   vercel
   ```

---

## How It Works
- Users ask financial questions through the web interface.
- The question is sent to the `/api/financeBot` route.
- Relevant financial documents are retrieved using Pinecone.
- OpenAI generates a response based on the retrieved documents.
- Groclake logs the interaction for monitoring and analytics.

---

## Sample Code Explanation

### `api/financeBot.js`
Handles the backend logic for the chatbot:
```javascript
import { OpenAI } from 'langchain/llms/openai';
import { PineconeRetriever } from 'langchain/retrievers/pinecone';
import { RetrievalQAChain } from 'langchain/chains';
import { logToGroclake } from 'groclake-sdk';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  const { question } = req.body;

  try {
    const model = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const retriever = new PineconeRetriever(index, { topK: 5 });
    const chain = new RetrievalQAChain({ llm: model, retriever });
    const response = await chain.call({ input: question });

    await logToGroclake({
      category: 'finance',
      question,
      response,
      timestamp: new Date().toISOString(),
    });

    res.status(200).json({ answer: response });
  } catch (error) {
    console.error(error);
    await logToGroclake({ error, timestamp: new Date().toISOString() });
    res.status(500).json({ error: 'An error occurred' });
  }
}
```

---

## Future Enhancements
- **Real-time Stock Data:** Integrate with a stock market API.
- **Crypto Tracking:** Add support for crypto-related queries.
- **Personalized Financial Advice:** Implement authentication and personalized suggestions.

---

## Deployment Link (Vercel)
**[Live Demo](https://finance-advisory-bot.vercel.app)**

---

## License
MIT License
