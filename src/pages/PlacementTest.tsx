import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';
import { ChevronRight, CheckCircle } from 'lucide-react';

/**
 * Design Philosophy: Modern Gradient Tech
 * - Interactive quiz with glassmorphic cards
 * - Progress tracking with gradient indicators
 * - Real-time feedback and score calculation
 */

interface Question {
  id: number;
  text: string;
  textAr: string;
  type: 'multiple-choice' | 'listening' | 'speaking';
  options: { id: string; text: string; textAr: string }[];
  correctAnswer: string;
  category: 'grammar' | 'vocabulary' | 'listening' | 'speaking' | 'reading';
}

const placementQuestions: Question[] = [
  {
    id: 1,
    text: 'She _____ to the gym three times a week.',
    textAr: 'تذهب _____ إلى صالة الألعاب ثلاث مرات في الأسبوع.',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'going', textAr: 'ذاهبة' },
      { id: 'b', text: 'goes', textAr: 'تذهب' },
      { id: 'c', text: 'go', textAr: 'اذهبي' },
      { id: 'd', text: 'went', textAr: 'ذهبت' },
    ],
    correctAnswer: 'b',
    category: 'grammar',
  },
  {
    id: 2,
    text: 'What does "serendipity" mean?',
    textAr: 'ما معنى "الصدفة السعيدة"؟',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'Finding something good by chance', textAr: 'إيجاد شيء جيد بالصدفة' },
      { id: 'b', text: 'A feeling of sadness', textAr: 'شعور بالحزن' },
      { id: 'c', text: 'A type of food', textAr: 'نوع من الطعام' },
      { id: 'd', text: 'A musical instrument', textAr: 'آلة موسيقية' },
    ],
    correctAnswer: 'a',
    category: 'vocabulary',
  },
  {
    id: 3,
    text: 'If I had known about the party, I _____ come.',
    textAr: 'لو كنت أعرف عن الحفلة، كنت سأ_____.',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'would have', textAr: 'كنت سأ' },
      { id: 'b', text: 'will', textAr: 'سوف' },
      { id: 'c', text: 'would', textAr: 'كنت سأ' },
      { id: 'd', text: 'had', textAr: 'كان' },
    ],
    correctAnswer: 'a',
    category: 'grammar',
  },
  {
    id: 4,
    text: 'Choose the correct sentence:',
    textAr: 'اختر الجملة الصحيحة:',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'She has been working here for five years', textAr: 'تعمل هنا منذ خمس سنوات' },
      { id: 'b', text: 'She is working here for five years', textAr: 'تعمل هنا لمدة خمس سنوات' },
      { id: 'c', text: 'She works here since five years', textAr: 'تعمل هنا منذ خمس سنوات' },
      { id: 'd', text: 'She working here for five years', textAr: 'تعمل هنا لمدة خمس سنوات' },
    ],
    correctAnswer: 'a',
    category: 'grammar',
  },
  {
    id: 5,
    text: 'What is a "mentor"?',
    textAr: 'ما هو "المرشد"؟',
    type: 'multiple-choice',
    options: [
      { id: 'a', text: 'An experienced person who guides others', textAr: 'شخص ذو خبرة يوجه الآخرين' },
      { id: 'b', text: 'A type of disease', textAr: 'نوع من الأمراض' },
      { id: 'c', text: 'A mathematical formula', textAr: 'صيغة رياضية' },
      { id: 'd', text: 'A kitchen tool', textAr: 'أداة مطبخ' },
    ],
    correctAnswer: 'a',
    category: 'vocabulary',
  },
];

