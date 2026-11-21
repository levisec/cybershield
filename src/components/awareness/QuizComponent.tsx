import React, { useState } from 'react';
import { QuizQuestion } from '@/lib/types';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Award, Sparkles, HelpCircle } from 'lucide-react';

interface QuizComponentProps {
  questions: QuizQuestion[];
  onFinish?: (score: number) => void;
}

export const QuizComponent: React.FC<QuizComponentProps> = ({ questions, onFinish }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
      if (onFinish) {
        onFinish(score + (selectedOption === currentQ.correctIndex ? 1 : 0));
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  if (isCompleted) {
    const finalScore = score;
    const percentage = Math.round((finalScore / questions.length) * 100);

    return (
      <Card className="p-8 text-center bg-midnight-900 border-slate-800 space-y-6 max-w-xl mx-auto animate-in zoom-in-95 duration-200">
        <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center glow-emerald">
          <Award className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <h3 className="text-2xl font-bold text-white">Quiz Completed!</h3>
          <p className="text-xs text-slate-400">
            You scored {finalScore} out of {questions.length} ({percentage}%)
          </p>
        </div>

        <div className="p-4 rounded-xl bg-midnight-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
          {percentage >= 80 ? (
            <span className="text-emerald-300 font-medium flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-400" /> Excellent threat awareness! You clearly spot social engineering and phishing tactics.
            </span>
          ) : percentage >= 50 ? (
            <span className="text-amber-300 font-medium">
              Good effort! Review the detailed red flags in each module to sharpen your scam detection reflexes.
            </span>
          ) : (
            <span className="text-slate-300">
              Cybersecurity is a learned habit. Take time to read our short beginner guides before re-attempting.
            </span>
          )}
        </div>

        <div className="flex justify-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleRestart}
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Retake Quiz
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-midnight-900 border-slate-800 space-y-6">
      {/* Progress & Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
        <span className="text-slate-400 font-mono">
          Question {currentIndex + 1} of {questions.length}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-emerald-400 font-bold font-mono">
            Score: {score}
          </span>
          <div className="w-24 bg-midnight-950 rounded-full h-1.5 border border-slate-800 overflow-hidden">
            <div
              className="bg-emerald-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Scenario Box */}
      <div className="p-4 rounded-xl bg-midnight-950/80 border border-slate-800 space-y-2">
        <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 flex items-center gap-1">
          <HelpCircle className="w-3 h-3" /> Real-World Scenario
        </span>
        <p className="text-xs sm:text-sm font-mono text-slate-200 leading-relaxed">
          "{currentQ.scenario}"
        </p>
      </div>

      {/* Question */}
      <h4 className="text-sm sm:text-base font-semibold text-white leading-snug">
        {currentQ.question}
      </h4>

      {/* Options */}
      <div className="space-y-2.5">
        {currentQ.options.map((opt, i) => {
          let optionStyle = 'bg-midnight-950/70 border-slate-800 hover:border-slate-700 text-slate-300';
          if (isAnswered) {
            if (i === currentQ.correctIndex) {
              optionStyle = 'bg-emerald-950/40 border-emerald-500/60 text-emerald-200 glow-emerald';
            } else if (i === selectedOption) {
              optionStyle = 'bg-rose-950/40 border-rose-500/60 text-rose-200';
            } else {
              optionStyle = 'bg-midnight-950/40 border-slate-900 text-slate-500 opacity-50';
            }
          }

          return (
            <button
              key={i}
              type="button"
              disabled={isAnswered}
              onClick={() => handleSelectOption(i)}
              className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-start justify-between gap-3 ${optionStyle}`}
            >
              <span>{opt}</span>
              {isAnswered && i === currentQ.correctIndex && (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              )}
              {isAnswered && i === selectedOption && i !== currentQ.correctIndex && (
                <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation and Next Button */}
      {isAnswered && (
        <div className="space-y-4 pt-2 animate-in fade-in duration-200">
          <div className="p-4 rounded-xl bg-midnight-950 border border-slate-800 text-xs text-slate-300 space-y-1">
            <span className="font-semibold text-slate-200 block text-[11px] uppercase tracking-wider">
              {selectedOption === currentQ.correctIndex ? '✓ Correct Answer' : '✗ Security Explanation'}
            </span>
            <p className="leading-relaxed text-slate-300">{currentQ.explanation}</p>
          </div>

          <div className="flex justify-end">
            <Button
              variant="primary"
              size="sm"
              onClick={handleNext}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              className="text-xs font-semibold px-5"
            >
              {currentIndex + 1 < questions.length ? 'Next Question' : 'View Results'}
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};
