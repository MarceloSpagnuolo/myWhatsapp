import axios from 'axios'
import { Dispatch } from 'redux'
import { chatType } from '../../pages/home'
import { ERROR, SEND_READ, SEND_TEXT } from '../constants'

const wsToken = process.env.REACT_APP_WSTOKEN
const phone_id = process.env.REACT_APP_ARGENTINA_PHONE_ID

export const sendText = (payload: any) => async (dispatch: Dispatch) => {
    const headers = {
        Authorization: 'Bearer ' + wsToken,
        'Content-Type': 'application/json',
    }
    const messageText = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: payload.phone,
        type: 'text',
        text: {
            preview_url: false,
            body: payload.text,
        },
    }

    try {
        const response = await axios.post(`https://graph.facebook.com/v18.0/${phone_id}/messages`, messageText, {
            headers,
        })
        console.log('Response:', response.data)
        const data = response.data
        const message: chatType = {
            id: data.messages[0].id,
            client: data.contacts[0].input,
            dateTime: new Date(),
            direction: 'send',
            text: payload.text,
            status: '',
        }
        dispatch({
            type: SEND_TEXT,
            payload: message,
        })
    } catch (error) {
        console.log('Error sendText:', error)
        const message: chatType = {
            id: '',
            client: payload.phone,
            dateTime: new Date(),
            direction: 'send',
            text: payload.text,
            status: 'error',
        }
        dispatch({
            type: SEND_TEXT,
            payload: message,
        })
    }
}

export const sendReadConfirmation = (payload: any) => async (dispatch: Dispatch) => {
    const headers = {
        Authorization: 'Bearer ' + wsToken,
        'Content-Type': 'application/json',
    }
    const message = {
        messaging_product: 'whatsapp',
        status: 'read',
        message_id: payload.message_id,
    }
    try {
        const response = await axios.post(
            `https://graph.facebook.com/v18.0/${payload.phone_number_id}/messages`,
            message,
            { headers }
        )
        dispatch({
            type: SEND_READ,
            payload: response.data,
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: error,
        })
    }
}
