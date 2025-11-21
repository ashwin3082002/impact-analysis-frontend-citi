import { User, Repository, FunctionalRequirement, ImpactAnalysis, DependencyNode, UserRole } from '@/types';

// Dummy Users with login credentials
export const DUMMY_CREDENTIALS = {
  admin: { email: 'admin@example.com', password: 'admin123' },
  developer: { email: 'dev@example.com', password: 'dev123' },
  ba: { email: 'ba@example.com', password: 'ba123' },
};

export const DUMMY_USERS: User[] = [
  {
    id: 'user-1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
  },
  {
    id: 'user-2',
    email: 'dev@example.com',
    name: 'Developer User',
    role: 'developer',
  },
  {
    id: 'user-3',
    email: 'ba@example.com',
    name: 'BA User',
    role: 'ba',
  },
  {
    id: 'user-4',
    email: 'john.dev@example.com',
    name: 'John Developer',
    role: 'developer',
  },
  {
    id: 'user-5',
    email: 'sarah.ba@example.com',
    name: 'Sarah BA',
    role: 'ba',
  },
];

export const DUMMY_REPOSITORIES: Repository[] = [
  {
    id: 'repo-1',
    name: 'E-Commerce Platform',
    description: 'Main e-commerce application with microservices architecture',
    gitUrl: 'https://github.com/example/ecommerce-platform',
    linkedDevelopers: ['user-2', 'user-4'],
    linkedBAs: ['user-3', 'user-5'],
    createdAt: new Date('2024-01-15'),
    lastAnalysis: new Date('2024-11-01'),
    totalAPIs: 127,
    vulnerableModules: 3,
  },
  {
    id: 'repo-2',
    name: 'Payment Gateway Integration',
    description: 'Secure payment processing service with multiple provider support',
    gitUrl: 'https://github.com/example/payment-gateway',
    linkedDevelopers: ['user-2'],
    linkedBAs: ['user-3'],
    createdAt: new Date('2024-02-20'),
    lastAnalysis: new Date('2024-10-28'),
    totalAPIs: 45,
    vulnerableModules: 1,
  },
  {
    id: 'repo-3',
    name: 'User Authentication Service',
    description: 'OAuth2 and JWT-based authentication microservice',
    gitUrl: 'https://github.com/example/auth-service',
    linkedDevelopers: ['user-4'],
    linkedBAs: ['user-5'],
    createdAt: new Date('2024-03-10'),
    lastAnalysis: new Date('2024-11-03'),
    totalAPIs: 28,
    vulnerableModules: 0,
  },
];

