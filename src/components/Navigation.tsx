import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Home, BookOpen, Layers, Clock, Settings, Sun, Moon } from 'lucide-react';
import { CustomButton } from '@/components/CustomButton';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'framer-motion';
import { CustomSheet, CustomSheetTrigger, CustomSheetContent, CustomSheetHeader, CustomSheetTitle } from '@/components/CustomSheet'; // Updated import

// Custom DropdownMenu implementation
const CustomDropdownMenu = ({ children, trigger, onClose }: { children: React.ReactNode, trigger: React.ReactNode, onClose?: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  return (
    <div className="relative">
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <>
          {/* Backdrop to close dropdown when clicking outside */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={handleClose}
          />
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-surface ring-1 ring-black/10 dark:ring-white/10 focus:outline-none z-20"
            style={{ backgroundColor: 'var(--color-surface)' }}
          >
            {children}
          </motion.div>
        </>
      )}
    </div>
  );
};

const navItems = [
  { path: '/home', label: 'Home', icon: Home },
  { path: '/compulsory', label: 'Compulsory Subjects', icon: BookOpen },
  { path: '/optional', label: 'Optional Subjects', icon: Layers },
  { path: '/sessions', label: 'Sessions', icon: Clock },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const ThemeIcon = theme === 'light' ? Sun : Moon;

  const themeOptions = [
    { value: 'light', label: 'Light', icon: Sun },
    { value: 'dark', label: 'Dark', icon: Moon },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/home" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CSS</span>
              </div>
              <span className="font-bold text-xl text-slate-900 dark:text-white">
                CSS Prep
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link key={item.path} to={item.path}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <CustomButton
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      className={`flex items-center space-x-2 ${
                        isActive 
                          ? 'bg-[var(--color-primary)] hover:bg-[var(--color-primary-600)] text-white' 
                          : 'text-text-primary hover:bg-accent'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </CustomButton>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-2">
            <CustomDropdownMenu
              trigger={
                <CustomButton variant="ghost" size="sm" className="w-9 h-9 p-0">
                  <ThemeIcon className="w-4 h-4" />
                </CustomButton>
              }
              onClose={() => {}}
            >
              <div className="py-1">
                {themeOptions.map((option) => {
                  const Icon = option.icon;
                  return (
                    <CustomButton
                      key={option.value}
                      variant={theme === option.value ? "default" : "ghost"}
                      className="w-full justify-start text-sm px-4 py-2"
                      onClick={(e) => {
                        setTheme(option.value as any);
                        // Auto-close the dropdown by dispatching a click on backdrop
                        (e.currentTarget.closest('.relative')?.querySelector('.fixed.inset-0') as HTMLElement)?.click?.();
                      }}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {option.label}
                    </CustomButton>
                  );
                })}
              </div>
            </CustomDropdownMenu>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <CustomSheet open={isOpen} onOpenChange={setIsOpen} side="right">
                <CustomSheetTrigger onClick={() => setIsOpen(true)}>
                  <CustomButton 
                    variant="ghost" 
                    size="sm" 
                    className="w-9 h-9 p-0 text-slate-700 dark:text-slate-200" 
                    aria-label="Open navigation menu"
                  >
                    <Menu className="w-5 h-5" />
                  </CustomButton>
                </CustomSheetTrigger>
                <CustomSheetContent className="w-64">
                  <CustomSheetHeader>
                    <CustomSheetTitle>Navigation</CustomSheetTitle>
                  </CustomSheetHeader>
                  <div className="flex flex-col space-y-4 mt-8">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = location.pathname === item.path;
                      
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setIsOpen(false)}
                        >
                          <CustomButton
                            variant={isActive ? "default" : "ghost"}
                            className={`w-full justify-start ${
                              isActive 
                                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                                : 'text-slate-600 dark:text-slate-300'
                            }`}
                          >
                            <Icon className="w-4 h-4 mr-2" />
                            {item.label}
                          </CustomButton>
                        </Link>
                      );
                    })}
                  </div>
                </CustomSheetContent>
              </CustomSheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}