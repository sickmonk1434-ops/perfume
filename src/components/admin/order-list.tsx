"use client";

import { updateOrderStatus } from "@/lib/admin-actions";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Package, Truck, CheckCircle, Clock, MapPin, ExternalLink } from "lucide-react";
import Link from 'next/link';

// Helper for status colors
const getStatusColor = (status: string) => {
    switch (status) {
        case 'Processing': return 'text-yellow-500';
        case 'Shipped': return 'text-blue-500';
        case 'Delivered': return 'text-green-500';
        case 'Cancelled': return 'text-red-500';
        default: return 'text-gray-500';
    }
};

const getStatusIcon = (status: string) => {
    switch (status) {
        case 'Processing': return <Clock className="w-4 h-4" />;
        case 'Shipped': return <Truck className="w-4 h-4" />;
        case 'Delivered': return <CheckCircle className="w-4 h-4" />;
        default: return <Package className="w-4 h-4" />;
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function OrderList({ orders }: { orders: any[] }) {
    if (orders.length === 0) {
        return (
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center text-gray-500">
                No orders received yet.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold text-[#D4AF37]">Recent Orders</h2>
            <div className="grid gap-4">
                {orders.map((order) => {
                    const address = JSON.parse(order.shipping_address as string);
                    return (
                        <div key={order.id} className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col md:flex-row justify-between gap-6">
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="font-mono text-xs text-gray-500">#{order.id.slice(0, 8)}</span>
                                    <span className={`flex items-center gap-1 text-sm font-bold ${getStatusColor(order.status as string)}`}>
                                        {getStatusIcon(order.status as string)} {order.status}
                                    </span>
                                </div>
                                <h3 className="font-bold text-lg">{order.customer_name}</h3>
                                <div className="text-sm text-gray-400 space-y-1">
                                    <p>{order.customer_email}</p>
                                    <p>{order.customer_phone}</p>
                                </div>
                                <div className="flex items-start gap-2 text-sm text-gray-300 bg-black/20 p-2 rounded mt-2">
                                    <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-[#D4AF37]" />
                                    <p>{address.line1}, {address.city}, {address.state} - {address.pin}</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 justify-center min-w-[200px]">
                                <p className="text-xs text-right text-gray-500">
                                    Ordered: {order.created_at ? format(new Date(order.created_at * 1000), 'PPp') : 'N/A'}
                                </p>

                                <div className="flex items-center justify-end gap-2 mt-2">
                                    {/* Status Actions */}
                                    {order.status === 'Processing' && (
                                        <form action={() => updateOrderStatus(order.id, 'Shipped')}>
                                            <Button size="sm" variant="outline" className="text-blue-400 border-blue-400/20 hover:bg-blue-400/10">
                                                Mark Shipped
                                            </Button>
                                        </form>
                                    )}
                                    {order.status === 'Shipped' && (
                                        <form action={() => updateOrderStatus(order.id, 'Delivered')}>
                                            <Button size="sm" variant="outline" className="text-green-400 border-green-400/20 hover:bg-green-400/10">
                                                Mark Delivered
                                            </Button>
                                        </form>
                                    )}

                                    {/* Generate Label Button */}
                                    <Link href={`/admin/label/${order.id}`} target="_blank">
                                        <Button size="sm" className="bg-[#D4AF37] text-black hover:bg-[#F3E5AB]">
                                            <ExternalLink className="w-4 h-4 mr-2" /> Label
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
