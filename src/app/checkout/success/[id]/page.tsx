import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default async function SuccessPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    return (
        <div className="min-h-screen pt-20 flex flex-col items-center justify-center container mx-auto px-6 text-center">
            <div className="bg-[#D4AF37]/10 p-6 rounded-full mb-6 animate-in zoom-in spin-in-12 duration-500">
                <CheckCircle className="w-16 h-16 text-[#D4AF37]" />
            </div>
            <h1 className="text-4xl font-heading font-bold text-white mb-2">Order Placed Successfully!</h1>
            <p className="text-gray-400 mb-8 max-w-md">
                Thank you for choosing Luxe Parfums. Your order <span className="text-white font-mono">#{String(id).slice(0, 8)}</span> has been confirmed.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <Link href={`/track?id=${id}`}>
                    <Button size="lg" className="bg-[#D4AF37] text-black hover:bg-[#F3E5AB] w-full sm:w-auto">
                        Track Order
                    </Button>
                </Link>
                <Link href="/">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                        Continue Shopping
                    </Button>
                </Link>
            </div>
        </div>
    );
}
