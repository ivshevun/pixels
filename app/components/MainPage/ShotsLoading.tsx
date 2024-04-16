import ShotsGrid from "@/app/[username]/components/ShotsGrid";
import ShotSkeleton from "@/app/[username]/ShotSkeletons";
import React from "react";

export default function ShotsLoading() {
  return (
    <ShotsGrid className="mx-auto px-8 py-4">
      {Array.from(Array(12).keys()).map((num) => (
        <ShotSkeleton key={num} />
      ))}
    </ShotsGrid>
  );
}
