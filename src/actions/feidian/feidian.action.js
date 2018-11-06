import {CALL_API} from '../../middleware/api';
import { generateTypes } from '../../utils/generateType'

export const hotRecommendTypes = generateTypes('HOTCOMMEND')
export const pinRecommendTypes = generateTypes('PINRECOMMEND')

let fetchHotRecommendList = (params) => {
    return {
        [CALL_API]: {
            endpoint: '/api4/getHotRecommendList',
            method: 'GET',
            types: hotRecommendTypes,
            params
        }
    }
}

let fetchPinListRecommend = (params) => {
    return {
        [CALL_API]: {
            endpoint: '/api4/pinList/recommend',
            method: 'GET',
            types: pinRecommendTypes,
            params
        }
    }
}


export let getHotRecommendList = (params) => (dispatch) => {
    return dispatch(fetchHotRecommendList(params))
}

export let getPinRecommendList = (params) => (dispatch) => {
    return dispatch(fetchPinListRecommend(params))
}