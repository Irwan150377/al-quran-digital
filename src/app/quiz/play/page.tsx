"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, CheckCircle, XCircle, Trophy, RotateCcw } from "lucide-react";
import Link from "next/link";
import { getMixedQuestions, QuizQuestion } from "@/lib/quiz-data";

export default function QuizPlayPage() {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

  useEffect(() => {
    setQuestions(getMixedQuestions(10));
  }, []);

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (answerIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore(score + 10);
    }
    setAnswers([...answers, isCorrect]);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setQuestions(getMixedQuestions(10));
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
    setAnswers([]);
  };

  if (questions.length === 0) {
    return (
      <main className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-[#1ABC9C] border-t-transparent rounded-full"></div>
      </main>
    );
  }

  if (isFinished) {
    const percentage = (score / (questions.length * 10)) * 100;
    return (
      <main className="min-h-screen bg-white dark:bg-gray-900 p-4">
        <div className="max-w-lg mx-auto pt-10">
          <div className="text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
              <Trophy size={48} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Kuis Selesai! 🎉
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Kamu telah menyelesaikan kuis Juz 30
            </p>

            {/* Score Card */}
            <div className="bg-gradient-to-r from-[#1ABC9C] to-[#16A085] rounded-2xl p-6 text-white mb-6">
              <p className="text-sm opacity-80 mb-1">Skor Akhir</p>
              <p className="text-5xl font-bold mb-2">{score}</p>
              <p className="text-sm opacity-80">dari {questions.length * 10} poin</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-green-100 dark:bg-green-900/30 rounded-xl p-4">
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {answers.filter(a => a).length}
                </p>
                <p className="text-xs text-green-600 dark:text-green-400">Benar</p>
              </div>
              <div className="bg-red-100 dark:bg-red-900/30 rounded-xl p-4">
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {answers.filter(a => !a).length}
                </p>
                <p className="text-xs text-red-600 dark:text-red-400">Salah</p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 rounded-xl p-4">
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {percentage.toFixed(0)}%
                </p>
                <p className="text-xs text-blue-600 dark:text-blue-400">Akurasi</p>
              </div>
            </div>

            {/* Message */}
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {percentage >= 80 ? "Luar biasa! Kamu sangat menguasai Juz 30! 🌟" :
               percentage >= 60 ? "Bagus! Terus tingkatkan hafalanmu! 💪" :
               percentage >= 40 ? "Lumayan! Ayo perbanyak muraja'ah! 📖" :
               "Jangan menyerah! Terus belajar dan berlatih! 🤲"}
            </p>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleRestart}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#1ABC9C] text-white rounded-xl font-medium hover:bg-[#16A085] transition-colors"
              >
                <RotateCcw size={20} />
                Main Lagi
              </button>
              <Link
                href="/quiz"
                className="flex-1 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-center"
              >
                Kembali
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto">
          <Link href="/quiz" className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <ArrowLeft size={24} className="text-gray-600 dark:text-gray-400" />
          </Link>
          <div className="text-center">
            <p className="text-sm text-gray-500">Pertanyaan {currentIndex + 1}/{questions.length}</p>
          </div>
          <div className="bg-[#1ABC9C]/10 px-3 py-1 rounded-full">
            <span className="text-[#1ABC9C] font-bold">{score}</span>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="h-1 bg-gray-200 dark:bg-gray-700">
          <div 
            className="h-full bg-[#1ABC9C] transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </header>

      {/* Question */}
      <div className="px-4 py-6 max-w-lg mx-auto">
        {/* Question Type Badge */}
        <div className="mb-4 flex gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            currentQuestion.type === 'verse-completion' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
            currentQuestion.type === 'surah-identification' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
            'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
          }`}>
            {currentQuestion.type === 'verse-completion' ? '📝 Melengkapi Ayat' :
             currentQuestion.type === 'surah-identification' ? '🔍 Identifikasi Surah' :
             '💡 Makna & Arti'}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
            currentQuestion.difficulty === 'medium' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
            'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
          }`}>
            {currentQuestion.difficulty === 'easy' ? '🌱 Mudah' :
             currentQuestion.difficulty === 'medium' ? '🌿 Sedang' :
             '🌳 Sulit'}
          </span>
        </div>

        {/* Question Text */}
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          {currentQuestion.question}
        </h2>

        {/* Arabic Text */}
        {currentQuestion.arabicText && (
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 mb-6">
            <p className="font-uthmani text-2xl text-gray-800 dark:text-gray-100 text-center leading-loose">
              {currentQuestion.arabicText}
            </p>
          </div>
        )}

        {/* Options */}
        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === currentQuestion.correctAnswer;
            
            let bgColor = "bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700";
            let borderColor = "border-transparent";
            let textColor = "text-gray-800 dark:text-white";
            
            if (isAnswered) {
              if (isCorrect) {
                bgColor = "bg-green-100 dark:bg-green-900/30";
                borderColor = "border-green-500";
                textColor = "text-green-700 dark:text-green-400";
              } else if (isSelected && !isCorrect) {
                bgColor = "bg-red-100 dark:bg-red-900/30";
                borderColor = "border-red-500";
                textColor = "text-red-700 dark:text-red-400";
              }
            } else if (isSelected) {
              bgColor = "bg-[#1ABC9C]/10";
              borderColor = "border-[#1ABC9C]";
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                disabled={isAnswered}
                className={`w-full p-4 rounded-xl border-2 ${bgColor} ${borderColor} ${textColor} text-left transition-all ${
                  isAnswered && isCorrect ? 'animate-correct' : ''
                } ${isAnswered && isSelected && !isCorrect ? 'animate-wrong' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium ${
                    isAnswered && isCorrect ? 'bg-green-500 text-white' :
                    isAnswered && isSelected && !isCorrect ? 'bg-red-500 text-white' :
                    isSelected ? 'bg-[#1ABC9C] text-white' :
                    'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}>
                    {isAnswered && isCorrect ? <CheckCircle size={18} /> :
                     isAnswered && isSelected && !isCorrect ? <XCircle size={18} /> :
                     String.fromCharCode(65 + index)}
                  </span>
                  <span className={currentQuestion.type === 'verse-completion' && index < 4 ? 'font-uthmani text-xl' : ''}>
                    {option}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation (shown after answer) */}
        {isAnswered && (
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 mb-6">
            <p className="text-sm text-blue-800 dark:text-blue-300">
              <strong>Penjelasan:</strong> {currentQuestion.explanation}
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
              📖 {currentQuestion.surah} {currentQuestion.ayah ? `ayat ${currentQuestion.ayah}` : ''}
            </p>
          </div>
        )}

        {/* Next Button */}
        {isAnswered && (
          <button
            onClick={handleNext}
            className="w-full py-4 bg-[#1ABC9C] text-white rounded-xl font-semibold hover:bg-[#16A085] transition-colors"
          >
            {currentIndex < questions.length - 1 ? 'Pertanyaan Berikutnya →' : 'Lihat Hasil 🎉'}
          </button>
        )}
      </div>
    </main>
  );
}
