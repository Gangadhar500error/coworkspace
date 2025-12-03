export default function Footer() {
  return (
    <footer
      className="relative bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: "url(https://siddharthpetro.com/wp-content/uploads/2019/09/Footer-Background-Image.png)" }}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <div className="mb-4 text-2xl font-bold">CoworkSpace</div>
            <p className="text-sm leading-relaxed mb-2">Modern workspace solutions for businesses and professionals.</p>
            <a href="mailto:info@coworkspaces.us" className="text-sm text-white/80 hover:underline">info@coworkspaces.us</a>
          </div>

          <div>
            <h4 className="text-base font-bold mb-4">SERVICES</h4>
            <ul className="space-y-2 text-sm text-white/90">
              <li><a href="#" className="hover:underline">Workspace Solutions</a></li>
              <li><a href="#" className="hover:underline">Meeting Rooms</a></li>
              <li><a href="#" className="hover:underline">Virtual Offices</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-base font-bold mb-4">LEGAL</h4>
            <ul className="space-y-2 text-sm text-white/90">
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Terms of Use</a></li>
              <li><a href="#" className="hover:underline">Data Protection</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 my-10" />

        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/ConquerorsSoftwareTechnologiesPvtLimited" aria-label="Facebook" className="hover:text-white/80">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5A3.5 3.5 0 0 1 14 6h3v3h-2a1 1 0 0 0-1 1V12h3l-.5 3h-2.5v7A10 10 0 0 0 22 12z" />
              </svg>
            </a>
            <a href="https://x.com/ConquerorsTech" aria-label="X" className="hover:text-white/80">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.083 2h3.641l-7.96 9.025L23.5 22h-7.708l-6.029-7.035L3.197 22H-.5l8.534-9.665L.5 2h7.833l5.585 6.515L18.083 2Zm-1.282 18h2.01L7.688 4H5.59l11.211 16Z" />
              </svg>
            </a>
            <a href="https://www.conquerorstech.net/" aria-label="Website" className="hover:text-white/80">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.35 11.1H12v2.8h5.35c-.23 1.26-.94 2.33-2 3.05v2.5h3.22c1.88-1.73 2.98-4.28 2.98-7.35 0-.66-.06-1.31-.2-1.95zM12 22c2.7 0 4.96-.9 6.61-2.45l-3.22-2.5c-.89.6-2 .95-3.39.95-2.61 0-4.81-1.76-5.6-4.13H3.1v2.6C4.74 19.98 8.05 22 12 22zM6.4 13.87c-.2-.6-.3-1.23-.3-1.87s.1-1.27.3-1.87V7.53H3.1A9.95 9.95 0 0 0 2 12c0 1.59.38 3.09 1.1 4.47l3.3-2.6zM12 5.5c1.47 0 2.8.5 3.85 1.5l2.9-2.9C16.96 2.9 14.7 2 12 2 8.05 2 4.74 4.02 3.1 7.53l3.3 2.6C7.19 7.26 9.39 5.5 12 5.5z" />
              </svg>
            </a>
          </div>

          <div className="text-sm text-white/70 text-center lg:text-right">© {new Date().getFullYear()} CoworkSpace. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
