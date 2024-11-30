import { getDrives } from '@/services/drives';
import { useQuery } from '@tanstack/react-query';

export const useGetDrives = () => {
  const query = useQuery({
    queryFn: getDrives,
    queryKey: ['drives'],
  });
  return query;
};
