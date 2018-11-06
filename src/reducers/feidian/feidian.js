
import {  hotRecommendTypes ,pinRecommendTypes } from '../../actions/feidian/feidian.action'
import { SUCCESS, FAILURE } from '../../utils/generateType.js'

let initState = {}
export default (state = initState,action) => {
    switch (action.type) {
        case hotRecommendTypes[SUCCESS]:
            return {
                ...state,
                hotRecommend: action.response.d
            }
        case hotRecommendTypes[FAILURE]:
            return {
                ...state,
                hotRecommend: null
            }
        case pinRecommendTypes[SUCCESS]:
            return {
                ...state,
                pinRecommend: action.response.d
            }
        case pinRecommendTypes[FAILURE]:
            return {
                ...state,
                pinRecommend: null
            }
    
        default:
            return state
    }
}