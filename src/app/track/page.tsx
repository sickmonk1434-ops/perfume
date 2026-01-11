import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { getOrderById } from "@/lib/admin-actions";
import { redirect } from "next/navigation";

export default async function TrackOrder({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
    const { id } = await searchParams;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let order: any = null;

    if (id) {
        order = await getOrderById(id);
    }

    async function handleSearch(formData: FormData) {
        "use server";
        const orderId = formData.get("orderId");
        if (orderId) {
            redirect(`/track?id=${orderId}`);
        }
    }

    return (
        <div className="min-h-screen pt-32 pb-20 container px-6 mx-auto flex flex-col items-center justify-start">
            <div className="w-full max-w-md space-y-8 text-center">
                <div className="space-y-2">
                    <h1 className="text-3xl font-heading font-bold text-white">Track Your Order</h1>
                    <p className="text-gray-400">Enter your order ID to see the current status of your shipment.</p>
                </div>

                <form action={handleSearch} className="flex gap-2 relative">
                    <Input
                        name="orderId"
                        placeholder="Enter Order ID (e.g., 8f92...)"
                        defaultValue={id}
                        className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 h-11"
                    />
                    <Button type="submit" className="bg-[#D4AF37] text-black hover:bg-[#F3E5AB]">
                        <Search className="w-4 h-4 mr-2" /> Track
                    </Button>
                </form>

                {id && !order && (
                    <div className="text-red-400 bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                        Order not found. Please check the ID and try again.
                    </div>
                )}

                {order && (
                    <div className="border border-white/10 rounded-lg p-6 bg-white/5 text-left space-y-4 animate-in fade-in slide-in-from-bottom-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-xs text-gray-500">Order #{String(order.id).slice(0, 8)}</p>
                                <p className="text-lg font-bold text-white">{order.status as string}</p>
                            </div>
                            <span className="text-[#D4AF37] font-mono text-xs">
                                {order.status === 'Delivered' ? 'Arrived' : 'In Transit'}
                            </span>
                        </div>

                        <div className="relative pl-4 border-l-2 border-[#D4AF37]/30 space-y-6 my-4">
                            {/* Dynamic Timeline based on Status */}
                            <div className="relative">
                                <div className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full ${order.status === 'Processing' ? 'bg-[#D4AF37]' : 'bg-gray-600'}`}></div>
                                <p className={`text-sm font-bold ${order.status === 'Processing' ? 'text-white' : 'text-gray-400'}`}>Order Placed</p>
                                <p className="text-xs text-gray-500">We have received your order.</p>
                            </div>

                            {(order.status === 'Shipped' || order.status === 'Delivered') && (
                                <div className="relative">
                                    <div className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full ${order.status === 'Shipped' ? 'bg-[#D4AF37]' : 'bg-gray-600'}`}></div>
                                    <p className={`text-sm font-bold ${order.status === 'Shipped' ? 'text-white' : 'text-gray-400'}`}>Shipped</p>
                                    <p className="text-xs text-gray-500">Your order is on the way.</p>
                                </div>
                            )}

                            {order.status === 'Delivered' && (
                                <div className="relative">
                                    <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-[#D4AF37]"></div>
                                    <p className="text-sm font-bold text-white">Delivered</p>
                                    <p className="text-xs text-gray-500">Package delivered successfully.</p>
                                </div>
                            )}
                        </div>

                        <div className="pt-2 border-t border-white/10">
                            <p className="text-xs text-gray-400">Shipping to:</p>
                            <p className="text-sm text-gray-200">
                                {JSON.parse(order.shipping_address as string).city}, {JSON.parse(order.shipping_address as string).state}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
