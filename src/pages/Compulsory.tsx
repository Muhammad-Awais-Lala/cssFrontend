import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BookOpen, FileText, Lightbulb, Globe, Flag, Star, Book, Brain, X } from 'lucide-react'; // Added X for modal close
import Breadcrumbs from '../components/Breadcrumbs';
import SubjectCard from '../components/SubjectCard';
import { useState } from 'react';
import { CustomButton } from '@/components/CustomButton'; // Changed import

// Placeholder for Dialog functionality - will be replaced with custom later
const CustomModal = ({ open, onOpenChange, title, children }: { open: boolean; onOpenChange: (open: boolean) => void; title: string; children: React.ReactNode }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="relative w-full max-w-md rounded-lg bg-white dark:bg-slate-800 p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{title}</h2>
          <CustomButton variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
            <X className="w-5 h-5" />
          </CustomButton>
        </div>
        {children}
      </div>
    </div>
  );
};

const compulsorySubjects = [
  {
    name: 'English Essay',
    slug: 'english-essay',
    icon: FileText,
    description: 'Essay writing skills with Pakistani contexts',
    gradient: 'from-blue-500 to-blue-600',
  },
  {
    name: 'English (Precis & Composition)',
    slug: 'english-precis-composition',
    icon: BookOpen,
    description: 'Comprehension and composition skills',
    gradient: 'from-indigo-500 to-indigo-600',
  },
  {
    name: 'General Science & Ability',
    slug: 'general-science-ability',
    icon: Lightbulb,
    description: 'Science concepts with Pakistani applications',
    gradient: 'from-purple-500 to-purple-600',
  },
  {
    name: 'Current Affairs',
    slug: 'current-affairs',
    icon: Globe,
    description: 'Pakistan and international current events',
    gradient: 'from-green-500 to-green-600',
  },
  {
    name: 'Pakistan Affairs',
    slug: 'pakistan-affairs',
    icon: Flag,
    description: 'History, culture, and governance of Pakistan',
    gradient: 'from-emerald-500 to-emerald-600',
  },
  {
    name: 'Islamic Studies / Comparative Religion',
    slug: 'islamic-studies',
    icon: Star,
    description: 'Islamic principles and comparative religious studies',
    gradient: 'from-teal-500 to-teal-600',
  },
];

const generalScienceBooks = [
  {
    title: 'CSS General Science & Ability',
    author: 'Jahangir World Times',
    description: 'Comprehensive coverage of general science topics for CSS',
  },
  {
    title: 'Encyclopedia of General Science',
    author: 'Caravan',
    description: 'Detailed encyclopedia covering all science subjects',
  },
  {
    title: 'General Knowledge & Science',
    author: 'Dogar Brothers',
    description: 'Essential general knowledge and science concepts',
  },
  {
    title: 'Advanced General Science',
    author: 'IlMI',
    description: 'Advanced level general science for competitive exams',
  },
];

export default function Compulsory() {
  const navigate = useNavigate();
  const [showGeneralScienceModal, setShowGeneralScienceModal] = useState(false);

  const handleSubjectClick = (subject: typeof compulsorySubjects[0]) => {
    if (subject.slug === 'general-science-ability') {
      setShowGeneralScienceModal(true);
    } else {
      navigate(`/quiz/${subject.slug}`);
    }
  };

  const handleGeneralScienceMCQ = () => {
    setShowGeneralScienceModal(false);
    navigate('/quiz/general-science-ability');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: 'Compulsory Subjects' }]} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Compulsory Subjects
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Master the six compulsory subjects required for all CSS candidates. 
            Each subject is designed with Pakistan-specific content and contexts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {compulsorySubjects.map((subject, index) => (
            <motion.div
              key={subject.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <SubjectCard
                title={subject.name}
                description={subject.description}
                icon={subject.icon}
                gradient={subject.gradient}
                onClick={() => handleSubjectClick(subject)}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* General Science & Ability Modal */}
      <CustomModal // Changed to CustomModal
        open={showGeneralScienceModal} 
        onOpenChange={setShowGeneralScienceModal}
        title="General Science & Ability"
      >
        <div className="space-y-4">
          <p className="text-center text-slate-600 dark:text-slate-400">
            Choose how you'd like to study this subject:
          </p>
          
          <div className="grid grid-cols-2 gap-4">
            <CustomButton // Changed to CustomButton
              variant="outline"
              className="h-24 flex flex-col items-center justify-center space-y-2"
              onClick={() => setShowGeneralScienceModal(false)}
            >
              <Book className="w-6 h-6" />
              <span>Books</span>
            </CustomButton>
            
            <CustomButton // Changed to CustomButton
              className="h-24 flex flex-col items-center justify-center space-y-2 bg-blue-600 hover:bg-blue-700"
              onClick={handleGeneralScienceMCQ}
            >
              <Brain className="w-6 h-6" />
              <span>MCQs</span>
            </CustomButton>
          </div>
          
          {/* Books List */}
          <div className="mt-6 space-y-3 max-h-60 overflow-y-auto">
            <h3 className="font-semibold text-slate-900 dark:text-white">Recommended Books:</h3>
            {generalScienceBooks.map((book, index) => (
              <div key={index} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <h4 className="font-medium text-slate-900 dark:text-white">{book.title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">{book.author}</p>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-1">{book.description}</p>
              </div>
            ))}
          </div>
        </div>
      </CustomModal>
    </div>
  );
}