import { useEffect } from "react";
import * as WebBrowser from "expo-web-browser"

//for browser on android
export const useWarmUpBrowser = () => {
    useEffect(() => {
        void WebBrowser.warmUpAsync();
        return () => {
            void WebBrowser.coolDownAsync();
        };
    }, [])
}