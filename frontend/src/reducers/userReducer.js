const initialState = {
    email: ''
};

export default function UserReducer(state = initialState, action) {
    if(action.type === 'SET_EMAIL') {
        return {...state, email: action.payload.email}
    }

    return state;
}