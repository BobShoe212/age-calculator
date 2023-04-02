import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
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

  useEffect(() => {
    const today = new Date();
    if (
      day <= 31 &&
      day >= 1 &&
      month <= 12 &&
      month >= 1 &&
      year <= today.getUTCFullYear()
    ) {
      setBirthday(new Date(year, month - 1, day));
    } else {
      setBirthday(undefined);
    }
  }, [day, month, year]);

  function calculate_age() {
    const now = new Date();
    const diff_ms = now.getTime() - birthday!.getTime();
    const age_dt = new Date(diff_ms);
    return age_dt;
  }

  const getYearsOld = () => {
    return birthday ? calculate_age().getUTCFullYear() - 1970 : '- -';
  };

  const getMonthsOld = () => {
    return birthday ? calculate_age().getUTCMonth() : '- -';
  };
  const getDaysOld = () => {
    return birthday ? calculate_age().getUTCDate() : '- -';
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
          {day}
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
          {month}
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
          {year}
        </div>
      </div>
      <div className="age">
        <span>
          Your Birthday - {birthday?.getDate()} {birthday?.getMonth()}{' '}
          {birthday?.getFullYear()}
        </span>
        <h2>You are:</h2>
        <h2>{getYearsOld()} years</h2>
        <h2>{getMonthsOld()} months</h2>
        <h2>{getDaysOld()} days</h2>
      </div>
    </div>
  );
}

export default App;
