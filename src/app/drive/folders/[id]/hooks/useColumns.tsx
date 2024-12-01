import { DATE_FORMAT } from '@/constants/date';
import { IDrive } from '@/services/drives';
import { TYPE } from '@/types/enum';
import { createColumnHelper } from '@tanstack/react-table';
import { format } from 'date-fns';
import { FileText, Folder } from 'lucide-react';
import { useMemo } from 'react';

const icon = {
  [TYPE.FILE]: <FileText />,
  [TYPE.FOLDER]: <Folder />,
};

const columnHelper = createColumnHelper<IDrive>();

export default function useColumnTable() {
  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Name',
        cell: (info) => {
          const { row } = info;
          return (
            <div className="flex items-center gap-2">
              {icon[row.original.type]}
              {info.getValue()}
            </div>
          );
        },
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
}
