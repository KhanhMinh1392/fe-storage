import { IDrive } from '@/services/drives';
import { createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';
import { format } from 'date-fns';
import { DATE_FORMAT } from '@/constants/date';

const columnHelper = createColumnHelper<IDrive>();

export const useDriveColumns = () => {
  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Name',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('type', {
        header: 'Type',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('size', {
        header: 'Size',
        cell: (info) => info.getValue() ?? '0Mb',
      }),
      columnHelper.accessor('created_at', {
        header: 'Created At',
        cell: (info) => format(info.getValue(), DATE_FORMAT.DDMMYYYY_HHMM),
      }),
    ],
    [],
  );
  return columns;
};