export const DUMMY_FUNCTIONAL_REQUIREMENTS: FunctionalRequirement[] = [
  {
    id: 'fr-1',
    repositoryId: 'repo-1',
    title: 'Implement Dynamic Discount System',
    description: 'Add support for time-based promotional discounts with rule engine integration. Should support percentage and fixed amount discounts.',
    fileUrl: '/documents/fr-discount-system.pdf',
    createdBy: 'user-3',
    createdAt: new Date('2024-10-15'),
    status: 'analyzed',
    comments: [
      {
        id: 'comment-1',
        userId: 'user-3',
        userName: 'BA User',
        userRole: 'ba',
        content: 'This needs to integrate with the existing pricing engine. Please review the impact on checkout flow.',
        createdAt: new Date('2024-10-15T10:30:00'),
      },
      {
        id: 'comment-2',
        userId: 'user-2',
        userName: 'Developer User',
        userRole: 'developer',
        content: 'Analyzed the impact. This will affect 15 APIs across pricing, cart, and checkout modules. We\'ll need to update the discount calculation logic.',
        createdAt: new Date('2024-10-16T14:20:00'),
      },
    ],
  },
  {
    id: 'fr-2',
    repositoryId: 'repo-1',
    title: 'Add Multi-Currency Support',
    description: 'Enable the platform to handle transactions in multiple currencies with real-time exchange rate updates.',
    fileUrl: '/documents/fr-multi-currency.pdf',
    createdBy: 'user-5',
    createdAt: new Date('2024-10-20'),
    status: 'under-review',
    comments: [
      {
        id: 'comment-3',
        userId: 'user-5',
        userName: 'Sarah BA',
        userRole: 'ba',
        content: 'We need to support USD, EUR, GBP, and JPY initially. Exchange rates should update hourly.',
        createdAt: new Date('2024-10-20T09:00:00'),
      },
      {
        id: 'comment-4',
        userId: 'user-4',
        userName: 'John Developer',
        userRole: 'developer',
        content: 'Will this affect historical order data? We need to consider currency conversion for past transactions.',
        createdAt: new Date('2024-10-21T11:15:00'),
      },
      {
        id: 'comment-5',
        userId: 'user-5',
        userName: 'Sarah BA',
        userRole: 'ba',
        content: 'Good point. Historical data should remain in original currency. We only need conversion for display purposes.',
        createdAt: new Date('2024-10-21T15:30:00'),
      },
    ],
  },
  {
    id: 'fr-3',
    repositoryId: 'repo-2',
    title: 'Integrate Stripe Payment Method',
    description: 'Add Stripe as a new payment provider option alongside existing payment gateways.',
    fileUrl: '/documents/fr-stripe-integration.pdf',
    createdBy: 'user-3',
    createdAt: new Date('2024-10-25'),
    status: 'analyzed',
    comments: [
      {
        id: 'comment-6',
        userId: 'user-3',
        userName: 'BA User',
        userRole: 'ba',
        content: 'Stripe integration should follow the same provider interface pattern as PayPal and Square.',
        createdAt: new Date('2024-10-25T10:00:00'),
      },
    ],
  },
  {
    id: 'fr-4',
    repositoryId: 'repo-3',
    title: 'Add Two-Factor Authentication',
    description: 'Implement 2FA using TOTP (Time-based One-Time Password) for enhanced security.',
    fileUrl: '/documents/fr-2fa.pdf',
    createdBy: 'user-5',
    createdAt: new Date('2024-11-01'),
    status: 'draft',
    comments: [],
  },
  {
    id: 'fr-5',
    repositoryId: 'repo-1',
    title: 'Product Recommendation Engine',
    description: 'Implement ML-based product recommendations on product detail and cart pages.',
    fileUrl: '/documents/fr-recommendations.pdf',
    createdBy: 'user-3',
    createdAt: new Date('2024-11-03'),
    status: 'under-review',
    comments: [
      {
        id: 'comment-7',
        userId: 'user-3',
        userName: 'BA User',
        userRole: 'ba',
        content: 'Recommendations should be based on user browsing history and purchase patterns.',
        createdAt: new Date('2024-11-03T09:30:00'),
      },
      {
        id: 'comment-8',
        userId: 'user-2',
        userName: 'Developer User',
        userRole: 'developer',
        content: 'We\'ll need to set up a separate microservice for this. Should we use an external ML API or build in-house?',
        createdAt: new Date('2024-11-04T10:45:00'),
      },
    ],
  },
];

export const DUMMY_DEPENDENCY_NODES: Record<string, DependencyNode[]> = {
  'repo-1': [
    {
      id: 'node-1',
      name: 'PricingModule',
      type: 'module',
      description: 'Core pricing calculation module',
      vulnerable: true,
      dependencies: ['node-2', 'node-3'],
    },
    {
      id: 'node-2',
      name: 'DiscountEngine',
      type: 'class',
      description: 'Handles discount calculations',
      dependencies: ['node-4'],
    },
    {
      id: 'node-3',
      name: 'TaxCalculator',
      type: 'class',
      description: 'Tax computation service',
      dependencies: [],
    },
    {
      id: 'node-4',
      name: 'calculateDiscount',
      type: 'method',
      description: 'Main discount calculation method',
      dependencies: [],
    },
    {
      id: 'node-5',
      name: 'CheckoutModule',
      type: 'module',
      description: 'Checkout flow orchestration',
      vulnerable: true,
      dependencies: ['node-1', 'node-6'],
    },
    {
      id: 'node-6',
      name: 'PaymentProcessor',
      type: 'class',
      description: 'Payment processing coordinator',
      dependencies: [],
    },
    {
      id: 'node-7',
      name: 'CartModule',
      type: 'module',
      description: 'Shopping cart management',
      dependencies: ['node-1'],
    },
    {
      id: 'node-8',
      name: 'InventoryModule',
      type: 'module',
      description: 'Product inventory tracking',
      vulnerable: true,
      dependencies: [],
    },
  ],
  'repo-2': [
    {
      id: 'node-9',
      name: 'PaymentGatewayModule',
      type: 'module',
      description: 'Payment gateway abstraction layer',
      dependencies: ['node-10', 'node-11'],
    },
    {
      id: 'node-10',
      name: 'StripeAdapter',
      type: 'class',
      description: 'Stripe API integration',
      dependencies: [],
    },
    {
      id: 'node-11',
      name: 'PayPalAdapter',
      type: 'class',
      description: 'PayPal API integration',
      vulnerable: true,
      dependencies: [],
    },
  ],
  'repo-3': [
    {
      id: 'node-12',
      name: 'AuthenticationModule',
      type: 'module',
      description: 'Core authentication module',
      dependencies: ['node-13', 'node-14'],
    },
    {
      id: 'node-13',
      name: 'JWTService',
      type: 'class',
      description: 'JWT token management',
      dependencies: [],
    },
    {
      id: 'node-14',
      name: 'OAuth2Service',
      type: 'class',
      description: 'OAuth2 provider integration',
      dependencies: [],
    },
  ],
};

