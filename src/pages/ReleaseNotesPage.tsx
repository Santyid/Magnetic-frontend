import { useState } from 'react';
import TopBanner from '../components/layout/TopBanner';
import FAQDrawer from '../components/help/FAQDrawer';
import ChatDrawer from '../components/ai/ChatDrawer';
import ReleaseNotes from '../components/dashboard/ReleaseNotes';

export default function ReleaseNotesPage() {
  const [showFAQ, setShowFAQ] = useState(false);
  const [showAI, setShowAI] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <TopBanner
        onAIClick={() => setShowAI((prev) => !prev)}
        onHelpClick={() => setShowFAQ(true)}
      />

      <main className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <ReleaseNotes />
      </main>

      {showAI && <ChatDrawer onClose={() => setShowAI(false)} />}
      {showFAQ && <FAQDrawer onClose={() => setShowFAQ(false)} />}
    </div>
  );
}
