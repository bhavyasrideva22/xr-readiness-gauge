import React from 'react';
import { useAssessment } from '@/contexts/AssessmentContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, AlertCircle, XCircle, RotateCcw, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AssessmentResults = () => {
  const { state, resetAssessment } = useAssessment();
  const navigate = useNavigate();
  const results = state.results;

  if (!results) {
    return <div>Loading results...</div>;
  }

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case 'yes':
        return <CheckCircle className="h-8 w-8 text-success" />;
      case 'maybe':
        return <AlertCircle className="h-8 w-8 text-warning" />;
      case 'no':
        return <XCircle className="h-8 w-8 text-destructive" />;
      default:
        return null;
    }
  };

  const getRecommendationText = (recommendation: string) => {
    switch (recommendation) {
      case 'yes':
        return 'Strong Fit - Proceed with Confidence';
      case 'maybe':
        return 'Moderate Fit - Consider with Preparation';
      case 'no':
        return 'Not Ready - Build Foundations First';
      default:
        return '';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-success';
    if (score >= 50) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center animate-fade-in">
          <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
            Your XR Developer Assessment Results
          </h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive analysis of your readiness for Game XR Development
          </p>
        </div>

        {/* Overall Recommendation */}
        <Card className="p-8 bg-gradient-card border-border/50 text-center animate-fade-in">
          <div className="flex flex-col items-center gap-4 mb-6">
            {getRecommendationIcon(results.recommendation)}
            <h2 className="text-2xl font-bold">
              {getRecommendationText(results.recommendation)}
            </h2>
            <div className="text-6xl font-bold">
              <span className={getScoreColor(results.overallScore)}>
                {results.overallScore}%
              </span>
            </div>
            <p className="text-muted-foreground">Overall Readiness Score</p>
          </div>
        </Card>

        {/* WISCAR Analysis */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {Object.entries(results.wiscarScores).map(([key, score]) => {
            const labels: Record<string, string> = {
              will: 'Will & Motivation',
              interest: 'Interest Level',
              skill: 'Current Skills',
              cognitive: 'Cognitive Fit',
              ability: 'Learning Ability',
              realWorld: 'Real-World Alignment'
            };

            return (
              <Card key={key} className="p-6 bg-gradient-card border-border/50">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold">{labels[key]}</h3>
                    <Badge variant={score >= 70 ? "default" : score >= 50 ? "secondary" : "destructive"}>
                      {score}%
                    </Badge>
                  </div>
                  <Progress value={score} className="h-2" />
                </div>
              </Card>
            );
          })}
        </div>

        {/* Insights & Next Steps */}
        <div className="grid lg:grid-cols-2 gap-8 animate-fade-in">
          <Card className="p-6 bg-gradient-card border-border/50">
            <h3 className="text-xl font-semibold mb-4 text-primary">Key Insights</h3>
            <ul className="space-y-3">
              {results.insights.map((insight, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{insight}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6 bg-gradient-card border-border/50">
            <h3 className="text-xl font-semibold mb-4 text-accent">Recommended Next Steps</h3>
            <ol className="space-y-3">
              {results.nextSteps.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-accent-foreground text-sm font-semibold flex-shrink-0">
                    {index + 1}
                  </div>
                  <span className="text-muted-foreground">{step}</span>
                </li>
              ))}
            </ol>
          </Card>
        </div>

        {/* Career Roles */}
        <Card className="p-8 bg-gradient-card border-border/50 animate-fade-in">
          <h3 className="text-xl font-semibold mb-6 text-center">Potential Career Paths</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.careerRoles.map((role, index) => (
              <div 
                key={index} 
                className="p-4 bg-muted/50 rounded-lg border border-border/30 text-center"
              >
                <span className="font-medium">{role}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <Button 
            variant="hero" 
            size="lg"
            onClick={() => navigate('/')}
          >
            <Download className="mr-2 h-4 w-4" />
            Download Full Report
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={() => {
              resetAssessment();
              navigate('/');
            }}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Take Assessment Again
          </Button>
        </div>
      </div>
    </div>
  );
};