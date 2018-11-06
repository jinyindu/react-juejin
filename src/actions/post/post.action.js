import {CALL_API} from '../../middleware/api';
import { generateTypes } from '../../utils/generateType'

export const timeLineTypes = generateTypes('POSTITEM')
export const hotRecommentTypes = generateTypes('HOTRECOMMENT')
export const userFilterEntryTypes = generateTypes('userFilterEntry')
export const bannerStoreTypes = generateTypes('BANNERSTORE')
export const entryByRankTypes = generateTypes('ENTRYBYRANK')
export const postDetailTypes = generateTypes('POSTDETAIL')

/** 首页timeline推荐文章 */
let fetchGetTimeLine = (params) => {
    return {
        [CALL_API]: {
            endpoint: '/api/get_entry_by_timeline',
            method: 'GET',
            types: timeLineTypes,
            params
        }
    }
}

/** 热门推荐 */
let fetchHotRecomment = (params) => {
    return {
        [CALL_API]:{
            endpoint: '/api/get_entry_by_hot_recomment',
            method:'GET',
            types: hotRecommentTypes,
            params
        }
    }
}

let fetchFilterEntry = (params) => {
    return {
        [CALL_API]:{
            endpoint: '/api/user_filter_entry',
            method:'GET',
            types: userFilterEntryTypes,
            params
        }
    }
}

/** 获取banner */
let fetchGetBanner = (params) => {
    return {
        [CALL_API]:{
            endpoint: '/api3/get_banner',
            method:'GET',
            types: bannerStoreTypes,
            params
        }
    }
}

/** 搜索页面 热门文章 */
let fetchEntryByRank = (params) => {
    return{
        [CALL_API]:{
            endpoint: '/api/get_entry_by_rank',
            method:'GET',
            types: entryByRankTypes,
            params
        }
    }
}
/*** 文章详情 */
let fetchPostDetail = (params) => {
    return{
        [CALL_API]:{
            endpoint: '/api7/getDetailData',
            method:'GET',
            types: postDetailTypes,
            params
        }
    }
}


export let getTimeLineList = (params) => (dispatch) => {
    return dispatch(fetchGetTimeLine(params))
}

export let getEntryByHotRecomment = (params) => (dispatch) => {
    return dispatch(fetchHotRecomment(params))
}

export let getUserFilterEntry = (params) => (dispatch) => {
    return dispatch(fetchFilterEntry(params))
}

export let getBanner = (params) => (dispatch) => {
    return dispatch(fetchGetBanner(params))
}

export let getEntryByRank = (params) => (dispatch) => {
    return dispatch(fetchEntryByRank(params))
}

export let getPostDetail = (params) => (dispatch) => {
    return dispatch(fetchPostDetail(params))
}