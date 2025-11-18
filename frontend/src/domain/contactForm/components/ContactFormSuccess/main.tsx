import { Card } from '@/core/components/Card';
import { Button } from '@/core/components/Button';
import type { ContactFormSuccessProps } from './types';

export const ContactFormSuccess = ({
  protocolo,
  vehicleName,
  onNewMessage,
}: ContactFormSuccessProps) => {
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
        {onNewMessage && (
          <Button onClick={onNewMessage} variant="outline">
            Enviar Nova Mensagem
          </Button>
        )}
      </div>
    </Card>
  );
};
