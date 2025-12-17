'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type DownloadCountContextType = {
  downloadCount: number | null;
  setDownloadCount: (count: number) => void;
};

const DownloadCountContext = createContext<DownloadCountContextType | null>(null);

export const useDownloadCount = () => {
  const context = useContext(DownloadCountContext);
  if (!context) {
    throw new Error('useDownloadCount must be used within DownloadCountProvider');
  }
  return context;
};

type DownloadCountProviderProps = {
  initialCount: number | null;
  children: ReactNode;
};

export const DownloadCountProvider = ({ initialCount, children }: DownloadCountProviderProps) => {
  const [downloadCount, setDownloadCount] = useState<number | null>(initialCount);

  useEffect(() => {
    setDownloadCount(initialCount);
  }, [initialCount]);

  return (
    <DownloadCountContext.Provider value={{ downloadCount, setDownloadCount }}>
      {children}
    </DownloadCountContext.Provider>
  );
};
