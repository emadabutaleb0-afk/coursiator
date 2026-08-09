// import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingUp, Award, Target, Zap, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import {
  MockAnalyticsService,
  ProgressData,
  SkillData,
  Recommendation,
  Achievement
} from '@/services/mockAnalyticsService';

/**
 * Design Philosophy: Modern Gradient Tech
 * - Comprehensive progress analytics
 * - Skill assessment visualization
 * - Personalized learning recommendations
 * - Achievement tracking
 */

// Hardcoded data removed in favor of MockAnalyticsService

export default function StudentProgress() {
  // const { t } = useLanguage();
  const [progressData, setProgressData] = useState<ProgressData[]>([]);
  const [skillsData, setSkillsData] = useState<SkillData[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [progress, skills, recs, achs] = await Promise.all([
          MockAnalyticsService.getStudentProgress(),
          MockAnalyticsService.getStudentSkills(),
          MockAnalyticsService.getRecommendations(),
          MockAnalyticsService.getAchievements()
        ]);

        setProgressData(progress);
        setSkillsData(skills);
        setRecommendations(recs);
        setAchievements(achs);
      } catch (error) {
        console.error("Failed to load analytics data", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />

      {/* Welcome Section */}
      <section className="py-8 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border-b border-white/20">
        <div className="container mx-auto px-4">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">My Progress</h1>
            <p className="text-foreground/70">Track your learning journey and achievements</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 flex-1">
        <div className="container mx-auto px-4">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-foreground/60">Current Level</h3>
                <Award className="w-5 h-5 text-accent" />
              </div>
              <p className="text-3xl font-bold gradient-text">Upper Int.</p>
              <p className="text-xs text-foreground/60 mt-2">Based on latest test</p>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-foreground/60">Study Streak</h3>
                <Zap className="w-5 h-5 text-accent" />
              </div>
              <p className="text-3xl font-bold gradient-text">12 Days</p>
              <p className="text-xs text-foreground/60 mt-2">Keep it up!</p>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-foreground/60">Avg. Score</h3>
                <TrendingUp className="w-5 h-5 text-accent" />
              </div>
              <p className="text-3xl font-bold gradient-text">82%</p>
              <p className="text-xs text-foreground/60 mt-2">Assessment average</p>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-foreground/60">Learning Time</h3>
                <Clock className="w-5 h-5 text-accent" />
              </div>
              <p className="text-3xl font-bold gradient-text">42.5h</p>
              <p className="text-xs text-foreground/60 mt-2">Total hours</p>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Progress Chart */}
            <div className="glass-card p-8">
              <h2 className="text-xl font-bold mb-6">Your Progress Over Time</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={progressData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="week" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(15, 23, 42, 0.8)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#0EA5E9"
                    strokeWidth={3}
                    dot={{ fill: '#0EA5E9', r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Skills Radar Chart */}
            <div className="glass-card p-8">
              <h2 className="text-xl font-bold mb-6">Skill Assessment</h2>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={skillsData}>
                  <PolarGrid stroke="rgba(255,255,255,0.2)" />
                  <PolarAngleAxis dataKey="skill" stroke="rgba(255,255,255,0.5)" />
                  <PolarRadiusAxis stroke="rgba(255,255,255,0.5)" />
                  <Radar
                    name="Skill Level"
                    dataKey="value"
                    stroke="#0EA5E9"
                    fill="#0EA5E9"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recommendations */}
          <div className="glass-card p-8 mb-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Target className="w-5 h-5 text-accent" />
              Personalized Recommendations
            </h2>

            <div className="space-y-4">
              {recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className={`p-6 rounded-lg border-l-4 ${rec.priority === 'high'
                    ? 'border-red-500 bg-red-500/5'
                    : 'border-yellow-500 bg-yellow-500/5'
                    }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold">{rec.title}</h3>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${rec.priority === 'high'
                        ? 'bg-red-500/20 text-red-600'
                        : 'bg-yellow-500/20 text-yellow-600'
                        }`}
                    >
                      {rec.priority.charAt(0).toUpperCase() + rec.priority.slice(1)}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/70 mb-4">{rec.description}</p>
                  <Button className="gradient-button text-sm">{rec.action}</Button>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="glass-card p-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-accent" />
              Achievements
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-6 rounded-lg border-2 text-center transition-smooth ${achievement.unlocked
                    ? 'border-accent/50 bg-accent/5'
                    : 'border-white/20 bg-white/5 opacity-60'
                    }`}
                >
                  <div
                    className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl ${achievement.unlocked
                      ? 'bg-gradient-to-br from-cyan-400 to-purple-600'
                      : 'bg-white/20'
                      }`}
                  >
                    {achievement.unlocked ? '🏆' : '🔒'}
                  </div>
                  <h3 className="font-bold mb-1">{achievement.title}</h3>
                  <p className="text-xs text-foreground/70 mb-3">{achievement.description}</p>
                  {achievement.unlocked && achievement.date && (
                    <p className="text-xs text-accent font-semibold">Unlocked {achievement.date}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
