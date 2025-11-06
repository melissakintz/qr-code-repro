import { ToastAndroid } from "react-native";
import { CameraView } from "expo-camera";
import { useCallback, useEffect } from "react";

export const useScanner = () => {
  const handleQRCode = useCallback((data: string) => {
    ToastAndroid.show(data, ToastAndroid.SHORT);
  }, []);

  async function openScanner() {
    if (CameraView.isModernBarcodeScannerAvailable) {
      try {
        await CameraView.launchScanner({
          barcodeTypes: ["qr"],
        });
      } catch (e) {
        const error = e as Error;
        console.error(error);
        if (error?.message?.toLowerCase().includes("cancelled")) {
          return;
        }
        ToastAndroid.show(error?.message, ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show("Scanner not available on device", ToastAndroid.SHORT);
    }
  }

  useEffect(() => {
    if (CameraView.isModernBarcodeScannerAvailable) {
      const listener = CameraView.onModernBarcodeScanned((event) => {
        handleQRCode(event?.data);
      });
      return () => {
        listener.remove();
      };
    }
  }, []);

  return { openScanner };
};
