import type React from 'react';
import Header from './Header';
import Footer from './Footer';
import LeftSidebar from './LeftSidebar'; // New import
import RightSidebar from './RightSidebar'; // New import

interface AppLayoutProps {
  children: React.ReactNode;
  hideSidebars?: boolean; // Prop to control sidebar visibility for certain pages like login/signup
  mainContentClassName?: string;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, hideSidebars = false, mainContentClassName }) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <div className="flex-grow container mx-auto flex w-full">
        {!hideSidebars && <LeftSidebar />}
        <main className={`flex-grow ${hideSidebars ? 'w-full' : 'lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl'} py-6 px-4 ${mainContentClassName || ''}`}>
          {children}
        </main>
        {!hideSidebars && <RightSidebar />}
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
