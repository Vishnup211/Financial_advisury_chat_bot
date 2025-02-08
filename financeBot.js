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
