export type Product = {
    id: string
    name: string
    description: string
    price: number
    sale_price: number
    image_url: string
    stock: number
    is_active: boolean
}

export const mockProducts: Product[] = [
    {
        id: "1",
        name: "Midnight Bloom",
        description: "A mysterious blend of night-blooming jasmine and sandalwood.",
        price: 1299,
        sale_price: 899,
        image_url: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=300&auto=format&fit=crop",
        stock: 50,
        is_active: true
    },
    {
        id: "2",
        name: "Ocean Breeze",
        description: "Fresh aquatic notes with a hint of citrus and sea salt.",
        price: 1299,
        sale_price: 899,
        image_url: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=300&auto=format&fit=crop",
        stock: 50,
        is_active: true
    },
    {
        id: "3",
        name: "Vanilla Silk",
        description: "Warm Madagascar vanilla wrapped in amber and musk.",
        price: 1499,
        sale_price: 999,
        image_url: "https://images.unsplash.com/photo-1620917670397-a64d1f2e96d1?q=80&w=300&auto=format&fit=crop",
        stock: 30,
        is_active: true
    },
    {
        id: "4",
        name: "Rose Royale",
        description: "Classic english rose with modern spicy undertones.",
        price: 1299,
        sale_price: 899,
        image_url: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=300&auto=format&fit=crop",
        stock: 45,
        is_active: true
    }
]
