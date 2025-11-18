export const HomePage = () => {
  return (
    <div className="stack gap-8">
      <section className="text-center stack gap-4">
        <h1 className="text-4xl font-bold">Bem-vindo ao Catálogo de Carros</h1>
        <p className="text-lg text-[--color-muted-foreground]">
          Explore nossa seleção de veículos disponíveis
        </p>
      </section>

      <section className="stack gap-6">
        <div className="center">
          <p className="text-[--color-muted-foreground]">Carregando catálogo...</p>
        </div>
      </section>
    </div>
  );
};
