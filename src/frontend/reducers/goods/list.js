import {GOODS_LIST_REQUEST, GOODS_LIST_SUCCESS, GOODS_LIST_FAILURE} from '../../actions/goods';

export default function (state = {
    isFetching: false,
    didInvalidate: false,
    didUpdate: false,
    pagination:{
    }
}, action) {
    switch (action.type) {
        case GOODS_LIST_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                didUpdate: false
            })
            break;
        case GOODS_LIST_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                didUpdate: false
            })
            break;
        case GOODS_LIST_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                didUpdate: true,
                ... action.payload
            })
            break;
        default:
            return state
    }
}
