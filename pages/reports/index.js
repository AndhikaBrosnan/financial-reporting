import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import { isMobileHandler } from "../../helpers/responsive";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./styles.module.css";

import IncomeComponent from "./components/income";
import { useState } from "react";
import OutcomeComponent from "./components/outcome";

const FinancialReport = () => {
  const isMobile = isMobileHandler();
  const [isIncome, setIsIncome] = useState(true);

  return (
    <Box
      m={isMobile ? "0" : "0 25em"}
      p={!isMobile && "2em 1em"}
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
          background="teal"
          borderRadius="28px"
          cursor="pointer"
          onClick={() => setIsIncome(true)}
        >
          <Text color={"white"}>Uang Masuk</Text>
        </Box>
        <Box
          mr={"3em"}
          p="1em"
          background="blue"
          borderRadius="28px"
          cursor="pointer"
          onClick={() => setIsIncome(false)}
        >
          <Text color={"white"}>Uang Keluar</Text>
        </Box>
      </Flex>

      <Divider border="2px solid #808080" mt={"2em"} />

      {isIncome ? <IncomeComponent /> : <OutcomeComponent />}
    </Box>
  );
};

export default FinancialReport;
