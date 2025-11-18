import { useState } from 'react';
import { Button } from '@/core/components/Button';
import type { VehicleDetailGalleryProps } from './types';

export const VehicleDetailGallery = ({ photos, vehicleName }: VehicleDetailGalleryProps) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleOpenLightbox = () => {
    setIsLightboxOpen(true);
  };

  const handleCloseLightbox = () => {
    setIsLightboxOpen(false);
  };

  if (photos.length === 0) {
    return (
      <div className="aspect-video w-full bg-[--color-muted] center rounded-sm">
        <p className="text-[--color-muted-foreground]">Nenhuma foto disponível</p>
      </div>
    );
  }

  const selectedPhoto = photos[selectedIndex];

  return (
    <div className="stack gap-4">
      <div className="relative aspect-video w-full overflow-hidden rounded-sm bg-[--color-muted]">
        <img
          src={selectedPhoto.url}
          alt={selectedPhoto.legenda || `${vehicleName} - Foto ${selectedIndex + 1}`}
          className="w-full h-full object-cover cursor-pointer"
          onClick={handleOpenLightbox}
        />
        {photos.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
              onClick={handlePrevious}
              aria-label="Foto anterior"
            >
              ‹
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
              onClick={handleNext}
              aria-label="Próxima foto"
            >
              ›
            </Button>
          </>
        )}
        {selectedPhoto.legenda && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm">
            {selectedPhoto.legenda}
          </div>
        )}
      </div>

      {photos.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {photos.map((photo, index) => (
            <button
              key={photo.id}
              onClick={() => handleThumbnailClick(index)}
              className={`shrink-0 w-20 h-20 rounded-sm overflow-hidden border-2 transition-all ${
                index === selectedIndex
                  ? 'border-[--color-primary-600]'
                  : 'border-transparent hover:border-[--color-border]'
              }`}
            >
              <img
                src={photo.url}
                alt={photo.legenda || `Miniatura ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 center"
          onClick={handleCloseLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Galeria em tela cheia"
        >
          <button
            onClick={handleCloseLightbox}
            className="absolute top-4 right-4 text-white text-4xl hover:opacity-70"
            aria-label="Fechar galeria"
          >
            ×
          </button>
          <div
            className="relative max-w-7xl max-h-[90vh] w-full h-full center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.legenda || `${vehicleName} - Foto ${selectedIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
            {photos.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 text-3xl"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevious();
                  }}
                  aria-label="Foto anterior"
                >
                  ‹
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 text-3xl"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  aria-label="Próxima foto"
                >
                  ›
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
