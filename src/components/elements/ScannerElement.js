import React, { useRef, useEffect, useState } from 'react';
import QrScanner from 'qr-scanner';

export default function ScannerElement() {
    const videoRef = useRef(null);
    const [qrCodeResult, setQrCodeResult] = useState('');

    useEffect(() => {
        let qrScanner;

        if (videoRef.current) {
            qrScanner = new QrScanner(
                videoRef.current,
                result => setQrCodeResult(result),
                {
                    onDecodeError: error => console.error(error),
                    highlightScanRegion: true,
                    highlightCodeOutline: true
                }
            );

            // Start scanning when the component is mounted
            qrScanner.start();

            // Clean up and stop scanning when the component is unmounted
            return () => {
                qrScanner.stop();
                qrScanner.destroy();
            };
        }
    }, [videoRef]);

    const handleScanButtonClick = () => {
        // if (videoRef.current) {
        //     videoRef.current.classList.toggle('hidden');  // Show or hide the video element
        // }
    };

    return (
        <>
            <button onClick={handleScanButtonClick}>Scan QR Code</button>
            <video ref={videoRef}  style={{ width: '100%' }}></video>
            {qrCodeResult && <p>QR Code Result: {qrCodeResult}</p>}
        </>
    );
}
