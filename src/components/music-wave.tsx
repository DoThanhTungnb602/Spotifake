export function MusicWave() {
  return (
    <div className="flex gap-[2px] items-end w-[16px] h-[16px] group-hover:hidden">
      <div className="w-[2px] bg-spotifake h-[15px] animate-wave-1"></div>
      <div className="w-[2px] bg-spotifake h-[15px] animate-wave-2"></div>
      <div className="w-[2px] bg-spotifake h-[15px] animate-wave-3"></div>
      <div className="w-[2px] bg-spotifake h-[15px] animate-wave-4"></div>
    </div>
  );
}
