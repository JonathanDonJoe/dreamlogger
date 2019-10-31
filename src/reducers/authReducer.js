export default (state = {test:'testing'}, action) => {
    if(action.type === 'login') {
        console.log(action.payload)
        return action.payload
    }
    return state;
}