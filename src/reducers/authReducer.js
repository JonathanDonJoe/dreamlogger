export default (state = { isSignedIn: false, uid: '' }, action) => {
    if (action.type === 'login') {
        // console.log(action.payload)
        return action.payload
    } else if (action.type === 'logOut') {
        return action.payload
    }
    return state;
}