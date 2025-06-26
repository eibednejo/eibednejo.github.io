import React from 'react';

const SubscriptionPage: React.FC = () => {
    const subscriptionPlans = [
        { id: 1, name: 'Basic Plan', price: '$10/month' },
        { id: 2, name: 'Standard Plan', price: '$20/month' },
        { id: 3, name: 'Premium Plan', price: '$30/month' },
    ];

    const handleSubscriptionSelect = (planId: number) => {
        // Logic to handle subscription selection
        console.log(`Selected plan ID: ${planId}`);
    };

    return (
        <div>
            <h1>Subscription Plans</h1>
            <ul>
                {subscriptionPlans.map(plan => (
                    <li key={plan.id}>
                        <h2>{plan.name}</h2>
                        <p>{plan.price}</p>
                        <button onClick={() => handleSubscriptionSelect(plan.id)}>Select</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SubscriptionPage;