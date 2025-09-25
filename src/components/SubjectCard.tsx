import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface SubjectCardProps {
  title: string;
  description?: string;
  icon: LucideIcon;
  onClick: () => void;
  gradient?: string;
  disabled?: boolean;
}

export default function SubjectCard({ 
  title, 
  description, 
  icon: Icon, 
  onClick, 
  gradient = "from-blue-500 to-indigo-600",
  disabled = false 
}: SubjectCardProps) {
  return (
    <motion.div
      whileHover={disabled ? {} : { scale: 1.02, y: -2 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      className={`relative overflow-hidden rounded-xl bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700 ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-xl'
      } transition-all duration-300`}
      onClick={disabled ? undefined : onClick}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5`} />
      
      <div className="relative p-6">
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-lg bg-gradient-to-br ${gradient} text-white shadow-lg`}>
            <Icon className="w-6 h-6" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-1">
              {title}
            </h3>
            {description && (
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