export const DUMMY_IMPACT_ANALYSES: Record<string, ImpactAnalysis> = {
  'fr-1': {
    id: 'impact-1',
    frId: 'fr-1',
    repositoryId: 'repo-1',
    analyzedAt: new Date('2024-10-16T15:00:00'),
    totalImpactedAPIs: 6,
    totalAPIs: 10,
    affectedModules: 3,
    criticalityLevel: 'major',
    affectedChannels: [
      {
        id: 'channel-1',
        name: 'Web Application',
        type: 'web' as const,
        applications: [
          {
            id: 'app-1',
            name: 'E-Commerce Portal',
            modules: [
              {
                id: 'module-1',
                name: 'CartModule',
                apis: [
                  {
                    id: 'api-1',
                    name: 'POST /api/cart/apply-discount',
                    isAffected: true,
                    criticality: 'major' as const,
                    callStack: [
                      { method: 'applyDiscount', description: 'Main discount application logic', line: 145 },
                      { method: 'validateDiscountRules', description: 'Validate discount eligibility', line: 89 },
                      { method: 'calculateFinalPrice', description: 'Calculate price after discount', line: 203 },
                    ],
                  },
                  {
                    id: 'api-2',
                    name: 'GET /api/cart/items',
                    isAffected: false,
                    criticality: 'minor' as const,
                    callStack: [
                      { method: 'getCartItems', description: 'Retrieve cart items', line: 56 },
                    ],
                  },
                  {
                    id: 'api-3',
                    name: 'DELETE /api/cart/item',
                    isAffected: false,
                    criticality: 'support' as const,
                    callStack: [
                      { method: 'removeItem', description: 'Remove item from cart', line: 78 },
                    ],
                  },
                ],
              },
              {
                id: 'module-2',
                name: 'PricingModule',
                apis: [
                  {
                    id: 'api-4',
                    name: 'GET /api/pricing/calculate',
                    isAffected: true,
                    criticality: 'major' as const,
                    callStack: [
                      { method: 'calculatePrice', description: 'Core pricing calculation', line: 67 },
                      { method: 'applyDiscounts', description: 'Apply all active discounts', line: 112 },
                      { method: 'applyTaxes', description: 'Calculate and apply taxes', line: 178 },
                    ],
                  },
                  {
                    id: 'api-5',
                    name: 'GET /api/pricing/rules',
                    isAffected: false,
                    criticality: 'support' as const,
                    callStack: [
                      { method: 'getPricingRules', description: 'Get active pricing rules', line: 34 },
                    ],
                  },
                ],
              },
              {
                id: 'module-3',
                name: 'CheckoutModule',
                apis: [
                  {
                    id: 'api-6',
                    name: 'POST /api/checkout/finalize',
                    isAffected: true,
                    criticality: 'major' as const,
                    callStack: [
                      { method: 'finalizeCheckout', description: 'Complete checkout process', line: 234 },
                      { method: 'validatePricing', description: 'Final price validation', line: 156 },
                    ],
                  },
                  {
                    id: 'api-7',
                    name: 'GET /api/checkout/summary',
                    isAffected: false,
                    criticality: 'minor' as const,
                    callStack: [
                      { method: 'getCheckoutSummary', description: 'Get order summary', line: 89 },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: 'channel-2',
        name: 'Mobile Application',
        type: 'mobile' as const,
        applications: [
          {
            id: 'app-2',
            name: 'E-Commerce Mobile App',
            modules: [
              {
                id: 'module-4',
                name: 'CartModule',
                apis: [
                  {
                    id: 'api-8',
                    name: 'POST /api/mobile/cart/apply-discount',
                    isAffected: true,
                    criticality: 'major' as const,
                    callStack: [
                      { method: 'applyMobileDiscount', description: 'Mobile-specific discount logic', line: 167 },
                      { method: 'validateMobileRules', description: 'Validate mobile discount rules', line: 98 },
                    ],
                  },
                  {
                    id: 'api-9',
                    name: 'GET /api/mobile/cart/sync',
                    isAffected: false,
                    criticality: 'support' as const,
                    callStack: [
                      { method: 'syncCart', description: 'Sync cart across devices', line: 123 },
                    ],
                  },
                ],
              },
              {
                id: 'module-5',
                name: 'PricingModule',
                apis: [
                  {
                    id: 'api-10',
                    name: 'GET /api/mobile/pricing/calculate',
                    isAffected: true,
                    criticality: 'support' as const,
                    callStack: [
                      { method: 'calculateMobilePrice', description: 'Mobile pricing calculation', line: 45 },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  'fr-3': {
    id: 'impact-3',
    frId: 'fr-3',
    repositoryId: 'repo-2',
    analyzedAt: new Date('2024-10-26T14:30:00'),
    totalImpactedAPIs: 3,
    totalAPIs: 5,
    affectedModules: 1,
    criticalityLevel: 'support' as const,
    affectedChannels: [
      {
        id: 'channel-3',
        name: 'Web Application',
        type: 'web' as const,
        applications: [
          {
            id: 'app-3',
            name: 'Payment Gateway Service',
            modules: [
              {
                id: 'module-6',
                name: 'PaymentGatewayModule',
                apis: [
                  {
                    id: 'api-11',
                    name: 'POST /api/payment/process',
                    isAffected: true,
                    criticality: 'support' as const,
                    callStack: [
                      { method: 'processPayment', description: 'Route payment to appropriate gateway', line: 45 },
                      { method: 'initializeGateway', description: 'Initialize payment provider', line: 23 },
                    ],
                  },
                  {
                    id: 'api-12',
                    name: 'GET /api/payment/methods',
                    isAffected: true,
                    criticality: 'minor' as const,
                    callStack: [
                      { method: 'getAvailableMethods', description: 'List all payment methods', line: 89 },
                    ],
                  },
                  {
                    id: 'api-13',
                    name: 'GET /api/payment/status',
                    isAffected: false,
                    criticality: 'support' as const,
                    callStack: [
                      { method: 'checkPaymentStatus', description: 'Check payment transaction status', line: 134 },
                    ],
                  },
                  {
                    id: 'api-14',
                    name: 'POST /api/payment/refund',
                    isAffected: true,
                    criticality: 'support' as const,
                    callStack: [
                      { method: 'processRefund', description: 'Process refund request', line: 201 },
                    ],
                  },
                  {
                    id: 'api-15',
                    name: 'GET /api/payment/history',
                    isAffected: false,
                    criticality: 'minor' as const,
                    callStack: [
                      { method: 'getPaymentHistory', description: 'Retrieve payment history', line: 267 },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

// Helper function to simulate API delay
export const simulateApiDelay = (ms: number = 500): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Helper function to get user by email
export const getUserByEmail = (email: string): User | undefined => {
  return DUMMY_USERS.find(user => user.email === email);
};

// Helper function to validate credentials
export const validateCredentials = (email: string, password: string): User | null => {
  const credEntry = Object.entries(DUMMY_CREDENTIALS).find(
    ([_, cred]) => cred.email === email && cred.password === password
  );
  
  if (credEntry) {
    return getUserByEmail(email) || null;
  }
  
  return null;
};
