// src/components/Toast.js
import React from 'react';

export default function Toast({ data, onClose }) {
  return (
    <div className="toast" onAnimationEnd={onClose}>
        {data?.user} {">>>"} {data?.message}
    </div>
  );
}
