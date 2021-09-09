const Schedule = require('../models/Schedule.model');

class ScheduleRepository {
    constructor(ScheduleModel) {
        this.schedule = ScheduleModel;
    }

    
        
};

module.exports = new ScheduleRepository(Schedule);