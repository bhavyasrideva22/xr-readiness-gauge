import React from 'react';
import { useAssessment } from '@/contexts/AssessmentContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Play } from 'lucide-react';
import { QuestionComponent } from '@/components/assessment/QuestionComponent';
import { AssessmentResults } from '@/components/assessment/AssessmentResults';

const Assessment = () => {
  const { state, nextSection, previousSection, completeAssessment, getCurrentSectionQuestions } = useAssessment();

  if (state.currentSection === 'introduction') {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-6">
              Game XR Developer Assessment
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Discover if you're ready to build the future of immersive gaming experiences. 
              This comprehensive assessment evaluates your fit for XR game development through 
              personality, technical aptitude, and scenario-based questions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-gradient-card p-8 border-border/50">
              <h3 className="text-2xl font-semibold mb-4 text-primary">What You'll Discover</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li>• Your WISCAR readiness profile</li>
                <li>• Technical skill assessment</li>
                <li>• Personality fit for XR development</li>
                <li>• Personalized learning path</li>
                <li>• Career role recommendations</li>
              </ul>
            </Card>

            <Card className="bg-gradient-card p-8 border-border/50">
              <h3 className="text-2xl font-semibold mb-4 text-accent">What is XR Game Development?</h3>
              <p className="text-muted-foreground mb-4">
                XR (Extended Reality) game development combines VR, AR, and MR technologies to create 
                immersive interactive experiences. It requires skills in:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• 3D programming & graphics</li>
                <li>• Game engines (Unity, Unreal)</li>
                <li>• UX/UI design for 3D spaces</li>
                <li>• Hardware integration</li>
              </ul>
            </Card>
          </div>

          <div className="text-center">
            <Button 
              variant="hero" 
              size="xl" 
              onClick={nextSection}
              className="group"
            >
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Start Assessment
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              Takes approximately 10-15 minutes to complete
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (state.currentSection === 'results') {
    return <AssessmentResults />;
  }

  const questions = getCurrentSectionQuestions();
  const sectionTitles: Record<string, string> = {
    psychometric: 'Personality & Interest Assessment',
    technical: 'Technical Aptitude',
    scenarios: 'Real-World Scenarios'
  };

  const sectionDescriptions: Record<string, string> = {
    psychometric: 'Understanding your interests, motivations, and work style preferences',
    technical: 'Evaluating your current technical knowledge and problem-solving skills',
    scenarios: 'Assessing your approach to real XR development challenges'
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {sectionTitles[state.currentSection]}
          </h1>
          <p className="text-muted-foreground">
            {sectionDescriptions[state.currentSection]}
          </p>
        </div>

        <div className="space-y-8 mb-12">
          {questions.map((question, index) => (
            <QuestionComponent 
              key={question.id} 
              question={question} 
              questionNumber={index + 1}
            />
          ))}
        </div>

        <div className="flex justify-between items-center">
          <Button 
            variant="outline" 
            onClick={previousSection}
            disabled={state.currentSection === 'psychometric'}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          
          <div className="flex space-x-2">
            {['psychometric', 'technical', 'scenarios'].map((section) => (
              <div
                key={section}
                className={`h-2 w-8 rounded-full ${
                  section === state.currentSection 
                    ? 'bg-primary' 
                    : questions.some(q => q.section === section) 
                    ? 'bg-primary/50' 
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>

          {state.currentSection === 'scenarios' ? (
            <Button 
              variant="premium" 
              onClick={completeAssessment}
            >
              Complete Assessment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button 
              variant="default" 
              onClick={nextSection}
            >
              Next Section
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Assessment;