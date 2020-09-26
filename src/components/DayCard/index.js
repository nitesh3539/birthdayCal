import PersonCard from '../../components/PersonCard'
import './style.css'

const renderBirthDayCard = (birthdayPersons) => {
    let cardLength = parseInt(Math.sqrt(birthdayPersons.length))
    cardLength = cardLength*cardLength == birthdayPersons.length ? cardLength : cardLength+1
    return birthdayPersons.map((person) =>   PersonCard(person, cardLength)).join("");
}

const DayCard = (day, personList = []) => {
    const backgroundColor = personList.length ? 'white' : '#a4a4a4'
    return `
     <div class='card-section'>
        <div class="day-card">${day}</div>
        <div class='birthday-card' style="background-color: ${backgroundColor};">
            ${renderBirthDayCard(personList)}
        </div>
     </div>
    `
}

export default DayCard