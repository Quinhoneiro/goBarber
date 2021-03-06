# Recuperação de senha

**RF-Requisitos funcionais**

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um e-mail com intruções de recuperação de senha;
- O usuário deve poder resetar sua senha;

**RF-Requisitos não funcionais**

- Utilizar mailtrap para testar envios em ambiente de desenvolvimento;
- Utilizar Amazon SES para envio em produção;

**RN-Regras de negócios**

- O link enviado por email para resetar senha, deve expirar em 2 horas;
- O usuário precisa confirmar a nova senha ao resetar a senha;
- O envio de email deve acontecer em segundo plano (background job);

# Atualizção do perfil

**RF-Requisitos funcionais**

- O usuário deve poder atualizar seu nome, email e senha;

**RF-Requisitos não funcionais**

**RN-Regras de negócios**

- O usuário não pode alterar seu e-mail para um e-mail já utilizado;
- Para atualizar sua senha, o usuário deve informar sua senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;

# Painel do prestador

**RF-Requisitos funcionais**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder viasualizar as notificações não lidas;

**RF-Requisitos não funcionais**

- Os agendamentos do prestador no dia devem ser armazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo real utilizando Socket.io;

**RN-Regras de negócios**

- A notificação deve ter um status de lida ou não lida para que o prestador possa controlar;

# Agendamento de serviços

**RF-Requisitos funcionais**

- O usuário deve poder listar todos os prestqadores de serviços cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponíveis de um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RF-Requisitos não funcionais**

- A listagem de prestadores deve ser armazenada em cache;

**RN-Regras de negócios**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 8h00 as 18h00 (Primeiro as 8h00 e último as 17h00);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços com ele mesmo;
