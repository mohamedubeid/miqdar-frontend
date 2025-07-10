'use client';

import { useEffect } from 'react';
import AOS from 'aos';

export const AOSProvider = () => {
  useEffect(() => {
    AOS.init({
      once: true,
      duration: 1000,
      disable: window.innerWidth < 768,
    });
  }, []);

  return null;
};
