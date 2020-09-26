import getRandomColor from '../../utils/randomColors'
import './style.css'
const PersonCard = (name, cardLength) => {
    
    const percent = `${100/cardLength}%`

    const color = getRandomColor()

    return `
    <div  style="width: ${percent}; height: ${percent}; background-color: ${color};">
        <div class='person-card'>
        ${name}
        </div>
    </div>
    `
}

export default PersonCard