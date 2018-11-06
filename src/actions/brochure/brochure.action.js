/**  
 * 小册
*/
import { generateTypes } from '../../utils/generateType'
import { CALL_API } from '../../middleware/api'

export const brochureTypes = generateTypes('BROCHURE')
export const authorDetailTypes = generateTypes('AUTHOR')
export const listSelectionTypes = generateTypes('LISTSECTION')

let fetchListByLastTime = (params) => {
    return {
        [CALL_API] : {
            endpoint: '/api5/getListByLastTime',
            method: 'GET',
            types: brochureTypes,
            params
        }
    }
}

let fetchAuthorDetail = (params) => {
    return {
        [CALL_API] : {
            endpoint: '/api6/get',
            method: 'GET',
            types: authorDetailTypes,
            params
        }
    }
}

let fetchListSection = (params) => {
    return {
        [CALL_API] : {
            endpoint: '/api6/getListSection',
            method: 'GET',
            types: listSelectionTypes,
            params
        }
    }
}

export let getListByLastTime = (params) => (dispatch) => {
    return dispatch(fetchListByLastTime(params))
}

export let getAuthorDetail = (params) => (dispatch) => {
    return dispatch(fetchAuthorDetail(params))
}

export let getListSection = (params) => (dispatch) => {
    return dispatch(fetchListSection(params))
}