
const dJSON = require('dirty-json');
import InputBoxSection from '../../components/InputBoxSection'
import WeekDaySection from '../../components/WeekDaySection'
import "./style.css";



/** Tried making this similar to react thing because it is easy to understand
    as people do have this mental model :-)
**/

export default class DayCalender {

  constructor(reRender) {
    this.reRender = reRender;
    this.calenderBirthDayList  = {};
    this.state = {
      jsonData: [],
      yearData : null
    }
  }

  setState = (type, payload) => {
     this.state[type] = payload
  }


  render() {
    return `
        <div class='section'>
            <div class='work-space'>
              <div class="work-text">
                  Work Area
              </div>
            </div>
            <div class='week-card'>
                ${WeekDaySection(this.calenderBirthDayList)}
            </div>
            ${InputBoxSection(this.state.jsonData, this.state.yearData)}
        </div>
    `;
  }

  getNameParams = (birthDayName) => {

    let name = birthDayName.split(' ')

    return name.length > 1 ? (name[0][0] + name[1][0]).toUpperCase() : (name[0][0] + name[0][1]).toUpperCase()
  }

  filterBirthDayListOnYear = (birthDayList, year) => {
    return birthDayList.filter((data) =>  data.birthday && data.birthday.split('/')[2] == year)
  }

  getDayOnBirthDate = (birthday) => {

    const dayMapping = {0 : 'SUN', 1 : 'MON', 2 : 'TUE', 3 : 'WED', 4 : 'THU', 5 : 'FRI', 6 : 'SAT'}

    const date = new Date(birthday)
    
    return dayMapping[date.getDay()]
  }

  updateRenderedBirthDayContent = (birthDayList) => {

    this.calenderBirthDayList = {}

    for(let i = 0; i < birthDayList.length; i++){

        const day = this.getDayOnBirthDate(birthDayList[i].birthday)  // get week day on a date

        if (!this.calenderBirthDayList[day]) {
          this.calenderBirthDayList[day] = []
        }

        const formattedName = this.getNameParams(birthDayList[i].name) // get formatted name to 2 characters

        this.calenderBirthDayList[day].push(formattedName)      
    }
  }


  updateBirthDayCalender = (birthDayList, year) => {

    birthDayList = this.filterBirthDayListOnYear(birthDayList, year) // filter the birthday list list on particular selected year

    birthDayList.sort((x,y) => new Date(x.birthday) - new Date(y.birthday))  // sort the list in ascending order of the person's birthday'

    this.updateRenderedBirthDayContent(birthDayList);

    this.reRender() // re-render the updated birthday list on day card section
    
    document.getElementById('yearData').value = this.state.yearData;  // update the year data after re-rendering 
    document.getElementById('jsonData').value = this.state.jsonData  // update the json data after re-rendering 
  }

  updateBirthDayOnYear = () => {

    let birthDayList = []

    const value = document.getElementById('jsonData').value
    const year = document.getElementById('yearData').value

    if(value){
      birthDayList = dJSON.parse(value)
    }

    birthDayList = birthDayList && birthDayList.constructor === Array ? birthDayList : [] // check for array json input birthDayList

    this.updateBirthDayCalender(birthDayList, year)
  }

  attachListener() {  // delegating events

    const containerDiv = document.getElementById("app"); // attaching events on the top

    containerDiv.onclick = event => { // call on update button click
      if (event.target.id === "update-btn") {
        this.updateBirthDayOnYear();
      }
    };

    containerDiv.onkeypress = evt => {

      var ASCIICode = evt.keyCode  // check event for year input and allow only number input

      if (event.target.id === "yearData" && ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)){
         return false; 
      }
         
      return true; 
    }

    containerDiv.oncut  = containerDiv.onpaste = event => { // event fire when you are pasting or cutting json value from text area
      this.setState(event.target.id, event.clipboardData.getData('text/plain'));
    }

    containerDiv.onchange = event => {
      this.setState(event.target.id, event.target.value);
    };

  }
}
