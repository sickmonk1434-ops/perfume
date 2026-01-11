import { getAllProducts, getOrders } from "@/lib/admin-actions";
import { ProductForm } from "@/components/admin/product-form";
import { ProductList } from "@/components/admin/product-list";
import { OrderList } from "@/components/admin/order-list";

export default async function AdminDashboard() {
    const products = await getAllProducts();
    const orders = await getOrders();

    return (
        <div className="container mx-auto px-6 pt-10 pb-20 text-white max-w-6xl">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-heading font-bold">Admin Dashboard</h1>
                    <p className="text-gray-400">Manage products, view orders, and shipping.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Form + Product List */}
                <div className="lg:col-span-1 space-y-8">
                    <ProductForm />
                    <ProductList products={products} />
                </div>

                {/* Right Column: Orders */}
                <div className="lg:col-span-2">
                    <OrderList orders={orders} />
                </div>
            </div>
        </div>
    );
}
