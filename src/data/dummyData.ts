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
  {
    id: 'fr-6',
    repositoryId: 'repo-2',
    title: 'Add Email Notification for Payment Failures',
    description: 'The system requires enhancement to notify users via email when a payment transaction fails. The notification should be triggered automatically as part of the payment processing error handling flow, providing the user with immediate feedback on the transaction\'s failure.',
    fileUrl: '/documents/fr-payment-failure-notification.pdf',
    createdBy: 'user-3',
    createdAt: new Date('2024-11-05'),
    status: 'analyzed',
    comments: [
      {
        id: 'comment-9',
        userId: 'user-3',
        userName: 'BA User',
        userRole: 'ba',
        content: 'This is critical for user experience. Users should be notified immediately when payment fails.',
        createdAt: new Date('2024-11-05T09:15:00'),
      },
      {
        id: 'comment-10',
        userId: 'user-2',
        userName: 'Developer User',
        userRole: 'developer',
        content: 'Analyzed the impact. We\'ll implement this using an asynchronous event-driven pattern with Kafka. This keeps payment processing fast and reliable.',
        createdAt: new Date('2024-11-06T11:30:00'),
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
  'fr-6': {
    id: 'impact-6',
    frId: 'fr-6',
    repositoryId: 'repo-2',
    analyzedAt: new Date('2024-11-06T14:00:00'),
    totalImpactedAPIs: 4,
    totalAPIs: 8,
    affectedModules: 4,
    criticalityLevel: 'major' as const,
    report: `### **Impact Analysis Report: Add Email Notification for Payment Failures**

---

#### **1. Clear Summary of the Functional Requirement**

The system requires enhancement to notify users via email when a payment transaction fails. The notification should be triggered automatically as part of the payment processing error handling flow, providing the user with immediate feedback on the transaction's failure.

---

#### **2. Impacted Microservices**

*   **Primary:**
    *   \`payment-service\`: This is the core service where the payment failure logic resides. It will be responsible for detecting the failure and initiating the notification.
*   **Secondary (New/Modified):**
    *   \`notification-service\`: A new microservice (or an existing one if available) is recommended to consume the failure event and handle the actual email dispatch. This decouples email-sending logic from the critical payment flow.
*   **Downstream Dependencies:**
    *   \`account-service\`: The \`payment-service\` calls this service to update balances. Failures here are the primary trigger for the new notification.

---

#### **3. Impacted Controllers**

*   \`PaymentController\` (specifically the \`processPayment\` method):
    *   **Impact Level:** Minor.
    *   **Reasoning:** While the primary business logic change will be in the service layer, the controller is the entry point for the API call. Its exception handling mechanism might need to be reviewed or slightly modified to ensure it correctly propagates or handles exceptions from the service layer without interfering with the notification logic.

---

#### **4. Impacted Service Classes**

*   \`com.citi_zens.payment_service.service.PaymentService\` (specifically the \`processPayment\` method):
    *   **Impact Level:** **High**.
    *   **Reasoning:** This is the central point of change. The method's \`try-catch\` block needs to be augmented. When a downstream call (e.g., \`AccountServiceClient.updateBalance\`) fails, the \`catch\` block must be modified to:
        1.  Log the error.
        2.  Gather necessary information (account ID, user email, failure reason).
        3.  Invoke the notification producer to send a failure event.
*   \`com.citi_zens.payment_service.client.AccountServiceClient\`:
    *   **Impact Level:** None.
    *   **Reasoning:** This client is used but its implementation does not need to change. The failure occurs when its methods are invoked, and this is what will be caught in the \`PaymentService\`.
*   \`com.citi_zens.payment_service.kafka.NotificationProducer\`:
    *   **Impact Level:** **Medium**.
    *   **Reasoning:** A new method, such as \`sendPaymentFailureNotification(PaymentFailureEvent event)\`, should be added to this class. This promotes separation of concerns and keeps the existing \`sendPaymentNotification\` (if any) for other types of notifications (e.g., success).

---

#### **5. Impacted Methods**

*   \`com.citi_zens.payment_service.service.PaymentService.processPayment\`: **High Impact.** Will require modification to its error handling block.
*   \`com.citi_zens.payment_service.kafka.NotificationProducer.sendPaymentNotification\`: **Medium Impact.** A new, dedicated method for failure notifications is recommended.
*   \`com.citi_zens.payment_service.controller.PaymentController.processPayment\`: **Minor Impact.** Must ensure its exception handling does not swallow exceptions needed to trigger the notification.

---

#### **6. Impacted DTOs and DTO Fields**

*   **New DTO Required:** \`PaymentFailureEvent\`
    *   This new DTO will encapsulate all the necessary information for the notification service.
    *   **Fields:**
        *   \`paymentId\`: String (from \`java.util.UUID.randomUUID().toString()\`)
        *   \`accountId\`: String (from \`PaymentRequest.getAccountId()\`)
        *   \`amount\`: BigDecimal/Double (from \`PaymentRequest.getAmount()\`)
        *   \`userEmail\`: String (retrieved from \`AccountServiceClient.getEmail()\`)
        *   \`failureReason\`: String (from \`java.lang.Throwable.getMessage()\`)
        *   \`timestamp\`: Long (from \`java.lang.System.currentTimeMillis()\`)
*   **Existing DTOs:** \`PaymentRequest\`, \`PaymentResponse\`, \`EmailResponse\`, \`BalanceResponse\`.
    *   **Impact Level:** None. These are used to gather data but their structure does not need to change.

---

#### **7. Impacted Kafka Topics and Message Flow**

*   **New Kafka Topic:** \`payment-failure-notifications\` (or similar name).
    *   **Purpose:** To decouple the payment service from the notification mechanism. The payment service will publish a message to this topic upon failure.
    *   **Configuration:** Should be configured with appropriate retention policies and replication factors to ensure no loss of critical notification events.
*   **Message Flow:**
    1.  API Call -> \`PaymentController.processPayment\`
    2.  Controller -> \`PaymentService.processPayment\`
    3.  \`PaymentService\` calls \`AccountServiceClient.updateBalance\`
    4.  \`AccountServiceClient\` call fails (e.g., network issue, service down).
    5.  Exception is caught in \`PaymentService.processPayment\`.
    6.  \`PaymentService\` creates a \`PaymentFailureEvent\` object.
    7.  \`PaymentService\` calls \`NotificationProducer.sendPaymentFailureNotification()\`.
    8.  Producer serializes the event and sends it to the \`payment-failure-notifications\` Kafka topic.
    9.  \`notification-service\` consumes the message from the topic.
    10. \`notification-service\` uses the payload to send an email to the user.

---

#### **8. Downstream and Upstream Dependencies**

*   **Downstream Dependencies:**
    *   **Kafka Cluster:** The payment service now has a hard dependency on a running Kafka cluster for this new functionality. If Kafka is unavailable, it could impact the payment service's ability to complete its error handling gracefully.
    *   **Notification Service:** This new service is a downstream consumer of the \`payment-service\`. Its availability and health are critical for fulfilling the requirement.
    *   **Account Service:** Already a dependency; its failure is the trigger for this flow.
*   **Upstream Dependencies:**
    *   Any client, UI, or API Gateway that calls the \`PaymentController.processPayment\` endpoint is an upstream dependency.

---

#### **9. Functional Risks**

*   **Risk of Missed Notifications:** If the \`NotificationProducer\` call fails (e.g., Kafka is down), the failure notification will not be sent, even though the payment failed. The user may be left unaware.
    *   **Mitigation:** Implement retry logic in the Kafka producer. Log errors clearly for manual intervention.
*   **Incorrect User Information:** The flow relies on \`AccountServiceClient.getEmail()\` to get the user's email. If this service provides stale or incorrect data, the notification will be sent to the wrong address or not at all.
    *   **Mitigation:** Ensure data consistency between services. Add logging to capture the email address being used for the notification.
*   **Notification Spam:** A system-wide issue causing mass payment failures could trigger a flood of emails, potentially overwhelming the email service or being marked as spam.
    *   **Mitigation:** Implement circuit breakers or rate limiting in the \`notification-service\`.

---

#### **10. Non-Functional Risks (Performance, Reliability, Security)**

*   **Performance:**
    *   **Risk:** Publishing to Kafka is very fast and asynchronous, so the direct impact on the payment API's response time should be negligible (<5ms).
    *   **Mitigation:** Profile the change to confirm the latency impact. The asynchronous nature is key to maintaining performance.
*   **Reliability:**
    *   **Risk:** The payment service's success/failure logic could become coupled with the health of Kafka or the notification service.
    *   **Mitigation:** Design the notification call to be "fire-and-forget." It should be wrapped in a \`try-catch\` block within the \`catch\` block of the main payment logic. A failure to send the notification should not cause the payment process to fail again or return a confusing error to the upstream caller.
*   **Security:**
    *   **Risk:** The \`PaymentFailureEvent\` message will contain Personally Identifiable Information (PII) in the form of a user email.
    *   **Mitigation:**
        *   Enforce TLS for all communication with Kafka.
        *   Configure Kafka topic ACLs (Access Control Lists) to ensure only the \`payment-service\` can produce to the topic and only the \`notification-service\` can consume from it.
        *   Enable encryption at rest for the Kafka topic if required by compliance standards.

---

#### **11. Data Consistency Risks**

*   **Risk Level:** Low.
*   **Analysis:** This is an asynchronous, compensating action. The primary transaction (the payment that failed) is already in a failed state. The failure to send the notification does not create a data inconsistency between services (e.g., the account balance is not updated, and the payment status is "failed"). The system state remains consistent. The only risk is a business process inconsistency (the user is not notified), which is covered under functional risks.

---

#### **12. Regression Test Plan**

*   **Unit Tests:**
    *   **Happy Path:** Verify that a successful payment flow remains unchanged and does not trigger the failure notification.
    *   **Failure Path (New Logic):** Mock \`AccountServiceClient.updateBalance\` to throw an exception. In the test, verify that:
        1.  The \`NotificationProducer.sendPaymentFailureNotification()\` method is called exactly once.
        2.  The \`PaymentFailureEvent\` object passed to it has the correct \`accountId\`, \`amount\`, and \`failureReason\`.
        3.  The service method correctly handles the exception and propagates it up.
*   **Integration Tests:**
    *   Use TestContainers to spin up \`payment-service\`, \`account-service\`, Kafka, and a mock \`notification-service\` consumer.
    *   **Scenario 1:** Make a payment request that is guaranteed to fail (e.g., by making the \`account-service\` endpoint unavailable). Assert that:
        1.  The payment API returns an error status (e.g., 500 or 409).
        2.  A correctly formatted message appears on the \`payment-failure-notifications\` Kafka topic.
    *   **Scenario 2:** Verify that when Kafka is down, the payment service still fails gracefully for the original reason and does not crash.
*   **Contract Tests:**
    *   **New Contract:** Define and test the schema for the new \`PaymentFailureEvent\` message on the Kafka topic. A tool like Pact can be used for this.
    *   **Existing Contracts:** Ensure the contract between \`payment-service\` and \`account-service\` is not broken by these changes.
*   **Load Tests:**
    *   Run a load test with a mixed success/failure ratio (e.g., 95% success, 5% failure).
    *   Monitor the 99th percentile latency of the payment endpoint to ensure it has not degraded.
    *   Monitor Kafka producer latency and consumer lag to ensure the notification pipeline can keep up.

---

#### **13. Monitoring & Logging Plan**

*   **Logging:**
    *   Add a new structured JSON log entry in \`PaymentService.processPayment\`'s \`catch\` block: \`{"event": "PaymentFailureNotificationInitiated", "paymentId": "...", "accountId": "...", "status": "success"}\`.
    *   Add an error log in \`NotificationProducer\` if sending to Kafka fails: \`{"event": "PaymentFailureNotificationFailed", "error": "...", "paymentId": "..."}\`.
*   **Monitoring (Metrics):**
    *   **New Counter:** \`payment_failure_notification_initiated_total\` (labelled by outcome: \`success\`, \`failure\`).
    *   **New Histogram:** \`kafka_producer_payment_failure_latency_seconds\`.
    *   **Existing:** Monitor error rates on the \`/processPayment\` endpoint.
*   **Alerting:**
    *   Create an alert if \`payment_failure_notification_initiated_total{outcome="failure"}\` increases above a threshold (e.g., >5 in 1 minute).
    *   Create an alert for high consumer lag on the \`payment-failure-notifications\` topic, indicating the \`notification-service\` is unhealthy.

---

#### **14. Rollout & Rollback Plan**

*   **Rollout Strategy: Feature Flag.**
    1.  Implement all new code behind a feature flag (e.g., \`ENABLE_PAYMENT_FAILURE_EMAIL\`).
    2.  Deploy the code to production with the flag **disabled**. This is a safe, zero-risk deployment.
    3.  Gradually enable the flag for a small percentage of users (e.g., 1%).
    4.  Monitor all logs, metrics, and alerts closely for the targeted user group.
    5.  Gradually increase the traffic (10%, 50%, 100%) as confidence grows.
*   **Rollback Strategy:**
    *   **Immediate Rollback:** If any issues are detected, the feature flag can be disabled instantly, causing all traffic to revert to the old code path without requiring a new deployment.
    *   **Code Rollback:** If a code-level bug is identified, the previous version of the service can be redeployed.

---

#### **15. Overall Implementation Complexity**

**Low to Medium.**

*   **Low:** The core code change is contained within a single method's \`catch\` block and involves adding a new producer method and DTO. The architectural pattern (asynchronous event via Kafka) is a standard practice.
*   **Medium:** The complexity arises from the operational concerns: provisioning the new Kafka topic, creating/modifying a \`notification-service\`, setting up comprehensive monitoring, and executing a proper feature-flagged rollout. This requires cross-team coordination and careful planning.

---

#### **16. Final Recommended Design Approach**

The recommended approach is to implement an **asynchronous, event-driven notification pattern** using Kafka.

1.  **Decouple:** The \`payment-service\` should remain solely responsible for processing payments. It should not be responsible for the mechanics of sending emails. Its responsibility ends with publishing a "payment failed" event.
2.  **Implement in Service Layer:** Modify the \`PaymentService.processPayment\` method. In the \`catch\` block that handles downstream exceptions, create a \`PaymentFailureEvent\` and publish it to a new, dedicated Kafka topic (e.g., \`payment-failure-notifications\`).
3.  **Use a Dedicated Notification Service:** A separate \`notification-service\` should be the consumer of this topic. This service will contain the business logic, templates, and client integrations for sending emails via an external provider (like SendGrid, SES, etc.). This allows for independent scaling, maintenance, and evolution of the notification system.
4.  **Ensure Resilience:** The call to the Kafka producer within the payment service should be wrapped in its own \`try-catch\` to ensure that a failure to publish the notification does not cause a cascading failure or obscure the original payment error.
5.  **Safe Deployment:** Utilize a feature flag for the entire new logic path. This allows for safe, incremental rollouts and instant rollback capabilities, minimizing risk to production.

This approach is robust, scalable, and adheres to microservices best practices by maintaining service boundaries and leveraging asynchronous communication for secondary actions.`,
    affectedChannels: [
      {
        id: 'channel-4',
        name: 'Backend Services',
        type: 'web' as const,
        applications: [
          {
            id: 'app-4',
            name: 'Payment Service',
            modules: [
              {
                id: 'module-7',
                name: 'PaymentController',
                apis: [
                  {
                    id: 'api-16',
                    name: 'POST /api/payment/process',
                    isAffected: true,
                    criticality: 'minor' as const,
                    callStack: [
                      { method: 'processPayment', description: 'Controller entry point for payment processing', line: 45 },
                      { method: 'handleException', description: 'Exception handling mechanism review', line: 78 },
                    ],
                  },
                ],
              },
              {
                id: 'module-8',
                name: 'PaymentService',
                apis: [
                  {
                    id: 'api-17',
                    name: 'processPayment()',
                    isAffected: true,
                    criticality: 'major' as const,
                    callStack: [
                      { method: 'processPayment', description: 'Core payment processing logic', line: 123 },
                      { method: 'handlePaymentFailure', description: 'New error handling with notification trigger', line: 167 },
                      { method: 'createFailureEvent', description: 'Create PaymentFailureEvent object', line: 189 },
                    ],
                  },
                ],
              },
              {
                id: 'module-9',
                name: 'NotificationProducer',
                apis: [
                  {
                    id: 'api-18',
                    name: 'sendPaymentFailureNotification()',
                    isAffected: true,
                    criticality: 'major' as const,
                    callStack: [
                      { method: 'sendPaymentFailureNotification', description: 'New method to publish failure event to Kafka', line: 56 },
                      { method: 'serializeEvent', description: 'Serialize PaymentFailureEvent to JSON', line: 89 },
                      { method: 'publishToKafka', description: 'Send to payment-failure-notifications topic', line: 102 },
                    ],
                  },
                  {
                    id: 'api-19',
                    name: 'sendPaymentNotification()',
                    isAffected: false,
                    criticality: 'support' as const,
                    callStack: [
                      { method: 'sendPaymentNotification', description: 'Existing success notification method', line: 34 },
                    ],
                  },
                ],
              },
              {
                id: 'module-10',
                name: 'AccountServiceClient',
                apis: [
                  {
                    id: 'api-20',
                    name: 'updateBalance()',
                    isAffected: false,
                    criticality: 'support' as const,
                    callStack: [
                      { method: 'updateBalance', description: 'Updates account balance - failure triggers notification', line: 67 },
                    ],
                  },
                  {
                    id: 'api-21',
                    name: 'getEmail()',
                    isAffected: true,
                    criticality: 'support' as const,
                    callStack: [
                      { method: 'getEmail', description: 'Retrieves user email for notification', line: 123 },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'app-5',
            name: 'Notification Service',
            modules: [
              {
                id: 'module-11',
                name: 'NotificationConsumer',
                apis: [
                  {
                    id: 'api-22',
                    name: 'consumePaymentFailure()',
                    isAffected: false,
                    criticality: 'minor' as const,
                    callStack: [
                      { method: 'consumePaymentFailure', description: 'Consumes messages from payment-failure-notifications topic', line: 45 },
                      { method: 'sendEmail', description: 'Sends email via external provider', line: 78 },
                    ],
                  },
                ],
              },
            ],
          },
          {
            id: 'app-6',
            name: 'Account Service',
            modules: [
              {
                id: 'module-12',
                name: 'AccountService',
                apis: [
                  {
                    id: 'api-23',
                    name: 'updateBalance()',
                    isAffected: false,
                    criticality: 'support' as const,
                    callStack: [
                      { method: 'updateBalance', description: 'Account balance update - failure is the trigger', line: 89 },
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
