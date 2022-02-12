/* eslint-disable import/no-unresolved */
import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointmentsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();
  return response.status('200').json({
    status: 'success',
    appointments,
  });
});

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;
  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate =
    appointmentsRepository.findByDate(parsedDate);

  if (findAppointmentInSameDate)
    response
      .status(400)
      .json({ status: 'fail', message: 'Appointment alread taken!' });

  const appointment = appointmentsRepository.create({
    provider,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
