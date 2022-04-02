export default function ({ store, redirect, route}) {
    const user = store.state.user;

    if (user.verificado === false && route.name !== 'verification') {
        return redirect('/verification');
    }

    if (user.verificado === true && route.name === 'verification') {
        return redirect('/pedidos');
    }
    
}