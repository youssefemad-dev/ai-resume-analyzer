import ScoreBadge from "./ScoreBadge";

interface ATSProps {
  score: number;
  suggestions: {
    type: "good" | "improve";
    tip: string;
  }[];
}

export default function ATS({ score, suggestions }: ATSProps) {
  const goodTips = suggestions.filter((s) => s.type === "good");
  const improveTips = suggestions.filter((s) => s.type === "improve");

  return (
    <div className="bg-white rounded-2xl shadow-md w-full">
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-bold">ATS (Applicant Tracking System)</h2>
          <p className="text-sm text-gray-500">
            ATS compatibility measures how well your resume is formatted for automated scanning systems used by recruiters.
          </p>
        </div>

        <ScoreBadge title="ATS Score" score={score} />

        {/* Good Tips */}
        {goodTips.length > 0 && (
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold text-green-700">✓ What's Working</h3>
            <div className="space-y-2">
              {goodTips.map((tip, idx) => (
                <div key={idx} className="flex gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                  <span className="text-green-600 font-bold flex-shrink-0">✓</span>
                  <p className="text-sm text-gray-700">{tip.tip}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Improve Tips */}
        {improveTips.length > 0 && (
          <div className="flex flex-col gap-3">
            <h3 className="text-lg font-semibold text-yellow-700">⚠ Areas to Improve</h3>
            <div className="space-y-2">
              {improveTips.map((tip, idx) => (
                <div key={idx} className="flex gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <span className="text-yellow-600 font-bold flex-shrink-0">!</span>
                  <p className="text-sm text-gray-700">{tip.tip}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}