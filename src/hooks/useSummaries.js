import { useState } from 'react';

export const useSummaries = () => {
  const [data] = useState([]);
  return { data };
};
