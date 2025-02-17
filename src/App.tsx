import React, { useState } from 'react';
import { remixContent } from './services/api';

function App() {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('test');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRemix = async () => {
    setIsLoading(true);
    setError('');
    try {
      const remixedText = await remixContent(inputText);
      setOutputText(remixedText);
    } catch (error) {
      console.error('Error remixing content:', error);
      setError('Failed to remix content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Content Remixer
        </h1>
        
        <div className="space-y-6">
          <div>
            <label htmlFor="input" className="block text-sm font-medium text-gray-700 mb-2">
              Input Text
            </label>
            <textarea
              id="input"
              className="w-full h-32 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your text here..."
            />
          </div>

          <button
            onClick={handleRemix}
            disabled={isLoading || !inputText}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
          >
            {isLoading ? 'Remixing...' : 'Remix Content'}
          </button>

          {error && (
            <div className="text-red-600 text-sm">
              {error}
            </div>
          )}

          {outputText && (
            <div>
              <label htmlFor="output" className="block text-sm font-medium text-gray-700 mb-2">
                Remixed Output
              </label>
              <div
                id="output"
                className="w-full h-32 p-3 border border-gray-300 rounded-md bg-white overflow-auto"
              >
                {outputText}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
