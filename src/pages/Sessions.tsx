import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Eye, Trash2, CheckCircle, XCircle, Circle } from 'lucide-react';
import { CustomButton } from '@/components/CustomButton';
import Breadcrumbs from '../components/Breadcrumbs';
import { CustomTable, CustomTableHeader, CustomTableBody, CustomTableRow, CustomTableHead, CustomTableCell } from '@/components/CustomTable';
import { CustomSheet, CustomSheetTrigger, CustomSheetContent, CustomSheetHeader, CustomSheetTitle } from '@/components/CustomSheet';
import { CustomAlertDialog, CustomAlertDialogTrigger, CustomAlertDialogContent, CustomAlertDialogHeader, CustomAlertDialogTitle, CustomAlertDialogDescription, CustomAlertDialogFooter, CustomAlertDialogAction, CustomAlertDialogCancel } from '@/components/CustomAlertDialog'; // Updated import

interface QuizResult {
  right: number[];
  wrong: number[];
  empty: number[];
  totals: { right: number; wrong: number; empty: number };
  timestamp: string;
  subject: string;
  group?: string;
}

export default function Sessions() {
  const [sessions, setSessions] = useState<QuizResult[]>([]);
  const [selectedSession, setSelectedSession] = useState<QuizResult | null>(null);
  const [showSheet, setShowSheet] = useState(false);
  const [showAlertDialog, setShowAlertDialog] = useState(false);


  useEffect(() => {
    const savedSessions = JSON.parse(localStorage.getItem('quiz-sessions') || '[]');
    setSessions(savedSessions);
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('quiz-sessions');
    setSessions([]);
    setShowAlertDialog(false);
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const getScoreColor = (correct: number, total: number = 15) => {
    const percentage = (correct / total) * 100;
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: 'Sessions' }]} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
              Quiz Sessions
            </h1>
            <p className="text-slate-600 dark:text-slate-300">
              Track your progress and review past quiz attempts
            </p>
          </div>
          
          {sessions.length > 0 && (
            <CustomAlertDialog open={showAlertDialog} onOpenChange={setShowAlertDialog}>
              <CustomAlertDialogTrigger onClick={() => setShowAlertDialog(true)}>
                <CustomButton variant="outline" className="text-red-600 hover:text-red-700">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear History
                </CustomButton>
              </CustomAlertDialogTrigger>
              <CustomAlertDialogContent>
                <CustomAlertDialogHeader>
                  <CustomAlertDialogTitle>Clear Quiz History</CustomAlertDialogTitle>
                  <CustomAlertDialogDescription>
                    This action cannot be undone. This will permanently delete all your quiz session data.
                  </CustomAlertDialogDescription>
                </CustomAlertDialogHeader>
                <CustomAlertDialogFooter>
                  <CustomAlertDialogCancel onClick={() => setShowAlertDialog(false)}>Cancel</CustomAlertDialogCancel>
                  <CustomAlertDialogAction onClick={clearHistory} className="bg-red-600 hover:bg-red-700">
                    Clear History
                  </CustomAlertDialogAction>
                </CustomAlertDialogFooter>
              </CustomAlertDialogContent>
            </CustomAlertDialog>
          )}
        </div>

        {sessions.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
            <Clock className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              No Quiz Sessions Yet
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Start taking quizzes to see your session history here
            </p>
            <CustomButton onClick={() => window.history.back()}>
              Start a Quiz
            </CustomButton>
          </div>
        ) : (
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
            <CustomTable>
              <CustomTableHeader>
                <CustomTableRow>
                  <CustomTableHead>Subject</CustomTableHead>
                  <CustomTableHead>Date & Time</CustomTableHead>
                  <CustomTableHead className="text-center">Correct</CustomTableHead>
                  <CustomTableHead className="text-center">Wrong</CustomTableHead>
                  <CustomTableHead className="text-center">Empty</CustomTableHead>
                  <CustomTableHead className="text-center">Score</CustomTableHead>
                  <CustomTableHead className="text-center">Actions</CustomTableHead>
                </CustomTableRow>
              </CustomTableHeader>
              <CustomTableBody>
                {sessions.map((session, index) => (
                  <CustomTableRow key={index}>
                    <CustomTableCell className="font-medium">
                      <div>
                        <div className="text-slate-900 dark:text-white">{session.subject}</div>
                        {session.group && (
                          <div className="text-sm text-slate-500">{session.group}</div>
                        )}
                      </div>
                    </CustomTableCell>
                    <CustomTableCell className="text-slate-600 dark:text-slate-400">
                      {formatDate(session.timestamp)}
                    </CustomTableCell>
                    <CustomTableCell className="text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full text-sm font-medium">
                        {session.totals.right}
                      </span>
                    </CustomTableCell>
                    <CustomTableCell className="text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full text-sm font-medium">
                        {session.totals.wrong}
                      </span>
                    </CustomTableCell>
                    <CustomTableCell className="text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-slate-100 dark:bg-slate-700 text-slate-600 rounded-full text-sm font-medium">
                        {session.totals.empty}
                      </span>
                    </CustomTableCell>
                    <CustomTableCell className="text-center">
                      <span className={`font-semibold ${getScoreColor(session.totals.right)}`}>
                        {Math.round((session.totals.right / 15) * 100)}%
                      </span>
                    </CustomTableCell>
                    <CustomTableCell className="text-center">
                      <CustomSheet open={showSheet && selectedSession?.timestamp === session.timestamp} onOpenChange={setShowSheet}>
                        <CustomSheetTrigger onClick={() => { setSelectedSession(session); setShowSheet(true); }}>
                          <CustomButton 
                            variant="ghost" 
                            size="sm"
                          >
                            <Eye className="w-4 h-4" />
                          </CustomButton>
                        </CustomSheetTrigger>
                        <CustomSheetContent>
                          <CustomSheetHeader>
                            <CustomSheetTitle>Session Details</CustomSheetTitle>
                          </CustomSheetHeader>
                          
                          {selectedSession && (
                            <div className="mt-6 space-y-6">
                              <div>
                                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                                  {selectedSession.subject}
                                </h3>
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                  {formatDate(selectedSession.timestamp)}
                                </p>
                              </div>
                              
                              <div className="grid grid-cols-3 gap-4">
                                <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                  <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                                  <div className="text-xl font-bold text-green-600">
                                    {selectedSession.totals.right}
                                  </div>
                                  <div className="text-xs text-green-600">Correct</div>
                                </div>
                                
                                <div className="text-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                                  <XCircle className="w-6 h-6 text-red-600 mx-auto mb-2" />
                                  <div className="text-xl font-bold text-red-600">
                                    {selectedSession.totals.wrong}
                                  </div>
                                  <div className="text-xs text-red-600">Wrong</div>
                                </div>
                                
                                <div className="text-center p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                                  <Circle className="w-6 h-6 text-slate-600 mx-auto mb-2" />
                                  <div className="text-xl font-bold text-slate-600">
                                    {selectedSession.totals.empty}
                                  </div>
                                  <div className="text-xs text-slate-600">Empty</div>
                                </div>
                              </div>
                              
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-medium text-green-600 mb-2">Right Answers</h4>
                                  <p className="text-sm text-slate-700 dark:text-slate-300 bg-green-50 dark:bg-green-900/20 p-3 rounded">
                                    {selectedSession.right.length > 0 ? selectedSession.right.join(', ') : 'None'}
                                  </p>
                                </div>
                                
                                <div>
                                  <h4 className="font-medium text-red-600 mb-2">Wrong Answers</h4>
                                  <p className="text-sm text-slate-700 dark:text-slate-300 bg-red-50 dark:bg-red-900/20 p-3 rounded">
                                    {selectedSession.wrong.length > 0 ? selectedSession.wrong.join(', ') : 'None'}
                                  </p>
                                </div>
                                
                                <div>
                                  <h4 className="font-medium text-slate-600 mb-2">Empty</h4>
                                  <p className="text-sm text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-700 p-3 rounded">
                                    {selectedSession.empty.length > 0 ? selectedSession.empty.join(', ') : 'None'}
                                  </p>
                                </div>
                              </div>
                              
                              <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                                <div className="text-center">
                                  <div className={`text-2xl font-bold ${getScoreColor(selectedSession.totals.right)}`}>
                                    {Math.round((selectedSession.totals.right / 15) * 100)}%
                                  </div>
                                  <div className="text-sm text-slate-600 dark:text-slate-400">
                                    Overall Score
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </CustomSheetContent>
                      </CustomSheet>
                    </CustomTableCell>
                  </CustomTableRow>
                ))}
              </CustomTableBody>
            </CustomTable>
          </div>
        )}
      </motion.div>
    </div>
  );
}