import './style.css'
import InstanceClass from "../../lib/InstanceClass";
import {connect} from "../../applicationState/ConnectState";
import {actions} from "../Content/ContentReducer";

class AppBar extends InstanceClass{

    #setUpEventListeners = () =>{

        document.getElementById('moviesearch').addEventListener('input',(e)=>{
            this.onSearchMovie(e.target.value)});

    }
    #removeEventListeners = () =>{
        const inputElement = document.getElementById('moviesearch');
        if(inputElement){
            inputElement.removeEventListener('input',this.onSearchMovie)

        }
    }

    render(){
        this.#removeEventListeners()


        this.rootElement.innerHTML = `
        <div class="AppBarRoot">
        <input id="moviesearch">
        </div>
        `

        this.#setUpEventListeners()
    }
}
const mapStateToProps = (state) =>{
    return {
    }
}

const dispatchActionCreators = {
    ...actions
}
export default connect(mapStateToProps, dispatchActionCreators)(AppBar)