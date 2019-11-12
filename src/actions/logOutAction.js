export default (data) => {
    console.log('logOutAction')
    return {
        type: 'logOut',
        payload: data
    }
}