/**
 * Created by developeri on 4/26/17.
 */
class Petitions {
    request(url, method, params = null) {
        return new Promise((resolve, reject) => {
            let data = {
                method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            };
            return fetch(url, data)
                .then(response => {
                    console.log(response);
                    return response.json();
                })
                .then(resolve)
                .catch(reject)
        });
    }
}

export default Petitions;