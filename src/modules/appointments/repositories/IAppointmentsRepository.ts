import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppComponentDTO from '@modules/appointments/dtos/CreateAppointmentDTO';

export default interface IAppointmentsRepository {
  create(date: ICreateAppComponentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
