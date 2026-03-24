export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white/60 py-8 dark:border-zinc-700 dark:bg-zinc-900/65">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          © {new Date().getFullYear()} ETENTEK. Blog IoT, SCADA, PLC, HMI,
          Arduino, ESP & review công nghệ. Nội dung mang tính tham khảo.
        </p>
      </div>
    </footer>
  );
}

