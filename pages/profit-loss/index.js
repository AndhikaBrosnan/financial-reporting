import { Box, Button, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import HeaderLayout from "../../common/components/headers";
import {
  isMiniMobileHandler,
  isMobileHandler,
} from "../../common/helpers/responsive";
import { supabase } from "../../common/helpers/supabaseClient";
import styles from "./styles.module.css";

const ProfitLoss = () => {
  const isMobile = isMiniMobileHandler();
  const router = useRouter();

  const [transaksi, setTransaksi] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalOutcome, setTotalOutcome] = useState(0);

  const [totalProfit, setTotalProfit] = useState(0);

  const formatter = new Intl.NumberFormat("id-ID");

  const fetchDatabase = async () => {
    let { data } = await supabase
      .from("records")
      .select(`type, name, jenisTransaksi, transactionDate, nominal`);

    localStorage.setItem("transactions", JSON.stringify(data));
    if (!isEmpty(data)) setTransaksi(data);
  };

  useEffect(() => {
    fetchDatabase();
  }, []);

  useEffect(() => {
    if (!isEmpty(transaksi)) {
      // sum income
      const sumIncome = transaksi.reduce(function (sum, value) {
        if (value.type === "income") {
          return sum + parseInt(value.nominal);
        }
        return sum;
      }, 0);
      setTotalIncome(sumIncome);

      // sum outcome
      const sumOutcome = transaksi.reduce(function (sum, value) {
        if (value.type === "outcome") {
          return sum + parseInt(value.nominal);
        }
        return sum;
      }, 0);
      setTotalOutcome(sumOutcome);

      // search biggest sum
    }
  }, [transaksi]);

  useEffect(() => {
    setTotalProfit(totalIncome - totalOutcome);
  }, [totalIncome, totalOutcome]);

  if (router.pathname === "/") {
    return (
      <>
        <Flex justifyContent="center" alignItems="center" pt="1em">
          <Heading className={styles["title-laporan-keuangan"]} as="h2">
            Laporan Keuangan
          </Heading>
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
      </>
    );
  }

  return (
    <ParentComponentProfitLoss>
      <Flex justifyContent="center" alignItems="center" pt="1em">
        <Heading className={styles["title-laporan-keuangan"]} as="h2">
          Laporan Keuangan
        </Heading>
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

        <Flex
          m="2em 0"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Box>
            <Text fontWeight="bold">Persentase Pengeluaran</Text>
          </Box>
          <Box ml={3} mt={2}>
            <Text>
              {"Beban Gaji"} merupakan beban pengeluaran terbesar dengan
              persentase {"5%"}
            </Text>
          </Box>
        </Flex>
      </Box>
    </ParentComponentProfitLoss>
  );
};

const ParentComponentProfitLoss = (props) => {
  const isMobile = isMobileHandler();
  return (
    <Box p={!isMobile && "0 30em"}>
      <HeaderLayout />
      {props.children}
      <Flex
        m="2em 0"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Box>
          <Text fontWeight="bold">Persentase Pengeluaran</Text>
        </Box>
        <Box ml={3} mt={2}>
          <Text>
            {"Beban Gaji"} merupakan beban pengeluaran terbesar dengan
            persentase {"5%"}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default ProfitLoss;
