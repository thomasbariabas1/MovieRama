import './style.css'
import InstanceClass from "../../lib/InstanceClass";
import {connect} from "../../applicationState/ConnectState";
import {actions} from "../Content/ContentReducer";

class AppBar extends InstanceClass{

    constructor(){
        super()
    }
    #setUpEventListeners = () =>{

        document.getElementById('moviesearch').addEventListener('input',(e)=>{
            const content = document.getElementById('resultsWrapper')
            while (content.firstChild) {
                content.removeChild(content.firstChild);
            }
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
            <div class="logo">MovieRama</div>
            <div class="inputWrapper">
            <input id="moviesearch" placeholder="Search Movie">
            <span class="fa fa-search"></span>
            </div>
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