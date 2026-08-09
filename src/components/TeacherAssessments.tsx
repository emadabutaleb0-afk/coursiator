import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2, Save, FileText, CheckCircle, Edit2 } from 'lucide-react';
import { toast } from 'sonner';

interface Question {
    id: string;
    text: string;
    type: 'multiple-choice' | 'true-false' | 'short-answer';
    options: { id: string; text: string }[];
    correctAnswer: string;
}

interface Assessment {
    id: string;
    title: string;
    course: string;
    questions: Question[];
}

interface TeacherAssessmentsProps {
    initialData?: {
        title: string;
        course: string;
    } | null;
    onCancel?: () => void;
}

export default function TeacherAssessments({ initialData, onCancel }: TeacherAssessmentsProps) {
    const { t } = useLanguage();
    const [assessments, setAssessments] = useState<Assessment[]>([
        {
            id: '1',
            title: 'IELTS Speaking Part 1 Quiz',
            course: 'IELTS Mastery',
            questions: [
                {
                    id: 'q1',
                    text: 'What is the duration of Part 1?',
                    type: 'multiple-choice',
                    options: [
                        { id: 'opt1', text: '4-5 minutes' },
                        { id: 'opt2', text: '10 minutes' }
                    ],
                    correctAnswer: 'opt1'
                }
            ]
        }
    ]);

    const [isCreating, setIsCreating] = useState(!!initialData);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [newAssessment, setNewAssessment] = useState<Assessment>({
        id: '',
        title: initialData?.title || '',
        course: initialData?.course || 'IELTS Mastery',
        questions: []
    });

    // Update state if initialData changes
    useEffect(() => {
        if (initialData) {
            setIsCreating(true);
            setEditingId(null);
            setNewAssessment(prev => ({
                ...prev,
                title: initialData.title,
                course: initialData.course,
                questions: []
            }));
        }
    }, [initialData]);

    const handleAddQuestion = () => {
        setNewAssessment({
            ...newAssessment,
            questions: [
                ...newAssessment.questions,
                {
                    id: Date.now().toString(),
                    text: '',
                    type: 'multiple-choice',
                    options: [
                        { id: 'opt1', text: '' },
                        { id: 'opt2', text: '' },
                        { id: 'opt3', text: '' },
                        { id: 'opt4', text: '' }
                    ],
                    correctAnswer: 'opt1'
                }
            ]
        });
    };

    const handleQuestionChange = (qIndex: number, field: string, value: any) => {
        const updatedQuestions = [...newAssessment.questions];
        const question = updatedQuestions[qIndex];

        if (field === 'type') {
            // Reset options based on type
            if (value === 'multiple-choice') {
                question.options = [
                    { id: 'opt1', text: '' }, { id: 'opt2', text: '' },
                    { id: 'opt3', text: '' }, { id: 'opt4', text: '' }
                ];
                question.correctAnswer = 'opt1';
            } else if (value === 'true-false') {
                question.options = [
                    { id: 'true', text: 'True' },
                    { id: 'false', text: 'False' }
                ];
                question.correctAnswer = 'true';
            } else {
                question.options = [];
                question.correctAnswer = '';
            }
        }

        updatedQuestions[qIndex] = { ...question, [field]: value };
        setNewAssessment({ ...newAssessment, questions: updatedQuestions });
    };

    const handleOptionChange = (qIndex: number, optIndex: number, text: string) => {
        const updatedQuestions = [...newAssessment.questions];
        updatedQuestions[qIndex].options[optIndex].text = text;
        setNewAssessment({ ...newAssessment, questions: updatedQuestions });
    };

    const handleEditAssessment = (assessment: Assessment) => {
        setNewAssessment(assessment);
        setEditingId(assessment.id);
        setIsCreating(true);
    };

    const handleDeleteAssessment = (id: string) => {
        if (window.confirm('Delete this assessment?')) {
            setAssessments(prev => prev.filter(a => a.id !== id));
            toast.success('Assessment deleted');
        }
    };

    const handleSaveAssessment = () => {
        if (!newAssessment.title) {
            toast.error('Please enter an assessment title');
            return;
        }

        if (editingId) {
            setAssessments(assessments.map(a => a.id === editingId ? newAssessment : a));
            toast.success('Assessment updated successfully');
        } else {
            setAssessments([...assessments, { ...newAssessment, id: Date.now().toString() }]);
            toast.success(t('assessment.save') + ' ' + t('courses.toast.enrolled').split(' ')[1]);
        }

        setIsCreating(false);
        setEditingId(null);
        setNewAssessment({ id: '', title: '', course: 'IELTS Mastery', questions: [] });
        if (onCancel) onCancel();
    };

    const handleCancel = () => {
        setIsCreating(false);
        setEditingId(null);
        setNewAssessment({ id: '', title: '', course: 'IELTS Mastery', questions: [] });
        if (onCancel) onCancel();
    };

    return (
        <div className="space-y-6">
            {!isCreating ? (
                <div className="glass-card p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold gradient-text">{t('teacher.tab.assessments')}</h2>
                        <Button onClick={() => setIsCreating(true)} className="gradient-button flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            {t('assessment.create')}
                        </Button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <th className="text-left py-3 px-4">{t('assessment.list.title')}</th>
                                    <th className="text-left py-3 px-4">{t('teacher.table.course')}</th>
                                    <th className="text-center py-3 px-4">{t('assessment.list.questions')}</th>
                                    <th className="text-right py-3 px-4">{t('assessment.list.actions')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assessments.map((assessment) => (
                                    <tr key={assessment.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50/50">
                                        <td className="py-3 px-4 font-medium">{assessment.title}</td>
                                        <td className="py-3 px-4 text-gray-600">{assessment.course}</td>
                                        <td className="py-3 px-4 text-center">
                                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                                {assessment.questions.length}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button variant="ghost" size="sm" onClick={() => handleEditAssessment(assessment)}>
                                                    <Edit2 className="w-4 h-4 text-blue-500" />
                                                </Button>
                                                <Button variant="ghost" size="sm" onClick={() => handleDeleteAssessment(assessment.id)} className="text-red-500 hover:text-red-700">
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <div className="glass-card p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">{editingId ? 'Edit Assessment' : t('assessment.create')}</h2>
                        <Button variant="ghost" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </div>

                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">{t('assessment.title')}</label>
                                <Input
                                    value={newAssessment.title}
                                    onChange={(e) => setNewAssessment({ ...newAssessment, title: e.target.value })}
                                    placeholder="e.g., Weekly Quiz 1"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">{t('assessment.course')}</label>
                                <select
                                    className="w-full p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-900"
                                    value={newAssessment.course}
                                    onChange={(e) => setNewAssessment({ ...newAssessment, course: e.target.value })}
                                >
                                    <option value="IELTS Mastery">IELTS Mastery</option>
                                    <option value="SAT Excellence">SAT Excellence</option>
                                    <option value="Business English">Business English</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold">{t('assessment.list.questions')}</h3>
                                <Button variant="outline" size="sm" onClick={handleAddQuestion} className="flex items-center gap-2">
                                    <Plus className="w-4 h-4" />
                                    {t('assessment.addQuestion')}
                                </Button>
                            </div>

                            {newAssessment.questions.map((question, qIndex) => (
                                <div key={question.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg space-y-3 bg-white/50 dark:bg-slate-800/50">
                                    <div className="flex justify-between gap-4">
                                        <Input
                                            value={question.text}
                                            onChange={(e) => handleQuestionChange(qIndex, 'text', e.target.value)}
                                            placeholder={t('assessment.questionText')}
                                            className="flex-1"
                                        />
                                        <select
                                            className="p-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-slate-900"
                                            value={question.type}
                                            onChange={(e) => handleQuestionChange(qIndex, 'type', e.target.value)}
                                        >
                                            <option value="multiple-choice">Multiple Choice</option>
                                            <option value="true-false">True/False</option>
                                            <option value="short-answer">Short Answer</option>
                                        </select>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-red-500"
                                            onClick={() => {
                                                const updated = newAssessment.questions.filter((_, i) => i !== qIndex);
                                                setNewAssessment({ ...newAssessment, questions: updated });
                                            }}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>

                                    {question.type === 'multiple-choice' && (
                                        <div className="pl-4 space-y-2">
                                            {question.options.map((option, optIndex) => (
                                                <div key={option.id} className="flex items-center gap-2">
                                                    <div className={`w-4 h-4 rounded-full border ${question.correctAnswer === option.id ? 'bg-green-500 border-green-500' : 'border-gray-400'} cursor-pointer`}
                                                        onClick={() => handleQuestionChange(qIndex, 'correctAnswer', option.id)}
                                                    />
                                                    <Input
                                                        value={option.text}
                                                        onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)}
                                                        placeholder={`Option ${optIndex + 1}`}
                                                        className="h-8 text-sm"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {question.type === 'true-false' && (
                                        <div className="pl-4 flex gap-6">
                                            {question.options.map((option) => (
                                                <label key={option.id} className="flex items-center gap-2 cursor-pointer">
                                                    <input
                                                        type="radio"
                                                        name={`q-${question.id}`}
                                                        checked={question.correctAnswer === option.id}
                                                        onChange={() => handleQuestionChange(qIndex, 'correctAnswer', option.id)}
                                                        className="w-4 h-4 text-accent focus:ring-accent"
                                                    />
                                                    <span className="text-sm font-medium">{option.text}</span>
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="pt-4 flex justify-end">
                            <Button onClick={handleSaveAssessment} className="gradient-button flex items-center gap-2">
                                <Save className="w-4 h-4" />
                                {t('assessment.save')}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
