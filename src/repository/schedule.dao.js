const Schedule = require('../models/Schedule.model');

class ScheduleRepository {
    constructor(ScheduleModel) {
        this.schedule = ScheduleModel;
    }

    makeAppointment = async (schedule) => {
        const { local, userId, date } = schedule;

        try {

            const available_day = await this.schedule.findOne({date});

            if (!available_day) {
                throw new Error('Este dia não permite mais agendamentos');
            } else {
                const newAppointment = await this.schedule.create({
                    local,
                    user: userId,
                    date
                });
                return ({
                    local: newAppointment.local,
                    userId: newAppointment.user,
                    date: newAppointment.date
                });
            }
        } catch (error) {
            throw new Error(error);
        }
    }
        
};

module.exports = new ScheduleRepository(Schedule);