import { useState } from 'react';

function Setup({ onStart }) {
  const [prefixRange, setPrefixRange] = useState('');
  const [questionCount, setQuestionCount] = useState(5);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prefixRange && questionCount) {
      onStart(prefixRange, questionCount);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          プレフィックス範囲を選択
        </label>
        <select
          value={prefixRange}
          onChange={(e) => setPrefixRange(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        >
          <option value="">選択してください</option>
          <option value="8-16">第2オクテット (/8～/16)</option>
          <option value="17-24">第3オクテット (/17～/24)</option>
          <option value="25-31">第4オクテット (/25～/31)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          問題数を選択
        </label>
        <select
          value={questionCount}
          onChange={(e) => setQuestionCount(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        >
          <option value={5}>5問</option>
          <option value={10}>10問</option>
          <option value={15}>15問</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        開始
      </button>
    </form>
  );
}

export default Setup;