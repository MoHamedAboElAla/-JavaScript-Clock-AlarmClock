class Clock{

    hours;
    minutes;
    seconds;
    #intervalId= null;
  
    constructor(timeStr){
        if(isNaN(timeStr[0]) || timeStr[0] <0 || timeStr[0] > 23 
        || isNaN(timeStr[1]) || timeStr[1]<0 || timeStr[1] > 59 
        || isNaN(timeStr[2]) || timeStr[2]<0 || timeStr[2] > 59){
            throw new Error('Invalid time format.');
        }
        timeStr = timeStr.split(':');
        
        this.hours = parseInt(timeStr[0]);
        this.minutes = parseInt(timeStr[1]);
        this.seconds = parseInt(timeStr[2]);
    }
    static formatTime(hours, minutes, seconds){
         hours = hours.toString().padStart(2, '0');
         minutes = minutes.toString().padStart(2, '0');
         seconds = seconds.toString().padStart(2, '0');
        return `${hours}:${minutes}:${seconds}`;

    }
    setIntervalId(intervalId){
        this.#intervalId = intervalId;
    }
    getIntervalId(){
        return this.#intervalId;
    }


    _tick(){
        this.seconds++;
        if(this.seconds >= 60){
            this.seconds = 0;
            this.minutes++;
        }
        if(this.minutes >= 60){
            this.minutes = 0;
            this.hours++;
        }
        if(this.hours >= 24){
            this.hours = 0;
        }

    }

    Start(){
        if(this.#intervalId !== null){
            console.log('Clock is already running.');
            return;
        }
        this.#intervalId = setInterval(() => this._tick(), 1000);
        console.log('Clock started.');
    }
    Stop(){
        if(this.#intervalId === null){
            console.log('Clock is not running.');
            return;
        }
        clearInterval(this.#intervalId);
        this.#intervalId = null;
        console.log('Clock stopped.');
    }

    getTime(){
        return Clock.formatTime(this.hours, this.minutes, this.seconds);
    }


}



class AlarmClock extends Clock
{

 #alarmTime ;
//  #audio =new Audio("alarm.wav"); ; 

 constructor(currentTime, _alarmTime){
    super(currentTime);
    this.#alarmTime = _alarmTime;

 }

 #checkAlarm(){
    if(this.getTime() === this.#alarmTime){
        console.log('Alarm ringing!');
        //this.#audio.play(); 
        this.Stop();
    }
    else{
        console.log('Alarm not ringing.');
    }  
 }
//  playAlarmManually() {
//     if (document.hasFocus()) {
//       this.#audio.play().catch((error) => {
//         console.log('Unable to play alarm sound:', error);
//       });
//     }
//   }

 Start(){
    
    if(this.getIntervalId()!== null){
        console.log('Alarm clock is already running.');
        return;
    }
    this.setIntervalId(setInterval(() => {
        this._tick();
        console.log(this.getTime());
        this.#checkAlarm();
    }, 1000));
    console.log('Alarm clock started.');

 }
 SetAlarm(newAlarmTime){
    this.#alarmTime = newAlarmTime;
 }
    GetAlarm(){
        return this.#alarmTime;
    }
}

//Example usage:
const sleepAlarmClock = new AlarmClock('14:59:55', '15:00:00');
sleepAlarmClock.Start();
setTimeout(() => sleepAlarmClock.SetAlarm('15:01:00'), 10000); 
