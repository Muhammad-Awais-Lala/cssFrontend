import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CustomTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue: string;
}

const CustomTabs = ({ defaultValue, children, className, ...props }: CustomTabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  const childrenArray = React.Children.toArray(children);
  const tabsList = childrenArray.find(child => React.isValidElement(child) && child.type === CustomTabsList);
  const tabsContent = childrenArray.filter(child => React.isValidElement(child) && child.type === CustomTabsContent);

  return (
    <div className={cn(className)} {...props}>
      {React.isValidElement(tabsList) && React.cloneElement(tabsList, { activeTab, setActiveTab })}
      {tabsContent.map((content, index) => 
        React.isValidElement(content) && React.cloneElement(content, { activeTab, key: index })
      )}
    </div>
  );
};
CustomTabs.displayName = "CustomTabs";

interface CustomTabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

const CustomTabsList = ({ children, className, activeTab, setActiveTab, ...props }: CustomTabsListProps) => (
  <div className
    ref={ref}
    className={cn(
      "flex justify-center bg-slate-100 dark:bg-slate-800 rounded-lg p-1 mb-4",
      className
    )}
    {...props}
  >
    {React.Children.map(children, child => 
      React.isValidElement(child) && React.cloneElement(child, { activeTab, setActiveTab })
    )}
  </div>
);
CustomTabsList.displayName = "CustomTabsList";

interface CustomTabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

const CustomTabsTrigger = React.forwardRef<HTMLButtonElement, CustomTabsTriggerProps>(
  ({ value, children, className, activeTab, setActiveTab, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors",
        activeTab === value
          ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow'
          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white',
        className
      )}
      onClick={() => setActiveTab && setActiveTab(value)}
      {...props}
    >
      {children}
    </button>
  )
);
CustomTabsTrigger.displayName = "CustomTabsTrigger";

interface CustomTabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  activeTab?: string;
}

const CustomTabsContent = ({ value, children, className, activeTab, ...props }: CustomTabsContentProps) => (
  activeTab === value ? <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
    className={cn(className)}
    {...props}
  >{children}</motion.div> : null
);
CustomTabsContent.displayName = "CustomTabsContent";

export { CustomTabs, CustomTabsList, CustomTabsTrigger, CustomTabsContent };