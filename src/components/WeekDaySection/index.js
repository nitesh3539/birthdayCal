import DayCard from '../../components/DayCard'
import "./style.css";

const WeekDaySection = (calenderBirthDayList = {}) => {

    const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']

    return weekDays.map((day) => DayCard(day, calenderBirthDayList[day])).join("");
};

export default WeekDaySection;
