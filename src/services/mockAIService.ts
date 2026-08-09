
export interface AIResponse {
    text: string;
    type: 'text' | 'correction' | 'suggestion';
    confidence?: number;
}

const RESPONSES = [
    "That's a great point! Can you elaborate more on that?",
    "I noticed a small grammar nuance there. Try saying it this way for more impact.",
    "Your pronunciation is very clear properly. Keep it up!",
    "Let's try to use a more advanced vocabulary word here. How about 'consequently'?",
    "Excellent! You are making steady progress.",
    "I understand what you mean. In a business context, we might phrase it differently.",
    "Could you try repeating that sentence with a focus on the 'th' sound?",
    "That's correct! Now, let's try to expand that into a complex sentence."
];

const KEYWORD_RESPONSES: Record<string, string[]> = {
    hello: ["Hello there! Ready to practice?", "Hi! How are you doing today?", "Greetings! Let's start learning."],
    hi: ["Hi! Ready to practice?", "Hello! How can I help you?"],
    practice: ["Great! What specific topic would you like to focus on?", "I'm ready. Let's start with some warm-up exercises."],
    business: ["In business English, clarity is key. Try to use active voice.", "Let's roleplay a meeting scenario."],
    ielts: ["For IELTS, focus on fluency and coherence.", "Remember to use a range of vocabulary."],
    grammar: ["Grammar is the foundation. Let's check your tense usage.", "Do you have questions about specific tenses?"],
    thank: ["You're welcome! Keep up the good work.", "My pleasure. I'm here to help."],
    bye: ["Goodbye! See you next time.", "Have a great day! Keep practicing."],
    good: ["That's good to hear!", "Glad things are going well."],
};

export const MockAIService = {
    /**
     * Simulates sending a message to an AI and getting a response after a delay.
     */
    sendMessage: async (userText: string): Promise<AIResponse> => {
        return new Promise((resolve) => {
            // Simulate network latency (1-2 seconds)
            const delay = 1000 + Math.random() * 1000;

            setTimeout(() => {
                const lowerText = userText.toLowerCase();
                let responseText = "";
                let type: 'text' | 'correction' | 'suggestion' = 'text';

                // Keyword matching
                const foundKeyword = Object.keys(KEYWORD_RESPONSES).find(key => lowerText.includes(key));

                if (foundKeyword) {
                    const options = KEYWORD_RESPONSES[foundKeyword];
                    responseText = options[Math.floor(Math.random() * options.length)];
                    type = 'text';
                } else {
                    // Fallback to random response
                    responseText = RESPONSES[Math.floor(Math.random() * RESPONSES.length)];
                    // Randomly assign type for visual variety
                    const rand = Math.random();
                    if (rand > 0.7) type = 'correction';
                    else if (rand > 0.9) type = 'suggestion';
                }

                // Add "You said" rarely or if it's a correction
                if (type === 'correction' || Math.random() > 0.8) {
                    responseText += ` (Regarding: "${userText}")`;
                }

                resolve({
                    text: responseText,
                    type: type,
                    confidence: 0.85 + Math.random() * 0.15
                });
            }, delay);
        });
    }
};
