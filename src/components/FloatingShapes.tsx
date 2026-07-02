// Ambient background layer: aurora glows + faint grid, kept behind all content
export default function FloatingShapes() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[1]">
      {/* Aurora glows */}
      <div className="absolute -top-48 -left-48 w-[620px] h-[620px] rounded-full bg-primary/10 blur-[160px]" />
      <div className="absolute top-1/4 -right-64 w-[720px] h-[720px] rounded-full bg-[#3b82f6]/10 blur-[180px]" />
      <div className="absolute bottom-[-200px] left-1/4 w-[560px] h-[560px] rounded-full bg-primary/[0.06] blur-[150px]" />

      {/* Faint grid, fading toward the bottom */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(250,252,250,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(250,252,250,0.035) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "radial-gradient(ellipse 90% 65% at 50% 0%, black, transparent)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 65% at 50% 0%, black, transparent)",
        }}
      />
    </div>
  );
}
