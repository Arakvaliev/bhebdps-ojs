class AlarmClock {

    constructor(){
        this.alarmCollection = [];
        this.intervalId = null;
    }

    addClock(startTime, startAction){
        if (startTime == null || startAction == null){
            throw new Error('Отсутствуют обязательные аргументы')
        }

        for(const item of this.alarmCollection){
            if(item.time == startTime){
                console.warn('Уже присутствует звонок на это же время')
            }
        }

        this.alarmCollection.push({callback: startAction, time: startTime, canCall: true})

    }

    removeClock(timeToRemove){

        this.alarmCollection = this.alarmCollection.filter(item => item.time != timeToRemove)
    }

    getCurrentFormattedTime(){
        const now = new Date();
        return now.toTimeString().slice(0, 5)
    }

    start(){
        if (this.intervalId != null) return;
        this.intervalId = setInterval(() => {
            for(const alarm of this.alarmCollection){
                if(alarm.time == this.getCurrentFormattedTime() && alarm.canCall == true){
                    alarm.canCall = false;
                    alarm.callback();
                }
            }
        }, 1000)
    }

    stop(){
        clearInterval(this.intervalId)
        this.intervalId = null;
    }

    resetAllCalls(){
        for(const alarm of this.alarmCollection){
            alarm.canCall = true;
        }
    }

    clearAlarms(){
        this.stop();
        this.alarmCollection = [];
    }




}