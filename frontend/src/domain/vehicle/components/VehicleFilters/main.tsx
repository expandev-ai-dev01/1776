import { useState, useEffect } from 'react';
import { Button } from '@/core/components/Button';
import { Label } from '@/core/components/Label';
import { useFilterOptions } from '../../hooks';
import { useModelosByMarcas } from '../../hooks';
import type { VehicleFiltersProps } from './types';
import type { VehicleFilters } from '../../types';

export const VehicleFilters = ({ filters, onFiltersChange }: VehicleFiltersProps) => {
  const { filterOptions, isLoading } = useFilterOptions();
  const [selectedMarcas, setSelectedMarcas] = useState<string[]>(filters.marcas || []);
  const [selectedModelos, setSelectedModelos] = useState<string[]>(filters.modelos || []);
  const { modelos: availableModelos } = useModelosByMarcas({ marcas: selectedMarcas });

  const [localFilters, setLocalFilters] = useState<VehicleFilters>(filters);

  useEffect(() => {
    if (selectedMarcas.length === 0) {
      setSelectedModelos([]);
      setLocalFilters((prev) => ({ ...prev, modelos: [] }));
    } else {
      const validModelos = selectedModelos.filter((modelo) => availableModelos.includes(modelo));
      if (validModelos.length !== selectedModelos.length) {
        setSelectedModelos(validModelos);
        setLocalFilters((prev) => ({ ...prev, modelos: validModelos }));
      }
    }
  }, [selectedMarcas, availableModelos]);

  const handleMarcaChange = (marca: string) => {
    const newMarcas = selectedMarcas.includes(marca)
      ? selectedMarcas.filter((m) => m !== marca)
      : [...selectedMarcas, marca];
    setSelectedMarcas(newMarcas);
    setLocalFilters((prev) => ({ ...prev, marcas: newMarcas }));
  };

  const handleModeloChange = (modelo: string) => {
    const newModelos = selectedModelos.includes(modelo)
      ? selectedModelos.filter((m) => m !== modelo)
      : [...selectedModelos, modelo];
    setSelectedModelos(newModelos);
    setLocalFilters((prev) => ({ ...prev, modelos: newModelos }));
  };

  const handleCambioChange = (cambio: string) => {
    const currentCambios = localFilters.cambios || [];
    const newCambios = currentCambios.includes(cambio)
      ? currentCambios.filter((c) => c !== cambio)
      : [...currentCambios, cambio];
    setLocalFilters((prev) => ({ ...prev, cambios: newCambios }));
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
  };

  const handleClearFilters = () => {
    const emptyFilters: VehicleFilters = {};
    setSelectedMarcas([]);
    setSelectedModelos([]);
    setLocalFilters(emptyFilters);
    onFiltersChange(emptyFilters);
  };

  if (isLoading) {
    return <div className="text-[--color-muted-foreground]">Carregando filtros...</div>;
  }

  const displayModelos = selectedMarcas.length > 0 ? availableModelos : filterOptions.modelos;

  return (
    <div className="stack gap-6 p-4 border rounded-sm bg-[--color-card]">
      <h2 className="text-lg font-semibold">Filtros</h2>

      <div className="stack gap-4">
        <div className="stack gap-2">
          <Label>Marca</Label>
          <div className="stack gap-2 max-h-48 overflow-y-auto">
            {filterOptions.marcas.map((marca) => (
              <label key={marca} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedMarcas.includes(marca)}
                  onChange={() => handleMarcaChange(marca)}
                  className="size-4"
                />
                <span className="text-sm">{marca}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="stack gap-2">
          <Label>Modelo</Label>
          <div className="stack gap-2 max-h-48 overflow-y-auto">
            {displayModelos.map((modelo) => (
              <label key={modelo} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedModelos.includes(modelo)}
                  onChange={() => handleModeloChange(modelo)}
                  className="size-4"
                  disabled={selectedMarcas.length > 0 && !availableModelos.includes(modelo)}
                />
                <span className="text-sm">{modelo}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="stack gap-2">
          <Label>Ano</Label>
          <div className="flex gap-2">
            <select
              value={localFilters.anoMin || ''}
              onChange={(e) =>
                setLocalFilters((prev) => ({
                  ...prev,
                  anoMin: e.target.value ? parseInt(e.target.value) : undefined,
                }))
              }
              className="flex-1 h-10 rounded-sm border border-[--color-input] bg-[--color-background] px-3 text-sm"
            >
              <option value="">Mínimo</option>
              {filterOptions.anos.map((ano) => (
                <option key={ano} value={ano}>
                  {ano}
                </option>
              ))}
            </select>
            <select
              value={localFilters.anoMax || ''}
              onChange={(e) =>
                setLocalFilters((prev) => ({
                  ...prev,
                  anoMax: e.target.value ? parseInt(e.target.value) : undefined,
                }))
              }
              className="flex-1 h-10 rounded-sm border border-[--color-input] bg-[--color-background] px-3 text-sm"
            >
              <option value="">Máximo</option>
              {filterOptions.anos.map((ano) => (
                <option key={ano} value={ano}>
                  {ano}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="stack gap-2">
          <Label>Preço</Label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Mínimo"
              value={localFilters.precoMin || ''}
              onChange={(e) =>
                setLocalFilters((prev) => ({
                  ...prev,
                  precoMin: e.target.value ? parseFloat(e.target.value) : undefined,
                }))
              }
              className="flex-1 h-10 rounded-sm border border-[--color-input] bg-[--color-background] px-3 text-sm"
            />
            <input
              type="number"
              placeholder="Máximo"
              value={localFilters.precoMax || ''}
              onChange={(e) =>
                setLocalFilters((prev) => ({
                  ...prev,
                  precoMax: e.target.value ? parseFloat(e.target.value) : undefined,
                }))
              }
              className="flex-1 h-10 rounded-sm border border-[--color-input] bg-[--color-background] px-3 text-sm"
            />
          </div>
        </div>

        <div className="stack gap-2">
          <Label>Câmbio</Label>
          <div className="stack gap-2">
            {filterOptions.cambios.map((cambio) => (
              <label key={cambio} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={localFilters.cambios?.includes(cambio) || false}
                  onChange={() => handleCambioChange(cambio)}
                  className="size-4"
                />
                <span className="text-sm">{cambio}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={handleApplyFilters} className="flex-1">
          Aplicar Filtros
        </Button>
        <Button onClick={handleClearFilters} variant="outline" className="flex-1">
          Limpar
        </Button>
      </div>
    </div>
  );
};
