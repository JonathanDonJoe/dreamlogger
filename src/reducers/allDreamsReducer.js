export default (state = [], action) => {
    if(action.type === 'setAllDreams') {
        console.log(action.payload)
        return action.payload
    }
    return state;
}