import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, Atom, Users, History, Scale, Brain, Newspaper, X } from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import SubjectCard from '../components/SubjectCard';
import { CustomButton } from '@/components/CustomButton';
import { CustomModal } from '@/components/CustomModal'; // Updated import

const optionalGroups = [
  {
    name: 'Group I',
    title: 'Business & Administration',
    icon: Calculator,
    description: 'Choose 1 subject (200 marks)',
    gradient: 'from-blue-500 to-blue-600',
    subjects: [
      { name: 'Accountancy & Auditing', slug: 'accountancy-auditing' },
      { name: 'Economics', slug: 'economics' },
      { name: 'Business Administration', slug: 'business-administration' },
      { name: 'Public Administration', slug: 'public-administration' },
      { name: 'Political Science', slug: 'political-science' },
      { name: 'International Relations', slug: 'international-relations' },
    ],
  },
  {
    name: 'Group II',
    title: 'Pure Sciences',
    icon: Atom,
    description: 'Choose 1 subject (200 marks)',
    gradient: 'from-purple-500 to-purple-600',
    subjects: [
      { name: 'Physics', slug: 'physics' },
      { name: 'Chemistry', slug: 'chemistry' },
      { name: 'Applied Mathematics', slug: 'applied-mathematics' },
      { name: 'Pure Mathematics', slug: 'pure-mathematics' },
      { name: 'Statistics', slug: 'statistics' },
      { name: 'Geology', slug: 'geology' },
    ],
  },
  {
    name: 'Group III',
    title: 'Political Sciences',
    icon: Users,
    description: 'Choose 1 subject (200 marks)',
    gradient: 'from-green-500 to-green-600',
    subjects: [
      { name: 'Business Administration', slug: 'business-administration' },
      { name: 'Political Science', slug: 'political-science' },
      { name: 'International Relations', slug: 'international-relations' },
      { name: 'Governance & Public Policies', slug: 'governance-public-policies' },
      { name: 'Comparative Politics', slug: 'comparative-politics' },
    ],
  },
  {
    name: 'Group IV',
    title: 'History',
    icon: History,
    description: 'Choose 1 subject (200 marks)',
    gradient: 'from-orange-500 to-orange-600',
    subjects: [
      { name: 'History of Pakistan & India', slug: 'history-pakistan-india' },
      { name: 'Islamic History & Culture', slug: 'islamic-history-culture' },
      { name: 'British History', slug: 'british-history' },
      { name: 'European History', slug: 'european-history' },
      { name: 'History of USA', slug: 'history-usa' },
    ],
  },
  {
    name: 'Group V',
    title: 'Law & Philosophy',
    icon: Scale,
    description: 'Choose subjects up to 200 marks (100 marks each)',
    gradient: 'from-red-500 to-red-600',
    subjects: [
      { name: 'Law', slug: 'law' },
      { name: 'Constitutional Law', slug: 'constitutional-law' },
      { name: 'International Law', slug: 'international-law' },
      { name: 'Muslim Law & Jurisprudence', slug: 'muslim-law-jurisprudence' },
      { name: 'Mercantile Law', slug: 'mercantile-law' },
      { name: 'Criminology', slug: 'criminology' },
      { name: 'Philosophy', slug: 'philosophy' },
    ],
  },
  {
    name: 'Group VI',
    title: 'Sciences & Literature',
    icon: Brain,
    description: 'Choose subjects up to 200 marks (100 marks each)',
    gradient: 'from-indigo-500 to-indigo-600',
    subjects: [
      { name: 'Agriculture & Forestry', slug: 'agriculture-forestry' },
      { name: 'Botany', slug: 'botany' },
      { name: 'Zoology', slug: 'zoology' },
      { name: 'Environmental Science', slug: 'environmental-science' },
      { name: 'Gender Studies', slug: 'gender-studies' },
      { name: 'Urdu Literature', slug: 'urdu-literature' },
      { name: 'English Literature', slug: 'english-literature' },
    ],
  },
  {
    name: 'Group VII',
    title: 'Social Sciences & Languages',
    icon: Newspaper,
    description: 'Choose subjects up to 200 marks (100 marks each)',
    gradient: 'from-teal-500 to-teal-600',
    subjects: [
      { name: 'Journalism & Mass Communication', slug: 'journalism-mass-communication' },
      { name: 'Psychology', slug: 'psychology' },
      { name: 'Geography', slug: 'geography' },
      { name: 'Sociology', slug: 'sociology' },
      { name: 'Anthropology', slug: 'anthropology' },
      { name: 'Punjabi', slug: 'punjabi' },
      { name: 'Sindhi', slug: 'sindhi' },
      { name: 'Pashto', slug: 'pashto' },
      { name: 'Balochi', slug: 'balochi' },
      { name: 'Persian', slug: 'persian' },
      { name: 'Arabic', slug: 'arabic' },
    ],
  },
];

export default function Optional() {
  const navigate = useNavigate();
  const [selectedGroup, setSelectedGroup] = useState<typeof optionalGroups[0] | null>(null);

  const handleGroupClick = (group: typeof optionalGroups[0]) => {
    setSelectedGroup(group);
  };

  const handleSubjectClick = (subject: { name: string; slug: string }) => {
    setSelectedGroup(null);
    navigate(`/quiz/${subject.slug}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs items={[{ label: 'Optional Subjects' }]} />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Optional Subjects
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Choose from seven specialized groups covering diverse academic disciplines. 
            Each group contains subjects with Pakistan-focused content and examples.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {optionalGroups.map((group, index) => (
            <motion.div
              key={group.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <SubjectCard
                title={group.title}
                description={group.description}
                icon={group.icon}
                gradient={group.gradient}
                onClick={() => handleGroupClick(group)}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Group Subjects Modal */}
      <CustomModal
        open={!!selectedGroup} 
        onOpenChange={() => setSelectedGroup(null)}
        title={`${selectedGroup?.name}: ${selectedGroup?.title}`}
        contentClassName="max-w-lg"
      >
        <div className="space-y-3">
          <p className="text-center text-slate-600 dark:text-slate-400 mb-6">
            {selectedGroup?.description}
          </p>
          <p className="text-center text-sm text-slate-500 dark:text-slate-500 mb-6">
            Select a subject to start practicing:
          </p>
          
          {selectedGroup?.subjects.map((subject, index) => (
            <motion.div
              key={subject.slug}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <CustomButton
                variant="outline"
                className="w-full justify-start h-auto p-4 text-left"
                onClick={() => handleSubjectClick(subject)}
              >
                <div>
                  <div className="font-medium text-slate-900 dark:text-white">
                    {subject.name}
                  </div>
                </div>
              </CustomButton>
            </motion.div>
          ))}
        </div>
      </CustomModal>
    </div>
  );
}