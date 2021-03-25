import React, { useEffect } from 'react';
import toast from 'react-hot-toast';

import { useAuth } from '../lib/useAuth';

export default function ToasterLayout() {
  const { user, message, error } = useAuth();

  useEffect(() => {
    if (message) {
      toast.success(message, { duration: 4000 });
    }
  }, [message]);

  useEffect(() => {
    if (error) {
      toast.error(error, { duration: 4000 });
    }
  }, [error]);

  return <div></div>;
}
