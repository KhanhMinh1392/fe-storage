'use client';

import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/breadcrumbs';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import useColumnTable from './hooks/useColumns';
import Empty from '@/components/empty';
import { useGetDrives } from './hooks/useGetDrives';

export default function Folder() {
  const router = useRouter();
  const param = useParams<{ id: string }>();
  const folderId = param.id;
  const { data: drives, isFetching } = useGetDrives(folderId);

  const columns = useColumnTable();

  const table = useReactTable({
    data: drives?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleBackPreviousRoute = () => {
    router.back();
  };

  if (isFetching) return;

  return (
    <>
      <Breadcrumbs size="lg">
        <BreadcrumbItem onPress={handleBackPreviousRoute}>My Drive</BreadcrumbItem>
        <BreadcrumbItem>Folder {folderId}</BreadcrumbItem>
      </Breadcrumbs>
      {drives?.data?.length === 0 ? (
        <Empty />
      ) : (
        <table className="mt-5 w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="p-4 text-left text-sm">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-t">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-3 text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.footer, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </table>
      )}
    </>
  );
}
