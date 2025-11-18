import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import { Button } from '@/core/components/Button';
import {
  VehicleGrid,
  VehicleFilters,
  VehiclePagination,
  VehicleSortSelect,
  useVehicleList,
} from '@/domain/vehicle';
import type { VehicleFilters as VehicleFiltersType, SortOrder } from '@/domain/vehicle';

export const HomePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1'));
  const [pageSize, setPageSize] = useState(parseInt(searchParams.get('pageSize') || '12'));
  const [sortOrder, setSortOrder] = useState<SortOrder>(
    (searchParams.get('sortOrder') as SortOrder) || 'relevancia'
  );
  const [filters, setFilters] = useState<VehicleFiltersType>(() => {
    const marcas = searchParams.get('marcas')?.split(',').filter(Boolean);
    const modelos = searchParams.get('modelos')?.split(',').filter(Boolean);
    const cambios = searchParams.get('cambios')?.split(',').filter(Boolean);
    const anoMin = searchParams.get('anoMin');
    const anoMax = searchParams.get('anoMax');
    const precoMin = searchParams.get('precoMin');
    const precoMax = searchParams.get('precoMax');

    return {
      marcas,
      modelos,
      cambios,
      anoMin: anoMin ? parseInt(anoMin) : undefined,
      anoMax: anoMax ? parseInt(anoMax) : undefined,
      precoMin: precoMin ? parseFloat(precoMin) : undefined,
      precoMax: precoMax ? parseFloat(precoMax) : undefined,
    };
  });

  const { vehicles, total, totalPages, isLoading, error, refetch } = useVehicleList({
    params: {
      page,
      pageSize,
      filters,
      sortOrder,
    },
  });

  useEffect(() => {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    params.set('pageSize', pageSize.toString());
    params.set('sortOrder', sortOrder);

    if (filters.marcas?.length) params.set('marcas', filters.marcas.join(','));
    if (filters.modelos?.length) params.set('modelos', filters.modelos.join(','));
    if (filters.cambios?.length) params.set('cambios', filters.cambios.join(','));
    if (filters.anoMin) params.set('anoMin', filters.anoMin.toString());
    if (filters.anoMax) params.set('anoMax', filters.anoMax.toString());
    if (filters.precoMin) params.set('precoMin', filters.precoMin.toString());
    if (filters.precoMax) params.set('precoMax', filters.precoMax.toString());

    setSearchParams(params);
  }, [page, pageSize, sortOrder, filters, setSearchParams]);

  const handleFiltersChange = (newFilters: VehicleFiltersType) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    const validPage = Math.min(newPage, totalPages);
    setPage(validPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  const handleSortChange = (newSortOrder: SortOrder) => {
    setSortOrder(newSortOrder);
  };

  if (error) {
    return (
      <div className="center min-h-[400px]">
        <div className="stack gap-4 text-center max-w-md">
          <h2 className="text-xl font-semibold text-[--color-destructive]">
            Erro ao carregar veículos
          </h2>
          <p className="text-[--color-muted-foreground]">
            Ocorreu um erro ao carregar os veículos. Por favor, tente novamente.
          </p>
          <Button onClick={() => refetch()}>Tentar novamente</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="stack gap-8">
      <section className="text-center stack gap-4">
        <h1 className="text-4xl font-bold">Catálogo de Veículos</h1>
        <p className="text-lg text-[--color-muted-foreground]">
          Explore nossa seleção de veículos disponíveis
        </p>
      </section>

      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="lg:w-64 shrink-0">
          <div className="lg:hidden mb-4">
            <Button onClick={() => setShowFilters(!showFilters)} className="w-full">
              {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
            </Button>
          </div>
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
            <VehicleFilters filters={filters} onFiltersChange={handleFiltersChange} />
          </div>
        </aside>

        <section className="flex-1 stack gap-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <p className="text-[--color-muted-foreground]">
              {total > 0 ? (
                <>
                  Exibindo {(page - 1) * pageSize + 1}-{Math.min(page * pageSize, total)} de {total}{' '}
                  veículos
                </>
              ) : (
                'Nenhum veículo encontrado'
              )}
            </p>
            <VehicleSortSelect sortOrder={sortOrder} onSortChange={handleSortChange} />
          </div>

          {isLoading ? (
            <div className="center min-h-[400px]">
              <LoadingSpinner size="lg" />
            </div>
          ) : total === 0 ? (
            <div className="center min-h-[400px]">
              <div className="stack gap-4 text-center max-w-md">
                <h2 className="text-xl font-semibold">Nenhum veículo encontrado</h2>
                <p className="text-[--color-muted-foreground]">
                  Não encontramos veículos com os filtros selecionados. Tente remover alguns filtros
                  ou alterar os critérios de busca para ampliar os resultados.
                </p>
              </div>
            </div>
          ) : (
            <>
              <VehicleGrid vehicles={vehicles} />
              <VehiclePagination
                currentPage={page}
                totalPages={totalPages}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
              />
            </>
          )}
        </section>
      </div>
    </div>
  );
};
