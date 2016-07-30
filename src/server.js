"use strict";
import Server from 'socket.io';

export function startServer(store){
    // create new server
    const io = new Server().attach(8090);
    // subscribe to Redux store
    store.subscribe(() => io.emit('state', store.getState().toJS()));

    // on connection, emit the current state to the socket
    io.on('connection', socket => {
        socket.emit('state', store.getState().toJS());
        socket.on('action', store.dispatch.bind(store));
    });
}
