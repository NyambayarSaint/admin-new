export const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
export const tableModel = (attributes) => {
    let o = {};
    Object.keys(attributes).forEach(key => o[key] = {
        label: capitalize(key),
        type: attributes[key].interfaceType
    });
    return o
}
const errorDetail = (err) => {
    return new Promise((resolve, reject) => {
        if (err.isAxiosError) {
            if (err.response) {
                // Server was able to send us a response, so this is an API Error.
                console.error('[API Error]:', err.response.data);
                resolve(err.response.data.error)
            } else {
                // Axios was not able to get a response at all. This is a Network-Level Error.
                console.error('[Network Error]: No Response Received At', err);
                resolve('Та интернет холболтоо шалгана уу')
            }
        } else {
            console.error("[Non-HTTP Error]:", err);
            resolve(err.message)
        }
    })
};

export default errorDetail;