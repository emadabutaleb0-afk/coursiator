import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState, useRef } from 'react';


/**
 * Design Philosophy: Modern Gradient Tech
 * - Video management interface with security features
 * - Watermarking and anti-recording indicators
 * - Assessment management system
 */

import { MockAnalyticsService, Video } from '@/services/mockAnalyticsService';
import { Upload, Play, Edit2, Trash2, Eye, Users, DollarSign, TrendingUp, Shield, Lock, FilePlus, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';
import TeacherQA from '@/components/TeacherQA';
import TeacherAssessments from '@/components/TeacherAssessments';


// Hardcoded videos removed in favor of MockAnalyticsService


const financialData = {
  totalEarnings: 4850.50,
  monthlyEarnings: 1250.75,
  pendingPayout: 850.50,
  totalStudents: 30,
  activeVideos: 3,
  completionRate: 87,
};

export default function TeacherDashboard() {
  const { t } = useLanguage();
  const [videos, setVideos] = useState<Video[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<Video | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isBulkUpload, setIsBulkUpload] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'qa' | 'assessments'>('overview');
  const [assessmentInitData, setAssessmentInitData] = useState<{ title: string; course: string } | null>(null);

  useEffect(() => {
    loadVideos();
  }, []);

  const loadVideos = async () => {
    try {
      const data = await MockAnalyticsService.getVideos();
      setVideos(data);
    } catch (error) {
      console.error("Failed to load videos", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    course: 'IELTS Mastery',
    watermark: true,
    antiRecord: true,
  });

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setFormData({
      title: '',
      course: 'IELTS Mastery',
      watermark: true,
      antiRecord: true,
    });
    setSelectedFiles([]);
    setUploadProgress(0);
    setIsEditing(false);
    setCurrentVideo(null);
    setIsBulkUpload(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (isBulkUpload) {
        setSelectedFiles(Array.from(e.target.files));
      } else {
        const file = e.target.files[0];
        setSelectedFiles([file]);
        // Auto-fill title if empty
        if (!formData.title) {
          setFormData(prev => ({ ...prev, title: file.name.replace(/\.[^/.]+$/, "") }));
        }
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      if (isBulkUpload) {
        setSelectedFiles(Array.from(e.dataTransfer.files));
      } else {
        const file = e.dataTransfer.files[0];
        setSelectedFiles([file]);
        if (!formData.title) {
          setFormData(prev => ({ ...prev, title: file.name.replace(/\.[^/.]+$/, "") }));
        }
      }
    }
  };

  const handleOpenUpload = () => {
    resetForm();
    setShowUploadModal(true);
  };

  const handleEdit = (video: Video) => {
    setCurrentVideo(video);
    setFormData({
      title: video.title,
      course: video.course,
      watermark: video.watermark,
      antiRecord: video.antiRecord,
    });
    setIsEditing(true);
    setShowUploadModal(true);
  };

  const handleDeleteVideo = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      await MockAnalyticsService.deleteVideo(id);
      loadVideos();
    }
  };

  const handlePreview = (video: Video) => {
    setCurrentVideo(video);
    setShowPreviewModal(true);
  };

  const handleAddAssessment = (video: Video) => {
    setAssessmentInitData({
      title: `${video.title} - Assessment`,
      course: video.course
    });
    setActiveTab('assessments');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing && currentVideo) {
      await MockAnalyticsService.updateVideo({
        ...currentVideo,
        title: formData.title,
        course: formData.course,
        watermark: formData.watermark,
        antiRecord: formData.antiRecord,
      });
      loadVideos();
      setShowUploadModal(false);
      resetForm();
    } else {
      if (selectedFiles.length === 0) {
        alert("Please select video file(s)");
        return;
      }

      // Simulate Upload
      for (let i = 0; i <= 100; i += 20) {
        setUploadProgress(i);
        await new Promise(r => setTimeout(r, 100)); // Faster simulation
      }

      // Bulk handling or single
      for (const file of selectedFiles) {
        const newVideo: Video = {
          id: Date.now().toString() + Math.random().toString(),
          title: isBulkUpload ? file.name.replace(/\.[^/.]+$/, "") : formData.title, // Use filename for bulk
          course: formData.course,
          duration: '00:00',
          uploadDate: new Date().toISOString().split('T')[0],
          views: 0,
          students: 0,
          watermark: formData.watermark,
          antiRecord: formData.antiRecord,
          assessments: 0,
          thumbnail: '/images/hero-live-classes.jpg',
          url: URL.createObjectURL(file),
        };
        await MockAnalyticsService.addVideo(newVideo);
      }

      loadVideos();
      setShowUploadModal(false);
      resetForm();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />

      {/* Welcome Section */}
      <section className="py-8 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border-b border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold gradient-text mb-2">{t('teacher.dash.title')}</h1>
              <p className="text-foreground/70">{t('teacher.dash.subtitle')}</p>
            </div>
            <Button className="gradient-button" onClick={handleOpenUpload}>
              <Upload className="w-4 h-4 mr-2" />
              {t('teacher.upload')}
            </Button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16 flex-1">
        <div className="container mx-auto px-4">

          {/* Tab Navigation */}
          <div className="flex gap-6 mb-8 border-b border-white/10">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 border-b-2 transition-all font-semibold ${activeTab === 'overview' ? 'border-accent text-accent' : 'border-transparent text-foreground/60 hover:text-accent'
                }`}
            >
              {t('teacher.tab.overview')}
            </button>
            <button
              onClick={() => setActiveTab('qa')}
              className={`pb-3 border-b-2 transition-all font-semibold ${activeTab === 'qa' ? 'border-accent text-accent' : 'border-transparent text-foreground/60 hover:text-accent'
                }`}
            >
              {t('teacher.tab.qa')}
            </button>
            {/* 3. Add Assessments tab button */}
            <button
              onClick={() => setActiveTab('assessments')}
              className={`pb-3 border-b-2 transition-all font-semibold ${activeTab === 'assessments' ? 'border-accent text-accent' : 'border-transparent text-foreground/60 hover:text-accent'
                }`}
            >
              {t('teacher.tab.assessments')}
            </button>
          </div>

          {activeTab === 'overview' ? (
            <>
              {/* Financial & Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-foreground/60">{t('teacher.stat.earnings')}</h3>
                    <DollarSign className="w-5 h-5 text-accent" />
                  </div>
                  <p className="text-3xl font-bold gradient-text">${financialData.totalEarnings}</p>
                  <p className="text-xs text-foreground/60 mt-2">All time</p>
                </div>

                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-foreground/60">{t('teacher.stat.month')}</h3>
                    <TrendingUp className="w-5 h-5 text-accent" />
                  </div>
                  <p className="text-3xl font-bold gradient-text">${financialData.monthlyEarnings}</p>
                  <p className="text-xs text-foreground/60 mt-2">Current month</p>
                </div>

                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-foreground/60">{t('teacher.stat.payout')}</h3>
                    <DollarSign className="w-5 h-5 text-accent" />
                  </div>
                  <p className="text-3xl font-bold gradient-text">${financialData.pendingPayout}</p>
                  <p className="text-xs text-foreground/60 mt-2">Next payout</p>
                </div>

                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-foreground/60">{t('teacher.stat.students')}</h3>
                    <Users className="w-5 h-5 text-accent" />
                  </div>
                  <p className="text-3xl font-bold gradient-text">{financialData.totalStudents}</p>
                  <p className="text-xs text-foreground/60 mt-2">Enrolled</p>
                </div>

                <div className="glass-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-foreground/60">{t('teacher.stat.completion')}</h3>
                    <Eye className="w-5 h-5 text-accent" />
                  </div>
                  <p className="text-3xl font-bold gradient-text">{financialData.completionRate}%</p>
                  <p className="text-xs text-foreground/60 mt-2">Avg. completion</p>
                </div>
              </div>

              {/* Videos Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6">{t('teacher.videos.title')}</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos.map((video) => (
                    <div key={video.id} className="glass-card overflow-hidden hover:shadow-xl transition-smooth group">
                      {/* Thumbnail */}
                      <div className="relative overflow-hidden h-40 group-hover:cursor-pointer" onClick={() => handlePreview(video)}>
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-smooth duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                        <div className="absolute top-3 right-3 flex gap-2">
                          {video.watermark && (
                            <div className="bg-white/90 backdrop-blur-md rounded-lg px-2 py-1 flex items-center gap-1">
                              <Shield className="w-3 h-3 text-accent" />
                              <span className="text-xs font-semibold">Watermark</span>
                            </div>
                          )}
                          {video.antiRecord && (
                            <div className="bg-white/90 backdrop-blur-md rounded-lg px-2 py-1 flex items-center gap-1">
                              <Lock className="w-3 h-3 text-accent" />
                              <span className="text-xs font-semibold">Protected</span>
                            </div>
                          )}
                        </div>
                        {/* Play Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <Play className="w-6 h-6 text-white fill-current" />
                          </div>
                        </div>
                        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <h3 className="font-bold mb-1 line-clamp-2">{video.title}</h3>
                        <p className="text-xs text-foreground/60 mb-3">{video.course}</p>

                        {/* Stats */}
                        <div className="space-y-2 mb-4 text-xs text-foreground/70">
                          <div className="flex justify-between">
                            <span>Views: {video.views}</span>
                            <span>Students: {video.students}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Assessments: {video.assessments}</span>
                            <span>{video.uploadDate}</span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-2">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1" onClick={() => handlePreview(video)}>
                              <Play className="w-3 h-3 mr-1" />
                              Preview
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(video)}>
                              <Edit2 className="w-3 h-3 mr-1" />
                              Edit
                            </Button>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="secondary"
                              size="sm"
                              className="flex-1 text-xs"
                              onClick={() => handleAddAssessment(video)}
                            >
                              <FilePlus className="w-3 h-3 mr-1" />
                              Add Assessment
                            </Button>
                            <button
                              onClick={() => handleDeleteVideo(video.id)}
                              className="p-2 rounded-lg border border-white/20 hover:bg-red-500/10 hover:border-red-500/50 transition-smooth"
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upload/Edit Modal */}
              {showUploadModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                  <div className="glass-card p-8 max-w-md w-full animate-in fade-in zoom-in-95 duration-200">
                    <h2 className="text-2xl font-bold mb-6">{isEditing ? t('teacher.edit.title') : t('teacher.upload.title')}</h2>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                      {!isEditing && (
                        <div className="flex items-center justify-between mb-4 bg-white/5 p-3 rounded-lg">
                          <label className="text-sm font-semibold flex items-center gap-2">
                            <Users className="w-4 h-4 text-accent" />
                            Bulk Upload
                          </label>
                          <div className="relative inline-block w-10 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer">
                            <input
                              type="checkbox"
                              className="absolute w-5 h-5 ml-1 mt-0.5 rounded-full bg-white appearance-none cursor-pointer transition-transform duration-200 ease-in-out checked:translate-x-4"
                              checked={isBulkUpload}
                              onChange={(e) => setIsBulkUpload(e.target.checked)}
                            />
                            <div className={`block w-full h-full rounded-full transition-colors duration-200 ${isBulkUpload ? 'bg-accent' : 'bg-gray-600'}`}></div>
                          </div>
                        </div>
                      )}

                      {!isBulkUpload && (
                        <div>
                          <label className="block text-sm font-semibold mb-2">Video Title</label>
                          <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            placeholder="Enter video title"
                            className="w-full px-4 py-2 rounded-lg border border-white/20 bg-white/10 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                          />
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-semibold mb-2">Course</label>
                        <select
                          value={formData.course}
                          onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg border border-white/20 bg-white/10 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                        >
                          <option>IELTS Mastery</option>
                          <option>SAT Excellence</option>
                          <option>Business English Pro</option>
                          <option>Arabic Fluency</option>
                        </select>
                      </div>

                      {!isEditing && (
                        <div>
                          <label className="block text-sm font-semibold mb-2">Video File{isBulkUpload ? 's' : ''}</label>
                          <div
                            className={`border-2 border-dashed rounded-lg p-6 text-center transition-smooth cursor-pointer ${selectedFiles.length > 0 ? 'border-accent bg-accent/10' : 'border-white/30 hover:border-accent/50'}`}
                            onClick={() => fileInputRef.current?.click()}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                          >
                            <input
                              type="file"
                              ref={fileInputRef}
                              className="hidden"
                              accept="video/*"
                              multiple={isBulkUpload}
                              onChange={handleFileSelect}
                            />
                            <Upload className={`w-8 h-8 mx-auto mb-2 ${selectedFiles.length > 0 ? 'text-accent' : 'text-foreground/60'}`} />
                            {selectedFiles.length > 0 ? (
                              <div>
                                <p className="text-sm font-semibold text-accent">
                                  {isBulkUpload ? `${selectedFiles.length} file(s) selected` : selectedFiles[0].name}
                                </p>
                                {!isBulkUpload && <p className="text-xs text-foreground/60 mt-1">{(selectedFiles[0].size / (1024 * 1024)).toFixed(2)} MB</p>}
                              </div>
                            ) : (
                              <>
                                <p className="text-sm">Click to upload or drag and drop</p>
                                <p className="text-xs text-foreground/40 mt-1">MP4, WebM or Ogg (Max 2GB)</p>
                              </>
                            )}
                          </div>
                          {uploadProgress > 0 && (
                            <div className="mt-4">
                              <div className="flex justify-between text-xs mb-1">
                                <span>Uploading...</span>
                                <span>{uploadProgress}%</span>
                              </div>
                              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-accent transition-all duration-200"
                                  style={{ width: `${uploadProgress}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.watermark}
                            onChange={(e) => setFormData({ ...formData, watermark: e.target.checked })}
                            className="w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent"
                          />
                          <span className="text-sm font-semibold">Enable Watermarking</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.antiRecord}
                            onChange={(e) => setFormData({ ...formData, antiRecord: e.target.checked })}
                            className="w-4 h-4 rounded border-gray-300 text-accent focus:ring-accent"
                          />
                          <span className="text-sm font-semibold">Enable Anti-Recording Protection</span>
                        </label>
                      </div>

                      <div className="flex gap-3 pt-4">
                        <Button
                          type="button"
                          variant="outline"
                          className="flex-1"
                          onClick={() => setShowUploadModal(false)}
                        >
                          Cancel
                        </Button>
                        <Button type="submit" className="gradient-button flex-1">
                          {isEditing ? 'Save Changes' : (uploadProgress > 0 && uploadProgress < 100 ? 'Uploading...' : 'Upload Video')}
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Preview Modal */}
              {showPreviewModal && currentVideo && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm" onClick={() => setShowPreviewModal(false)}>
                  <div className="w-full max-w-4xl bg-black rounded-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
                    <div className="relative aspect-video bg-slate-900">
                      <video
                        src={currentVideo.url || 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'}
                        controls
                        autoPlay
                        className="w-full h-full"
                      />
                      {currentVideo.watermark && (
                        <div className="absolute top-4 right-4 opacity-50 pointer-events-none">
                          <p className="text-white font-bold text-xl drop-shadow-md">Coursiator Protected</p>
                        </div>
                      )}
                    </div>
                    <div className="p-6 bg-white dark:bg-slate-900">
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="text-xl font-bold mb-1">{currentVideo.title}</h2>
                          <p className="text-foreground/70">{currentVideo.course} • {currentVideo.duration}</p>
                        </div>
                        <Button variant="outline" onClick={() => setShowPreviewModal(false)}>Close</Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : activeTab === 'qa' ? (
            <TeacherQA />
          ) : ( // 4. Render TeacherAssessments when activeTab is 'assessments'
            <TeacherAssessments
              initialData={assessmentInitData}
              onCancel={() => setAssessmentInitData(null)}
            />
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
