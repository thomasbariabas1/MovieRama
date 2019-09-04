import './style.css'
import InstanceClass from "../../lib/InstanceClass";
import {connect} from "../../applicationState/ConnectState";
import {actions} from "../Content/ContentReducer";
import InputField from "../InputField";

class AppBar extends InstanceClass{

    constructor(){
        super()
        this.input = new InputField()
    }
    #setUpEventListeners = () =>{

        document.getElementById('moviesearch').addEventListener('input',(e)=>{
            window.scrollTo({top:0})
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


        this.rootElement.innerHTML = `<div class="AppBarContainer">
            ${this.input.render()}
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