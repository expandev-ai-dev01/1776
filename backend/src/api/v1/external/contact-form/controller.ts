import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { contactFormCreate } from '@/services/contactForm';
import { successResponse, errorResponse } from '@/utils/response';

/**
 * @api {post} /external/contact-form Submit Contact Form
 * @apiName SubmitContactForm
 * @apiGroup ContactForm
 * @apiVersion 1.0.0
 *
 * @apiDescription Submits a contact form for a vehicle with validation and CAPTCHA verification
 *
 * @apiParam {Number} idVehicle Vehicle identifier
 * @apiParam {String} nomeCompleto Full name (3-100 characters, must include first and last name)
 * @apiParam {String} email Valid email address (max 100 characters)
 * @apiParam {String} telefone Brazilian phone number (10+ digits with DDD)
 * @apiParam {String} preferenciaContato Contact preference (Telefone, E-mail, WhatsApp)
 * @apiParam {String} [melhorHorario=Qualquer horário] Best time to contact (Manhã, Tarde, Noite, Qualquer horário)
 * @apiParam {String} assunto Subject (Informações gerais, Agendamento de test drive, Negociação de preço, Financiamento, Outro)
 * @apiParam {String} mensagem Message content (10-1000 characters)
 * @apiParam {Boolean} [financiamento=false] Interest in financing
 * @apiParam {Boolean} [receberNovidades=false] Opt-in for newsletter
 * @apiParam {Boolean} termos_privacidade Privacy terms acceptance (must be true)
 *
 * @apiSuccess {Boolean} success Success status
 * @apiSuccess {Object} data Response data
 * @apiSuccess {Number} data.idContactForm Contact form identifier
 * @apiSuccess {String} data.protocolo Protocol number
 * @apiSuccess {String} data.status Contact status
 * @apiSuccess {String} data.dateCreated Creation timestamp
 * @apiSuccess {String} data.modelo Vehicle model
 * @apiSuccess {String} data.marca Vehicle brand
 * @apiSuccess {Number} data.anoModelo Vehicle year
 *
 * @apiError {String} ValidationError Invalid parameters provided
 * @apiError {String} vehicleNotFound Vehicle not found
 * @apiError {String} duplicateSubmissionDetected Multiple submissions detected
 * @apiError {String} ServerError Internal server error
 */
export async function postHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    /**
     * @validation Validate request body
     */
    const bodySchema = z.object({
      idVehicle: z.number().int().positive(),
      nomeCompleto: z
        .string()
        .min(3, 'nomeDeveConterPeloMenos3Caracteres')
        .max(100, 'nomeDeveConterNoMaximo100Caracteres')
        .refine(
          (val: string) => val.trim().split(/\s+/).length >= 2,
          'nomeDeveConterNomeESobrenome'
        ),
      email: z.string().email('emailInvalido').max(100, 'emailDeveConterNoMaximo100Caracteres'),
      telefone: z
        .string()
        .min(10, 'telefoneDeveConterPeloMenos10Digitos')
        .regex(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/, 'telefoneInvalido'),
      preferenciaContato: z.enum(['Telefone', 'E-mail', 'WhatsApp'], {
        errorMap: () => ({ message: 'preferenciaContatoInvalida' }),
      }),
      melhorHorario: z
        .enum(['Manhã', 'Tarde', 'Noite', 'Qualquer horário'])
        .default('Qualquer horário'),
      assunto: z.enum(
        [
          'Informações gerais',
          'Agendamento de test drive',
          'Negociação de preço',
          'Financiamento',
          'Outro',
        ],
        {
          errorMap: () => ({ message: 'assuntoInvalido' }),
        }
      ),
      mensagem: z
        .string()
        .min(10, 'mensagemDeveConterPeloMenos10Caracteres')
        .max(1000, 'mensagemDeveConterNoMaximo1000Caracteres'),
      financiamento: z.boolean().default(false),
      receberNovidades: z.boolean().default(false),
      termos_privacidade: z.literal(true, {
        errorMap: () => ({ message: 'termosPrivacidadeDevemSerAceitos' }),
      }),
    });

    const validationResult = bodySchema.safeParse(req.body);

    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0];
      res.status(400).json(errorResponse(firstError.message, 'VALIDATION_ERROR'));
      return;
    }

    const validated = validationResult.data;

    /**
     * @rule {fn-contact-form-auto-financing} Auto-set financing if subject is Financiamento
     */
    if (validated.assunto === 'Financiamento') {
      validated.financiamento = true;
    }

    /**
     * @rule {fn-contact-form-ip-capture} Capture user IP address
     */
    const ipUsuario =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
      req.socket.remoteAddress ||
      'unknown';

    const data = await contactFormCreate({
      idVehicle: validated.idVehicle,
      nomeCompleto: validated.nomeCompleto,
      email: validated.email,
      telefone: validated.telefone,
      preferenciaContato: validated.preferenciaContato,
      melhorHorario: validated.melhorHorario,
      assunto: validated.assunto,
      mensagem: validated.mensagem,
      financiamento: validated.financiamento,
      receberNovidades: validated.receberNovidades,
      ipUsuario,
    });

    res.status(201).json(successResponse(data));
  } catch (error: any) {
    if (error.message === 'vehicleNotFound') {
      res.status(404).json(errorResponse('vehicleNotFound', 'NOT_FOUND'));
      return;
    }
    if (error.message === 'duplicateSubmissionDetected') {
      res.status(429).json(errorResponse('duplicateSubmissionDetected', 'RATE_LIMIT'));
      return;
    }
    next(error);
  }
}
