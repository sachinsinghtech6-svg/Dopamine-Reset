import React from 'react';
import { Card } from '../ui/Card';

export const RecoverySkeleton: React.FC<{ onExit?: () => void }> = ({ onExit }) => {
  return (
    <div className="space-y-8 animate-pulse max-w-5xl mx-auto py-4">
      {/* Skeleton Header */}
      <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4">
        <div className="space-y-2">
          <div className="h-4 w-32 bg-surface-container-high rounded" />
          <div className="h-7 w-64 bg-surface-container rounded" />
        </div>
        <div className="h-9 w-28 bg-surface-container-high rounded-lg" />
      </div>

      {/* Skeleton Hero */}
      <Card elevated className="p-6 space-y-4">
        <div className="h-5 w-48 bg-surface-container-high rounded" />
        <div className="h-4 w-96 bg-surface-container rounded" />
        <div className="h-3 w-full bg-surface-container-high rounded-full" />
      </Card>

      {/* Skeleton 3 Bento Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card elevated className="p-6 h-44 space-y-3">
          <div className="h-4 w-24 bg-surface-container-high rounded" />
          <div className="h-12 w-12 rounded-full bg-surface-container-high" />
          <div className="h-4 w-full bg-surface-container rounded" />
        </Card>
        <Card elevated className="p-6 h-44 space-y-3">
          <div className="h-4 w-28 bg-surface-container-high rounded" />
          <div className="h-8 w-32 bg-surface-container-high rounded" />
          <div className="h-2 w-full bg-surface-container-high rounded-full" />
        </Card>
        <Card elevated className="p-6 h-44 space-y-3">
          <div className="h-4 w-24 bg-surface-container-high rounded" />
          <div className="h-8 w-28 bg-surface-container-high rounded" />
          <div className="h-4 w-full bg-surface-container rounded" />
        </Card>
      </div>

      {onExit && (
        <div className="text-center pt-4">
          <button
            type="button"
            onClick={onExit}
            className="px-4 py-2 rounded-lg bg-surface-container text-xs font-medium text-on-surface hover:bg-surface-container-high min-h-[44px]"
          >
            Exit Skeleton Preview
          </button>
        </div>
      )}
    </div>
  );
};
