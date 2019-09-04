import './style.css'
import InstanceClass from "../../lib/InstanceClass";
import MovieCard from "../MovieCard";
import {connect} from "../../applicationState/ConnectState";
import {actions} from "./ContentReducer";

class Content extends InstanceClass {

    constructor() {
        super();
        //Flag that say if is the first time that component get to the DOM
        this.isMounted = false;
        //Flag that say if there is a listener in the window object about scroll.
        this.hasScrollEventListener = true;
        //Set event listener to the window about scroll
        window.addEventListener('scroll', this.onScroll)
    }

    onScroll = () => {
        //The Y dimension scroll of the window object
        const scrollHeight = window.scrollY;
        //The root element height
        const contentRootHeight = this.rootElement.offsetHeight;
        //The height that is not shown into the screen
        const hiddenHeight = contentRootHeight - window.innerHeight;
        //The height that must fetch the new data from the api.
        const pagination_height = hiddenHeight - 100;
        /*
            In case that user passed the height that is need to fetch data, and is not currently fetching data fetch
            the next page.
        */
        if (scrollHeight > pagination_height && !this.props.loading) {
            this.onScrollFetchMovie()
        }

    };

    #setUpEventListeners = () => {
        //Add Listener to button scrollTopButton, that scroll window to the top
        document.getElementById('scrollToTopButton').addEventListener('click', () => {
            window.scrollTo({top: 0})
        })

    };

    #removeEventListeners = () => {
        //Remove Listener to button scrollTopButton, that scroll window to the top
        document.getElementById('scrollToTopButton').removeEventListener('click', () => {
            window.scrollTo({top: 0})
        })

    };

    render() {

        //Set up the data the first time that renders
        if (!this.isMounted && !this.props.loading) {
            //Add a node to render the movies results
            let resultWrapper = document.createElement('div');
            resultWrapper.setAttribute("id", `resultsWrapper`);
            //Add a node to render the scroll to top button
            let scrollTopElement = document.createElement('div');
            scrollTopElement.setAttribute('id', 'scrollToTopButton');
            scrollTopElement.innerHTML = `
              <div class="overlay"></div>
            <i class="arrow up"></i>`;
            //Use fragment to add more than one element into dom
            let fragment = document.createDocumentFragment();
            fragment.appendChild(resultWrapper)
            fragment.appendChild(scrollTopElement)

            //Append the nodes resultWrapper and scrollToTopElement into the root element
            this.rootElement.appendChild(fragment);

            //Fetch the first data
            this.onScrollFetchMovie();

            //Fetch the genders list
            this.fetchMovieGenders();
            this.isMounted = true
        }

        //In case user has fetched all the pages, remove the scroll event listener
        if ((this.props.page > this.props.totalPages) && this.hasScrollEventListener) {

            this.hasScrollEventListener = false;
            window.removeEventListener('scroll', this.onScroll)
        }

        //In case that user resetted the results, as if he search in search bar, add scroll listener
        if ((this.props.page < this.props.totalPages) && !this.hasScrollEventListener) {
            window.addEventListener('scroll', this.onScroll)
        }

        //In case of the data has been fetched from api, the loading is false, append the data and set up the listeners
        if (!this.props.loading) {

            //Remove the existing listeners
            this.#removeEventListeners();
            //Find the element that hosts the results of the search
            const resultsRootElement = document.getElementById('resultsWrapper');
            //Create document fragment sto store temporary the movies then append them to dom
            let fragment = document.createDocumentFragment();

            this.props.data.map((movie, index) => {
                //Return the container element of the current movie
                const element = document.getElementsByClassName(`container ${movie.id}`);
                /*
                  If the element does not exists, means that the movie is new so need to be added into the element that
                  hosts the results of the search
                 */

                if (!element[0]) {
                    //Create a node to act as movie container
                    let container = document.createElement('div');
                    container.setAttribute("class", `container ${movie.id}`);
                    container.setAttribute("tabindex", `${index+11}`);
                    //Add Child to Fragment
                    fragment.appendChild(container);
                    //Create a new MovieCard class and pass props that will needed into the component.
                    const card = new MovieCard({movie, api_key: this.props.api_key, genres: this.props.genres});
                    //Set the root element of the MovieCard component
                    card.createInstance(container);
                    //Call the Render of the component
                    card.render()
                }

            });
            //Append Fragment with the movies into the dom
            resultsRootElement.appendChild(fragment);

            //Set up event listeners to the needed components
            this.#setUpEventListeners()

        }
    }
}

//Map the application state into the context of this component
const mapStateToProps = (state) => {
    return {
        api_key: state.api_key,
        movieSearchCriteria: state.ContentReducer.movieSearchCriteria,
        data: state.ContentReducer.data,
        loading: state.ContentReducer.loading,
        totalPages: state.ContentReducer.totalPages,
        page: state.ContentReducer.page,
        genres: state.ContentReducer.genres
    }
};
//Map this actions to props and pass the dispatch and the getState function to them
const mapDispatchToActions = {
    ...actions
};
//Connect the component to the application state
export default connect(mapStateToProps, mapDispatchToActions)(Content)