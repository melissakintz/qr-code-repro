import { ToastAndroid } from "react-native";
import { CameraView } from "expo-camera";
import { useCallback, useEffect, useRef } from "react";

export const useScanner = () => {
  const isRunning = useRef<boolean>(false);

  const handleQRCode = useCallback(async (data: string) => {
    if (!data || isRunning.current) {
      ToastAndroid.show(
        !data
          ? "Aucune donnée détéctée"
          : "Vérification des données en cours, veuillez patienter",
        ToastAndroid.SHORT,
      );
      return;
    }
    ToastAndroid.show(data, ToastAndroid.SHORT);
  }, []);

  async function openScanner() {
    if (CameraView.isModernBarcodeScannerAvailable) {
      try {
        await CameraView.launchScanner();
        return;
      } catch (e) {
        const error = e as Error;

        if (error?.message?.toLowerCase().includes("cancelled")) {
          return;
        }
        ToastAndroid.show(error?.message, ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show("Scanner not avaible on device", ToastAndroid.SHORT);
    }
  }

  useEffect(() => {
    // CameraView.getSupportedFeatures()?.then(console.log()).catch(console.error);

    if (CameraView.isModernBarcodeScannerAvailable) {
      const listener = CameraView.onModernBarcodeScanned((event) => {
        handleQRCode(event?.data);
      });
      return () => {
        listener.remove();
        CameraView.dismissScanner();
      };
    }
  }, []);

  return { openScanner };
};
