import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';
import { User, Lock, Globe, Bell, Download } from 'lucide-react';

/**
 * Design Philosophy: Modern Gradient Tech
 * - Student profile management
 * - Settings and preferences
 * - Account security
 * - Download certificates and reports
 */

export default function StudentProfile() {
  const { t, language, setLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState<'profile' | 'settings' | 'security'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Ahmed Hassan',
    email: 'ahmed@example.com',
    phone: '+966 50 123 4567',
    country: 'Saudi Arabia',
    proficiencyLevel: 'Upper Intermediate',
    learningGoal: 'IELTS Exam Preparation',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />

      {/* Welcome Section */}
      <section className="py-8 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border-b border-white/20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold gradient-text mb-2">{t('profile.title')}</h1>
          <p className="text-foreground/70">{t('profile.subtitle')}</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 flex-1">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-white/20">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-3 font-semibold transition-smooth border-b-2 ${activeTab === 'profile'
                ? 'border-accent text-accent'
                : 'border-transparent text-foreground/60 hover:text-foreground'
                }`}
            >
              <User className="w-4 h-4 inline mr-2" />
              {t('profile.tab.profile')}
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-6 py-3 font-semibold transition-smooth border-b-2 ${activeTab === 'settings'
                ? 'border-accent text-accent'
                : 'border-transparent text-foreground/60 hover:text-foreground'
                }`}
            >
              <Globe className="w-4 h-4 inline mr-2" />
              {t('profile.tab.settings')}
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`px-6 py-3 font-semibold transition-smooth border-b-2 ${activeTab === 'security'
                ? 'border-accent text-accent'
                : 'border-transparent text-foreground/60 hover:text-foreground'
                }`}
            >
              <Lock className="w-4 h-4 inline mr-2" />
              {t('profile.tab.security')}
            </button>
          </div>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-8">
              {/* Profile Picture */}
              <div className="glass-card p-8">
                <h2 className="text-2xl font-bold mb-6">{t('profile.pic.title')}</h2>
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center">
                    <User className="w-12 h-12 text-white" />
                  </div>
                  <div>
                    <Button className="gradient-button mb-2">{t('profile.pic.upload')}</Button>
                    <p className="text-sm text-foreground/60">{t('profile.pic.desc')}</p>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="glass-card p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">{t('profile.personal')}</h2>
                  <Button
                    variant={isEditing ? 'default' : 'outline'}
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? t('profile.save') : t('profile.edit')}
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="block text-sm font-semibold mb-2">{t('profile.name')}</Label>
                    <Input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full bg-white/10 border-white/20 text-foreground"
                    />
                  </div>

                  <div>
                    <Label className="block text-sm font-semibold mb-2">{t('profile.email')}</Label>
                    <Input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full bg-white/10 border-white/20 text-foreground"
                    />
                  </div>

                  <div>
                    <Label className="block text-sm font-semibold mb-2">{t('profile.phone')}</Label>
                    <Input
                      type="tel"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full bg-white/10 border-white/20 text-foreground"
                    />
                  </div>

                  <div>
                    <Label className="block text-sm font-semibold mb-2">{t('profile.country')}</Label>
                    <Input
                      type="text"
                      name="country"
                      value={profileData.country}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full bg-white/10 border-white/20 text-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">{t('profile.level')}</label>
                    <select
                      name="proficiencyLevel"
                      value={profileData.proficiencyLevel}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 rounded-lg border border-white/20 bg-white/10 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:opacity-60"
                    >
                      <option value="Beginner">{t('level.beginner')}</option>
                      <option value="Pre-Intermediate">{t('level.preInter')}</option>
                      <option value="Intermediate">{t('level.intermediate')}</option>
                      <option value="Upper Intermediate">{t('level.upperInter')}</option>
                      <option value="Advanced">{t('level.advanced')}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">{t('profile.goal')}</label>
                    <select
                      name="learningGoal"
                      value={profileData.learningGoal}
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 rounded-lg border border-white/20 bg-white/10 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:opacity-60"
                    >
                      <option value="IELTS Exam Preparation">{t('goal.ielts')}</option>
                      <option value="SAT Preparation">{t('goal.sat')}</option>
                      <option value="Business Communication">{t('goal.business')}</option>
                      <option value="General English">{t('goal.general')}</option>
                      <option value="Arabic Learning">{t('goal.arabic')}</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Certificates & Downloads */}
              <div className="glass-card p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Download className="w-5 h-5 text-accent" />
                  {t('profile.certs')}
                </h2>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-white/20 hover:bg-white/5 transition-smooth">
                    <div>
                      <p className="font-semibold">IELTS Mastery - Course Completion</p>
                      <p className="text-sm text-foreground/60">Completed on Jan 15, 2025</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border border-white/20 hover:bg-white/5 transition-smooth">
                    <div>
                      <p className="font-semibold">Progress Report - Q1 2025</p>
                      <p className="text-sm text-foreground/60">Generated on Jan 20, 2025</p>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="glass-card p-8">
              <h2 className="text-2xl font-bold mb-6">Preferences</h2>

              <div className="space-y-6">
                {/* Language Preference */}
                <div className="flex items-center justify-between p-4 rounded-lg border border-white/20">
                  <div>
                    <p className="font-semibold">{t('settings.language')}</p>
                    <p className="text-sm text-foreground/60">{t('settings.languageDesc')}</p>
                  </div>
                  <select
                    className="px-4 py-2 rounded-lg border border-white/20 bg-white/10 focus:outline-none focus:border-accent text-foreground"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as 'en' | 'ar')}
                  >
                    <option value="en">English</option>
                    <option value="ar">العربية</option>
                  </select>
                </div>

                {/* Notifications */}
                <div className="flex items-center justify-between p-4 rounded-lg border border-white/20">
                  <div>
                    <p className="font-semibold flex items-center gap-2">
                      <Bell className="w-4 h-4 text-accent" />
                      Email Notifications
                    </p>
                    <p className="text-sm text-foreground/60">Receive updates about new courses and assignments</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>

                {/* Learning Reminders */}
                <div className="flex items-center justify-between p-4 rounded-lg border border-white/20">
                  <div>
                    <p className="font-semibold">Learning Reminders</p>
                    <p className="text-sm text-foreground/60">Get daily reminders to continue your learning</p>
                  </div>
                  <input type="checkbox" defaultChecked className="w-5 h-5" />
                </div>

                {/* Marketing Communications */}
                <div className="flex items-center justify-between p-4 rounded-lg border border-white/20">
                  <div>
                    <p className="font-semibold">Marketing Communications</p>
                    <p className="text-sm text-foreground/60">Receive news about new features and promotions</p>
                  </div>
                  <input type="checkbox" className="w-5 h-5" />
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-8">
              {/* Change Password */}
              <div className="glass-card p-8">
                <h2 className="text-2xl font-bold mb-6">{t('profile.password')}</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">{t('profile.currentPass')}</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-2 rounded-lg border border-white/20 bg-white/10 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">{t('profile.newPass')}</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-2 rounded-lg border border-white/20 bg-white/10 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">{t('profile.confirmPass')}</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full px-4 py-2 rounded-lg border border-white/20 bg-white/10 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                    />
                  </div>

                  <Button className="gradient-button">{t('profile.updatePass')}</Button>
                </div>
              </div>

              {/* Active Sessions */}
              <div className="glass-card p-8">
                <h2 className="text-2xl font-bold mb-6">{t('profile.sessions')}</h2>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 rounded-lg border border-white/20">
                    <div>
                      <p className="font-semibold">Chrome on Windows</p>
                      <p className="text-sm text-foreground/60">Last active: Just now</p>
                    </div>
                    <span className="text-xs bg-green-500/20 text-green-600 px-3 py-1 rounded-full font-semibold">
                      Current
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-lg border border-white/20">
                    <div>
                      <p className="font-semibold">Safari on iPhone</p>
                      <p className="text-sm text-foreground/60">Last active: 2 hours ago</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Logout
                    </Button>
                  </div>
                </div>
              </div>

              {/* Account Deletion */}
              <div className="glass-card p-8 border-red-500/30">
                <h2 className="text-2xl font-bold mb-6 text-red-500">{t('profile.danger')}</h2>

                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                  <p className="font-semibold mb-2">{t('profile.delete')}</p>
                  <p className="text-sm text-foreground/70 mb-4">
                    {t('profile.deleteDesc')}
                  </p>
                  <Button className="bg-red-600 hover:bg-red-700">{t('profile.deleteBtn')}</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