export default function PlacementTest() {
  const { language } = useLanguage();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [testStarted, setTestStarted] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < placementQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    let correctCount = 0;
    placementQuestions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });
    const percentage = Math.round((correctCount / placementQuestions.length) * 100);
    setScore(percentage);
    setTestCompleted(true);
  };

  const getLevelFromScore = (score: number) => {
    if (score >= 90) return { level: 'Advanced', color: 'from-green-500 to-emerald-600' };
    if (score >= 75) return { level: 'Upper Intermediate', color: 'from-blue-500 to-cyan-600' };
    if (score >= 60) return { level: 'Intermediate', color: 'from-purple-500 to-pink-600' };
    if (score >= 45) return { level: 'Pre-Intermediate', color: 'from-orange-500 to-red-600' };
    return { level: 'Beginner', color: 'from-yellow-500 to-orange-600' };
  };

  const levelInfo = getLevelFromScore(score);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />

      {!testStarted ? (
        <>
          {/* Welcome Section */}
          <section className="py-20 md:py-32 flex-1">
            <div className="container mx-auto px-4 max-w-2xl">
              <div className="glass-card p-12 text-center">
                <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
                  AI Placement Test
                </h1>
                <p className="text-xl text-foreground/70 mb-8">
                  Discover your English level and get a personalized learning roadmap powered by AI.
                </p>

                <div className="space-y-6 mb-12 text-left">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-accent font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Quick Assessment</h3>
                      <p className="text-foreground/70">5 questions covering grammar, vocabulary, and comprehension.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-accent font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Instant Results</h3>
                      <p className="text-foreground/70">Get your level (Beginner to Advanced) immediately.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-accent font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Personalized Roadmap</h3>
                      <p className="text-foreground/70">Receive a custom learning plan tailored to your level.</p>
                    </div>
                  </div>
                </div>

                <Button
                  className="gradient-button text-lg px-8 py-6 w-full"
                  onClick={() => setTestStarted(true)}
                >
                  Start Test Now
                </Button>
              </div>
            </div>
          </section>
        </>
      ) : !testCompleted ? (
        <>
          {/* Test Section */}
          <section className="py-12 md:py-20 flex-1">
            <div className="container mx-auto px-4 max-w-3xl">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-semibold">
                    Question {currentQuestion + 1} of {placementQuestions.length}
                  </span>
                  <span className="text-sm text-foreground/60">
                    {Math.round(((currentQuestion + 1) / placementQuestions.length) * 100)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-white/40 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 transition-all duration-500"
                    style={{
                      width: `${((currentQuestion + 1) / placementQuestions.length) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Question Card */}
              <div className="glass-card p-8 mb-8">
                <h2 className="text-2xl font-bold mb-8">
                  {language === 'en'
                    ? placementQuestions[currentQuestion].text
                    : placementQuestions[currentQuestion].textAr}
                </h2>

                {/* Options */}
                <div className="space-y-4">
                  {placementQuestions[currentQuestion].options.map((option) => (
                    <label
                      key={option.id}
                      className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-smooth ${answers[placementQuestions[currentQuestion].id] === option.id
                          ? 'border-accent bg-accent/10'
                          : 'border-white/20 hover:border-accent/50'
                        }`}
                    >
                      <input
                        type="radio"
                        name={`question-${placementQuestions[currentQuestion].id}`}
                        value={option.id}
                        checked={answers[placementQuestions[currentQuestion].id] === option.id}
                        onChange={() =>
                          handleAnswer(placementQuestions[currentQuestion].id, option.id)
                        }
                        className="w-5 h-5 accent-accent cursor-pointer"
                      />
                      <span className="ml-4 font-medium">
                        {language === 'en' ? option.text : option.textAr}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between gap-4">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="px-6"
                >
                  Previous
                </Button>

                {currentQuestion === placementQuestions.length - 1 ? (
                  <Button
                    className="gradient-button px-8"
                    onClick={handleSubmit}
                    disabled={Object.keys(answers).length < placementQuestions.length}
                  >
                    Submit Test
                  </Button>
                ) : (
                  <Button
                    className="gradient-button px-8"
                    onClick={handleNext}
                    disabled={!answers[placementQuestions[currentQuestion].id]}
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          {/* Results Section */}
          <section className="py-20 md:py-32 flex-1">
            <div className="container mx-auto px-4 max-w-2xl">
              <div className="glass-card p-12 text-center">
                <div className="mb-8">
                  <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">Test Complete!</h1>
                  <p className="text-xl text-foreground/70 mb-8">
                    Here's your personalized assessment
                  </p>
                </div>

                {/* Score Display */}
                <div className="mb-12">
                  <div className={`inline-block bg-gradient-to-r ${levelInfo.color} rounded-full p-1 mb-6`}>
                    <div className="bg-white rounded-full px-8 py-4">
                      <p className="text-5xl font-bold gradient-text">{score}%</p>
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold mb-2">{levelInfo.level}</h2>
                  <p className="text-foreground/70 text-lg">
                    Great job! You're ready for our {levelInfo.level} courses.
                  </p>
                </div>

                {/* Recommendations */}
                <div className="text-left mb-12 space-y-4">
                  <h3 className="text-xl font-bold mb-4">Recommended Courses</h3>
                  <div className="glass-card p-4 border-l-4 border-accent">
                    <p className="font-semibold mb-2">IELTS Mastery</p>
                    <p className="text-sm text-foreground/70">
                      Perfect for your level. Live classes + AI tutor practice.
                    </p>
                  </div>
                  <div className="glass-card p-4 border-l-4 border-accent">
                    <p className="font-semibold mb-2">Business English Pro</p>
                    <p className="text-sm text-foreground/70">
                      Advance your professional communication skills.
                    </p>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setTestStarted(false);
                      setTestCompleted(false);
                      setCurrentQuestion(0);
                      setAnswers({});
                    }}
                  >
                    Retake Test
                  </Button>
                  <Button className="gradient-button flex-1">
                    Explore Courses
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      <Footer />
    </div>
  );
}
