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

        document.getElementById('movie-search').addEventListener('input',this.onDebounceSearch)

    };

    onDebounceSearch = debounce(({target:{value}})=> {

            const content = document.getElementById('results-container');
            while (content.hasChildNodes()) {
                content.removeChild(content.firstChild);
            }
            const loading = document.createElement('div')
            loading.setAttribute('id','loading-component')
            loading.innerHTML = 'Loading...'
            content.appendChild(loading)

            window.scrollTo({top: 0});
            this.onSearchMovie(value)


    },600)

    #removeEventListeners = () =>{
        const inputElement = document.getElementById('movie-search');
        if(inputElement){
            inputElement.removeEventListener('input',this.onDebounceSearch)

        }
    };

    render(){
        this.#removeEventListeners();


        this.rootElement.innerHTML = `<div class="app-bar-container">
            <div class="logo">MovieRama</div>
            <div class="input-wrapper">
            <input id="movie-search" placeholder="Search Movie" tabindex="10">
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
