import { motion } from 'framer-motion';
import { BookOpen, Layers, ArrowRight, Target, Trophy, Users, Clock, CheckCircle, AlertCircle, BookMarked, GraduationCap, FileText, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const quickAccessSubjects = [
  { name: 'Pakistan Affairs', slug: 'pakistan-affairs', color: 'bg-green-500' },
  { name: 'Current Affairs', slug: 'current-affairs', color: 'bg-blue-500' },
  { name: 'General Science & Ability', slug: 'general-science-ability', color: 'bg-purple-500' },
  { name: 'Islamic Studies', slug: 'islamic-studies', color: 'bg-emerald-500' },
];

const features = [
  {
    icon: Target,
    title: 'Pakistan-Centric Content',
    description: 'All MCQs are specifically designed for Pakistan\'s CSS exam with local context and examples.',
  },
  {
    icon: BookMarked,
    title: 'Comprehensive Coverage',
    description: 'Complete coverage of all compulsory and optional subjects with detailed explanations.',
  },
  {
    icon: Trophy,
    title: 'Track Your Progress',
    description: 'Monitor your performance with detailed session history and analytics.',
  },
];

const examGuideSteps = [
  {
    step: 1,
    title: 'Understand the Exam Structure',
    description: 'CSS exam consists of written examination (1200 marks) and psychological assessment, medical examination, and interview.',
    icon: FileText,
  },
  {
    step: 2,
    title: 'Choose Your Optional Subjects Wisely',
    description: 'Select optional subjects based on your academic background and interest. Each group has different marking schemes.',
    icon: BookOpen,
  },
  {
    step: 3,
    title: 'Master Compulsory Subjects',
    description: 'Focus on the six compulsory subjects: English Essay, English Precis & Composition, General Science, Current Affairs, Pakistan Affairs, and Islamic Studies.',
    icon: GraduationCap,
  },
  {
    step: 4,
    title: 'Practice Regularly',
    description: 'Consistent practice with MCQs and essay writing is key to success. Aim for at least 3-4 hours of daily study.',
    icon: Clock,
  },
  {
    step: 5,
    title: 'Stay Updated',
    description: 'Keep yourself updated with current affairs, especially those related to Pakistan and international relations.',
    icon: AlertCircle,
  },
  {
    step: 6,
    title: 'Take Mock Tests',
    description: 'Regular assessment through mock tests helps identify weak areas and improves time management.',
    icon: Award,
  },
];

const eligibilityRequirements = [
  'Pakistani citizen aged 21-30 years',
  'Bachelor\'s degree (at least 2nd division) from a recognized university',
  'Good physical and mental health',
  'No criminal record or involvement in anti-state activities',
  'Proficiency in Urdu and English languages',
];

const subjectSelectionGuide = {
  compulsory: [
    'English Essay (100 marks) - Focus on current issues, social problems, and analytical writing',
    'English Precis & Composition (100 marks) - Comprehension, grammar, and composition skills',
    'General Science & Ability (100 marks) - Basic science concepts and general knowledge',
    'Current Affairs (100 marks) - National and international current events',
    'Pakistan Affairs (100 marks) - History, culture, geography, and governance of Pakistan',
    'Islamic Studies/Comparative Religion (100 marks) - Islamic principles and comparative studies',
  ],
  optional: [
    'Group I & III: Choose 1 subject (200 marks) - Business, Political Science, International Relations',
    'Group II: Choose 1 subject (200 marks) - Pure Sciences like Physics, Chemistry, Mathematics',
    'Group IV: Choose 1 subject (200 marks) - History subjects with focus on different regions/periods',
    'Groups V, VI, VII: Choose subjects totaling 200 marks (100 marks each) - Law, Literature, Social Sciences',
  ],
};

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
            Master the{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              CSS Exam
            </span>
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full mb-6"></div>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto mb-10 leading-relaxed"
        >
          Your comprehensive platform for Pakistan's Central Superior Services exam preparation. 
          Practice with Pakistan-centric MCQs covering all compulsory and optional subjects.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <Link to="/compulsory">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300">
              Start Practicing
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
          </Link>
          <Link to="/optional">
            <Button variant="outline" size="lg" className="px-10 py-4 text-lg border-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300">
              Explore Subjects
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Main Cards */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="grid md:grid-cols-2 gap-8 mb-20"
      >
        <Link to="/compulsory">
          <motion.div
            whileHover={{ scale: 1.03, y: -8 }}
            whileTap={{ scale: 0.98 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 p-10 text-white shadow-2xl cursor-pointer group"
          >
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
            <motion.div
              className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <div className="relative z-10">
              <BookOpen className="w-16 h-16 mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h2 className="text-3xl font-bold mb-4">Compulsory Subjects</h2>
              <p className="text-blue-100 mb-6 text-lg">
                Master the six core subjects required for all CSS candidates with Pakistan-focused content
              </p>
              <div className="flex items-center text-blue-100 group-hover:text-white transition-colors">
                <span className="text-lg font-medium">Start Practicing</span>
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </div>
          </motion.div>
        </Link>

        <Link to="/optional">
          <motion.div
            whileHover={{ scale: 1.03, y: -8 }}
            whileTap={{ scale: 0.98 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-500 via-purple-600 to-pink-700 p-10 text-white shadow-2xl cursor-pointer group"
          >
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
            <motion.div
              className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full"
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />
            <div className="relative z-10">
              <Layers className="w-16 h-16 mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h2 className="text-3xl font-bold mb-4">Optional Subjects</h2>
              <p className="text-purple-100 mb-6 text-lg">
                Choose from 7 specialized groups covering diverse academic disciplines
              </p>
              <div className="flex items-center text-purple-100 group-hover:text-white transition-colors">
                <span className="text-lg font-medium">Explore Groups</span>
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
              </div>
            </div>
          </motion.div>
        </Link>
      </motion.div>

      {/* CSS Exam Guide Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.0 }}
        className="mb-20"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Complete CSS Exam Guide
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            Everything you need to know about the CSS examination process, eligibility, and preparation strategy
          </p>
        </div>

        <Tabs defaultValue="guide" className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-8 h-auto">
            <TabsTrigger value="guide" className="text-sm sm:text-lg py-2 sm:py-3 px-2 sm:px-4">
              <span className="hidden sm:inline">Preparation Guide</span>
              <span className="sm:hidden">Guide</span>
            </TabsTrigger>
            <TabsTrigger value="subjects" className="text-sm sm:text-lg py-2 sm:py-3 px-2 sm:px-4">
              <span className="hidden sm:inline">Subject Selection</span>
              <span className="sm:hidden">Subjects</span>
            </TabsTrigger>
            <TabsTrigger value="eligibility" className="text-sm sm:text-lg py-2 sm:py-3 px-2 sm:px-4">
              <span className="hidden sm:inline">Eligibility & Rules</span>
              <span className="sm:hidden">Rules</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="guide" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {examGuideSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-lg transition-all duration-300 border-l-4 border-l-blue-500">
                      <CardHeader>
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                            <Icon className="w-5 h-5 text-blue-600" />
                          </div>
                          <span className="text-sm font-semibold text-blue-600 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                            Step {step.step}
                          </span>
                        </div>
                        <CardTitle className="text-lg">{step.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-slate-600 dark:text-slate-400">{step.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="subjects" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    <span>Compulsory Subjects (600 marks)</span>
                  </CardTitle>
                  <CardDescription>All candidates must appear in these subjects</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {subjectSelectionGuide.compulsory.map((subject, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-start space-x-3"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-700 dark:text-slate-300">{subject}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Layers className="w-5 h-5 text-purple-600" />
                    <span>Optional Subjects (600 marks)</span>
                  </CardTitle>
                  <CardDescription>Choose subjects based on your background</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {subjectSelectionGuide.optional.map((subject, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-start space-x-3"
                      >
                        <CheckCircle className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-700 dark:text-slate-300">{subject}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="eligibility" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-green-600" />
                  <span>Eligibility Requirements</span>
                </CardTitle>
                <CardDescription>Basic requirements to appear in CSS examination</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {eligibilityRequirements.map((requirement, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700 dark:text-slate-300">{requirement}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertCircle className="w-5 h-5 text-orange-600" />
                  <span>Important Rules & Regulations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-slate-700 dark:text-slate-300">
                  <p><strong>Application Process:</strong> Online application through FPSC website during specified period</p>
                  <p><strong>Examination Pattern:</strong> Written examination followed by psychological assessment, medical examination, and interview</p>
                  <p><strong>Passing Criteria:</strong> Minimum 50% marks in aggregate and 40% in each compulsory subject</p>
                  <p><strong>Attempts:</strong> Maximum 3 attempts allowed (age permitting)</p>
                  <p><strong>Medical Standards:</strong> Candidates must meet prescribed medical and physical standards</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Quick Access */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="mb-20"
      >
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
          Quick Access to Popular Subjects
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {quickAccessSubjects.map((subject, index) => (
            <Link key={subject.slug} to={`/quiz/${subject.slug}`}>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className={`${subject.color} text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer`}
              >
                {subject.name}
              </motion.div>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="grid md:grid-cols-3 gap-8"
      >
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="text-center p-8 rounded-2xl bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
