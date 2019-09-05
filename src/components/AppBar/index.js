import '../../global/style/app-bar.css'
import InstanceClass from "../../lib/InstanceClass";
import {connect} from "../../applicationState/ConnectState";
import {actions} from "../../applicationState/actions/contentActions";
import {debounce} from "../../lib/utils";

class AppBar extends InstanceClass{

    constructor(){
        super()
    }
    #setUpEventListeners = () =>{

        document.getElementById('moviesearch').addEventListener('input',this.onDebounceSearch)

    };

    onDebounceSearch = debounce(({target:{value}})=> {

            const content = document.getElementById('resultsWrapper');
            while (content.hasChildNodes()) {
                content.removeChild(content.firstChild);
            }
            window.scrollTo({top: 0});
            this.onSearchMovie(value)


    },600)

    #removeEventListeners = () =>{
        const inputElement = document.getElementById('moviesearch');
        if(inputElement){
            inputElement.removeEventListener('input',debounce(this.onSearchMovie))

        }
    };

    render(){
        this.#removeEventListeners();


        this.rootElement.innerHTML = `<div class="AppBarContainer">
            <div class="logo">MovieRama</div>
            <div class="inputWrapper">
            <input id="moviesearch" placeholder="Search Movie" tabindex="10">
            <span class="fa fa-search"></span>
            </div>
        </div>
        `;

        this.#setUpEventListeners()
    }
}
const mapStateToProps = () =>{
    return {
    }
};

const dispatchActionCreators = {
    ...actions
};
export default connect(mapStateToProps, dispatchActionCreators)(AppBar)
