import {CALL_API} from '../../middleware/api';
import { generateTypes } from '../../utils/generateType';

export const loginForPhoneTypes = generateTypes('LOGIN_PHONE');
export const loginForEmailTypes = generateTypes('LOGIN_EMAIL')

//登录
let fetchLoginForPhone = (params) => {
   return {
        [CALL_API] :{
            endpoint: '/api2/phoneNumber',
            method: 'POST',
            types: loginForPhoneTypes,
            params
        }
   }
}
let fetchLoginForEmail = (params) => {
    return {
        [CALL_API] :{
            endpoint: '/api2/email',
            method: 'POST',
            types: loginForEmailTypes,
            params
        }
    }
}

export let LoginOfPhone = (params) => (dispatch) => {
    return dispatch(fetchLoginForPhone(params))
} 

export let loginOfEmail = (params) => (dispatch) => {
    return dispatch(fetchLoginForEmail(params))
}