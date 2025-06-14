import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-card border-t border-border py-8 text-center text-muted-foreground">
      <div className="container mx-auto px-4">
        <p>&copy; {currentYear} CodeQuest. All rights reserved.</p>
        <p className="text-sm mt-1">
          Built with Next.js, Tailwind CSS, and ❤️
        </p>
      </div>
    </footer>
  );
};

export default Footer;
