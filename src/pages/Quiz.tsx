import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, RotateCcw, CheckCircle, XCircle, Circle, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/components/ui/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import Breadcrumbs from '../components/Breadcrumbs';
import { MCQLoadingSkeleton } from '../components/LoadingSkeleton';
import ConfettiAnimation from '../components/ConfettiAnimation';
import backend from '~backend/client';
import type { MCQResponse } from '~backend/mcq/generate';

interface QuizResult {
  right: number[];
  wrong: number[];
  empty: number[];
  totals: { right: number; wrong: number; empty: number };
  timestamp: string;
  subject: string;
  group?: string;
}

interface UserAnswer {
  questionId: number;
  selectedOptionIndex: number | null;
}

export default function Quiz() {
  const { subjectSlug } = useParams<{ subjectSlug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [mcqData, setMcqData] = useState<MCQResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<QuizResult | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);

  const subjectName = subjectSlug?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || '';

  const fetchMCQs = async () => {
    if (!subjectSlug) return;
    
    setLoading(true);
    setShowResults(false);
    setResults(null);
    setShowCorrectAnswers(false);
    
    try {
      const response = await backend.mcq.generate({
        subject: subjectName,
        count: 15,
        difficulty: 'Medium',
        pakistanOnly: true,
        pakistanOnlyStrict: true,
      });
      
      setMcqData(response);
      setUserAnswers(Array.from({ length: 15 }, (_, i) => ({ 
        questionId: i + 1, 
        selectedOptionIndex: null 
      })));
    } catch (error) {
      console.error('Failed to fetch MCQs:', error);
      toast({
        title: "Error",
        description: "Failed to generate MCQs. The service might not be working. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMCQs();
  }, [subjectSlug]);

  const handleAnswerChange = (questionId: number, optionIndex: number) => {
    setUserAnswers(prev => 
      prev.map(answer => 
        answer.questionId === questionId 
          ? { ...answer, selectedOptionIndex: optionIndex }
          : answer
      )
    );
  };

  const generateResults = () => {
    if (!mcqData) return;

    const right: number[] = [];
    const wrong: number[] = [];
    const empty: number[] = [];

    userAnswers.forEach((answer, index) => {
      const question = mcqData.questions[index];
      if (answer.selectedOptionIndex === null) {
        empty.push(answer.questionId);
      } else if (answer.selectedOptionIndex === question.correctOptionIndex) {
        right.push(answer.questionId);
      } else {
        wrong.push(answer.questionId);
      }
    });

    const result: QuizResult = {
      right,
      wrong,
      empty,
      totals: {
        right: right.length,
        wrong: wrong.length,
        empty: empty.length,
      },
      timestamp: new Date().toISOString(),
      subject: subjectName,
    };

    setResults(result);
    setShowResults(true);

    // Show confetti if score is good
    if (right.length >= 10) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }

    // Save to localStorage
    const sessions = JSON.parse(localStorage.getItem('quiz-sessions') || '[]');
    sessions.unshift(result);
    // Keep only last 20 sessions
    if (sessions.length > 20) {
      sessions.splice(20);
    }
    localStorage.setItem('quiz-sessions', JSON.stringify(sessions));
  };

  const handleNext = () => {
    fetchMCQs();
  };

  const getAnsweredCount = () => {
    return userAnswers.filter(answer => answer.selectedOptionIndex !== null).length;
  };

  const getQuestionStatus = (questionIndex: number) => {
    if (!showResults || !results || !mcqData) return 'unanswered';
    
    const questionId = questionIndex + 1;
    if (results.right.includes(questionId)) return 'correct';
    if (results.wrong.includes(questionId)) return 'wrong';
    return 'empty';
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[
          { label: 'Quiz', path: '/compulsory' },
          { label: subjectName }
        ]} />
        <MCQLoadingSkeleton />
      </div>
    );
  }

  if (!mcqData) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs items={[
          { label: 'Quiz', path: '/compulsory' },
          { label: subjectName }
        ]} />
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Failed to Load MCQs
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            The service might not be working. Please try again.
          </p>
          <Button onClick={fetchMCQs} className="mr-4">
            <RotateCcw className="w-4 h-4 mr-2" />
            Retry
          </Button>
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ChevronLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {showConfetti && <ConfettiAnimation />}
      
      <Breadcrumbs items={[
        { label: 'Quiz', path: '/compulsory' },
        { label: subjectName }
      ]} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
              {subjectName}
            </h1>
            <Button variant="outline" onClick={() => navigate(-1)}>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </div>
          
          <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-400 mb-2">
            <span>Progress: {getAnsweredCount()} of 15 questions</span>
            <span>{Math.round((getAnsweredCount() / 15) * 100)}% complete</span>
          </div>
          
          <Progress value={(getAnsweredCount() / 15) * 100} className="h-2" />
        </div>

        {/* Questions */}
        <div className="space-y-6 mb-8">
          {mcqData.questions.map((question, index) => {
            const userAnswer = userAnswers[index];
            const isAnswered = userAnswer.selectedOptionIndex !== null;
            const questionStatus = getQuestionStatus(index);
            
            let borderColor = 'border-slate-200 dark:border-slate-700';
            let bgColor = '';
            
            if (showResults) {
              if (questionStatus === 'correct') {
                borderColor = 'border-green-300 dark:border-green-700';
                bgColor = 'bg-green-50/50 dark:bg-green-900/20';
              } else if (questionStatus === 'wrong') {
                borderColor = 'border-red-300 dark:border-red-700';
                bgColor = 'bg-red-50/50 dark:bg-red-900/20';
              }
            } else if (isAnswered) {
              borderColor = 'border-blue-200 dark:border-blue-800';
              bgColor = 'bg-blue-50/50 dark:bg-blue-900/20';
            }
            
            return (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border-2 transition-all duration-200 ${borderColor} ${bgColor}`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                      {question.id}
                    </span>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-4">
                      {question.statement}
                    </h3>
                    
                    <RadioGroup
                      value={userAnswer.selectedOptionIndex?.toString() || ''}
                      onValueChange={(value) => handleAnswerChange(question.id, parseInt(value))}
                      disabled={showResults}
                    >
                      <div className="space-y-3">
                        {question.options.map((option, optionIndex) => {
                          let optionStyle = '';
                          if (showResults) {
                            if (optionIndex === question.correctOptionIndex) {
                              optionStyle = 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700';
                            } else if (optionIndex === userAnswer.selectedOptionIndex && optionIndex !== question.correctOptionIndex) {
                              optionStyle = 'bg-red-100 dark:bg-red-900/30 border-red-300 dark:border-red-700';
                            }
                          }
                          
                          return (
                            <div key={optionIndex} className={`flex items-center space-x-3 p-2 rounded-lg border transition-colors ${optionStyle || 'border-transparent'}`}>
                              <RadioGroupItem 
                                value={optionIndex.toString()} 
                                id={`q${question.id}-option${optionIndex}`}
                                disabled={showResults}
                              />
                              <Label 
                                htmlFor={`q${question.id}-option${optionIndex}`}
                                className="flex-1 cursor-pointer text-slate-700 dark:text-slate-300"
                              >
                                {option}
                              </Label>
                              {showResults && optionIndex === question.correctOptionIndex && (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              )}
                              {showResults && optionIndex === userAnswer.selectedOptionIndex && optionIndex !== question.correctOptionIndex && (
                                <XCircle className="w-4 h-4 text-red-600" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {!showResults ? (
            <Button 
              onClick={generateResults}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
            >
              Generate Results
            </Button>
          ) : (
            <Button 
              onClick={handleNext}
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white px-8"
            >
              Next Set of MCQs
            </Button>
          )}
          
          <Button 
            variant="outline" 
            onClick={fetchMCQs}
            size="lg"
            className="px-8"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Retry
          </Button>

          {showResults && (
            <Button 
              variant="outline" 
              onClick={() => setShowCorrectAnswers(!showCorrectAnswers)}
              size="lg"
              className="px-8"
            >
              <Eye className="w-4 h-4 mr-2" />
              {showCorrectAnswers ? 'Hide' : 'Show'} All Correct Answers
            </Button>
          )}
        </div>

        {/* Results */}
        <AnimatePresence>
          {showResults && results && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mt-8 space-y-6"
            >
              <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6 text-center">
                  Quiz Results
                </h2>
                
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-green-600">{results.totals.right}</div>
                    <div className="text-sm text-green-600">Correct</div>
                  </div>
                  
                  <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-red-600">{results.totals.wrong}</div>
                    <div className="text-sm text-red-600">Wrong</div>
                  </div>
                  
                  <div className="text-center p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <Circle className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-slate-600">{results.totals.empty}</div>
                    <div className="text-sm text-slate-600">Empty</div>
                  </div>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium text-green-600">Right answers =</span>
                    <span className="text-slate-700 dark:text-slate-300">
                      {results.right.length > 0 ? results.right.join(',') : 'None'}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium text-red-600">Wrong answers =</span>
                    <span className="text-slate-700 dark:text-slate-300">
                      {results.wrong.length > 0 ? results.wrong.join(',') : 'None'}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium text-slate-600">Empty =</span>
                    <span className="text-slate-700 dark:text-slate-300">
                      {results.empty.length > 0 ? results.empty.join(',') : 'None'}
                    </span>
                  </div>
                </div>
                
                {results.totals.right >= 10 && (
                  <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-center">
                    <span className="text-yellow-600 font-medium">🎉 Excellent performance!</span>
                  </div>
                )}
              </div>

              {/* All Correct Answers Section */}
              <Collapsible open={showCorrectAnswers} onOpenChange={setShowCorrectAnswers}>
                <CollapsibleTrigger asChild>
                  <Card className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>All Correct Answers</span>
                        <Eye className="w-5 h-5" />
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        {mcqData.questions.map((question, index) => (
                          <div key={question.id} className="border-l-4 border-l-blue-500 pl-4 py-2">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium text-slate-900 dark:text-white mb-2">
                                  Q{question.id}: {question.statement}
                                </h4>
                                <div className="flex items-center space-x-2">
                                  <CheckCircle className="w-4 h-4 text-green-600" />
                                  <span className="text-green-600 font-medium">
                                    Correct Answer: {question.options[question.correctOptionIndex]}
                                  </span>
                                </div>
                                {userAnswers[index].selectedOptionIndex !== null && 
                                 userAnswers[index].selectedOptionIndex !== question.correctOptionIndex && (
                                  <div className="flex items-center space-x-2 mt-1">
                                    <XCircle className="w-4 h-4 text-red-600" />
                                    <span className="text-red-600">
                                      Your Answer: {question.options[userAnswers[index].selectedOptionIndex!]}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </CollapsibleContent>
              </Collapsible>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
