export interface WsReceiveMessage {
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
    contacts: Contact[]
    messages: Message[]
}

export interface Contact {
    profile: Profile
    wa_id: string
}

export interface Profile {
    name: string
}

export interface Message {
    from: string
    id: string
    timestamp: string
    text?: Text
    image?: Media
    video?: Media
    audio?: Media
    document?: Media
    contacts?: Contact[]
    location: Location
    type: 'text' | 'image' | 'video' | 'audio' | 'document' | 'contacts' | 'location'
}

export interface Text {
    body: string
}

export interface Metadata {
    display_phone_number: string
    phone_number_id: string
}

export interface Media {
    myme_type: string
    sha256: string
}

export interface Contact {
    name: NameContact
    phones: PhoneContact[]
}

export interface NameContact {
    first_name: string
    last_name: string
    formated_name: string
}

export interface PhoneContact {
    phone: string
    wa_id: string
    type: string
}

export interface Location {
    address: string
    latitude: number
    longitude: number
    name: string
    url: string
}
