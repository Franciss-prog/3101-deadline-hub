import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Camera, ImageUp } from "lucide-react";

const CAMERA_ELEMENT_ID = "qr-camera-reader";
const FILE_ELEMENT_ID = "qr-file-reader";

const QrScanner = ({ onScan, onError }) => {
  const [cameraOpen, setCameraOpen] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!cameraOpen) return;

    const scanner = new Html5Qrcode(CAMERA_ELEMENT_ID);
    let stopped = false;

    const startPromise = scanner.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: 220 },
      (decodedText) => {
        if (stopped) return;
        stopped = true;
        onScan(decodedText);
        setCameraOpen(false);
      },
      () => {}
    );

    startPromise.catch(() => {
      if (!stopped) {
        onError?.("Could not access camera.");
        setCameraOpen(false);
      }
    });

    return () => {
      stopped = true;
      // start() may not have resolved yet (e.g. React StrictMode's dev
      // mount -> cleanup -> mount double-invoke). Calling stop() before
      // start() settles throws and can leave the camera stream running.
      // Wait for start() to settle first, then stop only if it actually
      // began scanning.
      startPromise
        .then(() => {
          if (scanner.isScanning) return scanner.stop();
        })
        .catch(() => {})
        .then(() => scanner.clear())
        .catch(() => {});
    };
  }, [cameraOpen, onScan, onError]);

  const onFileChosen = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    const scanner = new Html5Qrcode(FILE_ELEMENT_ID);
    try {
      const decodedText = await scanner.scanFile(file, false);
      onScan(decodedText);
    } catch {
      onError?.("Could not read QR code from image.");
    } finally {
      // clear() is synchronous (void), not a Promise, despite stop() being async
      scanner.clear();
    }
  };

  return (
    <div className="QrScanner">
      {!cameraOpen ? (
        <div className="QrScannerPrompt">
          <div className="QrScannerIcon">
            <Camera size={20} strokeWidth={1.6} />
          </div>
          <p className="QrScannerHint">
            Scan the QR code from your student portal
          </p>
        </div>
      ) : (
        <div className="QrCameraFrame">
          <div id={CAMERA_ELEMENT_ID} className="QrCameraView" />
        </div>
      )}

      <div className="QrScannerActions">
        <button
          type="button"
          className="QrScanButton"
          onClick={() => setCameraOpen((open) => !open)}
        >
          <Camera size={16} strokeWidth={1.8} />
          {cameraOpen ? "Cancel" : "Use Camera"}
        </button>
        <button
          type="button"
          className="QrScanButton QrScanButtonSecondary"
          onClick={() => fileInputRef.current?.click()}
        >
          <ImageUp size={16} strokeWidth={1.8} />
          Upload Image
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={onFileChosen}
          hidden
        />
      </div>

      <div id={FILE_ELEMENT_ID} style={{ display: "none" }} />
    </div>
  );
};

export default QrScanner;
