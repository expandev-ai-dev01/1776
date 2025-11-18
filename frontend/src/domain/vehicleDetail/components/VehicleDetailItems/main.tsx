import { useState } from 'react';
import { Card } from '@/core/components/Card';
import { Button } from '@/core/components/Button';
import type { VehicleDetailItemsProps } from './types';

const ITEMS_LIMIT = 10;

export const VehicleDetailItems = ({ items }: VehicleDetailItemsProps) => {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const itemsSerie = items.filter((item) => item.tipo === 'serie');
  const itemsOpcionais = items.filter((item) => item.tipo === 'opcional');

  const groupByCategory = (itemsList: typeof items) => {
    const grouped: Record<string, typeof items> = {};
    itemsList.forEach((item) => {
      if (!grouped[item.categoria]) {
        grouped[item.categoria] = [];
      }
      grouped[item.categoria].push(item);
    });
    return grouped;
  };

  const serieGrouped = groupByCategory(itemsSerie);
  const opcionaisGrouped = groupByCategory(itemsOpcionais);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const renderItemGroup = (title: string, grouped: Record<string, typeof items>) => {
    if (Object.keys(grouped).length === 0) return null;

    return (
      <div className="stack gap-4">
        <h3 className="text-xl font-semibold">{title}</h3>
        {Object.entries(grouped).map(([category, categoryItems]) => {
          const isExpanded = expandedCategories.has(category);
          const displayItems = isExpanded ? categoryItems : categoryItems.slice(0, ITEMS_LIMIT);
          const hasMore = categoryItems.length > ITEMS_LIMIT;

          return (
            <div key={category} className="stack gap-2">
              <h4 className="font-medium text-[--color-primary-600]">{category}</h4>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {displayItems.map((item) => (
                  <li key={item.id} className="flex items-center gap-2">
                    <span className="text-[--color-primary-600]">✓</span>
                    <span>{item.nome}</span>
                  </li>
                ))}
              </ul>
              {hasMore && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleCategory(category)}
                  className="self-start"
                >
                  {isExpanded ? 'Ver menos' : `Ver mais (${categoryItems.length - ITEMS_LIMIT})`}
                </Button>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Card>
      <h2 className="text-2xl font-bold mb-6">Itens e Opcionais</h2>
      <div className="stack gap-8">
        {renderItemGroup('Itens de Série', serieGrouped)}
        {renderItemGroup('Opcionais', opcionaisGrouped)}
      </div>
    </Card>
  );
};
