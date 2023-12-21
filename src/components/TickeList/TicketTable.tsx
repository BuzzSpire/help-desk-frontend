import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Ticket } from "@/types/TicketType";
import { Config } from "@/types/Config";
import { useEffect, useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card";
import { Button } from "../ui/button";
import { useRouter } from "next/router";
import { getDefaultConfig } from "@/api/config";

interface TicketTableeProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function TicketTable<TData, TValue>({
  columns,
  data,
}: TicketTableeProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // state
  const [config, setConfig] = useState<Config | null>(null);

  // router
  const router = useRouter();

  // go to ticket detail page
  const goToTicketDetail = (id: number) => {
    router.push(`/ticket/${id}`);
  };

  useEffect(() => {
    getDefaultConfig(localStorage.getItem("token") || "").then((res) => {
      // if config is not default config
      if (res.id !== 0) {
        setConfig(res);
      }
    });
  }, []);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <HoverCard key={row.id}>
                <HoverCardTrigger asChild>
                  <TableRow
                    className="hover:bg-gray-100"
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={
                          config && cell.column.columnDef.header === "Status"
                            ? (cell.row.original as Ticket).status.status ===
                              config.openTicketStatus.status
                              ? "text-green-300"
                              : (cell.row.original as Ticket).status.status ===
                                config.closeTicketStatus.status
                              ? "text-red-500"
                              : ""
                            : ""
                        }>
                        {cell.column.columnDef.header === "Priority"
                          ? (cell.row.original as Ticket).priority.priority
                          : cell.column.columnDef.header === "Status"
                          ? (cell.row.original as Ticket).status.status
                          : cell.column.columnDef.header === "Assigned To"
                          ? (cell.row.original as Ticket).assignedTo?.email
                          : cell.column.columnDef.header === "Description"
                          ? (cell.row.original as Ticket).description.length <=
                            20
                            ? (cell.row.original as Ticket).description
                            : (cell.row.original as Ticket).description.slice(
                                0,
                                20
                              ) + "..."
                          : flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                      </TableCell>
                    ))}
                  </TableRow>
                </HoverCardTrigger>
                <HoverCardContent className="bg-white shadow-lg p-4 w-56 border-[1px] border-gray-400 rounded-xl">
                  <div>
                    <div className="flex flex-row">
                      <p className="text-xs text-gray-400 font-bold">
                        Ticket ID: {(row.original as Ticket).id}
                      </p>
                      <p className="text-xs text-gray-400 font-bold text-end ml-auto">
                        {(row.original as Ticket).date.toString().slice(0, 10)}
                      </p>
                    </div>
                    <div className="flex flex-row mt-2 justify-between">
                      <div className="h-8 w-8 bg-black rounded-full"></div>
                      <div>
                        <p className="text-xs font-bold text-end ml-auto">
                          {(row.original as Ticket).user.name}{" "}
                          {(row.original as Ticket).user.surname}
                        </p>
                        <p className="text-xs text-gray-400 font-bold text-end ml-auto">
                          {(row.original as Ticket).user.email}
                        </p>
                      </div>
                    </div>
                    <p className="text-md mt-2 font-bold text-start">
                      {(row.original as Ticket).title}
                    </p>
                    <p className="text-sm mt-2 line">
                      {(row.original as Ticket).description.length <= 120
                        ? (row.original as Ticket).description
                        : (row.original as Ticket).description.slice(0, 120) +
                          "..."}
                    </p>
                    <div className="w-full text-end">
                      <Button
                        size="sm"
                        className="mt-2"
                        onClick={() => {
                          goToTicketDetail((row.original as Ticket).id);
                        }}>
                        Detail
                      </Button>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
