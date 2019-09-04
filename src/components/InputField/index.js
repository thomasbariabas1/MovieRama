import './style.css'

class InputField{

    render() {
        return `<div class="inputWrapper">
        <input id="moviesearch" placeholder="Search Movie">
         <span class="fa fa-search"></span>
</div>`
    }
}

export default InputField