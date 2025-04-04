
import React from 'react';

const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex w-full mb-4 justify-start fade-in">
      <div className="bg-accent rounded-2xl rounded-tl-none px-4 py-3 shadow-md flex items-center">
        <div className="flex space-x-1">
          <div className="typing-dot h-2 w-2 rounded-full bg-muted-foreground"></div>
          <div className="typing-dot h-2 w-2 rounded-full bg-muted-foreground"></div>
          <div className="typing-dot h-2 w-2 rounded-full bg-muted-foreground"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
