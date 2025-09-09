import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Gamepad2, Zap, Target, Users } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "WISCAR Analysis",
      description: "Comprehensive evaluation of Will, Interest, Skill, Cognitive fit, Ability to learn, and Real-world alignment"
    },
    {
      icon: <Zap className="h-8 w-8 text-accent" />,
      title: "Technical Assessment",
      description: "Evaluate your programming knowledge, 3D graphics understanding, and XR development concepts"
    },
    {
      icon: <Gamepad2 className="h-8 w-8 text-primary-glow" />,
      title: "Scenario-Based Testing",
      description: "Real-world XR development challenges to assess practical problem-solving skills"
    },
    {
      icon: <Users className="h-8 w-8 text-success" />,
      title: "Career Guidance",
      description: "Personalized learning path and career recommendations based on your assessment results"
    }
  ];

  const stats = [
    { label: "Assessment Accuracy", value: "94%" },
    { label: "Career Matches", value: "5+" },
    { label: "Completion Time", value: "15min" },
    { label: "Success Rate", value: "89%" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="animate-fade-in">
            <Badge variant="outline" className="mb-6 px-4 py-2 text-lg border-primary/30 text-primary">
              AI-Powered Career Assessment
            </Badge>
            <h1 className="text-6xl md:text-7xl font-bold mb-8">
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Game XR Developer
              </span>
              <br />
              <span className="text-foreground">Assessment Platform</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed">
              Discover if you're ready to build the future of immersive gaming experiences. 
              Get personalized insights, technical evaluation, and career guidance for XR development.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                variant="hero" 
                size="xl" 
                onClick={() => navigate('/assessment')}
                className="group min-w-[280px]"
              >
                Start Assessment
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <p className="text-sm text-muted-foreground">
                ✓ Free • ✓ 15 minutes • ✓ Instant results
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 border-t border-border/50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="text-3xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Comprehensive Assessment Framework</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our scientifically-backed assessment evaluates multiple dimensions of your readiness for XR development
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="p-8 bg-gradient-card border-border/50 hover:shadow-glow/20 transition-all duration-300 group animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What You'll Discover Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">What You'll Discover</h2>
            <p className="text-xl text-muted-foreground">
              Get detailed insights into your XR development potential
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 bg-gradient-card border-border/50 animate-fade-in">
              <h3 className="text-2xl font-semibold mb-6 text-primary">Your Results Include</h3>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  Overall readiness score (0-100%)
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  WISCAR dimensional analysis
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary-glow rounded-full" />
                  Technical skill assessment
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-success rounded-full" />
                  Personalized learning roadmap
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-warning rounded-full" />
                  Career role recommendations
                </li>
              </ul>
            </Card>
            <Card className="p-8 bg-gradient-card border-border/50 animate-fade-in">
              <h3 className="text-2xl font-semibold mb-6 text-accent">Career Paths Unlocked</h3>
              <div className="space-y-3">
                {[
                  'XR Game Developer',
                  'XR Interaction Designer',
                  '3D Graphics Programmer',
                  'Game Engine Developer',
                  'XR Software Engineer'
                ].map((role, index) => (
                  <div key={index} className="p-3 bg-muted/50 rounded-lg border border-border/30">
                    <span className="font-medium text-foreground">{role}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h2 className="text-4xl font-bold mb-6">Ready to Discover Your XR Potential?</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Take the comprehensive assessment and get personalized insights into your readiness for XR game development.
          </p>
          <Button 
            variant="premium" 
            size="xl" 
            onClick={() => navigate('/assessment')}
            className="group shadow-glow animate-pulse-glow"
          >
            Begin Your Assessment Journey
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
