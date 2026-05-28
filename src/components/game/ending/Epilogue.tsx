export default function Epilogue({ message }: { message: string }) {
  return (
    <section className="flex w-full flex-col rounded-md border border-[#3d2818] bg-[#0a0805]/80 p-5 backdrop-blur-sm md:w-72">
      <p className="text-[10px] tracking-[0.4em] text-[#8a6a3d]">EPILOGUE</p>
      <p className="mt-4 text-sm leading-relaxed text-[#d9c9a8] italic">
        "{message}"
      </p>
    </section>
  );
}
