// Pets Shop Business Content
// All business and product information centralized here for easy updates

const shopContent = {
  // Business Information
  business: {
    name: 'Pawsome Pets Shop',
    tagline: 'Everything Your Pet Needs',
    description: 'Your one-stop shop for quality pet products and supplies',
    contactPhone: '+601-2345-6789',
    contactEmail: 'info@pawsomepets.com'
  },

  // Product Categories
  categories: [
    { id: 'dog-food', name: 'Dog Food' },
    { id: 'cat-food', name: 'Cat Food' },
    { id: 'toys', name: 'Toys & Play' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'grooming', name: 'Grooming' },
    { id: 'supplies', name: 'Supplies' }
  ],

  // Products
  products: [
    // Dog Food
    {
      id: 'prod-001',
      category: 'dog-food',
      name: 'Premium Dog Kibble',
      description: 'High-quality dry food for adult dogs',
      price: 45.99,
      image: 'https://via.placeholder.com/200x200?text=Dog+Kibble'
    },
    {
      id: 'prod-002',
      category: 'dog-food',
      name: 'Puppy Growth Formula',
      description: 'Specially formulated for growing puppies',
      price: 52.99,
      image: 'https://via.placeholder.com/200x200?text=Puppy+Formula'
    },
    {
      id: 'prod-003',
      category: 'dog-food',
      name: 'Organic Chicken Bites',
      description: 'Natural dog treats with real chicken',
      price: 18.99,
      image: 'https://via.placeholder.com/200x200?text=Chicken+Treats'
    },

    // Cat Food
    {
      id: 'prod-004',
      category: 'cat-food',
      name: 'Premium Cat Dry Food',
      description: 'Complete nutrition for adult cats',
      price: 39.99,
      image: 'https://via.placeholder.com/200x200?text=Cat+Food'
    },
    {
      id: 'prod-005',
      category: 'cat-food',
      name: 'Kitten Starter Pack',
      description: 'Gentle formula for kittens',
      price: 44.99,
      image: 'https://via.placeholder.com/200x200?text=Kitten+Pack'
    },
    {
      id: 'prod-006',
      category: 'cat-food',
      name: 'Fish Flavor Treats',
      description: 'Delicious fish-flavored treats cats love',
      price: 14.99,
      image: 'https://via.placeholder.com/200x200?text=Fish+Treats'
    },

    // Toys & Play
    {
      id: 'prod-007',
      category: 'toys',
      name: 'Interactive Ball Toy',
      description: 'Keep your pet active and entertained',
      price: 15.99,
      image: 'https://via.placeholder.com/200x200?text=Ball+Toy'
    },
    {
      id: 'prod-008',
      category: 'toys',
      name: 'Rope Tug Toy',
      description: 'Perfect for interactive play',
      price: 12.99,
      image: 'https://via.placeholder.com/200x200?text=Rope+Toy'
    },
    {
      id: 'prod-009',
      category: 'toys',
      name: 'Feather Cat Wand',
      description: 'Exciting flying toy for cats',
      price: 9.99,
      image: 'https://via.placeholder.com/200x200?text=Feather+Wand'
    },

    // Accessories
    {
      id: 'prod-010',
      category: 'accessories',
      name: 'Leather Dog Collar',
      description: 'Durable and comfortable collar',
      price: 24.99,
      image: 'https://via.placeholder.com/200x200?text=Dog+Collar'
    },
    {
      id: 'prod-011',
      category: 'accessories',
      name: 'Cat Harness & Leash',
      description: 'Safe way to walk your cat',
      price: 22.99,
      image: 'https://via.placeholder.com/200x200?text=Cat+Harness'
    },
    {
      id: 'prod-012',
      category: 'accessories',
      name: 'Pet ID Tags (Set of 3)',
      description: 'Engraved identification tags',
      price: 16.99,
      image: 'https://via.placeholder.com/200x200?text=ID+Tags'
    },

    // Grooming
    {
      id: 'prod-013',
      category: 'grooming',
      name: 'Pet Shampoo Bottle',
      description: 'Gentle and moisturizing shampoo',
      price: 18.99,
      image: 'https://via.placeholder.com/200x200?text=Pet+Shampoo'
    },
    {
      id: 'prod-014',
      category: 'grooming',
      name: 'Grooming Brush Set',
      description: 'Complete grooming tool set',
      price: 29.99,
      image: 'https://via.placeholder.com/200x200?text=Brush+Set'
    },
    {
      id: 'prod-015',
      category: 'grooming',
      name: 'Nail Clipper',
      description: 'Safe and easy nail trimming',
      price: 14.99,
      image: 'https://via.placeholder.com/200x200?text=Nail+Clipper'
    },

    // Supplies
    {
      id: 'prod-016',
      category: 'supplies',
      name: 'Pet Food Bowl Set',
      description: 'Stainless steel bowls (2 pieces)',
      price: 19.99,
      image: 'https://via.placeholder.com/200x200?text=Bowl+Set'
    },
    {
      id: 'prod-017',
      category: 'supplies',
      name: 'Cozy Pet Bed',
      description: 'Comfortable sleeping area for pets',
      price: 49.99,
      image: 'https://via.placeholder.com/200x200?text=Pet+Bed'
    },
    {
      id: 'prod-018',
      category: 'supplies',
      name: 'Litter Box with Cover',
      description: 'Privacy and odor control',
      price: 59.99,
      image: 'https://via.placeholder.com/200x200?text=Litter+Box'
    }
  ],

  // Order Types
  orderTypes: [
    { value: 'delivery', label: 'Delivery' },
    { value: 'pickup', label: 'In-Store Pickup' }
  ],

  // Payment Methods
  paymentMethods: [
    { value: 'credit-card', label: 'Credit Card' },
    { value: 'debit-card', label: 'Debit Card' },
    { value: 'cash', label: 'Cash on Delivery' },
    { value: 'ewallet', label: 'E-Wallet' }
  ],

  // Order Status
  orderStatus: ['NEW', 'PREPARING', 'READY', 'COMPLETED']
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = shopContent;
}
