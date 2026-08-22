import { QRCodeSVG } from 'qrcode.react'

const SITE_URL = 'https://nicholashutajulu.web.id'

export default function Footer() {
  return (
    <footer className="section-shell relative border-t border-hairline/10 py-10">
      <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-xs text-ink-4">
          © {new Date().getFullYear()} Nicholas Orlando Hutajulu. Built with care, one orbit at a time.
        </p>

        <a
          href={SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3"
          aria-label="Scan or visit nicholashutajulu.web.id"
        >
          <div className="rounded-lg bg-white p-1.5 shadow-panel transition-transform group-hover:scale-105">
            <QRCodeSVG
              value={SITE_URL}
              size={52}
              level="M"
              fgColor="#05060d"
              bgColor="#ffffff"
            />
          </div>
          <span className="font-mono text-[11px] text-ink-4 transition-colors group-hover:text-ink-2">
            nicholashutajulu.web.id
          </span>
        </a>
      </div>
    </footer>
  )
}
