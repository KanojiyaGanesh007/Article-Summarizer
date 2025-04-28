import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logo } from '../assets';
import './Summarizer.css';

function Summarizer() {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      console.error('Error summarizing:', error);
      setSummary('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="page-container pt-20">
      <nav className="flex justify-between items-center w-full mb-10">
        <img src={logo} alt="sumz_logo" className="w-28 object-contain" />
        <button
          onClick={() => navigate('/menu')}
          className="back-button"
        >
          ← Back to Menu
        </button>
      </nav>

      <h1 className="section-title">Text Summarizer</h1>
      <p className="section-description">
        Paste your text below and get a concise summary. Perfect for condensing long documents, articles, or any written content.
      </p>

      <div className="card max-w-3xl mx-auto">
        <div className="space-y-6">
          <div>
            <label htmlFor="text-input" className="block text-sm font-medium text-gray-700 mb-2">
              Enter your text
            </label>
            <textarea
              id="text-input"
              placeholder="Paste your text here..."
              rows={10}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <button
            onClick={handleSummarize}
            disabled={loading || !text.trim()}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? 'Summarizing...' : 'Generate Summary'}
          </button>

          {summary && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Summary</h2>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700 leading-relaxed">{summary}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Summarizer;
