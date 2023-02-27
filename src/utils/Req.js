import axios from "axios";
import { NotificationManager } from "react-notifications";
// const server = 'http://103.143.40.57'
const server = 'http://localhost:5002'

const Req = (method, { url, body, headers = {}, toast }) => {
    return new Promise(async (resolve, reject) => {
        try {
            const jwt = localStorage.getItem('jwt')
            const axiosParams = [server + url]
            if (body) axiosParams.push(body)
            axiosParams.push({ headers: { ...headers, 'Authorization': 'Bearer ' + jwt } })
            const result = await axios[method](...axiosParams)
            toast && NotificationManager.success('', 'Амжилттай', 3000)
            resolve(result)
        } catch (e) {
            toast && NotificationManager.error('', 'Алдаа гарлаа', 3000)
            reject(e)
        }
    })
}

export default Req

export const Url = server