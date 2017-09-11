import {Dispatcher} from 'flux';

class AppDispatcher extends Dispatcher {

    handleAction(action) {
        this.dispatch({
            source: 'VIEW_ACTION',
            action,
        });
    }

    handleServerAction(action) {
        this.dispatch({
            source: 'SERVER_ACTION',
            action,
        });
    }
}

const AppDispatcherSingleton = new AppDispatcher();

export default AppDispatcherSingleton;
