export interface WsSendMessage {
    object: string
    entry: Entry[]
}

export interface Entry {
    id: string
    changes: Change[]
}

export interface Change {
    value: Value
    field: string
}

export interface Value {
    messaging_product: string
    metadata: Metadata
    statuses: Status[]
}

export interface Metadata {
    display_phone_number: string
    phone_number_id: string
}

export interface Status {
    id: string
    status: 'sent' | 'delivered' | 'read' | 'deleted' | 'failed' | 'warning'
    timestamp: string
    recipient_id: string
    conversation?: Conversation
    pricing?: Pricing
}

export interface Conversation {
    id: string
    expiration_timestamp: string
    origin: Origin
}

export interface Origin {
    type: string
}

export interface Pricing {
    billable: boolean
    pricing_model: string
    category: string
}
