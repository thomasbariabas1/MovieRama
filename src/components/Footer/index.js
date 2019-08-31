import InstanceClass from "../../lib/InstanceClass";

class Footer extends InstanceClass{



    render() {

        const html =  `
                  <footer>
                    <p>Posted by: Hege Refsnes</p>
                    <p>Contact information: <a href="mailto:someone@example.com">someone@example.com</a>.</p>
                  </footer>
                `
        this.rootElement.innerHTML = html
    }
}
export default Footer