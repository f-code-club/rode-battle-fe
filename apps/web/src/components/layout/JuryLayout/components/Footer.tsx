export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-gray-100 px-6 py-4">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
          <span>© {currentYear} All Copyrights Reserved by</span>
          <a href="https://www.facebook.com/fcodeclub" className="font-bold text-emerald-600">
            F-Code
          </a>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            System Online
          </div>
          <div className="text-xs font-medium text-gray-500">
            Software By <span className="font-bold text-gray-600">F-Code</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
