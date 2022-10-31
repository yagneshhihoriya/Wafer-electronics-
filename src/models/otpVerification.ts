import {Model} from 'objection'
class OtpVerification extends Model{
    static get tableName(){
        return 'otpVerification';
    }
}
export = OtpVerification
