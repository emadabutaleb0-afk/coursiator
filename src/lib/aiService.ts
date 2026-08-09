// AI Service to handle interactions
// currently using a sophisticated mock, but designed to be swapped for a real API

/**
 * Interface for AI chat messages
 */
export interface AIMessage {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

/**
 * Service to handle AI generation and interaction
 */
export const aiService = {
    /**
     * Send a message to the AI and get a response
     * @param message The user's message
     * @param context Previous conversation context (optional)
     * @returns The AI's response text
     */
    sendMessage: async (message: string, context: AIMessage[] = []): Promise<string> => {
        // Simulate network delay for realism
        await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1000));

        const lowerMsg = message.toLowerCase();

        // Mock logic for context-aware responses
        if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
            return "Hello! I'm your AI Tutor. I'm here to help you practice your English. What would you like to talk about today?";
        }

        if (lowerMsg.includes('name')) {
            return "I'm Coursiator AI, your personal language learning assistant.";
        }

        if (lowerMsg.includes('weather')) {
            return "I can't see the real weather, but describing the weather is a great way to practice! How is the weather where you are?";
        }

        if (lowerMsg.includes('restaurant') || lowerMsg.includes('food')) {
            return "That sounds delicious! Ordering food at a restaurant is a classic scenario. Let's roleplay. I'll be the waiter. 'Good evening! detailed menu, or are you ready to order?'";
        }

        if (lowerMsg.includes('job') || lowerMsg.includes('interview')) {
            return "Job interviews can be nerve-wracking, but practice helps! Let's pretend this is an interview. 'Tell me a little bit about yourself and your experience.'";
        }

        // Default generic responses to keep conversation going
        const genericResponses = [
            "That's interesting! Can you tell me more about that?",
            "I see. How does that make you feel?",
            "That's a great way to put it. Try using the word 'comprehensive' in your next sentence.",
            "Could you elaborate on that point a bit further?",
            "Excellent. Let's try to express that in the past tense now.",
            "You're doing great! Let's continue.",
        ];

        return genericResponses[Math.floor(Math.random() * genericResponses.length)];
    }
};
