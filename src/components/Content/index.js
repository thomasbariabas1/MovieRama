import './style.css'
import InstanceClass from "../../lib/InstanceClass";
import MovieCard from "../MovieCard";
import {connect} from "../../applicationState/ConnectState";
import {actions} from "./ContentReducer";

class Content extends InstanceClass {

    constructor() {
        super()
        this.isMounted = false;
        window.addEventListener('scroll', this.onScroll)
    }

    onScroll = () => {

        const scrollHeight = window.scrollY;

        const contentRootHeight = document.getElementById('contentRoot').offsetHeight;

        const hiddenHeight = contentRootHeight - window.innerHeight;

        const pagination_height = hiddenHeight - 50;

        if (scrollHeight > pagination_height && !this.props.loading) {
            this.onScrollFetchMovie()
        }

    }


    #setUpEventListeners = () => {

        document.getElementById('contentRoot').addEventListener('onunload', () => {
            window.removeEventListener('scroll', this.onScroll)
        })
    }
    #removeEventListeners = () => {
        const contentRoot = document.getElementById('contentRoot');
        if (contentRoot) {
            contentRoot.removeEventListener('onunload', () => {
                window.removeEventListener('scroll', this.onScroll)
            })
        }

    }

    render() {

        this.#removeEventListeners()
        if (!this.isMounted && !this.props.loading) {
            this.onScrollFetchMovie()
            this.isMounted = true
        }
        if(this.props.page > this.props.totalPages){
            window.removeEventListener('scroll', this.onScroll)
        }
        this.rootElement.innerHTML =  `
                 <div id="contentRoot">
                ${this.props.data.map(movie => {

            const card = new MovieCard(movie)

            return card.render()
        }).join('')
            }
                ${this.props.loading?'Loading...':''}
                 </div>
          `

        this.#setUpEventListeners()
    }
}

const mapStateToProps = (state) => {
    return {
        api_key: state.api_key,
        movieSearchCriteria: state.ContentReducer.movieSearchCriteria,
        data:state.ContentReducer.data,
        loading:state.ContentReducer.loading,
        totalPages:state.ContentReducer.totalPages,
        page: state.ContentReducer.page
    }
}

const mapDispatchToActions = {
    ...actions
}
export default connect(mapStateToProps,mapDispatchToActions)(Content)