import "./styles.css";
import DayCalender from "./pages/DayCalender";

let component;


// we have to manually render application

function render() {
  component = new DayCalender(reRender)
  document.getElementById("app").innerHTML = component.render();
  component.attachListener && component.attachListener(); // attach listener only once
}

function reRender() {
  document.getElementById("app").innerHTML = component.render();
}

render();
