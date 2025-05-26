import React, {  useRef, useState } from 'react';
import { QRCodeCanvas,QRCodeSVG } from 'qrcode.react';
import './App.css';

function App() {
  const [qrCode, setQrCode] = useState('');
  const svgRef = useRef<SVGSVGElement | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQrCode(e.target.value);
  };

  const handleDownloadPng = () => {
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = 'qr-code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleDownloadSvg = () => {
    if (!svgRef.current) return;
    const svgData = svgRef.current.outerHTML;
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
     const url = URL.createObjectURL(blob);
    const link = document.createElement('a')
    link.href = url;
    link.download = 'qr-code.svg'
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-200 via-blue-100 to-pink-100 font-sans">
      <div className="flex flex-col items-center justify-center w-full max-w-xl px-8 py-10 bg-white rounded-3xl shadow-2xl border border-gray-200">
        <h1 className="text-4xl font-bold text-[#494eea] mb-3">QR Code Generator</h1>
        <p className="text-lg text-gray-700 mb-6 text-center">
          Enter a URL or any text below to generate your QR Code
        </p>

        <input
          onChange={handleChange}
          placeholder="https://example.com"
          className="w-full h-[50px] px-4 py-2 border-2 border-[#494eea] rounded-xl outline-none text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[#494eea] transition-all duration-200"
          type="text"
        />

        {qrCode && (
          <div className="flex flex-col items-center justify-center mt-8 space-y-5">
             <div style={{ display: 'none' }}>
              <QRCodeSVG value={qrCode} size={200} ref={svgRef} />
            </div>

            {/* Canvas for display (and PNG export) */}
            <QRCodeCanvas value={qrCode} size={200} />
            <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
              <button
                onClick={handleDownloadPng}
                className="min-w-[160px] h-[50px] px-6 bg-[#494eea] text-white text-base font-semibold rounded-lg shadow hover:bg-[#373ccf] transition-all duration-300"
              >
                ⬇️ Download PNG
              </button>
              <button
                onClick={handleDownloadSvg}
                className="min-w-[160px] h-[50px] px-6 bg-[#494eea] text-white text-base font-semibold rounded-lg shadow hover:bg-[#373ccf] transition-all duration-300"
              >
                ⬇️ Download SVG
              </button>
            </div>
          </div>

        )}
      </div>
    </div>
  );
}

export default App;
