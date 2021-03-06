import {ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAILURE} from '../../actions/order';

export default function (state = {
    isFetching: false,
    didInvalidate: false,
    didUpdate:false,
    pagination:{
    }
}, action) {
    switch (action.type) {
        case ORDER_LIST_FAILURE:
            delete action.payload.data;
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: true,
                didUpdate:false,
                ...action.payload
            })
            break;
        case ORDER_LIST_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false,
                didUpdate:false,
            })
            break;
        case ORDER_LIST_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                didInvalidate: false,
                didUpdate:true,
                ...action.payload
            })
            break;

        default:
            return state
    }
}
