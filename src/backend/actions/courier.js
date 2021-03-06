/**
 * Created by zhangbohan on 16/11/1.
 */


import fetch from '../common/fetch';

export const COURIER_REQUEST = 'COURIER_REQUEST';
export const COURIER_SUCCESS = 'COURIER_SUCCESS';
export const COURIER_FAILURE = 'COURIER_FAILURE';

export const COURIER_LIST_REQUEST = 'COURIER_LIST_REQUEST';
export const COURIER_LIST_SUCCESS = 'COURIER_LIST_SUCCESS';
export const COURIER_LIST_FAILURE = 'COURIER_LIST_FAILURE';

export const CANDIDATE_COURIER_LIST_REQUEST = 'CANDIDATE_COURIER_LIST_REQUEST';
export const CANDIDATE_COURIER_LIST_SUCCESS = 'CANDIDATE_COURIER_LIST_SUCCESS';
export const CANDIDATE_COURIER_LIST_FAILURE = 'CANDIDATE_COURIER_LIST_FAILURE';



export const COURIER_UPDATE_REQUEST = 'COURIER_UPDATE_REQUEST';
export const COURIER_UPDATE_SUCCESS = 'COURIER_UPDATE_SUCCESS';
export const COURIER_UPDATE_FAILURE = 'COURIER_UPDATE_FAILURE';

export const COURIER_CREATE_REQUEST = 'COURIER_CREATE_REQUEST';
export const COURIER_CREATE_SUCCESS = 'COURIER_CREATE_SUCCESS';
export const COURIER_CREATE_FAILURE = 'COURIER_CREATE_FAILURE';



export const COURIER_DELETE_REQUEST = 'COURIER_DELETE_REQUEST';
export const COURIER_DELETE_SUCCESS = 'COURIER_DELETE_SUCCESS';
export const COURIER_DELETE_FAILURE = 'COURIER_DELETE_FAILURE';


export const COURIER_STATUS_UPDATE_REQUEST = 'COURIER_STATUS_UPDATE_REQUEST';
export const COURIER_STATUS_UPDATE_SUCCESS = 'COURIER_STATUS_UPDATE_SUCCESS';
export const COURIER_STATUS_UPDATE_FAILURE = 'COURIER_STATUS_UPDATE_FAILURE';


export const COURIER_CLEAR = 'COURIER_CLEAR';


export function clearCourier() {
    return {
        type: COURIER_CLEAR,
    };
}

//查询配送员详情

function courier_failure(payload) {
    return {
        type: COURIER_FAILURE,
        payload
    };
}

function courier_request(payload) {
    return {
        type: COURIER_REQUEST,
        payload
    };
}

