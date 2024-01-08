import { SEND_TEXT } from '../constants'

export interface ClientType {
    name: string
    wa_id: string
    display_phone_number: string
    phone_number_id: string
}

interface initialStateType {
    clients: ClientType[]
    selectedClient?: ClientType
    chat: any[]
}

const initialState: initialStateType = {
    clients: [],
    selectedClient: undefined,
    chat: [],
}

interface Action {
    type: string
    payload: any
    message?: string
}

const Reducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case SEND_TEXT: {
            return {
                ...state,
                chat: [...state.chat, action.payload],
            }
        }
        default: {
            return state
        }
    }
}

export default Reducer
