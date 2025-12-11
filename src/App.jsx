import React, { useState } from 'react';
import AuthModal from './components/AuthModal';
import CakeStage from './components/CakeStage';
import PostCutSection from './components/PostCutSection';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPostCut, setShowPostCut] = useState(false);

  React.useEffect(() => {
    window.showPostCutSection = () => {
      setShowPostCut(true);
    };
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden bg-white relative">
      {showPostCut ? (
        <div className="w-full h-full overflow-y-auto">
          <PostCutSection />
        </div>
      ) : (
        <>
          {!isAuthenticated ? (
            <AuthModal onAuthenticated={() => setIsAuthenticated(true)} />
          ) : (
            <CakeStage />
          )}
        </>
      )}
    </div>
  );
}

export default App;
