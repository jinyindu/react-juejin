/** 
 * 小册 reducer
 */
import {brochureTypes , authorDetailTypes ,listSelectionTypes} from '../../actions/brochure//brochure.action'
import { SUCCESS,FAILURE} from '../../utils/generateType'
let initState = {}

export default (state = initState,action) => {
    switch (action.type) {
        case brochureTypes[SUCCESS]:
            return {
                ...state,
                brochDetail: action.response.d
            }
        case brochureTypes[FAILURE]:
            return {
                ...state,
                brochDetail: []
            }
        case authorDetailTypes[SUCCESS]:
            return {
                ...state,
                authorDetail: action.response.d
            }
        case authorDetailTypes[FAILURE]:
            return {
                ...state,
                authorDetail: []
            }
        case listSelectionTypes[SUCCESS]:
            return {
                ...state,
                sectionData: action.response.d
            }
        case listSelectionTypes[FAILURE]:
            return {
                ...state,
                sectionData: []
            }
    
        default:
            return state
    }
}