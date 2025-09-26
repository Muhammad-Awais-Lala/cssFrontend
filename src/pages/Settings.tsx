import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Trash2, Shield, Info, User, ExternalLink, XCircle } from 'lucide-react';
import { CustomButton } from '@/components/CustomButton';
import { useCustomToast } from '@/hooks/useCustomToast';
import Breadcrumbs from '../components/Breadcrumbs';
import { useTheme } from '../contexts/ThemeContext';
import React from 'react';
import { CustomCard, CustomCardHeader, CustomCardTitle, CustomCardDescription, CustomCardContent } from '@/components/CustomCard';
import { CustomAlertDialog, CustomAlertDialogTrigger, CustomAlertDialogContent, CustomAlertDialogHeader, CustomAlertDialogTitle, CustomAlertDialogDescription, CustomAlertDialogFooter, CustomAlertDialogAction, CustomAlertDialogCancel } from '@/components/CustomAlertDialog';
import { CustomInput, CustomLabel } from '@/components/CustomForm'; // Updated import

export default function Settings() {
  const { theme, setTheme } = useTheme();
  const { toast } = useCustomToast();
  const [resetText, setResetText] = useState('');
  const [showClearHistoryDialog, setShowClearHistoryDialog] = useState(false);
  const [showResetAppDialog, setShowResetAppDialog] = useState(false);


  const handleClearHistory = () => {
    localStorage.removeItem('quiz-sessions');
    toast.success("All quiz session data has been removed.");
    setShowClearHistoryDialog(false);
  };

  const handleResetApp = () => {
    if (resetText === 'reset me') {
      localStorage.clear();
      toast.success("All application data has been cleared.");
      setResetText('');
      setShowResetAppDialog(false);
    }
  };

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: 'Settings' }]} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Settings
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Customize your CSS exam preparation experience
          </p>
        </div>

        <div className="space-y-6">
          {/* Theme Settings */}
          <CustomCard>
            <CustomCardHeader>
              <CustomCardTitle className="flex items-center space-x-2">
                <Sun className="w-5 h-5" />
                <span>Appearance</span>
              </CustomCardTitle>
              <CustomCardDescription>
                Choose your preferred theme for the application
              </CustomCardDescription>
            </CustomCardHeader>
            <CustomCardContent>
              <div className="grid grid-cols-2 gap-4">
                {themeOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <CustomButton
                      key={option.value}
                      variant={theme === option.value ? "outline" : "default"}
                      className="h-20 flex flex-col items-center justify-center space-y-2"
                      onClick={() => setTheme(option.value as any)}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{option.label}</span>
                    </CustomButton>
                  );
                })}
              </div>
            </CustomCardContent>
          </CustomCard>

          {/* Data Management */}
          <CustomCard>
            <CustomCardHeader>
              <CustomCardTitle className="flex items-center space-x-2">
                <Trash2 className="w-5 h-5" />
                <span>Data Management</span>
              </CustomCardTitle>
              <CustomCardDescription>
                Manage your quiz history and application data
              </CustomCardDescription>
            </CustomCardHeader>
            <CustomCardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div>
                  <h3 className="font-medium text-slate-900 dark:text-white">Clear Quiz History</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Remove all saved quiz session data
                  </p>
                </div>
                <CustomAlertDialog open={showClearHistoryDialog} onOpenChange={setShowClearHistoryDialog}>
                  <CustomAlertDialogTrigger onClick={() => setShowClearHistoryDialog(true)}>
                    <CustomButton variant="outline" className="text-red-600 hover:text-red-700">
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
                      <CustomAlertDialogCancel onClick={() => setShowClearHistoryDialog(false)}>Cancel</CustomAlertDialogCancel>
                      <CustomAlertDialogAction onClick={handleClearHistory} className="bg-red-600 hover:bg-red-700">
                        Clear History
                      </CustomAlertDialogAction>
                    </CustomAlertDialogFooter>
                  </CustomAlertDialogContent>
                </CustomAlertDialog>
              </div>

              <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <div>
                  <h3 className="font-medium text-red-900 dark:text-red-100">Reset Application</h3>
                  <p className="text-sm text-red-700 dark:text-red-300">
                    Clear all application data including settings and history
                  </p>
                </div>
                <CustomAlertDialog open={showResetAppDialog} onOpenChange={setShowResetAppDialog}>
                  <CustomAlertDialogTrigger onClick={() => setShowResetAppDialog(true)}>
                    <CustomButton variant="destructive">
                      Reset App
                    </CustomButton>
                  </CustomAlertDialogTrigger>
                  <CustomAlertDialogContent>
                    <CustomAlertDialogHeader>
                      <CustomAlertDialogTitle>Reset Application</CustomAlertDialogTitle>
                      <CustomAlertDialogDescription>
                        This action cannot be undone. This will permanently delete all your data including settings, quiz history, and preferences.
                        <br /><br />
                        Type "reset me" to confirm:
                      </CustomAlertDialogDescription>
                    </CustomAlertDialogHeader>
                    <div className="py-4">
                      <CustomLabel htmlFor="reset-input">Confirmation</CustomLabel>
                      <CustomInput
                        id="reset-input"
                        value={resetText}
                        onChange={(e) => setResetText(e.target.value)}
                        placeholder="Type 'reset me' to confirm"
                        className="mt-2"
                      />
                    </div>
                    <CustomAlertDialogFooter>
                      <CustomAlertDialogCancel onClick={() => { setResetText(''); setShowResetAppDialog(false); }}>Cancel</CustomAlertDialogCancel>
                      <CustomAlertDialogAction 
                        onClick={handleResetApp}
                        disabled={resetText !== 'reset me'}
                        className="bg-red-600 hover:bg-red-700 disabled:opacity-50"
                      >
                        Reset Application
                      </CustomAlertDialogAction>
                    </CustomAlertDialogFooter>
                  </CustomAlertDialogContent>
                </CustomAlertDialog>
              </div>
            </CustomCardContent>
          </CustomCard>

          {/* Privacy & Data */}
          <CustomCard>
            <CustomCardHeader>
              <CustomCardTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>Privacy & Data</span>
              </CustomCardTitle>
              <CustomCardDescription>
                Information about data usage and content generation
              </CustomCardDescription>
            </CustomCardHeader>
            <CustomCardContent>
              <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white mb-1">Local Data Storage</h4>
                    <p>All your quiz answers and session history are stored locally in your browser. No personal data is sent to external servers.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white mb-1">Question Generation</h4>
                    <p>MCQs are generated using advanced language models. Only subject names and difficulty preferences are used for question generation.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-slate-900 dark:text-white mb-1">Pakistan-Centric Content</h4>
                    <p>All generated questions are specifically designed to be relevant to Pakistan's context, culture, and CSS exam requirements.</p>
                  </div>
                </div>
              </div>
            </CustomCardContent>
          </CustomCard>

          {/* Developer Information */}
          <CustomCard>
            <CustomCardHeader>
              <CustomCardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Developer Information</span>
              </CustomCardTitle>
              <CustomCardDescription>
                About the developer and application version
              </CustomCardDescription>
            </CustomCardHeader>
            <CustomCardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div>
                    <h3 className="font-medium text-slate-900 dark:text-white">Muhammad Ahmad</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">AI Engineer</p>
                  </div>
                  <CustomButton
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open('https://www.linkedin.com/in/muhammad-ahmad-ai-developer/', '_blank')}
                    className="flex items-center space-x-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </CustomButton>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <div>
                    <h3 className="font-medium text-slate-900 dark:text-white">Application Version</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Current version of the CSS Prep application</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-semibold text-slate-900 dark:text-white">v1.0</span>
                  </div>
                </div>
              </div>
            </CustomCardContent>
          </CustomCard>
        </div>
      </motion.div>
    </div>
  );
}