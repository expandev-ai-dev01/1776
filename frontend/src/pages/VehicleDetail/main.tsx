import { useParams, Link } from 'react-router-dom';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { Button } from '@/core/components/Button';
import {
  useVehicleDetail,
  VehicleDetailGallery,
  VehicleDetailSpecs,
  VehicleDetailItems,
  VehicleDetailHistory,
  VehicleDetailPayment,
  VehicleDetailSimilar,
  VehicleDetailContact,
  formatCurrency,
} from '@/domain/vehicleDetail';

export const VehicleDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data, isLoading, error, refetch } = useVehicleDetail({ id: id || '' });

  if (!id) {
    return (
      <div className="center min-h-[400px]">
        <div className="stack gap-4 text-center max-w-md">
          <h2 className="text-xl font-semibold text-[--color-destructive]">
            ID do veículo não fornecido
          </h2>
          <Link to="/">
            <Button>Voltar para listagem</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="center min-h-[400px]">
        <div className="stack gap-4 text-center max-w-md">
          <h2 className="text-xl font-semibold text-[--color-destructive]">
            Erro ao carregar detalhes do veículo
          </h2>
          <p className="text-[--color-muted-foreground]">
            Ocorreu um erro ao carregar os detalhes do veículo. Por favor, tente novamente.
          </p>
          <div className="flex gap-2 justify-center">
            <Button onClick={() => refetch()}>Tentar novamente</Button>
            <Link to="/">
              <Button variant="outline">Voltar para listagem</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="center min-h-[400px]">
        <div className="stack gap-4 text-center max-w-md">
          <h2 className="text-xl font-semibold">Veículo não encontrado</h2>
          <p className="text-[--color-muted-foreground]">
            O veículo solicitado não foi encontrado ou não está mais disponível.
          </p>
          <Link to="/">
            <Button>Voltar para listagem</Button>
          </Link>
        </div>
      </div>
    );
  }

  const {
    vehicle,
    photos,
    items,
    revisoes,
    sinistros,
    laudoTecnico,
    formasPagamento,
    condicaoFinanciamento,
    documentacao,
    situacaoDocumental,
  } = data;
  const vehicleName = `${vehicle.marca} ${vehicle.modelo} ${vehicle.anoModelo}`;

  return (
    <div className="stack gap-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <Link to="/">
          <Button variant="outline">← Voltar para listagem</Button>
        </Link>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.print()}>
            Imprimir
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              const url = window.location.href;
              navigator.clipboard.writeText(url);
              alert('Link copiado para a área de transferência!');
            }}
          >
            Compartilhar
          </Button>
        </div>
      </div>

      <section className="stack gap-4">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">{vehicleName}</h1>
            <div className="flex items-center gap-4 text-[--color-muted-foreground]">
              <span>{vehicle.quilometragem.toLocaleString('pt-BR')} km</span>
              <span>•</span>
              <span>{vehicle.cambio}</span>
              <span>•</span>
              <span>{vehicle.combustivel}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-[--color-primary-600]">
              {formatCurrency(vehicle.preco)}
            </p>
            <div
              className={`inline-block px-3 py-1 rounded-sm text-sm font-medium mt-2 ${
                vehicle.status === 'Disponível'
                  ? 'bg-green-100 text-green-800'
                  : vehicle.status === 'Reservado'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {vehicle.status}
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 stack gap-8">
          <VehicleDetailGallery photos={photos} vehicleName={vehicleName} />
          <VehicleDetailSpecs vehicle={vehicle} />
          <VehicleDetailItems items={items} />
          <VehicleDetailHistory
            vehicle={vehicle}
            revisoes={revisoes}
            sinistros={sinistros}
            laudoTecnico={laudoTecnico}
          />
          <VehicleDetailPayment
            vehicle={vehicle}
            formasPagamento={formasPagamento}
            condicaoFinanciamento={condicaoFinanciamento}
            documentacao={documentacao}
            situacaoDocumental={situacaoDocumental}
          />
        </div>

        <div className="stack gap-8">
          <VehicleDetailContact vehicleId={vehicle.id} vehicleName={vehicleName} />
        </div>
      </div>

      <VehicleDetailSimilar
        vehicleId={vehicle.id}
        marca={vehicle.marca}
        modelo={vehicle.modelo}
        preco={vehicle.preco}
      />
    </div>
  );
};
