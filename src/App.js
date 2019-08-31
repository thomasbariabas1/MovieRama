import AppBar from './components/AppBar'
import Footer from "./components/Footer";
import './App.css'
import Content from "./components/Content";


class App {

    constructor(rootElement) {
        this.rootElement = rootElement;
        this.footer = new Footer();
        this.appBar = new AppBar();
        this.content = new Content()

    }

    render() {

        // define html
        this.rootElement.innerHTML = `
                <div id="appBar"></div>
                <div id="content"></div>
                <div id="footer"></div>
                `;
        const appBarElement = document.getElementById('appBar')
        const contentElement = document.getElementById('content')
        const footerElement = document.getElementById('footer')

        //Create instances of each component and link them to each root element
        this.appBar.createInstance(appBarElement)
        this.footer.createInstance(footerElement)
        this.content.createInstance(contentElement)

        //Call each component render function
        this.appBar.render()
        this.content.render()
        // this.footer.render()
    }


};

export default App