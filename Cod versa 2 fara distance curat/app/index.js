import clock from "clock";
import document from "document";
import { preferences } from "user-settings";
import * as util from "../common/utils";

import { HeartRateSensor } from "heart-rate";
import userActivity from "user-activity";
import { units } from "user-settings";
import * as fs from "fs";
import { me as appbit } from "appbit";
import { today as todayStats} from "user-activity";
import { battery } from "power";
import { me as device } from "device";

// import * as kpay from './kpay/release/kpay.js';
// import * as kpay_common from '../common/kpay/kpay_common.js';
// import './kpay/release/kpay_filetransfer.js';
// import './kpay/release/kpay_dialogs.js';
// import './kpay/release/kpay_time_trial.js';
// kpay.initialize();


const heartRateLabel = document.getElementById("heartRateLabel");
const stepsLabel = document.getElementById("stepsLabel");
const caloriesLabel = document.getElementById("caloriesLabel");
const batteryLabel = document.getElementById("batteryLabel");
const backgroundImage = document.getElementById("backgroundImage");


console.log(Math.floor(battery.chargeLevel));

// Update the clock every minute
clock.granularity = "minutes";

// Get a handle on the <text> element
const hoursLabel = document.getElementById("hoursLabel");
const minutesLabel = document.getElementById("minutesLabel");
const heartRateLabel = document.getElementById("heartRateLabel");
const monthLabel = document.getElementById("monthLabel");
const dayLabel = document.getElementById("dayLabel");


// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  batteryLabel.text = Math.floor(battery.chargeLevel);
  if(appbit.permissions.granted("access_activity")) {
      stepsLabel.text = `${todayStats.adjusted.steps} `;
      caloriesLabel.text = `${todayStats.adjusted.calories} `;
    }
  
  showDate(evt);
  let today = evt.date;
  let hours = today.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = util.zeroPad(hours);
  }
  
  let hours = hours;
  let mins = util.zeroPad(today.getMinutes());
  
  hoursLabel.text = `${hours}`;
  minutesLabel.text = `${mins}`;
  
  // let mins = util.zeroPad(today.getMinutes());
  // hoursLabel.text = `${hours}:${mins}`;
}

function showDate(evt){
  let today = evt.date;
  let monthnum = today.getMonth();
  let day = today.getDate();
  let month = new Array();
  month[0] = "Jan";
  month[1] = "Feb";
  month[2] = "Mar";
  month[3] = "Apr";
  month[4] = "May";
  month[5] = "Jun";
  month[6] = "Jul";
  month[7] = "Aug";
  month[8] = "Sep";
  month[9] = "Oct";
  month[10] = "Nov";
  month[11] = "Dec";
  
  let monthname = month[monthnum];
  monthLabel.text = `${monthname}`;
  dayLabel.text = `${day}`;
}

  
if (HeartRateSensor) {
   console.log("This device has a HeartRateSensor!");
   const hrm = new HeartRateSensor();
   hrm.addEventListener("reading", () => {
     console.log(`Current heart rate: ${hrm.heartRate}`);
     heartRateLabel.text = `${hrm.heartRate} `;
   });
   hrm.start();
} else {
   console.log("This device does NOT have a HeartRateSensor!");
}