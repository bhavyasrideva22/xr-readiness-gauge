import React from 'react';
import { useAssessment, Question } from '@/contexts/AssessmentContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

interface QuestionComponentProps {
  question: Question;
  questionNumber: number;
}

export const QuestionComponent: React.FC<QuestionComponentProps> = ({ question, questionNumber }) => {
  const { state, updateAnswer } = useAssessment();
  
  const currentAnswer = state.answers.find(a => a.questionId === question.id);

  const handleLikertChange = (value: number[]) => {
    updateAnswer({
      questionId: question.id,
      value: value[0]
    });
  };

  const handleMultipleChoice = (option: string) => {
    updateAnswer({
      questionId: question.id,
      value: option
    });
  };

  const handleBoolean = (value: boolean) => {
    updateAnswer({
      questionId: question.id,
      value
    });
  };

  return (
    <Card className="p-6 bg-gradient-card border-border/50 animate-fade-in">
      <div className="mb-6">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-semibold text-sm">
            {questionNumber}
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-foreground leading-relaxed">
              {question.question}
            </h3>
          </div>
        </div>
      </div>

      <div className="ml-12">
        {question.type === 'likert' && question.scale && (
          <div className="space-y-6">
            <div className="px-2">
              <Slider
                value={[currentAnswer?.value as number || 4]}
                onValueChange={handleLikertChange}
                min={question.scale.min}
                max={question.scale.max}
                step={1}
                className="w-full"
              />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground px-2">
              <span>{question.scale.labels?.[0] || question.scale.min}</span>
              <span className="font-medium text-primary">
                {currentAnswer?.value || question.scale.min + Math.floor((question.scale.max - question.scale.min) / 2)}
              </span>
              <span>{question.scale.labels?.[1] || question.scale.max}</span>
            </div>
          </div>
        )}

        {question.type === 'multiple-choice' && question.options && (
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant={currentAnswer?.value === option ? "premium" : "assessment"}
                className="w-full justify-start text-left p-4 h-auto"
                onClick={() => handleMultipleChoice(option)}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                    currentAnswer?.value === option 
                      ? 'bg-primary border-primary' 
                      : 'border-border'
                  }`}>
                    {currentAnswer?.value === option && (
                      <div className="w-2 h-2 bg-primary-foreground rounded-full m-auto mt-0.5" />
                    )}
                  </div>
                  <span className="flex-1">{option}</span>
                </div>
              </Button>
            ))}
          </div>
        )}

        {question.type === 'boolean' && (
          <div className="flex gap-4">
            <Button
              variant={currentAnswer?.value === true ? "success" : "assessment"}
              className="flex-1"
              onClick={() => handleBoolean(true)}
            >
              Yes
            </Button>
            <Button
              variant={currentAnswer?.value === false ? "destructive" : "assessment"}
              className="flex-1"
              onClick={() => handleBoolean(false)}
            >
              No
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};