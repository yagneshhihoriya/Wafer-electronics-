import {Model} from 'objection'
class Admin extends Model{
    static get tableName(){
        return 'admin';
    }
}
export = Admin
