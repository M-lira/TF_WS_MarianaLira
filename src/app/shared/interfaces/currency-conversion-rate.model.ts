import { ConversationRate } from "./conversation-rate.model";

export interface CurrencyConversionRate {
    base_code: string;
    conversion_rates: ConversationRate;
    documentation: string;
    result: string;
    terms_of_use: string;
    time_last_update_unix: number;
    time_last_update_utc: string;
    time_next_update_unix: number;
    time_next_update_utc: string;
}