"use client";

import DataTable from "@/components/common/data-table";
import { Button } from "@/components/ui/button";
import { HEADER_TABLE_DETAIL_ORDER } from "@/constants/order-constant";
import useDataTable from "@/hooks/use-data-table";
import { createClient } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { toast } from "sonner";

export default function DetailOrder({ id }: { id: string }) {
  const supabase = createClient();
  const { currentPage, currentLimit, handleChangePage, handleChangeLimit } =
    useDataTable();

  const { data: order } = useQuery({
    queryKey: ["orders", id],
    queryFn: async () => {
      const result = await supabase
        .from("orders")
        .select("id, customer_name, status, payment_url, tables (name, id)")
        .eq("order_id", id)
        .single();

      if (result.error)
        toast.error("Get Order data Failed", {
          description: result.error.message,
        });

      return result.data;
    },
    enabled: !!id,
  });

  const { data: orderMenu, isLoading: isLoadingOrderMenu } = useQuery({
    queryKey: ["orders_menu", order?.id, currentPage, currentLimit],
    queryFn: async () => {
      const result = await supabase
        .from("orders_menus")
        .select("*,  menus(id, name, image_url, price)", { count: "exact" })
        .eq("order_id", order?.id)
        .order("status");

      if (result.error)
        toast.error("Get order menu data Failed", {
          description: result.error.message,
        });

      return result;
    },
    enabled: !!order?.id,
  });

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between gap-4 w-full">
        <h1 className="text-2xl font-bold">Detail Order</h1>
        <Link href="">
          <Button>Add Order Item</Button>
        </Link>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 w-full">
        <div className="lg:w-2/3">
          <DataTable
            header={HEADER_TABLE_DETAIL_ORDER}
            data={filteredData}
            isLoading={isLoading}
            totalPages={totalPages}
            currentPage={currentPage}
            currentLimit={currentLimit}
            onChangePage={handleChangePage}
            onChangeLimit={handleChangeLimit}
          />
        </div>
      </div>
    </div>
  );
}
