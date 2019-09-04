import  State from './State'
import {isEquals} from "../lib/utils";


export const connect = (mapStateToProps = ()=>({}), dispatchActionCreators = {}) => (ClassToBeConnected) =>{


     class ConnectedClass extends ClassToBeConnected{

         constructor(props){
             super(props);

             this.props ={};

             this.updateProps();
             State.setListeners(this.dispatch.bind(this))

         }
         updateProps = () =>{

             const oldProps = {...this.props};

             const actions = {};
             const newProps = mapStateToProps(State.getState());
             Object.keys(dispatchActionCreators).map(actionKey=>{
                 actions[actionKey] = dispatchActionCreators[actionKey](State.dispatch, State.getState)
             });

             const props = {...newProps};

             Object.keys(props).map(key=>{
                 this.props[key] = props[key]
             });
             Object.keys(actions).map(key=>{
                 this[key] = actions[key]
             });

             return !isEquals(oldProps, this.props)
         };

         dispatch = () =>{
             const shouldRerender = this.updateProps();
             if(shouldRerender)
             this.render()
         }
     }

    return  ConnectedClass
};