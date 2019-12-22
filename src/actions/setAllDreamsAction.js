export default (data) => {
    console.log('setAllDreamsAction')
    return {
        type: 'setAllDreams',
        payload: data
    }
}