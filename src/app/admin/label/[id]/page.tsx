import { getOrderById } from "@/lib/admin-actions";
import { notFound } from "next/navigation";
import { format } from "date-fns";

export default async function ShippingLabelPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const order: any = await getOrderById(id);

    if (!order) {
        notFound();
    }

    const address = JSON.parse(order.shipping_address as string);

    return (
        <div className="min-h-screen bg-white text-black p-8 font-mono">
            <div className="max-w-2xl mx-auto border-4 border-black p-8 relative">
                {/* Header */}
                <div className="flex justify-between items-start border-b-2 border-black pb-6 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold uppercase tracking-wider">Luxe Parfums</h1>
                        <p className="text-sm mt-1">Express Shipping</p>
                    </div>
                    <div className="text-right">
                        <div className="w-24 h-24 bg-black text-white flex items-center justify-center font-bold text-2xl">
                            QR
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="grid grid-cols-2 gap-8 mb-8">
                    <div>
                        <p className="text-sm text-gray-500 uppercase">From:</p>
                        <p className="font-bold">Luxe Warehouse</p>
                        <p>123 Fragrance Lane,</p>
                        <p>Perfume City, MH 400001</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 uppercase">Date:</p>
                        <p className="font-bold">{order.created_at ? format(new Date(Number(order.created_at) * 1000), 'dd MMM yyyy') : 'N/A'}</p>
                        <p className="mt-2 text-sm text-gray-500 uppercase">Order ID:</p>
                        <p className="font-bold">#{String(order.id).slice(0, 8).toUpperCase()}</p>
                    </div>
                </div>

                <div className="border-t-2 border-b-2 border-black py-6 mb-8">
                    <p className="text-sm text-gray-500 uppercase mb-2">Ship To:</p>
                    <h2 className="text-2xl font-bold uppercase">{order.customer_name}</h2>
                    <p className="text-lg mt-1">{address.line1}</p>
                    <p className="text-lg">{address.city}, {address.state} - {address.pin}</p>
                    <p className="mt-2 font-bold">Ph: {order.customer_phone}</p>
                </div>

                {/* Barcode Mock */}
                <div className="text-center space-y-2">
                    <div className="h-16 bg-black w-full"></div>
                    <p className="text-center text-xs tracking-[0.5em]">{String(order.id).toUpperCase()}</p>
                </div>

                <div className="absolute top-0 right-0 p-4 print:hidden">
                    <button
                        // Needs to be a client interaction for window.print()
                        // Using a simple css print media query to hide this button is enough for now
                        className="bg-black text-white px-4 py-2 hover:bg-gray-800"
                    >
                        Print (Ctrl+P)
                    </button>
                </div>
            </div>
        </div>
    );
}
