import Petitions from './petitions';
const petitions = new Petitions();
/**
 * Created by developeri on 4/26/17.
 */
export default class LoginService {
    login(username, password) {
        return petitions.request('users/login', 'POST', {username, password});
    }
}
