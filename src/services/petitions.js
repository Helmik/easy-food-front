/**
 * Created by developeri on 4/26/17.
 */
export default class Petitions {
    request(url, method, params = null) {
        const baseUrl = 'http://localhost';
        const postUrl = 'api/';
        const port = '3000';
        const fullUrl = baseUrl + ':' + port + '/' + postUrl;
        return new Promise((resolve, reject) => {
            let data = {
                method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            };
            let token = localStorage.getItem('token');
            if(token){
                data.headers.Authorization = token;
            }
            if (params) {
                data.body = JSON.stringify(params);
            }
            fetch(fullUrl + url, data)
            .then(response => {
                if(response.ok){
                    resolve(response.json());
                } else {
                    reject(response.json());
                }
            });
        });
    }
}
