import { startOfHour } from 'date-fns';
import Appointment from '../models/appointmentModel';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
  date: Date;
  provider: string;
}

class CreateAppointmentService {
  // eslint-disable-next-line prettier/prettier
  private appointmentsRepository: AppointmentsRepository;

  constructor(appointmentsRepository: AppointmentsRepository){
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({provider, date}: Request): Appointment {

    const appointmentDate = startOfHour(date);

  const findAppointmentInSameDate =
    this.appointmentsRepository.findByDate(appointmentDate);

  if (findAppointmentInSameDate){
  throw Error('Appointment alread taken!')
  }

  const appointment = this.appointmentsRepository.create({
    provider,
    date: appointmentDate,
  });

  return appointment;

  }

}

export default CreateAppointmentService;
