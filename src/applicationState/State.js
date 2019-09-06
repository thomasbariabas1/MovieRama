import ContentReducer from './reducers/ContentReducer'

let ApplicationState = null;

class State {

    constructor() {
        this.reducers = {};
        this.listeners = [];
        this.state = {
            api_key: 'bc50218d91157b1ba4f142ef7baaa6a0'
        }
    }

    //Return the current state
    getState = () => {
        return this.state
    };

    //Combine the reducers creating the initial state of the application
    combineReducers = (reducers) =>{

        Object.keys(reducers).map(reducer=>{
            const state = reducers[reducer](this.state[reducer],{});
           if(typeof state !== 'object'){
                throw new Error('Reducer returned a no-object state')
            }
            this.state = { ...this.state, [reducer]:state }
        });
        this.reducers = reducers

    };

    //Set up the components that listen to the state
    setListeners = (listener) =>{
        this.listeners = [...this.listeners, listener]

    };

    //Update the state dependence to the action that dispatched
    dispatch = (action) =>{
        Object.keys(this.reducers).map(reducer=>{
            const state =  this.reducers[reducer](this.state[reducer],action);
            this.state = { ...this.state, [reducer]:state }
        });
        this.listeners.map(listener=>listener())
    }
}

//If there is any state object, initiate it.
if(!ApplicationState) {
    ApplicationState = new State();
    ApplicationState.combineReducers({ContentReducer});
}

export default ApplicationState

