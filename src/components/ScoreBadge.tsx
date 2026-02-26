interface ScoreBadgeProps {
  title: string;
  score: number;
  icon?: React.ReactNode;
}

const ScoreBadge = ({ score, icon }: ScoreBadgeProps) => {
  const getScoreColor = (score: number) => {
    if (score > 70) return "bg-green-50 text-green-700 border-green-200";
    if (score > 49) return "bg-yellow-50 text-yellow-700 border-yellow-200";
    return "bg-red-50 text-red-700 border-red-200";
  };

  const getScoreBgColor = (score: number) => {
    if (score > 70) return "bg-green-500";
    if (score > 49) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 85) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 50) return "Fair";
    return "Needs Work";
  };

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${getScoreColor(score)}`}
    >
      {icon && <div className="flex-shrink-0">{icon}</div>}
      <div className="flex-shrink-0 flex flex-col items-center gap-1">
        <span
          className={`w-10 h-10 rounded-full ${getScoreBgColor(score)} text-white flex items-center justify-center font-bold text-sm`}
        >
          {score}
        </span>
        <span className="text-xs font-semibold">{getScoreLabel(score)}</span>
      </div>
    </div>
  );
};

export default ScoreBadge;

