import { Inter } from "@next/font/google";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { isMiniMobileHandler } from "../common/helpers/responsive";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import HeaderLayout from "../common/components/headers";
import styles from "./styles.module.css";
import {
  IconFinancial,
  IconPemasukan,
  IconPengeluaran,
} from "../common/components/icons";

export default function Home() {
  const isMobile = isMiniMobileHandler();
  const router = useRouter();

  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsRendered(true);
    }
  }, []);

  if (isRendered) {
    return (
      <>
        <HeaderLayout />
        <Box
          mt="2em"
          border="1px solid #ffffff"
          borderRadius="4px"
          background="white"
          p={isMobile ? "1" : "2em 35em"}
          h="100vh"
        >
          <Flex justifyContent="space-around" alignItems="center">
            <Flex
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              cursor="pointer"
              onClick={() => router.push("/reports?section=income")}
            >
              <Flex
                justifyContent="center"
                alignItems="center"
                boxSize="120px"
                borderRadius="full"
                background="#14A281"
              >
                <IconPemasukan />
              </Flex>
              <Text>Transaksi</Text>
            </Flex>
            <Flex
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              cursor="pointer"
            >
              <Flex
                justifyContent="center"
                alignItems="center"
                boxSize="120px"
                borderRadius="full"
                background="#14A281"
              >
                <IconPengeluaran />
              </Flex>
              <Text>-</Text>
            </Flex>
            <Flex
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
            >
              <Flex
                justifyContent="center"
                alignItems="center"
                boxSize="120px"
                borderRadius="full"
                background="#14A281"
              >
                <IconFinancial />
              </Flex>
              <Text>Pemodalan</Text>
            </Flex>
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
            background="#324C8D"
            borderRadius="28px"
            cursor="pointer"
            onClick={() => router.push("/financial-records")}
          >
            <Flex justifyContent="flex-start" alignItems="center" p="2em">
              <Text flex="1" className={styles["laporan-keuangan"]}>
                Jurnal Umum
              </Text>
              <ChevronRightIcon
                color="white"
                size="28px"
                w={"28px"}
                h={"28px"}
              />
            </Flex>
          </Box>

          <Box
            mt="1em"
            background="orange.700"
            borderRadius="28px"
            cursor="pointer"
            onClick={() => router.push("/profit-loss")}
          >
            <Flex justifyContent="flex-start" alignItems="center" p="2em">
              <Text flex="1" className={styles["laporan-keuangan"]}>
                Laporan Keuangan
              </Text>
              <ChevronRightIcon
                color="white"
                size="28px"
                w={"28px"}
                h={"28px"}
              />
            </Flex>
          </Box>
        </Box>
      </>
    );
  }
  return <></>;
}
