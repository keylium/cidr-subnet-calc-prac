import { useState } from 'react';
import Setup from './components/Setup';
import Quiz from './components/Quiz';
import Results from './components/Results';

function App() {
  const [gameState, setGameState] = useState('setup');
  const [settings, setSettings] = useState({
    prefixRange: '',
    questionCount: 0
  });
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);

  // CIDRからサブネットマスクを計算する関数
  function cidrToSubnetMask(cidr) {
    const mask = ~((1 << (32 - cidr)) - 1);
    return [
      (mask >>> 24) & 255,
      (mask >>> 16) & 255,
      (mask >>> 8) & 255,
      mask & 255
    ].join('.');
  }

  // ネットワークアドレスを計算する関数
  function calculateNetworkAddress(ip, cidr) {
    const ipParts = ip.split('.').map(Number);
    const mask = ~((1 << (32 - cidr)) - 1);
    const ipNum = (ipParts[0] << 24) | (ipParts[1] << 16) | (ipParts[2] << 8) | ipParts[3];
    const networkNum = ipNum & mask;
    return [
      (networkNum >>> 24) & 255,
      (networkNum >>> 16) & 255,
      (networkNum >>> 8) & 255,
      networkNum & 255
    ].join('.');
  }

  // ブロードキャストアドレスを計算する関数
  function calculateBroadcastAddress(ip, cidr) {
    const ipParts = ip.split('.').map(Number);
    const mask = ~((1 << (32 - cidr)) - 1);
    const ipNum = (ipParts[0] << 24) | (ipParts[1] << 16) | (ipParts[2] << 8) | ipParts[3];
    const broadcastNum = ipNum | ((1 << (32 - cidr)) - 1);
    return [
      (broadcastNum >>> 24) & 255,
      (broadcastNum >>> 16) & 255,
      (broadcastNum >>> 8) & 255,
      broadcastNum & 255
    ].join('.');
  }

  // ランダムなIPアドレスを生成する関数
  function generateRandomIp() {
    return Array.from({ length: 4 }, () => Math.floor(Math.random() * 256)).join('.');
  }

  function generateQuestions(prefixRange, count) {
    const questions = [];
    const [minPrefix, maxPrefix] = prefixRange.split('-').map(Number);
    
    for (let i = 0; i < count; i++) {
      const cidr = Math.floor(Math.random() * (maxPrefix - minPrefix + 1)) + minPrefix;
      const ip = generateRandomIp();
      
      questions.push({
        id: i + 1,
        ip,
        cidr,
        subnetMask: cidrToSubnetMask(cidr),
        networkAddress: calculateNetworkAddress(ip, cidr),
        broadcastAddress: calculateBroadcastAddress(ip, cidr)
      });
    }
    
    return questions;
  }

  const startQuiz = (prefixRange, questionCount) => {
    const generatedQuestions = generateQuestions(prefixRange, questionCount);
    setSettings({ prefixRange, questionCount });
    setQuestions(generatedQuestions);
    setGameState('quiz');
  };

  const submitQuiz = (finalAnswers) => {
    setAnswers(finalAnswers);
    setGameState('results');
  };

  const resetQuiz = () => {
    setGameState('setup');
    setSettings({ prefixRange: '', questionCount: 0 });
    setAnswers([]);
    setQuestions([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <h1 className="text-2xl font-semibold mb-8 text-center">
                CIDRサブネット計算練習
              </h1>
              {gameState === 'setup' && (
                <Setup onStart={startQuiz} />
              )}
              {gameState === 'quiz' && (
                <Quiz
                  questions={questions}
                  onSubmit={submitQuiz}
                />
              )}
              {gameState === 'results' && (
                <Results
                  questions={questions}
                  answers={answers}
                  onReset={resetQuiz}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;