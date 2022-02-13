/* eslint-disable import/no-unresolved */
import { Router } from 'express';
import { parseISO } from 'date-fns';
import CreateAppointmentService from '../services/CreateAppointmentsService'

import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();
  return response.status(200).json({
    status: 'success',
    appointments,
  });
});

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(
      appointmentsRepository,
    );

    const appointment = createAppointment.execute({
      provider,
      date: parsedDate,
    });
    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
});

export default appointmentsRouter;
