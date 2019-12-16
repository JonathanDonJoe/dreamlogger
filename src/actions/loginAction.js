export default (data) => {
    console.log('loginAction')
    console.log(data)
    return {
        type: 'login',
        payload: data
    }
}