import Petitions from './petitions';
const petitions = new Petitions();
/**
 * Created by developeri on 4/28/17.
 */
export default class PlaceService {
    getAll() {
        return petitions.request('Places', 'GET');
    }
}