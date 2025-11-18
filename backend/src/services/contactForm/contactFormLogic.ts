import { ContactFormCreateRequest, ContactFormCreateResponse } from './contactFormTypes';

/**
 * @summary
 * In-memory storage for contact form submissions
 * In production, this would be replaced with actual database calls
 */
const contactForms: Map<number, ContactFormCreateResponse> = new Map();
let nextId = 1;

/**
 * @summary
 * Creates a new contact form submission
 *
 * @function contactFormCreate
 * @module contactForm
 *
 * @param {ContactFormCreateRequest} params - Contact form data
 *
 * @returns {Promise<ContactFormCreateResponse>} Created contact form with protocol
 *
 * @throws {Error} When vehicle is not found
 * @throws {Error} When duplicate submission is detected
 *
 * @example
 * const result = await contactFormCreate({
 *   idVehicle: 1,
 *   nomeCompleto: 'João Silva',
 *   email: 'joao@example.com',
 *   telefone: '(11) 98765-4321',
 *   preferenciaContato: 'WhatsApp',
 *   melhorHorario: 'Tarde',
 *   assunto: 'Informações gerais',
 *   mensagem: 'Gostaria de mais informações sobre este veículo',
 *   financiamento: false,
 *   receberNovidades: true,
 *   ipUsuario: '192.168.1.1'
 * });
 */
export async function contactFormCreate(
  params: ContactFormCreateRequest
): Promise<ContactFormCreateResponse> {
  /**
   * @validation Verify vehicle exists (mock validation)
   */
  const vehicleExists = params.idVehicle >= 1 && params.idVehicle <= 5;
  if (!vehicleExists) {
    throw new Error('vehicleNotFound');
  }

  /**
   * @validation Check for duplicate submission from same IP within 10 minutes
   */
  const now = new Date();
  const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000);

  for (const [, form] of contactForms) {
    if (form.ipUsuario === params.ipUsuario && new Date(form.dateCreated) >= tenMinutesAgo) {
      throw new Error('duplicateSubmissionDetected');
    }
  }

  /**
   * @rule {fn-contact-form-protocol} Generate unique protocol number
   * Format: YYYYMMDD + 5-digit sequential number
   */
  const datePrefix = now.toISOString().slice(0, 10).replace(/-/g, '');
  const sequencial = nextId;
  const protocolo = `${datePrefix}${sequencial.toString().padStart(5, '0')}`;

  /**
   * @rule {fn-contact-form-creation} Create contact form submission
   */
  const idContactForm = nextId++;
  const dateCreated = now.toISOString();

  const vehicleData: { [key: number]: { modelo: string; marca: string; anoModelo: number } } = {
    1: { modelo: 'Civic', marca: 'Honda', anoModelo: 2023 },
    2: { modelo: 'Corolla', marca: 'Toyota', anoModelo: 2022 },
    3: { modelo: 'Onix', marca: 'Chevrolet', anoModelo: 2023 },
    4: { modelo: 'HB20', marca: 'Hyundai', anoModelo: 2021 },
    5: { modelo: 'Compass', marca: 'Jeep', anoModelo: 2023 },
  };

  const vehicle = vehicleData[params.idVehicle];

  const contactForm: ContactFormCreateResponse = {
    idContactForm,
    protocolo,
    status: 'Novo',
    dateCreated,
    modelo: vehicle.modelo,
    marca: vehicle.marca,
    anoModelo: vehicle.anoModelo,
    nomeCompleto: params.nomeCompleto,
    email: params.email,
    telefone: params.telefone,
    preferenciaContato: params.preferenciaContato,
    melhorHorario: params.melhorHorario,
    assunto: params.assunto,
    mensagem: params.mensagem,
    financiamento: params.financiamento,
    receberNovidades: params.receberNovidades,
    ipUsuario: params.ipUsuario,
  };

  contactForms.set(idContactForm, contactForm);

  return {
    idContactForm: contactForm.idContactForm,
    protocolo: contactForm.protocolo,
    status: contactForm.status,
    dateCreated: contactForm.dateCreated,
    modelo: contactForm.modelo,
    marca: contactForm.marca,
    anoModelo: contactForm.anoModelo,
  };
}
