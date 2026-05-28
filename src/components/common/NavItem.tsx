type NavItemProps = {
  label: string;
  isActive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
};

export default function NavItem({
  label,
  isActive,
  disabled,
  onClick,
}: NavItemProps) {
  const base =
    "group flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left transition-colors";
  const state = isActive
    ? "bg-[#2a1d0e] text-[#f0c878]"
    : disabled
      ? "text-[#5a4a2a] cursor-not-allowed"
      : "text-[#a8884a] hover:bg-[#241809] hover:text-[#e8b86b]";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${state}`}
    >
      <span className="flex items-center gap-3">
        <span
          className={`h-4 w-0.5 rounded-full ${
            isActive ? "bg-[#e8b86b]" : "bg-transparent"
          }`}
        />
        <span className="font-serif text-[15px] tracking-wider">{label}</span>
      </span>
    </button>
  );
}