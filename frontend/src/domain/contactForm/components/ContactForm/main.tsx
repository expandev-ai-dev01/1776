import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DOMPurify from 'dompurify';
import { Card } from '@/core/components/Card';
import { Button } from '@/core/components/Button';
import { Input } from '@/core/components/Input';
import { Textarea } from '@/core/components/Textarea';
import { Label } from '@/core/components/Label';
import { contactFormSchema } from '../../validations';
import { useContactFormSubmit } from '../../hooks';
import type { ContactFormProps } from './types';
import type { ContactFormData } from '../../types';

export const ContactForm = ({ vehicleId, vehicleName, onSuccess }: ContactFormProps) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [protocolo, setProtocolo] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
    setValue,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: 'onBlur',
    defaultValues: {
      nomeCompleto: '',
      email: '',
      telefone: '',
      preferenciaContato: 'E-mail',
      melhorHorario: 'Qualquer horário',
      assunto: 'Informações gerais',
      mensagem: '',
      financiamento: false,
      receberNovidades: false,
      termos_privacidade: false,
    },
  });

  const assunto = watch('assunto');
  const mensagem = watch('mensagem');

  useEffect(() => {
    if (assunto === 'Financiamento') {
      setValue('financiamento', true);
    }
  }, [assunto, setValue]);

  const { submit, isSubmitting, error } = useContactFormSubmit({
    onSuccess: (data) => {
      setProtocolo(data.protocolo);
      setShowSuccess(true);
      reset();
      onSuccess?.(data.protocolo);
    },
    onError: (error) => {
      console.error('Error submitting form:', error);
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    const sanitizedData = {
      ...data,
      mensagem: DOMPurify.sanitize(data.mensagem),
      idVehicle: parseInt(vehicleId),
    };

    await submit(sanitizedData);
  };

  if (showSuccess) {
    return (
      <Card>
        <div className="stack gap-6 text-center">
          <div className="center">
            <div className="size-16 rounded-full bg-green-100 center">
              <svg
                className="size-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <div className="stack gap-2">
            <h2 className="text-2xl font-bold text-green-600">Mensagem Enviada com Sucesso!</h2>
            <p className="text-[--color-muted-foreground]">
              Obrigado pelo seu interesse no veículo <strong>{vehicleName}</strong>
            </p>
          </div>
          <div className="bg-[--color-muted] rounded-sm p-4 stack gap-2">
            <p className="font-medium">Número de Protocolo:</p>
            <p className="text-2xl font-bold text-[--color-primary-600]">{protocolo}</p>
            <p className="text-sm text-[--color-muted-foreground]">
              Guarde este número para acompanhamento
            </p>
          </div>
          <div className="stack gap-2">
            <p className="text-[--color-muted-foreground]">
              Entraremos em contato em até <strong>24 horas úteis</strong>
            </p>
            <p className="text-sm text-[--color-muted-foreground]">
              Você receberá um e-mail de confirmação com os detalhes da sua solicitação
            </p>
          </div>
          <Button onClick={() => setShowSuccess(false)} variant="outline">
            Enviar Nova Mensagem
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <h2 className="text-2xl font-bold mb-6">Tenho Interesse</h2>
      <p className="text-[--color-muted-foreground] mb-6">
        Preencha o formulário abaixo para manifestar seu interesse no veículo{' '}
        <strong>{vehicleName}</strong>
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="stack gap-4">
        <div className="stack gap-2">
          <Label htmlFor="nomeCompleto">
            Nome Completo <span className="text-[--color-destructive]">*</span>
          </Label>
          <Input
            id="nomeCompleto"
            {...register('nomeCompleto')}
            placeholder="Seu nome completo"
            aria-invalid={errors.nomeCompleto ? 'true' : 'false'}
            aria-describedby={errors.nomeCompleto ? 'nomeCompleto-error' : undefined}
          />
          {errors.nomeCompleto && (
            <span
              id="nomeCompleto-error"
              role="alert"
              className="text-sm text-[--color-destructive]"
            >
              {errors.nomeCompleto.message}
            </span>
          )}
        </div>

        <div className="stack gap-2">
          <Label htmlFor="email">
            E-mail <span className="text-[--color-destructive]">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            placeholder="seu@email.com"
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <span id="email-error" role="alert" className="text-sm text-[--color-destructive]">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="stack gap-2">
          <Label htmlFor="telefone">
            Telefone <span className="text-[--color-destructive]">*</span>
          </Label>
          <Input
            id="telefone"
            {...register('telefone')}
            placeholder="(00) 00000-0000"
            aria-invalid={errors.telefone ? 'true' : 'false'}
            aria-describedby={errors.telefone ? 'telefone-error' : undefined}
          />
          {errors.telefone && (
            <span id="telefone-error" role="alert" className="text-sm text-[--color-destructive]">
              {errors.telefone.message}
            </span>
          )}
        </div>

        <div className="stack gap-2">
          <Label htmlFor="preferenciaContato">
            Preferência de Contato <span className="text-[--color-destructive]">*</span>
          </Label>
          <select
            id="preferenciaContato"
            {...register('preferenciaContato')}
            className="flex h-10 w-full rounded-sm border border-[--color-input] bg-[--color-background] px-3 py-2 text-sm"
            aria-invalid={errors.preferenciaContato ? 'true' : 'false'}
            aria-describedby={errors.preferenciaContato ? 'preferenciaContato-error' : undefined}
          >
            <option value="Telefone">Telefone</option>
            <option value="E-mail">E-mail</option>
            <option value="WhatsApp">WhatsApp</option>
          </select>
          {errors.preferenciaContato && (
            <span
              id="preferenciaContato-error"
              role="alert"
              className="text-sm text-[--color-destructive]"
            >
              {errors.preferenciaContato.message}
            </span>
          )}
        </div>

        <div className="stack gap-2">
          <Label htmlFor="melhorHorario">Melhor Horário para Contato</Label>
          <select
            id="melhorHorario"
            {...register('melhorHorario')}
            className="flex h-10 w-full rounded-sm border border-[--color-input] bg-[--color-background] px-3 py-2 text-sm"
          >
            <option value="Manhã">Manhã</option>
            <option value="Tarde">Tarde</option>
            <option value="Noite">Noite</option>
            <option value="Qualquer horário">Qualquer horário</option>
          </select>
        </div>

        <div className="stack gap-2">
          <Label htmlFor="assunto">
            Assunto <span className="text-[--color-destructive]">*</span>
          </Label>
          <select
            id="assunto"
            {...register('assunto')}
            className="flex h-10 w-full rounded-sm border border-[--color-input] bg-[--color-background] px-3 py-2 text-sm"
            aria-invalid={errors.assunto ? 'true' : 'false'}
            aria-describedby={errors.assunto ? 'assunto-error' : undefined}
          >
            <option value="Informações gerais">Informações gerais</option>
            <option value="Agendamento de test drive">Agendamento de test drive</option>
            <option value="Negociação de preço">Negociação de preço</option>
            <option value="Financiamento">Financiamento</option>
            <option value="Outro">Outro</option>
          </select>
          {errors.assunto && (
            <span id="assunto-error" role="alert" className="text-sm text-[--color-destructive]">
              {errors.assunto.message}
            </span>
          )}
        </div>

        <div className="stack gap-2">
          <Label htmlFor="mensagem">
            Mensagem <span className="text-[--color-destructive]">*</span>
          </Label>
          <Textarea
            id="mensagem"
            {...register('mensagem')}
            placeholder="Conte-nos mais sobre seu interesse neste veículo..."
            rows={4}
            aria-invalid={errors.mensagem ? 'true' : 'false'}
            aria-describedby={errors.mensagem ? 'mensagem-error' : undefined}
          />
          <div className="flex justify-between items-center">
            <span className="text-sm text-[--color-muted-foreground]">
              {mensagem?.length || 0} / 1000 caracteres
            </span>
          </div>
          {errors.mensagem && (
            <span id="mensagem-error" role="alert" className="text-sm text-[--color-destructive]">
              {errors.mensagem.message}
            </span>
          )}
        </div>

        <div className="stack gap-3">
          <label className="flex items-start gap-2 cursor-pointer">
            <input type="checkbox" {...register('financiamento')} className="mt-1" />
            <span className="text-sm">Tenho interesse em opções de financiamento</span>
          </label>

          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              {...register('termos_privacidade')}
              className="mt-1"
              aria-invalid={errors.termos_privacidade ? 'true' : 'false'}
              aria-describedby={errors.termos_privacidade ? 'termos-error' : undefined}
            />
            <span className="text-sm">
              Li e aceito a{' '}
              <a
                href="#"
                className="text-[--color-primary-600] underline"
                onClick={(e) => {
                  e.preventDefault();
                  alert(
                    'Política de Privacidade:\n\nColetamos seus dados pessoais (nome, e-mail, telefone) para processar sua solicitação de contato sobre o veículo.\n\nSeus dados serão armazenados por até 2 anos e utilizados exclusivamente para fins de atendimento comercial.\n\nVocê tem direito de acessar, corrigir ou excluir seus dados a qualquer momento.\n\nPara mais informações, entre em contato com nosso DPO.'
                  );
                }}
              >
                política de privacidade
              </a>{' '}
              <span className="text-[--color-destructive]">*</span>
            </span>
          </label>
          {errors.termos_privacidade && (
            <span id="termos-error" role="alert" className="text-sm text-[--color-destructive]">
              {errors.termos_privacidade.message}
            </span>
          )}

          <label className="flex items-start gap-2 cursor-pointer">
            <input type="checkbox" {...register('receberNovidades')} className="mt-1" />
            <span className="text-sm">
              Aceito receber comunicações futuras sobre ofertas e novidades
            </span>
          </label>
        </div>

        {error && (
          <div
            className="bg-red-50 border border-red-200 rounded-sm p-4 text-sm text-red-800"
            role="alert"
          >
            <p className="font-medium">Erro ao enviar formulário</p>
            <p className="mt-1">
              {error.message ||
                'Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.'}
            </p>
          </div>
        )}

        <Button type="submit" disabled={isSubmitting || !isValid} className="w-full">
          {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
        </Button>
      </form>
    </Card>
  );
};
