import { Inter } from "@next/font/google";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { isMobileHandler } from "../helpers/responsive";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const isMobile = isMobileHandler();
  const router = useRouter();

  return (
    <Box
      border="1px solid #ffffff"
      borderRadius="4px"
      background="white"
      p={isMobile ? "1" : "2em 35em"}
      h={isMobile ? "100%" : "100vh"}
    >
      <Flex justifyContent="space-around" alignItems="center">
        <Image
          borderRadius="100%"
          boxSize="120px"
          src="https://via.placeholder.com/150"
          alt="Dan Abramov"
        />
        <Image
          borderRadius="100%"
          boxSize="120px"
          src="https://via.placeholder.com/150"
          alt="Dan Abramov"
        />
        <Image
          borderRadius="100%"
          boxSize="120px"
          src="https://via.placeholder.com/150"
          alt="Dan Abramov"
        />
      </Flex>
      <Flex justifyContent="space-around" alignItems="center" mt="2em">
        <Image
          borderRadius="100%"
          boxSize="120px"
          src="https://via.placeholder.com/150"
          alt="Dan Abramov"
        />
        <Image
          borderRadius="100%"
          boxSize="120px"
          src="https://via.placeholder.com/150"
          alt="Dan Abramov"
        />
        <Image
          borderRadius="100%"
          boxSize="120px"
          src="https://via.placeholder.com/150"
          alt="Dan Abramov"
        />
      </Flex>

      <Box
        mt="3em"
        background="teal"
        borderRadius="28px"
        cursor="pointer"
        onClick={() => router.push("/reports")}
      >
        <Flex justifyContent="flex-start" alignItems="center" p="2em">
          <Text flex="1" color="black">
            Laporan Keuangan
          </Text>
          <ChevronRightIcon color="black" />
        </Flex>
      </Box>
    </Box>
  );
}
