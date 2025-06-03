"use client";

export default function BackButton({ children, className }) {
  return (
    <button
      type="button"
      onClick={() => window.history.back()}
      className={className}
    >
      {children}
    </button>
  );
}
