import { SHOP_CHOOSE_FAILURE,SHOP_CHOOSE_REQUEST,SHOP_CHOOSE_SUCCESS } from '../actions/shop';

export default function (state = {
}, action) {
    switch (action.type) {
        case SHOP_CHOOSE_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                didUpdate: false,
                ...action.payload
            })
            break;
        case SHOP_CHOOSE_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                didUpdate: false,
                data:null,
            })
            break;
        case SHOP_CHOOSE_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                didUpdate: true,
                ...action.payload
            })
            break;
        default:
            return state
    }
}
