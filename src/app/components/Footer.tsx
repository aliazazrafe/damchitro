export default function Footer() {
  return (
    <footer className="border-t border-[#e5ebe7] bg-white">
      <div className="mx-auto flex w-full max-w-[900px] flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">

        <p className="text-[10px] text-[#4f5752]">
          Bazar Dor — Essential product prices at a glance.
        </p>

        <p className="text-[10px] text-[#4f5752] sm:text-right">
          All prices are approximate and may change depending on market conditions.
        </p>

      </div>
    </footer>
  );
}