function courier_success(json) {
    return {
        type: COURIER_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}


function fetchCourier(data) {
    return dispatch => {
        dispatch(courier_request(data));
        return fetch('/api/courier/' + data)
            .then((json) => {
                dispatch(courier_success(json));
            }).catch(error => {
                dispatch(courier_failure(error))
            });
    };
}


export function fetchCourierIfNeeded(id) {

    if (id == 'create') {
        return false
    }

    return (dispatch, getState) => {
        const {item} = getState().courier;

        if (shouldFetchData(item)) {
            return dispatch(fetchCourier(id));
        }
    };
}


function shouldFetchData(courier) {
    if (courier.isFetching) {
        return false;
    }
    return true;
}

//查询配送员列表

function courier_list_failure() {
    return {
        type: COURIER_LIST_FAILURE,
    };
}

function courier_list_request(payload) {
    return {
        type: COURIER_LIST_REQUEST,
        payload
    };
}

function courier_list_success(json) {
    return {
        type: COURIER_LIST_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}

function fetchCourierList(data) {
    return dispatch => {
        dispatch(courier_list_request(data));
        return fetch('/api/courier', {
            data
        })
            .then((json) => {
                dispatch(courier_list_success(json));
            }).catch(error => {
                dispatch(courier_list_failure(error))
            });
    };
}


function shouldFetchCourierList(state) {
    if (state.courier.list.isFetching) {
        return false;
    }
    return true;
}


export function fetchCourierListIfNeeded(data) {
    return (dispatch, getState) => {
        if (shouldFetchCourierList(getState())) {
            return dispatch(fetchCourierList(data));
        }
    };
}

//调度页查询配送员列表

function candidate_courier_list_failure() {
    return {
        type: CANDIDATE_COURIER_LIST_FAILURE,
    };
}

function candidate_courier_list_request(payload) {
    return {
        type: CANDIDATE_COURIER_LIST_REQUEST,
        payload
    };
}

function candidate_courier_list_success(json) {
    return {
        type: CANDIDATE_COURIER_LIST_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}

function fetchCandidateCourierList(data) {
    return dispatch => {
        dispatch(candidate_courier_list_request(data));
        return fetch('/api/courier/candidate', {
            data
        })
            .then((json) => {
                dispatch(candidate_courier_list_success(json));
            }).catch(error => {
                dispatch(candidate_courier_list_failure(error))
            });
    };
}


function shouldFetchCandidateCourierList(state) {
    if (state.courier.candidate.isFetching) {
        return false;
    }
    return true;
}


export function fetchCandidateCourierListIfNeeded(data) {
    return (dispatch, getState) => {
        if (shouldFetchCandidateCourierList(getState())) {
            return dispatch(fetchCandidateCourierList(data));
        }
    };
}


//编辑配送员


function courier_update_failure(payload) {
    return {
        type: COURIER_UPDATE_FAILURE,
        payload
    };
}

function courier_update_request(payload) {
    return {
        type: COURIER_UPDATE_REQUEST,
        payload
    };
}

function courier_update_success(json) {
    return {
        type: COURIER_UPDATE_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}



export function updateCourierById(id ,data) {
    return (dispatch, getState) => {
        dispatch(courier_update_request(id));
        return fetch('/api/courier/' + id,{
            method:'PUT',
            data:data
        })
            .then((json) => {
                dispatch(courier_update_success(json));
            }).catch(error => {
                dispatch(courier_update_failure(error))
            });
    };
}


//新建配送员

function courier_create_failure(payload) {
    return {
        type: COURIER_CREATE_FAILURE,
        payload
    };
}

function courier_create_request(payload) {
    return {
        type: COURIER_CREATE_REQUEST,
        payload
    };
}

function courier_create_success(json) {
    return {
        type: COURIER_CREATE_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}



export function createCourier(payload) {
    return (dispatch, getState) => {
        dispatch(courier_create_request());
        return fetch('/api/courier',{
            method:'POST',
            data:payload
        })
            .then((json) => {
                dispatch(courier_create_success(json));
            }).catch(error => {
                dispatch(courier_create_failure(error))
            });
    };
}

//删除配送员

function courier_delete_failure(payload) {
    return {
        type: COURIER_DELETE_FAILURE,
        payload
    };
}

function courier_delete_request(payload) {
    return {
        type: COURIER_DELETE_REQUEST,
        payload
    };
}

function courier_delete_success(json) {
    return {
        type: COURIER_DELETE_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}



export function deleteCourierById(id) {
    return (dispatch, getState) => {
        dispatch(courier_delete_request());
        return fetch('/api/courier/'+id,{
            method:'DELETE',
        })
            .then((json) => {
                dispatch(courier_delete_success(json));
            }).catch(error => {
                dispatch(courier_delete_failure(error))
            });
    };
}



//批量修改配送员状态


function courier_status_update_failure(payload) {
    return {
        type: COURIER_STATUS_UPDATE_FAILURE,
        payload
    };
}

function courier_status_update_request(payload) {
    return {
        type: COURIER_STATUS_UPDATE_REQUEST,
        payload
    };
}

function courier_status_update_success(json) {
    return {
        type: COURIER_STATUS_UPDATE_SUCCESS,
        receiveAt: Date.now(),
        payload: json
    };
}



export function updateCourierStatus(payload) {
    return (dispatch, getState) => {
        dispatch(courier_status_update_request(payload));
        return fetch('/api/courier/status',{
            method:'PUT',
            data:payload
        })
            .then((json) => {
                dispatch(courier_status_update_success(payload));
            }).catch(error => {
                dispatch(courier_status_update_failure(error))
            });
    };
}