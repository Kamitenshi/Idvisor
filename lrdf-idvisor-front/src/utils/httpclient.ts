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

const queryData = async (method: (url: string, data?: any, config?: AxiosRequestConfig | undefined) => Promise<AxiosResponse<Response>>, service: string, action: string, body?: any) => {
    console.log(JSON.stringify(body))
    const url = createUrl(service, action)
    const result = await method(url, body)
    console.log("Request successfully created: " + JSON.stringify(body)) // TODO: remove
    return result

}

export const postData = async (service: string, action: string, body?: any) => {
    return queryData(transport.post, service, action, body)
}

export const getData = async (service: string, action: string, body?: any) => {
    return queryData(transport.get, service, action, { params: body })
}