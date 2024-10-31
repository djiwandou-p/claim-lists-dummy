import React, { useState } from 'react';
import { X } from 'lucide-react';

type Step = 1 | 2 | 3;

interface FeedbackData {
  feedback: string;
  email: string;
  date: string;
}

export function FeedbackWidget({ onClose }: { onClose: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');

  const saveFeedbackToCSV = async (data: FeedbackData) => {
    try {
      const response = await fetch('/api/save-feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save feedback');
      }
    } catch (error) {
      console.error('Error saving feedback:', error);
    }
  };

  const handleSubmit = async () => {
    const data: FeedbackData = {
      feedback,
      email,
      date: new Date().toISOString(),
    };
    
    await saveFeedbackToCSV(data);
    onClose();
  };

  const handleSkip = () => {
    setEmail('');
    setCurrentStep(3);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-0 top-1/3 bg-red-500 text-white px-2 py-4 rounded-l-lg transform -rotate-90 translate-x-8 hover:bg-red-600 transition-colors"
      >
        Feedback
      </button>
    );
  }

  return (
    <div className="fixed right-4 top-20 w-80 bg-white rounded-lg shadow-xl border border-gray-200">
      <div className="relative p-4">
        {currentStep !== 3 && (
          <button
            onClick={onClose}
            className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        )}

        {currentStep === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Tell us about your experience...</h2>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Please type here..."
              className="w-full h-32 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <button
              onClick={() => setCurrentStep(2)}
              disabled={!feedback}
              className={`w-full py-2 rounded-md transition-colors ${
                feedback ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              Next
            </button>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-center">
              We may wish to follow up with you. Enter your email if you're happy for us to contact you.
            </h2>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Please type here..."
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSkip}
                className="flex-1 py-2 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200 transition-colors"
              >
                Skip
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                disabled={!email}
                className={`flex-1 py-2 rounded-md transition-colors ${
                  email ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-center">
              Thank you for sharing your feedback with us!
            </h2>
            <p className="text-gray-600 text-center">
              Before you go, can we connect your response with data (device, usage, cookies, behavior, and interactions)
              related to your visits? This will help us give you a better experience.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleSubmit}
                className="p-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                ✓
              </button>
            </div>
            <button
              className="text-sm text-blue-500 hover:underline block mx-auto"
              onClick={() => window.open('#', '_blank')}
            >
              More information
            </button>
          </div>
        )}
      </div>
    </div>
  );
}