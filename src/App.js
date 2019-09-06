import AppBar from './components/AppBar'
import Content from "./components/Content";
import './App.css'


class App {

    constructor(rootElement) {
        this.rootElement = rootElement;
        this.appBar = new AppBar();
        this.content = new Content()

    }

    render() {

        // define html
        this.rootElement.innerHTML = `
                <div id="app-bar"></div>
                <div id="content"></div>
                `;
        const appBarElement = document.getElementById('app-bar');
        const contentElement = document.getElementById('content');

        //Create instances of each component and link them to each root element
        this.appBar.createInstance(appBarElement);
        this.content.createInstance(contentElement);

        //Call each component render function
        this.appBar.render();
        this.content.render()
    }
}

export default App