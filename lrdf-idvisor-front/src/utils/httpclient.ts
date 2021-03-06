import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import Cookie from 'js-cookie'
import io from 'socket.io-client'
import { env } from './env'

export const transport = axios.create({
    withCredentials: true,
})

interface Response {
    status: number,
    responseMessage: string,
    result: any
}

const createUrl = (service: string, action?: string) => {
    const protocol = "http"
    const url = protocol + '://' + env.BACK_ADRESS + '/' + service

    return action ? url + '/' + action : url
}

type AxiosMethod = (url: string, data?: any, config?: AxiosRequestConfig | undefined) => Promise<AxiosResponse<Response>>

const sendQuery = async (method: AxiosMethod, service: string, action: string, body?: any, params?: any) => {
    const url = createUrl(service, action)
    console.log("Request created : " + JSON.stringify({
        url,
        body,
        params
    })) // TODO: remove
    const result = body ? await method(url, body, { params }) : await method(url, { params })
    console.log("Response: " + JSON.stringify(result))
    return result
}

export const postData = async (service: string, action: string, data?: any, params?: any) => {
    return sendQuery(transport.post, service, action, data, params)
}

export const getData = async (service: string, action: string, params?: any) => {
    return sendQuery(transport.get, service, action, null, params)
}

export const deleteData = async (service: string, action: string, params?: any) => {
    return sendQuery(transport.delete, service, action, null, params)
}

export const patchData = async (service: string, action: string, data?: any, params?: any) => {
    return sendQuery(transport.patch, service, action, data, params)
}

export const getToken = () => Cookie.get('jwt')


export const socket = io.connect("http://" + env.BACK_ADRESS)