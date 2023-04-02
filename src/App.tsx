import { useEffect, useState } from 'react';
import './App.css';

interface Age {
  days: number;
  months: number;
  years: number;
}

function App() {
  const [year, setYear] = useState<number>(1990);
  const [month, setMonth] = useState<number>(1);
  const [day, setDay] = useState<number>(1);
  const [birthday, setBirthday] = useState<Date | undefined>(
    new Date(year, month, day)
  );
  let monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  useEffect(() => {
    const today = new Date();
    if (
      day <= monthDays[month - 1] &&
      day >= 1 &&
      month <= 12 &&
      month >= 1 &&
      year <= today.getUTCFullYear()
    ) {
      setBirthday(new Date(year, month - 1, day));
    } else {
      setBirthday(undefined);
    }
    if (today.getFullYear() % 4 === 0) {
      monthDays[1] = 29;
    } else {
      monthDays[1] = 28;
    }
  }, [day, month, year]);

  function calculate_age() {
    const now = new Date();
    let currentYear = now.getFullYear();
    let currentMonth = now.getMonth();
    let currentDate = now.getDate();
    const birthYear = birthday!.getFullYear();
    const birthMonth = birthday!.getMonth();
    const birthDate = birthday!.getDate();

    if (birthDate > currentDate) {
      currentDate = currentDate + monthDays[currentMonth - 1];
      currentMonth = currentMonth - 1;
    }
    if (birthMonth > currentMonth) {
      currentMonth = currentMonth + 12;
      currentYear = currentYear - 1;
    }
    let yearAge = currentYear - birthYear;
    let monthAge = currentMonth - birthMonth;
    let dateAge = currentDate - birthDate;
    let age: Age = { days: dateAge, months: monthAge, years: yearAge };
    return age;
  }

  const getYearsOld = () => {
    return birthday ? calculate_age().years : '- -';
  };

  const getMonthsOld = () => {
    return birthday ? calculate_age().months : '- -';
  };
  const getDaysOld = () => {
    return birthday ? calculate_age().days : '- -';
  };

  return (
    <div className="App">
      <div className="birthday">
        <div>
          <label htmlFor="dayInput">Day</label>
          <input
            id="dayInput"
            type="number"
            value={day}
            onChange={(e) => setDay(e.currentTarget.valueAsNumber)}
            className={birthday ? 'realDate' : 'fakeDate'}
          ></input>
        </div>
        <div>
          <label htmlFor="monthInput">Month</label>
          <input
            id="monthInput"
            type="number"
            value={month}
            onChange={(e) => setMonth(e.currentTarget.valueAsNumber)}
            className={birthday ? 'realDate' : 'fakeDate'}
          ></input>
        </div>
        <div>
          <label htmlFor="yearInput">Year</label>
          <input
            id="yearInput"
            type="number"
            value={year}
            onChange={(e) => setYear(e.currentTarget.valueAsNumber)}
            className={birthday ? 'realDate' : 'fakeDate'}
          ></input>
        </div>
      </div>
      <div className="age">
        <h2>You are:</h2>
        <h2>{getYearsOld()} years</h2>
        <h2>{getMonthsOld()} months</h2>
        <h2>{getDaysOld()} days</h2>
      </div>
    </div>
  );
}

export default App;
