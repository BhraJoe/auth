import React from 'react';
import Toast from 'react-native-toast-message';

export default function ToastProvider() {
  return (
    <Toast
      position="top"
      topOffset={650}
    />
  );
}

export { Toast };