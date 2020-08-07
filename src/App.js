import React, { useState, useEffect } from "react";
import { tempratureService } from "./services/tempratureService";
import { humidityService } from "./services/humidityService";
import { airPressureService } from "./services/airPressureService";
import "./App.css";

function App() {
  const [time, setTime] = useState(100);
  const [temprature, setTemprature] = useState(100);
  const [humidity, setHumidity] = useState(100);
  const [airPressure, setAirPressure] = useState(100);
  useEffect(() => {
    const interval = setTimeout(() => {
      const newTime = randomInteger(100, 2000);

      tempratureService.setData(randomInteger(0, 100));
      humidityService.setData(randomInteger(0, 100));
      airPressureService.setData(randomInteger(0, 100));
      setTime(newTime);
    }, time);
    return () => {
      clearTimeout(interval);
    };
  }, [time]);

  useEffect(() => {
    const tempratureSubscription = tempratureService
      .onData()
      .subscribe((data) => {
        if (data) {
          setTemprature(data);
        } else {
          setTemprature("N/A");
        }
      });

    const humiditySubscription = humidityService.onData().subscribe((data) => {
      if (data) {
        setHumidity(data);
      } else {
        setHumidity("N/A");
      }
    });

    const airPressureSubscription = airPressureService
      .onData()
      .subscribe((data) => {
        if (data) {
          setAirPressure(data);
        } else {
          setAirPressure("N/A");
        }
      });

    return () => {
      tempratureSubscription.unsubscribe();
      humiditySubscription.unsubscribe();
      airPressureSubscription.unsubscribe();
    };
  }, []);

  const randomInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  return (
    <div className="wrapper">
      <div className="temprature">
        <h2>Temprature</h2>
        <h3>{temprature}</h3>
      </div>
      <div className="humidity">
        <h2>Humidity</h2>
        <h3>{humidity}</h3>
      </div>
      <div className="airPressure">
        <h2>Air Pressure</h2>
        <h3>{airPressure}</h3>
      </div>
    </div>
  );
}

export default App;
