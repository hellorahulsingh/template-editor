export const formatKeyLabel = key =>
  key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
