import  State from './State'
import {isEquals} from "../lib/utils";

//Wrapper a class and map the application state and the actions into the context of the class
export const connect = (mapStateToProps = ()=>({}), dispatchActionCreators = {}) => (ClassToBeConnected) =>{

     class ConnectedClass extends ClassToBeConnected{

         constructor(props){
             super(props);

             this.props ={};

             this.updateProps();
             State.setListeners(this.stateListener.bind(this))

         }
         //Update the context of the class
         updateProps = () =>{

             const oldProps = {...this.props};

             const actions = {};
             //Get the applications state
             const newProps = mapStateToProps(State.getState());
            //Pass the dispatch function and the getState function into the actions
             Object.keys(dispatchActionCreators).map(actionKey=>{
                 actions[actionKey] = dispatchActionCreators[actionKey](State.dispatch, State.getState)
             });

             const props = {...newProps};
             //Map application state to context
             Object.keys(props).map(key=>{
                 this.props[key] = props[key]
             });
             //Map actions to context
             Object.keys(actions).map(key=>{
                 this[key] = actions[key]
             });
            //Check if the new props are equals with the old one's.
             return !isEquals(oldProps, this.props)
         };
        //This calls when the application state is updated.
         stateListener = () =>{
             const shouldRerender = this.updateProps();
             if(shouldRerender)
             this.render()
         }
     }

    return  ConnectedClass
};