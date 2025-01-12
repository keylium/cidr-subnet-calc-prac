import { useState } from 'react';

function Quiz({ questions, onSubmit }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState(
    questions.map(() => ({
      networkAddress: '',
      broadcastAddress: '',
      subnetMask: '',
      showAnswer: false
    }))
  );

  const handleAnswerChange = (field, value) => {
    // 数字とドット以外の文字を除去
    const sanitizedValue = value.replace(/[^0-9.]/g, '');
    
    // ドットが連続する場合、最初のドットのみを残す
    const normalizedValue = sanitizedValue.replace(/\.+/g, '.');
    
    // 先頭のドットを除去
    const finalValue = normalizedValue.replace(/^\./, '');
    
    // 最大3つのドットまでに制限
    const dots = finalValue.match(/\./g) || [];
    if (dots.length > 3) {
      return;
    }

    // 各オクテットが255以下であることを確認
    const octets = finalValue.split('.');
    for (const octet of octets) {
      if (octet && parseInt(octet) > 255) {
        return;
      }
    }

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = {
      ...newAnswers[currentQuestion],
      [field]: finalValue
    };
    setAnswers(newAnswers);
  };

  const toggleShowAnswer = () => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = {
      ...newAnswers[currentQuestion],
      showAnswer: !newAnswers[currentQuestion].showAnswer
    };
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onSubmit(answers);
    }
  };

  const question = questions[currentQuestion];
  const currentAnswer = answers[currentQuestion];
  const showAnswer = currentAnswer.showAnswer;

  const getInputClassName = (field) => {
    const baseClasses = "mt-1 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500";
    if (!showAnswer) {
      return `${baseClasses} border-gray-300`;
    }
    return currentAnswer[field] === question[field]
      ? `${baseClasses} border-green-500 bg-green-50`
      : `${baseClasses} border-red-500 bg-red-50`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold">
          問題 {currentQuestion + 1} / {questions.length}
        </h2>
        <p className="mt-2">IPアドレス: {question.ip}/{question.cidr}</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            ネットワークアドレス
          </label>
          <input
            type="text"
            value={currentAnswer.networkAddress}
            onChange={(e) => handleAnswerChange('networkAddress', e.target.value)}
            className={getInputClassName('networkAddress')}
            placeholder="例: 192.168.1.0"
            inputMode="decimal"
          />
          {showAnswer && (
            <p className={`text-sm mt-1 ${currentAnswer.networkAddress === question.networkAddress ? 'text-green-600' : 'text-red-600'}`}>
              {currentAnswer.networkAddress === question.networkAddress ? '正解' : `不正解 (正解: ${question.networkAddress})`}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            ブロードキャストアドレス
          </label>
          <input
            type="text"
            value={currentAnswer.broadcastAddress}
            onChange={(e) => handleAnswerChange('broadcastAddress', e.target.value)}
            className={getInputClassName('broadcastAddress')}
            placeholder="例: 192.168.1.255"
            inputMode="decimal"
          />
          {showAnswer && (
            <p className={`text-sm mt-1 ${currentAnswer.broadcastAddress === question.broadcastAddress ? 'text-green-600' : 'text-red-600'}`}>
              {currentAnswer.broadcastAddress === question.broadcastAddress ? '正解' : `不正解 (正解: ${question.broadcastAddress})`}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            サブネットマスク
          </label>
          <input
            type="text"
            value={currentAnswer.subnetMask}
            onChange={(e) => handleAnswerChange('subnetMask', e.target.value)}
            className={getInputClassName('subnetMask')}
            placeholder="例: 255.255.255.0"
            inputMode="decimal"
          />
          {showAnswer && (
            <p className={`text-sm mt-1 ${currentAnswer.subnetMask === question.subnetMask ? 'text-green-600' : 'text-red-600'}`}>
              {currentAnswer.subnetMask === question.subnetMask ? '正解' : `不正解 (正解: ${question.subnetMask})`}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <button
          type="button"
          onClick={toggleShowAnswer}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          {showAnswer ? '解答を隠す' : '解答を表示'}
        </button>

        <button
          type="button"
          onClick={handleNext}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {currentQuestion < questions.length - 1 ? '次の問題' : '結果を見る'}
        </button>
      </div>
    </div>
  );
}

export default Quiz;