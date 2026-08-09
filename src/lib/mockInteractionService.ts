import { useState, useEffect } from 'react';

export interface Answer {
    id: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    content: string;
    timestamp: Date;
    isInstructor: boolean;
    likes: number;
}

export interface Question {
    id: string;
    courseId: string;
    videoId?: string;
    userId: string;
    userName: string;
    userAvatar?: string;
    title: string;
    content: string;
    timestamp: Date;
    status: 'open' | 'answered' | 'resolved';
    likes: number;
    answers: Answer[];
    tags?: string[];
}

class MockInteractionService {
    private questions: Question[] = [];
    private initialized = false;

    constructor() {
        if (!this.initialized) {
            this.initializeDefaultData();
            this.initialized = true;
        }
    }

    private initializeDefaultData() {
        this.questions = [
            {
                id: 'q1',
                courseId: '1', // IELTS Mastery
                videoId: '1',
                userId: 'student1',
                userName: 'Alex Johnson',
                title: 'Clarification on Speaking Part 1',
                content: 'Do we need to speak for the full 2 minutes if the examiner interrupts us?',
                timestamp: new Date(Date.now() - 86400000 * 2), // 2 days ago
                status: 'answered',
                likes: 5,
                answers: [
                    {
                        id: 'a1',
                        userId: 'instructor1',
                        userName: 'Dr. Sarah Mitchell',
                        isInstructor: true,
                        content: 'Great question Alex! In Part 1, answers should be concise (2-3 sentences). Part 2 is where you speak for 2 minutes. If the examiner interrupts you in Part 2, it just means time is up - don\'t worry!',
                        timestamp: new Date(Date.now() - 86400000),
                        likes: 12
                    }
                ]
            },
            {
                id: 'q2',
                courseId: '1',
                videoId: '2',
                userId: 'student2',
                userName: 'Maria Garcia',
                title: 'Vocabulary list PDF?',
                content: 'Is there a downloadable PDF for the vocabulary words mentioned in this video?',
                timestamp: new Date(Date.now() - 3600000 * 5), // 5 hours ago
                status: 'open',
                likes: 2,
                answers: []
            }
        ];
    }

    public getQuestions(courseId: string, videoId?: string): Question[] {
        let filtered = this.questions.filter(q => q.courseId === courseId);
        if (videoId) {
            filtered = filtered.filter(q => q.videoId === videoId);
        }
        return filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    }

    public getAllQuestions(): Question[] {
        return this.questions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    }

    public addQuestion(question: Omit<Question, 'id' | 'timestamp' | 'status' | 'likes' | 'answers'>): Question {
        const newQuestion: Question = {
            ...question,
            id: `q_${Date.now()}`,
            timestamp: new Date(),
            status: 'open',
            likes: 0,
            answers: []
        };
        this.questions.unshift(newQuestion);
        return newQuestion;
    }

    public addAnswer(questionId: string, answer: Omit<Answer, 'id' | 'timestamp' | 'likes'>): Answer {
        const question = this.questions.find(q => q.id === questionId);
        if (!question) throw new Error('Question not found');

        const newAnswer: Answer = {
            ...answer,
            id: `a_${Date.now()}`,
            timestamp: new Date(),
            likes: 0
        };

        question.answers.push(newAnswer);
        if (answer.isInstructor) {
            question.status = 'answered';
        }

        return newAnswer;
    }

    public markResolved(questionId: string) {
        const q = this.questions.find(q => q.id === questionId);
        if (q) q.status = 'resolved';
    }
}

export const interactionService = new MockInteractionService();
