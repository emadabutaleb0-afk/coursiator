import { useState } from 'react';
// import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle, AlertCircle, TrendingUp, BookOpen, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Placement Test Results Page
 * Professional results display with skill breakdown and personalized recommendations
 */

interface SkillScore {
  name: string;
  score: number;
  maxScore: number;
}

interface TestResult {
  overallScore: number;
  proficiencyLevel: string;
  levelBadge: string;
  skills: SkillScore[];
  strengths: string[];
  improvements: string[];
  recommendedCourses: string[];
}

export default function PlacementTestResults() {
  // const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'analysis' | 'roadmap' | 'courses'>('analysis');

  // Mock test results
  const testResult: TestResult = {
    overallScore: 87,
    proficiencyLevel: 'Upper Intermediate',
    levelBadge: 'B2',
    skills: [
      { name: 'Grammar', score: 53, maxScore: 100 },
      { name: 'Reading', score: 44, maxScore: 100 },
      { name: 'Writing', score: 47, maxScore: 100 },
      { name: 'Vocabulary', score: 55, maxScore: 100 },
      { name: 'Listening', score: 65, maxScore: 100 },
      { name: 'Speaking', score: 72, maxScore: 100 },
    ],
    strengths: [
      'Understanding of complex grammatical structures (e.g., third conditional)',
      'Identifying correct transition words',
      'Comprehending explicit information in reading passages',
      'Grasping definitions of high-level vocabulary when familiar',
    ],
    improvements: [
      'Punctuation rules (especially commas and apostrophes)',
      'Understanding the nuances of lower-difficulty vocabulary/antonyms',
      'Vocabulary acquisition beyond obvious definitions',
      'Applying grammatical rules consistently in practical writing scenarios',
      'Pronunciation accuracy and fluency in spontaneous speech',
    ],
    recommendedCourses: [
      'Advanced Grammar Mastery',
      'IELTS Writing Intensive',
      'Business English Communication',
      'Pronunciation & Fluency',
    ],
  };

  const getSkillColor = (score: number) => {
    if (score >= 70) return 'from-green-500 to-emerald-500';
    if (score >= 50) return 'from-blue-500 to-cyan-500';
    return 'from-orange-500 to-yellow-500';
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 50) return 'text-blue-600';
    return 'text-orange-600';
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />

      <section className="flex-1 py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="mb-6 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full blur-2xl opacity-30"></div>
                <div className="relative bg-white rounded-full p-8 w-32 h-32 flex items-center justify-center">
                  <CheckCircle className="w-16 h-16 text-green-500" />
                </div>
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-2">Your Results Are Ready!</h1>
            <p className="text-foreground/70 text-lg">Here's your personalized English proficiency analysis</p>
          </div>

          {/* Overall Score and Level */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Overall Score Card */}
            <div className="glass-card border border-white/10 rounded-2xl p-8">
              <div className="text-center">
                <div className="mb-6">
                  <div className="text-6xl font-bold gradient-text">{testResult.overallScore}%</div>
                  <p className="text-foreground/70 mt-2 text-lg">Overall Score</p>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-purple-600"
                    style={{ width: `${testResult.overallScore}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Proficiency Level Card */}
            <div className="glass-card border border-white/10 rounded-2xl p-8">
              <div className="flex items-center justify-between h-full">
                <div>
                  <p className="text-foreground/70 mb-2">Proficiency Level</p>
                  <h2 className="text-3xl font-bold mb-4">{testResult.proficiencyLevel}</h2>
                  <div className="flex gap-2">
                    <span className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white rounded-full font-bold text-lg">
                      {testResult.levelBadge}
                    </span>
                    <span className="px-4 py-2 bg-white/10 text-foreground rounded-full text-sm flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      CEFR Level
                    </span>
                  </div>
                </div>
                <div className="text-5xl opacity-20">🎓</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-white/10 overflow-x-auto">
            {[
              { id: 'analysis', label: 'AI Analysis', icon: '📊' },
              { id: 'roadmap', label: 'Study Roadmap', icon: '🗺️' },
              { id: 'courses', label: 'Courses', icon: '📚' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'analysis' | 'roadmap' | 'courses')}
                className={`px-6 py-3 font-semibold transition-smooth whitespace-nowrap flex items-center gap-2 ${activeTab === tab.id
                  ? 'text-accent border-b-2 border-accent'
                  : 'text-foreground/60 hover:text-foreground'
                  }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* AI Analysis Tab */}
          {activeTab === 'analysis' && (
            <div className="space-y-8">
              {/* Skill Breakdown */}
              <div className="glass-card border border-white/10 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    ⚙️
                  </div>
                  <h2 className="text-2xl font-bold">Skill Breakdown</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {testResult.skills.map((skill, idx) => (
                    <div key={idx}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">{skill.name}</span>
                        <span className={`font-bold text-lg ${getScoreColor(skill.score)}`}>
                          {skill.score}%
                        </span>
                      </div>
                      <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${getSkillColor(skill.score)}`}
                          style={{ width: `${skill.score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strengths and Improvements */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Strengths */}
                <div className="glass-card border border-white/10 rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <TrendingUp className="w-6 h-6 text-green-500" />
                    <h3 className="text-xl font-bold">Your Strengths</h3>
                  </div>
                  <ul className="space-y-4">
                    {testResult.strengths.map((strength, idx) => (
                      <li key={idx} className="flex gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-foreground/80">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Areas to Improve */}
                <div className="glass-card border border-white/10 rounded-2xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <AlertCircle className="w-6 h-6 text-orange-500" />
                    <h3 className="text-xl font-bold">Areas to Improve</h3>
                  </div>
                  <ul className="space-y-4">
                    {testResult.improvements.map((improvement, idx) => (
                      <li key={idx} className="flex gap-3">
                        <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-orange-600 text-xs font-bold">!</span>
                        </div>
                        <span className="text-foreground/80">{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Study Roadmap Tab */}
          {activeTab === 'roadmap' && (
            <div className="glass-card border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-8">Your Personalized Study Roadmap</h2>
              <div className="space-y-6">
                {[
                  { phase: 'Phase 1', title: 'Foundation Building', duration: '4 weeks', focus: 'Grammar fundamentals and vocabulary expansion' },
                  { phase: 'Phase 2', title: 'Skill Development', duration: '6 weeks', focus: 'Writing accuracy and reading comprehension' },
                  { phase: 'Phase 3', title: 'Advanced Practice', duration: '4 weeks', focus: 'Speaking fluency and listening skills' },
                  { phase: 'Phase 4', title: 'Exam Preparation', duration: '2 weeks', focus: 'Full practice tests and time management' },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6 pb-6 border-b border-white/10 last:border-0">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center text-white font-bold">
                        {idx + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                      <p className="text-foreground/70 mb-2">{item.phase} • {item.duration}</p>
                      <p className="text-foreground/80">{item.focus}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <div className="glass-card border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-8">Recommended Courses for You</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testResult.recommendedCourses.map((course, idx) => (
                  <div key={idx} className="border border-white/10 rounded-xl p-6 hover:bg-white/5 transition-smooth">
                    <div className="flex items-start justify-between mb-4">
                      <BookOpen className="w-8 h-8 text-accent" />
                      <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-semibold">
                        Recommended
                      </span>
                    </div>
                    <h3 className="text-lg font-bold mb-2">{course}</h3>
                    <p className="text-foreground/70 text-sm mb-4">
                      Tailored to your skill level and learning goals
                    </p>
                    <Button className="w-full gradient-button">Enroll Now</Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="mt-12 glass-card border border-white/10 rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Start Your Learning Journey?</h2>
            <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
              Based on your assessment, we've created a personalized learning plan. Start with our recommended courses and get 1-on-1 guidance from our AI tutor.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="gradient-button px-8">Start Learning</Button>
              <Button variant="outline" className="px-8">Download Report</Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
