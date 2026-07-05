export default function WheelCenter({
  onSpin,
  disabled,
}) {
  return (
    <button
      onClick={onSpin}
      disabled={disabled}
      className={`
        absolute
        left-1/2
        top-1/2
        z-20
        flex
        h-24
        w-24
        -translate-x-1/2
        -translate-y-1/2
        items-center
        justify-center
        rounded-full
        border
        border-white/20
        bg-gradient-to-br
        from-violet-500
        via-purple-500
        to-indigo-600
        text-lg
        font-bold
        text-white
        shadow-[0_0_35px_rgba(139,92,246,0.45)]
        transition-all
        duration-300
        hover:scale-105
        hover:shadow-[0_0_50px_rgba(139,92,246,0.65)]
        active:scale-95
        disabled:cursor-not-allowed
        disabled:opacity-50
      `}
    >
      {disabled ? "..." : "SPIN"}
    </button>
  );
}