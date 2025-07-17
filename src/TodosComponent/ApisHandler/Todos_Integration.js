import { apiclient } from "./Baseapi";


export const helloworldapi = () => apiclient.get('/hello')

export const reteriveTodosapi = (username) => apiclient.get(`/user/${username}/todos`)

export const reteriveTodosbyIDapi = (username,id) => apiclient.get(`/user/${username}/todos/${id}`)

export const deleteTodosbyIDapi = (username,id) => apiclient.delete(`/user/${username}/todos/${id}`)

export const updatetodoapi = (username,id,todo) => apiclient.put(`/user/${username}/todos/${id}`,todo)

export const createTodosapi = (username,todo) => apiclient.post(`/user/${username}/todos`,todo)