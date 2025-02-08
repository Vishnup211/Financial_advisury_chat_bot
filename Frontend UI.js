import { useState } from 'react';

export default function FinanceBot() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/financeBot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    });

    const data = await response.json();
    setAnswer(data.answer);
  };

  return (
    <div className="container">
      <h1>Financial Advisory Bot</h1>
      <p>Ask me anything about investing, saving, or financial planning!</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Example: What is a mutual fund?"
        />
        <button type="submit">Submit</button>
      </form>
      {answer && <p>Answer: {answer}</p>}
    </div>
  );
}
