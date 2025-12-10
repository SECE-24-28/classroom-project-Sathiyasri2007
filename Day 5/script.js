// API Integration Functions
async function fetchPlansFromAPI() {
    try {
        // Replace with your actual MockAPI URL
        const response = await fetch('https://67a7a1a4b61da65651c6bb69.mockapi.io/api/v1/plans');
        
        if (!response.ok) {
            throw new Error('Failed to fetch plans');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching plans from API:', error);
        return getFallbackPlans();
    }
}

function getFallbackPlans() {
    return [
        {
            "id": "1",
            "type": "prepaid",
            "price": 199,
            "validity": "28 days",
            "data": "1.5GB/day",
            "description": "Unlimited calls + 100 SMS/day",
            "operator": "All Networks"
        },
        {
            "id": "2",
            "type": "prepaid",
            "price": 299,
            "validity": "28 days",
            "data": "2GB/day",
            "description": "Unlimited calls + 100 SMS/day",
            "operator": "All Networks"
        },
        {
            "id": "3",
            "type": "prepaid",
            "price": 399,
            "validity": "56 days",
            "data": "2.5GB/day",
            "description": "Unlimited calls + 200 SMS/day",
            "operator": "All Networks"
        }
    ];
}

// Save plan selection to localStorage
function savePlanSelection(plan) {
    localStorage.setItem('selectedPlan', JSON.stringify(plan));
    window.location.href = 'recharge.html';
}

// Update the existing DOMContentLoaded event listener to handle API integration
document.addEventListener('DOMContentLoaded', function() {
    // ... (existing code) ...
    
    // Add API fetch for plans page if it exists
    if (window.location.pathname.includes('plans.html')) {
        // This will be handled by the inline script in plans.html
        // The main script.js functions can be used by the inline script
    }
    
    // ... (rest of existing code) ...
});