import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { interactionService, Question } from '@/lib/mockInteractionService';
import { useAuth } from '@/contexts/AuthContext';
import { MessageSquare, ThumbsUp, User, Send, CheckCircle, Clock } from 'lucide-react';

interface CourseQAProps {
    courseId: string;
    videoId?: string;
}

export default function CourseQA({ courseId, videoId }: CourseQAProps) {
    const { user } = useAuth();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [newQuestionTitle, setNewQuestionTitle] = useState('');
    const [newQuestionContent, setNewQuestionContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeQuestion, setActiveQuestion] = useState<string | null>(null);

    useEffect(() => {
        loadQuestions();
    }, [courseId, videoId]);

    const loadQuestions = () => {
        const data = interactionService.getQuestions(courseId, videoId);
        setQuestions(data);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newQuestionTitle.trim() || !newQuestionContent.trim()) return;

        setIsSubmitting(true);

        setTimeout(() => {
            interactionService.addQuestion({
                courseId,
                videoId,
                userId: user?.id || 'guest',
                userName: user?.name || 'Guest Student',
                title: newQuestionTitle,
                content: newQuestionContent,
            });

            setNewQuestionTitle('');
            setNewQuestionContent('');
            setIsSubmitting(false);
            loadQuestions();
        }, 600);
    };

    return (
        <div className="space-y-6">
            {/* Ask Question Form */}
            <div className="glass-card p-6 border border-white/10 rounded-xl">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-accent" />
                    Ask a Question
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            placeholder="Subject (e.g., Question about min 2:30)"
                            value={newQuestionTitle}
                            onChange={(e) => setNewQuestionTitle(e.target.value)}
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-accent/50"
                        />
                    </div>
                    <div>
                        <textarea
                            placeholder="Describe your question in detail..."
                            value={newQuestionContent}
                            onChange={(e) => setNewQuestionContent(e.target.value)}
                            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-accent/50 h-24 resize-none"
                        />
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit" disabled={isSubmitting} className="gradient-button">
                            {isSubmitting ? 'Posting...' : 'Post Question'}
                            <Send className="w-4 h-4 ml-2" />
                        </Button>
                    </div>
                </form>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
                {questions.length === 0 ? (
                    <div className="text-center py-12 text-foreground/50">
                        <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-20" />
                        <p>No questions yet. Be the first to ask!</p>
                    </div>
                ) : (
                    questions.map((q) => (
                        <div key={q.id} className="glass-card border border-white/10 rounded-xl overflow-hidden hover:border-accent/30 transition-smooth">
                            <div
                                className="p-4 cursor-pointer"
                                onClick={() => setActiveQuestion(activeQuestion === q.id ? null : q.id)}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent">
                                            <User className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm">{q.userName}</h4>
                                            <p className="text-xs text-foreground/60">{q.timestamp.toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${q.status === 'answered' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                                        }`}>
                                        {q.status === 'answered' ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                        {q.status === 'answered' ? 'Answered' : 'Open'}
                                    </div>
                                </div>
                                <h3 className="font-bold mb-1">{q.title}</h3>
                                <p className="text-sm text-foreground/80">{q.content}</p>

                                <div className="flex items-center gap-4 mt-3 text-xs text-foreground/50">
                                    <span className="flex items-center gap-1 hover:text-accent">
                                        <ThumbsUp className="w-3 h-3" /> {q.likes} likes
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <MessageSquare className="w-3 h-3" /> {q.answers.length} replies
                                    </span>
                                </div>
                            </div>

                            {/* Answers Section (Accordion) */}
                            {activeQuestion === q.id && (
                                <div className="bg-black/20 p-4 border-t border-white/10 space-y-3">
                                    {q.answers.length > 0 ? (
                                        q.answers.map((a) => (
                                            <div key={a.id} className={`p-3 rounded-lg ${a.isInstructor ? 'bg-accent/10 border border-accent/20' : 'bg-white/5'}`}>
                                                <div className="flex items-center gap-2 mb-2">
                                                    {a.isInstructor ? (
                                                        <div className="px-2 py-0.5 bg-accent text-white text-[10px] font-bold rounded uppercase tracking-wider">
                                                            Instructor
                                                        </div>
                                                    ) : (
                                                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                                                            <User className="w-3 h-3" />
                                                        </div>
                                                    )}
                                                    <span className="text-sm font-semibold">{a.userName}</span>
                                                    <span className="text-xs text-foreground/50">{a.timestamp.toLocaleDateString()}</span>
                                                </div>
                                                <p className="text-sm pl-8">{a.content}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-foreground/50 text-center italic">No replies yet.</p>
                                    )}
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
