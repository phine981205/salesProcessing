export class Sales {
    invoiceNo?: string;
    status?: string;
    period?: number;
    salesmanId?: string;
    salesValue?: number;
    gst?: number;
    invoiceAmt?: number;
    costValue?: number;
}

export class Receipt {
    transactionId?: string;
    status?: string;
    receiptNo?: string;
    period?: number;
    invoiceNo?: string;
    price?: number;
}