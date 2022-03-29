import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';
import CreateAppointmentService from './CreateAppointmentsService';

describe('CreateAppointment', () => {
  it('should create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();

    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '321565789',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('321565789');

    return appointment;
  });
  it('should not create two appointments at the same time', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();

    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '321565789',
    });

    // por ser um promise não deve ser registrado duas vezes e sim a segunda vez deve estar dentro do expect

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '321565789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
