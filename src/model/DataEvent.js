//{"type": "data", "timestamp": 1519780251000, "os": "linux", "browser": "chrome", "min_response_time": 1, "max_response_time": 1}


/**
 * @deprecated
 * @description - this class was created to facilitate the manipulation of these attributes, but it was discontinued, because it limits the maximum number of parameters per event that the chart can show, using this class the system is less scalable
 */
class DataEvent { 

    constructor({type,timestamp,os,browser,min_response_time,max_response_time}) {
        this.type = type;
        this.timestamp = timestamp;
        this.os = os;
        this.browser = browser;
        this.min_response_time = min_response_time;
        this.max_response_time = max_response_time;
    }
}


export default DataEvent;
