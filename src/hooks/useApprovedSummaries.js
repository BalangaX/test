import { useState } from 'react';

export const useApprovedSummaries = () => {
  const [data] = useState([]);
  return { data };
};
