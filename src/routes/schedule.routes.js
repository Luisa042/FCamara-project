const { Router } = require('express');
const scheduleRepo = require('../repository/schedule.dao');
const router = Router();

router.get('/listAll', async (req, res) => {
    try {
        const schedules = await scheduleRepo.listAllAppointments();
        res.status(200).json(schedules);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const oneSchedule = await scheduleRepo.listOneAppointment(id);
        res.status(200).json(oneSchedule);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

router.post('/appointment', async (req, res) => {
    const schedule = req.body;
    try {
        const appointment = await scheduleRepo.makeAppointment(schedule);
        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json(error.message);
    }
});

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await scheduleRepo.cancelAppointment(id);
        res.status(200).json({ message: 'Agendamento cancelado' });
    } catch (error) {
        res.status(500).json(error.message);
    }
});

module.exports = router;