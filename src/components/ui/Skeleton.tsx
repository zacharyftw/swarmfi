"use client";

interface SkeletonProps {
  className?: string;
}

export default function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      className={`rounded-xl animate-shimmer ${className}`}
      aria-hidden="true"
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="h-5 w-32 rounded-xl animate-shimmer" />
        <div className="h-5 w-16 rounded-full animate-shimmer" />
      </div>
      <div className="h-4 w-full rounded-xl animate-shimmer" />
      <div className="h-4 w-3/4 rounded-xl animate-shimmer" />
      <div className="flex justify-between items-end pt-2">
        <div className="h-8 w-20 rounded-xl animate-shimmer" />
        <div className="h-9 w-28 rounded-xl animate-shimmer" />
      </div>
    </div>
  );
}
