import axios, { AxiosRequestConfig } from "axios";
import { logoutStart } from '~/redux/action/authActions';
import store from '~/redux/store/store';

const serverUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:9000';
const serverApiVersion = process.env.REACT_APP_SERVER_API_VERSION || 'v1';
axios.defaults.baseURL = `${serverUrl}/api/${serverApiVersion}`;
axios.defaults.withCredentials = true;

let isLogoutTriggered = false;

function resetIsLogoutTriggered() {
    isLogoutTriggered = false;
}

axios.interceptors.response.use(
    response => response,
    error => {
        const { data, status } = error.response;
        if (status === 401
            && (data?.error?.type || '') !== 'INCORRECT_CREDENTIALS'
            && error.config
            && !error.config.__isRetryRequest
        ) {
            if (!isLogoutTriggered) {
                isLogoutTriggered = true;
                store.dispatch(logoutStart(resetIsLogoutTriggered));
            }
        }
        return Promise.reject(error);
    }
);

const httpRequest = <T>(req: AxiosRequestConfig): Promise<T> => {
    return new Promise(async (resolve, reject) => {
        try {
            const request = await axios(req);

            resolve(request.data.data)
        } catch (e) {
            reject(e?.response?.data || {});
        }
    });
}

export default httpRequest;