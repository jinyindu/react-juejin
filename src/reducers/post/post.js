import {
    timeLineTypes,
    hotRecommentTypes,
    userFilterEntryTypes,
    bannerStoreTypes,
    entryByRankTypes,
    postDetailTypes
} from '../../actions/post/post.action'
import {
    SUCCESS,
    FAILURE
} from '../../utils/generateType.js'

let initState = {
}

export default (state = initState, action) => {
    switch (action.type) {
        case timeLineTypes[SUCCESS]:
            return {
                ...state,
                pageData: action.response.d
            }
        case timeLineTypes[FAILURE]:
            return {
                ...state,
                pageData: null
            }
        case hotRecommentTypes[SUCCESS]:
            return {
                ...state,
                pageData : action.response.d
            }
        case hotRecommentTypes[FAILURE]:
            return {
                ...state,
                pageData: null
            }
        case userFilterEntryTypes[SUCCESS]:
            return {
                ...state,
                pageData : action.response.d
            }
        case userFilterEntryTypes[FAILURE]:
            return {
                ...state,
                pageData: null
            }
        case bannerStoreTypes[SUCCESS]:
            return {
                ...state,
                bannerDetail : action.response.d
            }
        case bannerStoreTypes[FAILURE]:
            return {
                ...state,
                bannerDetail: null
            }
        case entryByRankTypes[SUCCESS]:
            return {
                ...state,
                rankDetail : action.response.d
            }
        case entryByRankTypes[FAILURE]:
            return {
                ...state,
                bannerDetail: null
            }
        case postDetailTypes[SUCCESS]:
            return {
                ...state,
                postDetail : action.response.d
            }
        case postDetailTypes[FAILURE]:
            return {
                ...state,
                postDetail: null
            }
        default:
            return state
    }
}