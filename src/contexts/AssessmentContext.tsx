import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Question {
  id: string;
  section: string;
  type: 'likert' | 'multiple-choice' | 'boolean' | 'scenario';
  question: string;
  options?: string[];
  scale?: { min: number; max: number; labels?: string[] };
}

export interface Answer {
  questionId: string;
  value: number | string | boolean;
}

export interface AssessmentState {
  currentSection: string;
  answers: Answer[];
  isComplete: boolean;
  results?: AssessmentResults;
}

export interface AssessmentResults {
  overallScore: number;
  wiscarScores: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability: number;
    realWorld: number;
  };
  recommendation: 'yes' | 'maybe' | 'no';
  insights: string[];
  nextSteps: string[];
  careerRoles: string[];
}

interface AssessmentContextType {
  state: AssessmentState;
  updateAnswer: (answer: Answer) => void;
  nextSection: () => void;
  previousSection: () => void;
  completeAssessment: () => void;
  resetAssessment: () => void;
  getCurrentSectionQuestions: () => Question[];
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(undefined);

const sections = [
  'introduction',
  'psychometric',
  'technical',
  'scenarios',
  'results'
];

const allQuestions: Question[] = [
  // Psychometric Section - Interest Scale
  {
    id: 'interest-1',
    section: 'psychometric',
    type: 'likert',
    question: 'How excited are you about creating immersive virtual reality gaming experiences?',
    scale: { min: 1, max: 7, labels: ['Not at all excited', 'Extremely excited'] }
  },
  {
    id: 'interest-2',
    section: 'psychometric',
    type: 'likert',
    question: 'How often do you find yourself researching new XR technologies and gaming innovations?',
    scale: { min: 1, max: 7, labels: ['Never', 'Daily'] }
  },
  {
    id: 'interest-3',
    section: 'psychometric',
    type: 'likert',
    question: 'When you see XR games, how motivated are you to understand how they work technically?',
    scale: { min: 1, max: 7, labels: ['Not motivated', 'Highly motivated'] }
  },

  // Personality & Work Style
  {
    id: 'personality-1',
    section: 'psychometric',
    type: 'multiple-choice',
    question: 'Which working environment appeals to you most?',
    options: [
      'Structured projects with clear requirements and deadlines',
      'Open-ended creative challenges with flexible timelines',
      'Collaborative team projects with shared goals',
      'Independent research and experimentation'
    ]
  },
  {
    id: 'personality-2',
    section: 'psychometric',
    type: 'likert',
    question: 'How comfortable are you with spending long hours debugging complex technical issues?',
    scale: { min: 1, max: 7, labels: ['Very uncomfortable', 'Very comfortable'] }
  },
  {
    id: 'personality-3',
    section: 'psychometric',
    type: 'multiple-choice',
    question: 'When facing a challenging problem, you typically:',
    options: [
      'Break it down into smaller, manageable pieces',
      'Look for creative, unconventional solutions',
      'Research what others have done in similar situations',
      'Experiment with different approaches until something works'
    ]
  },

  // Technical Aptitude
  {
    id: 'technical-1',
    section: 'technical',
    type: 'multiple-choice',
    question: 'Which programming concept best describes "inheritance" in object-oriented programming?',
    options: [
      'Creating a backup copy of your code',
      'A class receiving properties and methods from a parent class',
      'Sharing variables between different functions',
      'Converting data from one type to another'
    ]
  },
  {
    id: 'technical-2',
    section: 'technical',
    type: 'multiple-choice',
    question: 'In 3D graphics, what does a "vertex" represent?',
    options: [
      'A point in 3D space that defines part of a shape',
      'The center of a 3D object',
      'The texture applied to a surface',
      'The lighting calculation for a surface'
    ]
  },
  {
    id: 'technical-3',
    section: 'technical',
    type: 'multiple-choice',
    question: 'Which of these is most important for VR game performance?',
    options: [
      'High polygon count models for realism',
      'Maintaining consistent 90+ FPS frame rate',
      'Complex particle effects and shaders',
      'Detailed texture resolution'
    ]
  },

  // Scenario-based Questions
  {
    id: 'scenario-1',
    section: 'scenarios',
    type: 'multiple-choice',
    question: 'You\'re developing a VR game where players can pick up and manipulate objects. The physics feel "floaty" and unrealistic. What would you investigate first?',
    options: [
      'Increase the gravity settings in the physics engine',
      'Adjust the mass and drag properties of objects',
      'Check the frame rate and physics timestep',
      'Redesign the hand tracking interaction system'
    ]
  },
  {
    id: 'scenario-2',
    section: 'scenarios',
    type: 'multiple-choice',
    question: 'Players report motion sickness in your VR game. Which solution would you prioritize?',
    options: [
      'Add comfort settings like teleportation movement',
      'Reduce the field of view during movement',
      'Implement a comfort vignette around screen edges',
      'All of the above - comfort is crucial in VR'
    ]
  },
  {
    id: 'scenario-3',
    section: 'scenarios',
    type: 'multiple-choice',
    question: 'Your XR game needs to work on multiple platforms (PC VR, Quest, AR phones). How do you approach this?',
    options: [
      'Build separate versions for each platform',
      'Design for the lowest common denominator',
      'Create a scalable architecture with platform-specific optimizations',
      'Focus on one platform first, then port later'
    ]
  },

  // Learning & Growth Mindset
  {
    id: 'learning-1',
    section: 'psychometric',
    type: 'likert',
    question: 'How do you typically respond when you encounter a technology or concept you don\'t understand?',
    scale: { min: 1, max: 7, labels: ['Feel overwhelmed and avoid it', 'Get excited to learn something new'] }
  },
  {
    id: 'learning-2',
    section: 'psychometric',
    type: 'boolean',
    question: 'Do you enjoy learning through hands-on experimentation and making mistakes?'
  }
];

export const useAssessment = () => {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
};

interface AssessmentProviderProps {
  children: ReactNode;
}

export const AssessmentProvider: React.FC<AssessmentProviderProps> = ({ children }) => {
  const [state, setState] = useState<AssessmentState>({
    currentSection: 'introduction',
    answers: [],
    isComplete: false,
  });

  const updateAnswer = (answer: Answer) => {
    setState(prev => ({
      ...prev,
      answers: [
        ...prev.answers.filter(a => a.questionId !== answer.questionId),
        answer
      ]
    }));
  };

  const nextSection = () => {
    const currentIndex = sections.indexOf(state.currentSection);
    if (currentIndex < sections.length - 1) {
      setState(prev => ({
        ...prev,
        currentSection: sections[currentIndex + 1]
      }));
    }
  };

  const previousSection = () => {
    const currentIndex = sections.indexOf(state.currentSection);
    if (currentIndex > 0) {
      setState(prev => ({
        ...prev,
        currentSection: sections[currentIndex - 1]
      }));
    }
  };

  const calculateResults = (answers: Answer[]): AssessmentResults => {
    // Simplified scoring algorithm
    const answerMap = new Map(answers.map(a => [a.questionId, a.value]));
    
    // Calculate WISCAR scores (0-100)
    const will = Math.min(100, ((answerMap.get('interest-1') as number || 0) + (answerMap.get('learning-1') as number || 0)) * 7.14);
    const interest = Math.min(100, ((answerMap.get('interest-2') as number || 0) + (answerMap.get('interest-3') as number || 0)) * 7.14);
    
    // Technical questions scoring
    let technicalScore = 0;
    if (answerMap.get('technical-1') === 'A class receiving properties and methods from a parent class') technicalScore += 33;
    if (answerMap.get('technical-2') === 'A point in 3D space that defines part of a shape') technicalScore += 33;
    if (answerMap.get('technical-3') === 'Maintaining consistent 90+ FPS frame rate') technicalScore += 34;
    
    const skill = technicalScore;
    const cognitive = Math.min(100, skill + (answerMap.get('learning-2') === true ? 20 : 0));
    const ability = Math.min(100, (answerMap.get('learning-1') as number || 0) * 14.28);
    
    // Scenario-based real-world alignment
    let scenarioScore = 0;
    if (answerMap.get('scenario-2') === 'All of the above - comfort is crucial in VR') scenarioScore += 50;
    if (answerMap.get('scenario-3') === 'Create a scalable architecture with platform-specific optimizations') scenarioScore += 50;
    const realWorld = scenarioScore;
    
    const wiscarScores = { will, interest, skill, cognitive, ability, realWorld };
    const overallScore = Math.round(Object.values(wiscarScores).reduce((sum, score) => sum + score, 0) / 6);
    
    let recommendation: 'yes' | 'maybe' | 'no' = 'no';
    if (overallScore >= 75) recommendation = 'yes';
    else if (overallScore >= 50) recommendation = 'maybe';
    
    const insights = [
      `Your overall readiness score is ${overallScore}%`,
      will >= 70 ? 'Strong motivation and persistence for XR development' : 'Consider building more consistent interest in XR technology',
      skill >= 60 ? 'Good technical foundation for XR development' : 'Recommend strengthening programming and 3D graphics fundamentals',
      realWorld >= 60 ? 'Good understanding of XR development challenges' : 'Gain more exposure to real-world XR development practices'
    ];
    
    const nextSteps = recommendation === 'yes' 
      ? [
          'Start with Unity XR Toolkit tutorials',
          'Build a simple VR interaction demo',
          'Join XR developer communities',
          'Consider formal XR development courses'
        ]
      : recommendation === 'maybe'
      ? [
          'Strengthen programming fundamentals',
          'Learn 3D math and graphics basics',
          'Try VR development tutorials',
          'Reassess after 3-6 months of learning'
        ]
      : [
          'Focus on general programming skills first',
          'Explore game development basics',
          'Build foundational 3D and math skills',
          'Consider game design or QA roles as entry points'
        ];
    
    const careerRoles = [
      'XR Game Developer',
      'XR Interaction Designer', 
      '3D Graphics Programmer',
      'Game Engine Developer',
      'XR Software Engineer'
    ];
    
    return {
      overallScore,
      wiscarScores,
      recommendation,
      insights,
      nextSteps,
      careerRoles
    };
  };

  const completeAssessment = () => {
    const results = calculateResults(state.answers);
    setState(prev => ({
      ...prev,
      isComplete: true,
      results,
      currentSection: 'results'
    }));
  };

  const resetAssessment = () => {
    setState({
      currentSection: 'introduction',
      answers: [],
      isComplete: false,
    });
  };

  const getCurrentSectionQuestions = () => {
    return allQuestions.filter(q => q.section === state.currentSection);
  };

  return (
    <AssessmentContext.Provider value={{
      state,
      updateAnswer,
      nextSection,
      previousSection,
      completeAssessment,
      resetAssessment,
      getCurrentSectionQuestions,
    }}>
      {children}
    </AssessmentContext.Provider>
  );
};