type StatProps = {
  icon: string;
  value: number;
  iconAlt: string;
};

export default function Stat({ icon, value, iconAlt }: StatProps) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 border-2 border-[#8a6a3d] rounded-md bg-[#1f140a] min-w-18">
      <img
        src={icon}
        alt={iconAlt}
        className="w-5 h-5"
        style={{ imageRendering: "pixelated" }}
      />
      <span className="text-[#e8b86b] text-lg tracking-wider drop-shadow-[1px_1px_0_#000]">
        {value}
      </span>
    </div>
  );
}