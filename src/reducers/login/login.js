import {
    loginForPhoneTypes,
    loginForEmailTypes
} from '../../actions/login/login.action'
import {
    SUCCESS,
    FAILURE
} from '../../utils/generateType.js'

let initState = {
}

export default (state=initState,action) => {
    switch (action.type) {
        case loginForPhoneTypes[SUCCESS]:
            return {
                ...state,
                pageData: action.response.d
            }
        case loginForPhoneTypes[FAILURE]:
            return {
                ...state,
                pageData: null
            }
            case loginForEmailTypes[SUCCESS]:
            return {
                ...state,
                pageData: action.response.d
            }
        case loginForEmailTypes[FAILURE]:
            return {
                ...state,
                pageData: null
            }
        default:
            return state
    }
}