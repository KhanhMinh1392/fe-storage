import { getDrives } from '@/services/drives';
import { useQuery } from '@tanstack/react-query';

export const useGetDrives = (id: string) => {
  const query = useQuery({
    queryFn: () => getDrives(id),
    queryKey: ['nested-drives'],
  });
  return query;
};
