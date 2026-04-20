// Versão estática (sem TanStack Router) do componente Index, usada apenas
// no build estático para gerar o HTML servido na Vercel.
import logo from "@/assets/hub88-logo.jpeg";

export default function StaticIndex({ logoSrc }: { logoSrc?: string }) {
  const src = logoSrc ?? (logo as unknown as string);
  return (
    <main
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-12 text-center"
      style={{
        background:
          "radial-gradient(ellipse at center, oklch(0.22 0.06 230) 0%, oklch(0.12 0.04 240) 70%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 20% 30%, oklch(0.95 0.05 200) 50%, transparent), radial-gradient(1px 1px at 70% 60%, oklch(0.95 0.05 200) 50%, transparent), radial-gradient(1px 1px at 40% 80%, oklch(0.95 0.05 200) 50%, transparent), radial-gradient(1px 1px at 85% 20%, oklch(0.95 0.05 200) 50%, transparent), radial-gradient(1px 1px at 10% 70%, oklch(0.95 0.05 200) 50%, transparent)",
          backgroundSize: "200px 200px",
        }}
      />
      <div className="relative z-10 flex max-w-2xl flex-col items-center gap-8">
        <img
          src={src}
          alt="Hub88 logo"
          className="w-64 rounded-full sm:w-80"
          style={{ filter: "drop-shadow(0 0 30px oklch(0.75 0.22 210 / 0.6))" }}
        />
        <h1
          className="text-4xl font-bold tracking-wide text-neon sm:text-5xl"
          style={{
            textShadow:
              "0 0 10px oklch(0.85 0.18 200 / 0.8), 0 0 30px oklch(0.75 0.22 210 / 0.6)",
          }}
        >
          Site em Construção
        </h1>
        <p className="max-w-lg text-base text-foreground/80 sm:text-lg">
          Estamos trabalhando para trazer uma experiência incrível.
          <br />
          Volte em breve para conferir as novidades!
        </p>
        <div className="mt-4 inline-flex items-center justify-center gap-3 rounded-full border border-neon/40 bg-foreground/5 px-6 py-3 backdrop-blur-md">
          <span className="relative flex h-3 w-3 items-center justify-center">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-neon" />
          </span>
          <span className="text-sm font-medium leading-none tracking-wider text-neon uppercase">
            Em breve
          </span>
        </div>
      </div>
      <footer className="relative z-10 mt-16 text-xs text-foreground/50">
        © {new Date().getFullYear()} Hub88. Todos os direitos reservados.
      </footer>
    </main>
  );
}
