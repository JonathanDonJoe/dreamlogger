export default (state = [], action) => {
    if(action.type === 'setDream') {
        console.log(action.payload)
        return action.payload
    }
    return state;
}