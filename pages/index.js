import Head from 'next/head'
import Header from '../components/Header.js'
import Footer from '../components/Footer.js'
import OpenAI from 'openai';
import React, { useState, useEffect } from 'react';

//async function main() {
//  const completion = await openai.chat.completions.create({
//    model: 'gpt-4',
//    messages: [{ role: 'user', content: 'Say this is a test' }],
//  });
//  console.log(completion.choices[0]?.message?.content);
//}

export default function Home() {

  const [userInput, setUserInput] = useState('');
  const [generatedText, setGeneratedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const openai = new OpenAI({ apiKey: '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', dangerouslyAllowBrowser: true })

  async function handleSubmit() {
    setIsLoading(true);
    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [{ role: 'user', content: userInput }],
      });
      setGeneratedText(completion.choices[0]?.message?.content);
    } catch (error) {
      console.error('Error:', error);
      setGeneratedText('Error fetching response');
    }
    setIsLoading(false);
  }

  function handleInputChange(event) {
    setUserInput(event.target.value);
  }

  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Welcome to my app!" />
        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>
        <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
        placeholder="Enter your prompt"
      />
      <button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Submit'}
      </button>
      <p>{generatedText}</p>
      </main>

      <Footer />
    </div>
  )
}
