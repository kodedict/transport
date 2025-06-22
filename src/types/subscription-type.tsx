interface SubscriptionType{
    status: 'awaiting_payment' | 'awaiting_payment_confirmation' | 'ongoing' | 'completed' | 'cancelled';
    reference: string;
    type: string;
    product: ProductType;
    payment_plan: PaymentPlanType;
    payment_mode: string;
    user: {
        uuid: string;
        full_name: string;
        email: string;
    };
    created_at: string;
    completed_at: string;
    updated_at: string;
    is_user: boolean;
    total_amount_paid: string,
    next_payment_date: string,
    next_payment_amount: string
    duration_left: string
    paid_at:string
    meta: any
}