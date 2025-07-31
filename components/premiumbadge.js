import React from "react";

export default function PremiumBadge({ isPremium }) {
  if (!isPremium) return null;
  return (
    <span className="ml-2 bg-yellow-400 text-xs text-white px-2 py-1 rounded">Premium</span>
  );
}
