import { createStore } from 'redux';

const initState = {
    email: null,
    token: null,
}

function reducer(state = initState, action) {
    switch (action.type) {
        case 'set-user':
            return {
                email: action.payload.email,
                token: action.payload.token,
            }
        case 'reset-user':
            return {
                ...initState
            }
        default:
            return state
    }
}

export default createStore(reducer)
