import { Box, Button, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import HeaderLayout from "../../common/components/headers";
import { isMiniMobileHandler } from "../../common/helpers/responsive";
import styles from "./styles.module.css";

const ProfitLoss = () => {
  const isMobile = isMiniMobileHandler();

  const [transaksi, setTransaksi] = useState([]);

  useEffect(() => {
    const transactions = JSON.parse(localStorage.getItem("transactions"));
    if (!isEmpty(transactions)) setTransaksi(transactions);
  }, []);

  console.log("transaksi ProfitLoss: ", transaksi);

  return (
    <Box p={!isMobile && "0 30em"}>
      <HeaderLayout />

      <Flex justifyContent="center" alignItems="center" pt="1em">
        <Heading as="h2">Laporan Keuangan</Heading>
      </Flex>
      <Box m="1em 0">
        <Flex
          justifyContent="flex-start"
          alignItems="center"
          pt="1em"
          overflowX="auto"
        >
          <Button className={styles["button-filter"]} colorScheme="teal">
            Semua
          </Button>
          <Button
            className={styles["button-filter"]}
            colorScheme="teal"
            variant="outline"
          >
            Bulan ini
          </Button>
          <Button
            className={styles["button-filter"]}
            colorScheme="teal"
            variant="outline"
          >
            Bulan lalu
          </Button>
          <Button
            className={styles["button-filter"]}
            colorScheme="teal"
            variant="outline"
          >
            Pilih Tanggal
          </Button>
        </Flex>
      </Box>
      <Box mt="1em" m="2em">
        <Flex justifyContent="center" alignItems="center">
          <Box>
            <Text color="green">Pemasukan</Text>
          </Box>
          <Box>
            <Text color="green">Rp. 0</Text>
          </Box>
        </Flex>

        <Flex m="1em 2em" justifyContent="center" alignItems="center">
          <Box>
            <Text color="red">Pengeluaran</Text>
          </Box>
          <Box>
            <Text color="red">Rp. 0</Text>
          </Box>
        </Flex>

        <Divider borderWidth="2px" />
        <Flex m="1em 2em" justifyContent="center" alignItems="center">
          <Box>
            <Text color="green">Keuntungan</Text>
          </Box>
          <Box>
            <Text color="green">Rp. 0</Text>
          </Box>
        </Flex>
        <Divider borderWidth="2px" />
      </Box>
    </Box>
  );
};

export default ProfitLoss;
