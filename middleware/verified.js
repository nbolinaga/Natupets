export default function ({ store, redirect, route}) {
    const user = store.state.user;
    if (user.verificado === true) {
        route.back();
    }
}