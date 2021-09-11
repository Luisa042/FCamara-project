const Schedule = require('../models/Schedule.model');

class ScheduleRepository {
  constructor(ScheduleModel) {
    this.schedule = ScheduleModel;
  }

  listAllAppointments = async () => {
    try {
      const schedules = await this.schedule.find();
      return schedules;
    } catch (error) {
      throw new Error();
    }
  };

  listOneAppointment = async (id) => {
    try {
      const schedule = await this.schedule.findById(id);
      return schedule;
    } catch (error) {
      throw new Error();
    }
  };

    makeAppointment = async (schedule) => {
        const { city, userId, date } = schedule;

        try {
                const appointmentDate = new Date(date);
                
                const newAppointment = await this.schedule.create({
                    city,
                    user: userId,
                    date: appointmentDate
                });
                return ({
                    city: newAppointment.city,
                    user: newAppointment.user,
                    date: newAppointment.date,
                    id: newAppointment.id
                });
                
            } catch (error) {
            throw new Error(error.message);
        }
    };

    cancelAppointment = async (id) => {
        try {
            const delAppointment = await this.schedule.findByIdAndDelete(id);
            return delAppointment;
        } catch (error) {
            throw new Error();
        }
    }
};

module.exports = new ScheduleRepository(Schedule);
