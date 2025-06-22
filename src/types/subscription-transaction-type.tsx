interface SubscriptionTransactionType{
    status: 'awaiting_confirmation' | 'paid' | 'not_confirmed'
    reference: string;
    amount: string;
    description: string;
    next_payment: string,
    proof_of_payment: string;
    paid_at: string;
}