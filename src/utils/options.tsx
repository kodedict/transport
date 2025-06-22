import OptionType from "@/types/option-type";

const ProductTypes : OptionType[] = ['land', 'land_investment'].map((item: any) => ({value: item, name: item.replace('_', ' ')})); //land_investment

const LandTypes : OptionType[] = ['plot', 'acre'].map((item: any) => ({value: item, name: item.replace('_', ' ')}));

const LandInvestmentTypes: OptionType[] = ['recurring', 'one_time'].map((item: any) => ({ value: item, name: item.replace('_', ' ') }));


const ProductPaymentPlanTypes : OptionType[] = ['days', 'weeks', 'months', 'years'].map((item: any) => ({value: item, name: item.replace('_', ' ')}));

const SubscriptionStatusOptions : OptionType[] = [
    {value: 'ongoing', name: 'Ongoing'},
    {value: 'awaiting_payment', name: 'Not paid'},
    {value: 'completed', name: 'Completed'},
    {value: 'awaiting_payment_confirmation', name: 'Confirming payment'},
    {value: 'cancelled', name: 'Cancelled'},
    ].map((item: any) => ({value: item.value, name: item.name}));

    // 'awaiting_payment' => 'Not paid',
    // 'completed',
    // 'ongoing',
    // 'awaiting_payment_confirmation', 
    // 'cancelled',

const CustomOptions = (options: string[]) => {
    return options.map((item: any) => ({value: item, name: item.replace('_', ' ')}));
}

export { 
    ProductTypes,
    LandTypes,
    ProductPaymentPlanTypes,
    SubscriptionStatusOptions,
    LandInvestmentTypes,
    CustomOptions,
};