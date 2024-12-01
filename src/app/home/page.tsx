'use client';

import { MButton } from '@/components/button';
import ListComponent from '@/components/list';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { CirclePlus, EllipsisVertical, FilePlus, Folder, FolderOpen, FolderPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useDriveColumns, useGetDrives } from './hooks';

export default function Home() {
  const router = useRouter();

  const { data: drives } = useGetDrives();
  const columns = useDriveColumns();

  const table = useReactTable({
    data: drives?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleOpenFolder = (folderId: number) => {
    router.push(`drive/folders/${folderId}`);
  };

  return (
    <>
      <Dropdown placement="bottom-start">
        <DropdownTrigger>
          <MButton color="primary" size="md" className="mb-4" startContent={<CirclePlus />}>
            New
          </MButton>
        </DropdownTrigger>
        <DropdownMenu variant="flat" aria-label="Dropdown menu with icons">
          <DropdownItem
            showDivider
            key="new-folder"
            shortcut="⌘N"
            startContent={<FolderPlus size={20} />}
            className="mr-4"
          >
            Create folder
          </DropdownItem>
          <DropdownItem key="new-file" shortcut="⌘E" startContent={<FilePlus size={20} />} className="mr-4">
            Create file
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <h1 className="text-base font-medium text-gray-800">Recommend folder</h1>
      <div className="mt-4 grid grid-cols-4 gap-4">
        <ListComponent
          data={drives?.data.slice(0, 3) || []}
          renderItems={(item) => (
            <div
              key={item.id}
              className="col-span-1 flex items-center justify-between gap-4 rounded-xl bg-gray-200 px-3 py-2"
            >
              <div className="flex items-center gap-4">
                <Folder />
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <span className="text-sm font-normal text-gray-500">On my drive</span>
                </div>
              </div>
              <Dropdown>
                <DropdownTrigger>
                  <EllipsisVertical size={20} />
                </DropdownTrigger>
                <DropdownMenu variant="faded" aria-label="Dropdown menu with icons">
                  <DropdownItem
                    key="open"
                    startContent={<FolderOpen size={20} />}
                    onClick={() => handleOpenFolder(item.id)}
                  >
                    Open folder
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          )}
        />
      </div>
      <div className="mt-6">
        <h1 className="mb-6 text-base font-medium text-gray-800">Recommend file</h1>
        <table className="w-full">
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
      </div>
    </>
  );
}
