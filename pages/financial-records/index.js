import { Box, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import HeaderLayout from "../../common/components/headers";
import moment from "moment";
import {
  isMiniMobileHandler,
  isMobileHandler,
} from "../../common/helpers/responsive";
import { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import styles from "./styles.module.css";

const EmptyState = () => {
  return (
    <Box h={"70vh"}>
      <Flex
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        h={"70vh"}
      >
        <InfoOutlineIcon m={1} boxSize={"24px"} color="yellow.400" />
        <Heading as="h4" size="sm" color={"black"}>
          Belum ada transaksi.
        </Heading>
      </Flex>
    </Box>
  );
};

// const dummyTransaction = [
//   {
//     type: "income",
//     nominal: "3500000",
//     name: "Komisi Penjualan PT. ABC",
//     transactionDate: "1670832732000",
//   },
//   {
//     type: "outcome",
//     nominal: "1000000",
//     name: "Belanja Bahan Baku",
//     transactionDate: "1671764752000",
//   },
//   {
//     type: "outcome",
//     nominal: "1500000",
//     name: "Perbaikan Alat",
//     transactionDate: "1671884475046",
//   },
// ];

// localStorage.setItem("transactions", JSON.stringify(dummyTransaction));

const FinancialRecords = () => {
  moment.locale("id");
  const isMobile = isMiniMobileHandler();
  const formatter = new Intl.NumberFormat("id-ID");

  const [transaksi, setTransaksi] = useState([]);

  useEffect(() => {
    const transactions = JSON.parse(localStorage.getItem("transactions"));
    if (!isEmpty(transactions)) setTransaksi(transactions);
  }, []);

  return (
    <Box p={!isMobile && "0 30em"}>
      <HeaderLayout />
      <Flex justifyContent="center" alignItems="center" pt="1em">
        <Heading as="h3">Mutasi</Heading>
      </Flex>

      <Box mt={"1em"}>
        {isEmpty(transaksi) ? (
          <EmptyState />
        ) : (
          <>
            {transaksi.map((item, i) => {
              return (
                <Box key={i}>
                  <Flex
                    justifyContent="space-between"
                    alignItems="flex-start"
                    p={1}
                  >
                    <Box>
                      <Text className={styles["transaction-title"]}>
                        {item.name}
                      </Text>
                      <Text>
                        {moment
                          .unix(item.transactionDate / 1000)
                          .format("LL, LTS")}
                      </Text>
                    </Box>
                    <Box>
                      <Text
                        color={item.type === "income" ? "green.500" : "red"}
                        className={styles["mutation-amount-text"]}
                      >
                        {item.type === "income" ? "+" : "-"} Rp
                        {formatter.format(item.nominal)}
                      </Text>
                    </Box>
                  </Flex>
                  <Divider borderWidth="0.5px" borderColor="gray" />
                </Box>
              );
            })}
          </>
        )}
      </Box>
    </Box>
  );
};

export default FinancialRecords;
