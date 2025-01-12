function Results({ questions, answers, onReset }) {
  const calculateScore = () => {
    let correct = 0;
    questions.forEach((question, index) => {
      const answer = answers[index];
      if (
        answer.networkAddress === question.networkAddress &&
        answer.broadcastAddress === question.broadcastAddress &&
        answer.subnetMask === question.subnetMask
      ) {
        correct++;
      }
    });
    return correct;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold">結果</h2>
        <p className="mt-2">
          正解数: {calculateScore()} / {questions.length}
        </p>
      </div>

      <div className="space-y-4">
        {questions.map((question, index) => (
          <div key={index} className="border rounded-md p-4">
            <h3 className="font-medium">問題 {index + 1}</h3>
            <p>IPアドレス: {question.ip}</p>
            
            <div className="mt-2">
              <h4 className="font-medium">あなたの回答:</h4>
              <p>ネットワークアドレス: {answers[index].networkAddress}</p>
              <p>ブロードキャストアドレス: {answers[index].broadcastAddress}</p>
              <p>サブネットマスク: {answers[index].subnetMask}</p>
            </div>

            <div className="mt-2">
              <h4 className="font-medium">正解:</h4>
              <p>ネットワークアドレス: {question.networkAddress}</p>
              <p>ブロードキャストアドレス: {question.broadcastAddress}</p>
              <p>サブネットマスク: {question.subnetMask}</p>
            </div>

            <div className="mt-2">
              <span className={`px-2 py-1 rounded-full text-sm ${
                answers[index].networkAddress === question.networkAddress &&
                answers[index].broadcastAddress === question.broadcastAddress &&
                answers[index].subnetMask === question.subnetMask
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {answers[index].networkAddress === question.networkAddress &&
                answers[index].broadcastAddress === question.broadcastAddress &&
                answers[index].subnetMask === question.subnetMask
                  ? '正解'
                  : '不正解'}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onReset}
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        もう一度挑戦する
      </button>
    </div>
  );
}

export default Results;