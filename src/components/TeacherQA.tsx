import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { interactionService, Question } from '@/lib/mockInteractionService';
import { MessageSquare, CheckCircle, Clock, Filter, Send } from 'lucide-react';

export default function TeacherQA() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [filter, setFilter] = useState<'all' | 'open' | 'answered'>('all');
    const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
    const [replyContent, setReplyContent] = useState('');

    useEffect(() => {
        loadQuestions();
    }, []);

    const loadQuestions = () => {
        const data = interactionService.getAllQuestions();
        setQuestions(data);
    };

    const handleReply = (questionId: string) => {
        if (!replyContent.trim()) return;

        interactionService.addAnswer(questionId, {
            userId: 'teacher1',
            userName: 'You (Instructor)',
            isInstructor: true,
            content: replyContent
        });

        setReplyContent('');
        loadQuestions(); // Refresh to show status update
    };

    const filteredQuestions = questions.filter(q => {
        if (filter === 'all') return true;
        return q.status === filter;
    });

    return (
        <div className="space-y-6">
            {/* Header & Filter */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Student Questions</h2>
                <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
                    {(['all', 'open', 'answered'] as const).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${filter === f ? 'bg-accent text-white shadow-lg' : 'text-foreground/70 hover:text-white'
                                }`}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Question List Sidebar */}
                <div className="space-y-3 h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                    {filteredQuestions.map((q) => (
                        <div
                            key={q.id}
                            onClick={() => setActiveQuestion(q.id)}
                            className={`p-4 rounded-xl border cursor-pointer transition-all ${activeQuestion === q.id
                                    ? 'bg-accent/10 border-accent/50 shadow-glow'
                                    : 'bg-white/5 border-white/10 hover:border-white/20'
                                }`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${q.status === 'open' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500' : 'bg-green-500/10 border-green-500/20 text-green-500'
                                    }`}>
                                    {q.status.toUpperCase()}
                                </span>
                                <span className="text-xs text-foreground/50">{q.timestamp.toLocaleDateString()}</span>
                            </div>
                            <h3 className="font-bold text-sm mb-1 truncate">{q.title}</h3>
                            <p className="text-xs text-foreground/70 line-clamp-2">{q.content}</p>
                            <div className="mt-2 flex items-center gap-2 text-xs text-foreground/40">
                                <span>{q.userName}</span> • <span>Course #{q.courseId}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Active Question Detail & Reply */}
                <div className="glass-card border border-white/10 rounded-2xl p-6 h-[600px] flex flex-col">
                    {activeQuestion ? (
                        (() => {
                            const q = questions.find(qu => qu.id === activeQuestion);
                            if (!q) return null;
                            return (
                                <>
                                    <div className="flex-1 overflow-y-auto pr-2 mb-4 custom-scrollbar">
                                        <h2 className="text-xl font-bold mb-2">{q.title}</h2>
                                        <div className="flex items-center gap-2 mb-6 pb-6 border-b border-white/10">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                                                {q.userName[0]}
                                            </div>
                                            <div>
                                                <p className="font-semibold">{q.userName}</p>
                                                <p className="text-xs text-foreground/50">Student</p>
                                            </div>
                                        </div>
                                        <div className="prose prose-invert max-w-none mb-8">
                                            <p className="text-lg leading-relaxed">{q.content}</p>
                                        </div>

                                        {/* Previous Answers */}
                                        {q.answers.length > 0 && (
                                            <div className="space-y-4 mb-6">
                                                <h4 className="text-xs font-bold uppercase tracking-wider text-foreground/50 mb-2">Replies</h4>
                                                {q.answers.map(a => (
                                                    <div key={a.id} className={`p-4 rounded-xl ${a.isInstructor ? 'bg-accent/5 border border-accent/20 ml-8' : 'bg-white/5 mr-8'}`}>
                                                        <div className="flex justify-between mb-1">
                                                            <span className="font-bold text-sm">{a.userName}</span>
                                                            <span className="text-xs text-foreground/50">{a.timestamp.toLocaleDateString()}</span>
                                                        </div>
                                                        <p className="text-sm">{a.content}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Reply Input */}
                                    <div className="mt-auto pt-4 border-t border-white/10">
                                        <label className="text-sm font-semibold mb-2 block">Your Reply</label>
                                        <div className="flex gap-2">
                                            <textarea
                                                value={replyContent}
                                                onChange={(e) => setReplyContent(e.target.value)}
                                                className="flex-1 bg-white/5 border border-white/10 rounded-lg p-3 text-sm focus:border-accent/50 outline-none resize-none h-24"
                                                placeholder="Type your answer here..."
                                            />
                                            <Button
                                                onClick={() => handleReply(q.id)}
                                                className="h-auto self-end px-4 py-2 gradient-button"
                                                disabled={!replyContent.trim()}
                                            >
                                                <Send className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </>
                            );
                        })()
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-foreground/50">
                            <MessageSquare className="w-16 h-16 mb-4 opacity-20" />
                            <p>Select a question to view details</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
