import { config } from '../config';

export class SchoolProvider {
    static getSchoolsByKanton() {
        let schools;

        fetch(`${config.API}/school/all`)
            .then(response => response.json())
            .then(result => {
                schools = result;
            });
        
        return schools;
    }
}
