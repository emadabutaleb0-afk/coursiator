// import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProtectedVideoPlayer from '@/components/ProtectedVideoPlayer';
import { useState } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

/**
 * Design Philosophy: Modern Gradient Tech
 * - Video player with assessment questions
 * - Progress tracking through assessment
 * - Instant feedback on answers
 */

interface Question {
  id: number;
  text: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer';
  options?: { id: string; text: string }[];
  correctAnswer: string;
  explanation: string;
}

const videoData = {
  id: '1',
  title: 'IELTS Speaking Part 1 - Introduction',
  course: 'IELTS Mastery',
  instructor: 'Dr. Sarah Mitchell',
  duration: '45:32',
  videoUrl: 'https://example.com/video.mp4',
};

const assessmentQuestions: Question[] = [
  {
    id: 1,
    text: 'What are the three main parts of IELTS Speaking?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'Introduction, Discussion, Conclusion' },
      { id: 'b', text: 'Part 1: Interview, Part 2: Long Turn, Part 3: Discussion' },
      { id: 'c', text: 'Listening, Reading, Writing' },
      { id: 'd', text: 'Grammar, Vocabulary, Pronunciation' },
    ],
    correctAnswer: 'b',
    explanation: 'IELTS Speaking has three parts: Part 1 (4-5 min interview), Part 2 (1-2 min long turn), Part 3 (4-5 min discussion).',
  },
  {
    id: 2,
    text: 'Part 1 of IELTS Speaking typically lasts how long?',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: '2-3 minutes' },
      { id: 'b', text: '4-5 minutes' },
      { id: 'c', text: '8-10 minutes' },
      { id: 'd', text: '10-15 minutes' },
    ],
    correctAnswer: 'b',
    explanation: 'Part 1 is an interview lasting 4-5 minutes where the examiner asks general questions about familiar topics.',
  },
  {
    id: 3,
    text: 'In Part 2, you are given a topic card and have 1 minute to prepare before speaking for 1-2 minutes.',
    type: 'true-false',
    options: [
      { id: 'true', text: 'True' },
      { id: 'false', text: 'False' },
    ],
    correctAnswer: 'true',
    explanation: 'Correct! Part 2 gives you a topic card with 1 minute preparation time, then you speak for 1-2 minutes.',
  },
  {
    id: 4,
    text: 'Briefly describe your strategy for a difficult question in Part 3.',
    type: 'short-answer',
    correctAnswer: 'keywords:pause,think,rephrase', // Mock verification
    explanation: 'A good strategy involves pausing to think, rephrasing the question if necessary, and structuring your answer.',
  }
];

export default function VideoAssessment() {
  // const { t } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    assessmentQuestions.forEach((q) => {
      if (q.type === 'short-answer') {
        // Simple mock grading: check if answer length > 10 chars
        if (answers[q.id] && answers[q.id].length > 10) {
          correctCount++;
        }
      } else {
        if (answers[q.id] === q.correctAnswer) {
          correctCount++;
        }
      }
    });
    const percentage = Math.round((correctCount / assessmentQuestions.length) * 100);
    setScore(percentage);
    setSubmitted(true);
  };

  const question = assessmentQuestions[currentQuestion];
  const userAnswer = answers[question.id];
  // const isCorrect = userAnswer === question.correctAnswer;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />

      <section className="py-12 md:py-16 flex-1">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Video Section */}
          <div className="mb-8">
            <div className="mb-4">
              <h1 className="text-3xl font-bold gradient-text mb-2">{videoData.title}</h1>
              <p className="text-foreground/70">
                {videoData.course} • Instructor: {videoData.instructor}
              </p>
            </div>

            {/* Protected Video Player */}
            <ProtectedVideoPlayer
              videoUrl={videoData.videoUrl}
              title={videoData.title}
              enableWatermark={true}
              enableAntiRecord={true}
              studentEmail="student@example.com"
              studentIP="192.168.1.100"
            />
          </div>

          {/* Assessment Section */}
          <div className="glass-card p-8">
            <h2 className="text-2xl font-bold mb-6">Video Assessment</h2>

            {!submitted ? (
              <>
                {/* Progress */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold">
                      Question {currentQuestion + 1} of {assessmentQuestions.length}
                    </span>
                    <span className="text-sm text-foreground/60">
                      {Math.round(((currentQuestion + 1) / assessmentQuestions.length) * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 transition-all duration-500"
                      style={{
                        width: `${((currentQuestion + 1) / assessmentQuestions.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Question */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-6">{question.text}</h3>

                  {/* Options */}
                  <div className="space-y-3">
                    {question.options?.map((option) => (
                      <label
                        key={option.id}
                        className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-smooth ${userAnswer === option.id
                          ? 'border-accent bg-accent/10'
                          : 'border-white/20 hover:border-accent/50'
                          }`}
                      >
                        <input
                          type="radio"
                          name={`question-${question.id}`}
                          value={option.id}
                          checked={userAnswer === option.id}
                          onChange={() => handleAnswer(question.id, option.id)}
                          className="w-5 h-5 accent-accent cursor-pointer"
                        />
                        <span className="ml-4 font-medium">{option.text}</span>
                      </label>
                    ))}

                    {question.type === 'short-answer' && (
                      <div className="p-4 rounded-lg border-2 border-white/20 hover:border-accent/50 transition-smooth">
                        <textarea
                          value={userAnswer || ''}
                          onChange={(e) => handleAnswer(question.id, e.target.value)}
                          placeholder="Type your answer here..."
                          className="w-full bg-transparent outline-none min-h-[100px] resize-none"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between gap-4">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                    disabled={currentQuestion === 0}
                  >
                    Previous
                  </Button>

                  {currentQuestion === assessmentQuestions.length - 1 ? (
                    <Button
                      className="gradient-button"
                      onClick={handleSubmit}
                      disabled={Object.keys(answers).length < assessmentQuestions.length}
                    >
                      Submit Assessment
                    </Button>
                  ) : (
                    <Button
                      className="gradient-button"
                      onClick={() => setCurrentQuestion(currentQuestion + 1)}
                      disabled={!userAnswer}
                    >
                      Next
                    </Button>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Results */}
                <div className="text-center mb-8">
                  <div className="inline-block mb-6">
                    {score >= 70 ? (
                      <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
                    ) : (
                      <AlertCircle className="w-20 h-20 text-yellow-500 mx-auto" />
                    )}
                  </div>
                  <h3 className="text-3xl font-bold gradient-text mb-2">{score}%</h3>
                  <p className="text-lg text-foreground/70 mb-6">
                    {score >= 70 ? 'Great job! You passed the assessment.' : 'You need to review the material.'}
                  </p>
                </div>

                {/* Answer Review */}
                <div className="space-y-6 mb-8">
                  {assessmentQuestions.map((q, idx) => {
                    const userAns = answers[q.id];
                    let correct = false;
                    if (q.type === 'short-answer') {
                      correct = userAns?.length > 10;
                    } else {
                      correct = userAns === q.correctAnswer;
                    }
                    return (
                      <div key={q.id} className="border-l-4 border-accent/50 pl-4 py-2">
                        <div className="flex items-start gap-2 mb-2">
                          {correct ? (
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                          )}
                          <div className="flex-1">
                            <p className="font-semibold mb-1">Question {idx + 1}: {q.text}</p>
                            <p className="text-sm text-foreground/70 mb-2">
                              {correct ? 'Correct!' : 'Incorrect'} - {q.explanation}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1">
                    Review Video
                  </Button>
                  <Button className="gradient-button flex-1">
                    Continue to Next Lesson
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
