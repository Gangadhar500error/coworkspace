"use client";

import { Workspace } from "../data/workspaces";
import ListingCard from "./ListingCard";

interface ListingGridProps {
  workspaces: Workspace[];
  onGetQuote: (workspace: Workspace) => void;
}

export default function ListingGrid({ workspaces, onGetQuote }: ListingGridProps) {
  if (workspaces.length === 0) {
    return null; // EmptyState will be handled by parent
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {workspaces.map((workspace) => (
        <ListingCard
          key={workspace.id}
          workspace={workspace}
          onGetQuote={onGetQuote}
        />
      ))}
    </div>
  );
}
