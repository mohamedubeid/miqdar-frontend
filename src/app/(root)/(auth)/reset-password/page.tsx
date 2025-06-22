import { Suspense } from 'react';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';

const Page = () => {
return (
    <Suspense fallback={<div>جاري التحميل...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}

export default Page;