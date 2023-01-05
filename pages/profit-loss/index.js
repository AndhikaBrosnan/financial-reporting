import { Box, Button, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import HeaderLayout from "../../common/components/headers";
import { isMiniMobileHandler } from "../../common/helpers/responsive";
import styles from "./styles.module.css";

const ProfitLoss = () => {
  const isMobile = isMiniMobileHandler();

  const [transaksi, setTransaksi] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalOutcome, setTotalOutcome] = useState(0);

  const [totalProfit, setTotalProfit] = useState(0);

  const formatter = new Intl.NumberFormat("id-ID");

  useEffect(() => {
    const transactions = JSON.parse(localStorage.getItem("transactions"));
    if (!isEmpty(transactions)) setTransaksi(transactions);
  }, []);

  useEffect(() => {
    if (!isEmpty(transaksi)) {
      const sumIncome = transaksi.reduce(function (sum, value) {
        if (value.type === "income") {
          return sum + parseInt(value.nominal);
        }
        return sum;
      }, 0);
      setTotalIncome(sumIncome);

      const sumOutcome = transaksi.reduce(function (sum, value) {
        if (value.type === "outcome") {
          return sum + parseInt(value.nominal);
        }
        return sum;
      }, 0);
      setTotalOutcome(sumOutcome);
    }
  }, [transaksi]);

  useEffect(() => {
    setTotalProfit(totalIncome - totalOutcome);
  }, [totalIncome, totalOutcome]);

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
          <Box ml={3}>
            <Text color="green">Rp. {formatter.format(totalIncome)}</Text>
          </Box>
        </Flex>

        <Flex m="1em 2em" justifyContent="center" alignItems="center">
          <Box>
            <Text color="red">Pengeluaran</Text>
          </Box>
          <Box ml={3}>
            <Text color="red">Rp. {formatter.format(totalOutcome)}</Text>
          </Box>
        </Flex>

        <Divider borderWidth="2px" />
        <Flex m="1em 2em" justifyContent="center" alignItems="center">
          <Box>
            <Text color={totalProfit > 0 ? "green" : "red"}>Keuntungan</Text>
          </Box>
          <Box ml={3}>
            <Text color={totalProfit > 0 ? "green" : "red"}>
              {totalProfit < 0 && "-"} Rp.{" "}
              {formatter.format(Math.abs(totalProfit))}
            </Text>
          </Box>
        </Flex>
        <Divider borderWidth="2px" />
      </Box>
    </Box>
  );
};

export default ProfitLoss;
