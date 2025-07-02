'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

const GoogleLoginErrorToast = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  useEffect(() => {
    if (error) {
      toast.error("فشل تسجيل الدخول عبر جوجل");

      // Clean up the URL
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('error');
      window.history.replaceState({}, '', newUrl.toString());
    }
  }, [error]);

  return null; // No visual element needed
};

export default GoogleLoginErrorToast;
