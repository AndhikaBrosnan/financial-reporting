import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";
import "moment/locale/id";

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
