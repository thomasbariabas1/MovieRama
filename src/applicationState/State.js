import ContentReducer from '../components/Content/ContentReducer'


let ApplicationState = null;

class State {

    constructor() {
        this.reducers = {};
        this.listeners = []
        this.state = {
            api_key: 'bc50218d91157b1ba4f142ef7baaa6a0'
        }
    }


    getState = () => {
        return this.state
    }

    combineReducers = (reducers) =>{

        Object.keys(reducers).map(reducer=>{
            const state = reducers[reducer](this.state[reducer],{});
           if(typeof state !== 'object'){
                throw new Error('Reducer returned a no-object state')
            }
            this.state = { ...this.state, [reducer]:state }
        })
        this.reducers = reducers

    }
    setListeners = (listener) =>{
        this.listeners = [...this.listeners, listener]

    }
    dispatch = (action) =>{
        Object.keys(this.reducers).map(reducer=>{
            const state =  this.reducers[reducer](this.state[reducer],action)
            this.state = { ...this.state, [reducer]:state }
        })
        this.listeners.map(listener=>listener())
    }
}

if(!ApplicationState) {
    ApplicationState = new State()
    ApplicationState.combineReducers({ContentReducer});
}

export default ApplicationState

