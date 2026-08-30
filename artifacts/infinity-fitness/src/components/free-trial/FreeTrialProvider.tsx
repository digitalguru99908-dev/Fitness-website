import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { FreeTrialModal } from './FreeTrialModal';

interface FreeTrialModalContextValue {
  openFreeTrial: () => void;
}

const FreeTrialModalContext = createContext<FreeTrialModalContextValue | null>(null);

export function FreeTrialModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  const openFreeTrial = useCallback(() => setOpen(true), []);

  const value = useMemo(() => ({ openFreeTrial }), [openFreeTrial]);

  return (
    <FreeTrialModalContext.Provider value={value}>
      {children}
      <FreeTrialModal open={open} onClose={() => setOpen(false)} />
    </FreeTrialModalContext.Provider>
  );
}

export function useFreeTrialModal() {
  const ctx = useContext(FreeTrialModalContext);
  if (!ctx) {
    throw new Error('useFreeTrialModal must be used within FreeTrialModalProvider');
  }
  return ctx;
}
