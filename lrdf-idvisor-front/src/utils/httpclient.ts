import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

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
    const domain = "localhost"
    const port = 4000
    const url = protocol + '://' + domain + ':' + port + '/' + service

    return action ? url + '/' + action : url
}

const paramsData = async (method: (url: string, data?: any, config?: AxiosRequestConfig | undefined) => Promise<AxiosResponse<Response>>, service: string, action: string, body?: any) => {
    const url = createUrl(service, action)
    console.log("Request created : " + JSON.stringify({
        url,
        body,
    })) // TODO: remove
    const result = await method(url, body)
    console.log("Response: " + JSON.stringify(result))
    return result

}

export const postData = async (service: string, action: string, data?: any, params?: any) => {
    return paramsData(transport.post, service, action, { data, params })
}

export const getData = async (service: string, action: string, params?: any) => {
    return paramsData(transport.get, service, action, { params })
}

export const deleteData = async (service: string, action: string, params?: any) => {
    return paramsData(transport.delete, service, action, { params })
}

export const patchData = async (service: string, action: string, data?: any, params?: any) => {
    return paramsData(transport.patch, service, action, { data, params })
}