export default function Footer() {
  return (
    <footer className="border-t border-[#e5ebe7] bg-white">
      <div className="mx-auto flex w-full max-w-[900px] flex-col gap-2 px-3 py-4 text-center sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-4 sm:py-5 sm:text-left">
        <p className="text-[9px] leading-4 text-[#4f5752] sm:text-[10px]">
          Bazar Dor — Essential product prices at a glance.
        </p>

        <p className="text-[9px] leading-4 text-[#4f5752] sm:text-right sm:text-[10px]">
          All prices are approximate and may change depending on market conditions.
        </p>
      </div>
    </footer>
  );
}