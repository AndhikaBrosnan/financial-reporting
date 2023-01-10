import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import {
  isMiniMobileHandler,
  isMobileHandler,
} from "../../common/helpers/responsive";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./styles.module.css";

import IncomeComponent from "./components/income";
import { useEffect, useState } from "react";
import OutcomeComponent from "./components/outcome";
import HeaderLayout from "../../common/components/headers";
import { useRouter } from "next/router";
import { supabase } from "../../common/helpers/supabaseClient";

const FinancialReport = () => {
  const isMobile = isMiniMobileHandler();
  const router = useRouter();
  const { section } = router.query;

  const [isIncome, setIsIncome] = useState(true);

  useEffect(() => {
    if (section === "outcome") {
      setIsIncome(false);
    }
  }, [section]);

  const fetchDatabase = async () => {
    let { data } = await supabase
      .from("records")
      .select(`type, name, jenisTransaksi, transactionDate, nominal`);

    localStorage.setItem("transactions", JSON.stringify(data));
  };

  useEffect(() => {
    fetchDatabase();
  }, []);

  return (
    <>
      <HeaderLayout />
      <Box
        p={isMobile ? "0" : "2em 35em"}
        h="100vh"
        border="1px solid #ffffff"
        borderRadius="4px"
        background="white"
      >
        <Flex
          justifyContent={isMobile ? "space-between" : "space-around"}
          alignItems={"center"}
          w="100%"
          mt={"1em"}
        >
          <Box
            ml={"3em"}
            p="1em"
            background={isIncome ? "#0D3D31" : "#14A281"}
            borderRadius="63px"
            cursor="pointer"
            onClick={() => setIsIncome(true)}
          >
            <Text color="white">Uang Masuk</Text>
          </Box>
          <Box
            mr={"3em"}
            p="1em"
            background={isIncome ? "#14A281" : "#0D3D31"}
            borderRadius="63px"
            cursor="pointer"
            onClick={() => setIsIncome(false)}
          >
            <Text color="white">Uang Keluar</Text>
          </Box>
        </Flex>

        <Divider border="2px solid #808080" mt={"2em"} />

        {isIncome ? <IncomeComponent /> : <OutcomeComponent />}
      </Box>
    </>
  );
  return <></>;
};

export default FinancialReport;
