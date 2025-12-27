'use client';

import type { ColumnDef, SortingState } from '@tanstack/react-table';
import { useQuery } from '@tanstack/react-query';
import {

  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,

  useReactTable,
} from '@tanstack/react-table';
import dayjs from 'dayjs';
import { ArrowUpDown } from 'lucide-react';
import { useState } from 'react';
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '~/components/ui/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table';
import { hono } from '~/lib/hono';

interface PageviewRecord {
  visitorId: string
  path: string
  date: string
  referrer: string | null
  device: string | null
  browser: string | null
  os: string | null
  country: string | null
}

const columns: ColumnDef<PageviewRecord>[] = [
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='h-8 px-2'
        >
          日期
          <ArrowUpDown className='ml-2 size-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      return dayjs(row.getValue('date')).format('YYYY-MM-DD');
    },
  },
  {
    accessorKey: 'path',
    header: '页面路径',
    cell: ({ row }) => {
      return <span className='font-mono text-sm'>{row.getValue('path')}</span>;
    },
  },
  {
    accessorKey: 'device',
    header: '设备',
  },
  {
    accessorKey: 'browser',
    header: '浏览器',
  },
  {
    accessorKey: 'os',
    header: '操作系统',
  },
  {
    accessorKey: 'referrer',
    header: '来源',
    cell: ({ row }) => {
      const referrer = row.getValue('referrer') as string | null;
      if (!referrer)
        return '-';
      try {
        const url = new URL(referrer);
        return <span className='text-muted-foreground text-sm'>{url.hostname}</span>;
      }
      catch {
        return <span className='text-muted-foreground text-sm'>{referrer}</span>;
      }
    },
  },
];

export function AnalyticsTable() {
  const [page, setPage] = useState(1);
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'date', desc: true },
  ]);

  const { data, isLoading } = useQuery({
    queryKey: ['analytics-pageviews', page],
    queryFn: async () => {
      const response = await hono.api.analytics.pageviews.$get({
        query: {
          page: page.toString(),
          limit: '20',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch pageviews');
      }
      return response.json();
    },
  });

  const table = useReactTable({
    data: data?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
    manualPagination: true,
    pageCount: data?.pagination?.totalPages || 0,
  });

  if (isLoading) {
    return (
      <Card className='p-5'>
        <h3 className='mb-4 text-lg font-semibold'>访问记录</h3>
        <div className='h-96 animate-pulse rounded bg-muted' />
      </Card>
    );
  }

  if (!data?.success || !data.data) {
    return (
      <Card className='p-5'>
        <h3 className='mb-4 text-lg font-semibold'>访问记录</h3>
        <div className='text-muted-foreground text-center'>无法加载访问记录</div>
      </Card>
    );
  }

  const { pagination } = data;

  return (
    <Card className='p-5'>
      <div className='mb-4 flex items-center justify-between'>
        <h3 className='text-lg font-semibold'>访问记录</h3>
        <div className='text-muted-foreground text-sm'>
          共
          {' '}
          {pagination.total.toLocaleString()}
          {' '}
          条记录
        </div>
      </div>

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length
              ? (
                  table.getRowModel().rows.map(row => (
                    <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                      {row.getVisibleCells().map(cell => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                )
              : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className='h-24 text-center'>
                      暂无数据
                    </TableCell>
                  </TableRow>
                )}
          </TableBody>
        </Table>
      </div>

      {/* 分页 */}
      <div className='mt-4 flex items-center justify-between'>
        <div className='text-muted-foreground text-sm whitespace-nowrap'>
          第
          {pagination.page}
          /
          {pagination.totalPages}
          页
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage(p => Math.max(1, p - 1))}
                aria-disabled={page === 1}
                className={page === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>

            {/* 页码 */}
            {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
              let pageNum = i + 1;
              if (pagination.totalPages > 5) {
                if (page <= 3) {
                  pageNum = i + 1;
                }
                else if (page >= pagination.totalPages - 2) {
                  pageNum = pagination.totalPages - 4 + i;
                }
                else {
                  pageNum = page - 2 + i;
                }
              }
              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    onClick={() => setPage(pageNum)}
                    isActive={page === pageNum}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            {pagination.totalPages > 5 && page < pagination.totalPages - 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext
                onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                aria-disabled={page === pagination.totalPages}
                className={page === pagination.totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </Card>
  );
}
