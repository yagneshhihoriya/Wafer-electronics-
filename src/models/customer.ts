import {Model} from 'objection'
class Customer extends Model{
    static get tableName(){
        return 'customers';
    }
}
export = Customer
