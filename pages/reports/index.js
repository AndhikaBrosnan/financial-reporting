import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import { isMobileHandler } from "../../common/helpers/responsive";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./styles.module.css";

import IncomeComponent from "./components/income";
import { useEffect, useState } from "react";
import OutcomeComponent from "./components/outcome";
import HeaderLayout from "../../common/components/headers";

const FinancialReport = () => {
  const isMobile = isMobileHandler();
  const [isIncome, setIsIncome] = useState(true);
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
          p={isMobile ? "0" : "2em 35em"}
          h={isMobile ? "100%" : "100vh"}
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
              background={isIncome ? "#22543D" : "#9AE6B4"}
              borderRadius="18px"
              cursor="pointer"
              onClick={() => setIsIncome(true)}
            >
              <Text color={isIncome ? "white" : "#4a4a4a"}>Uang Masuk</Text>
            </Box>
            <Box
              mr={"3em"}
              p="1em"
              background={isIncome ? "#FBD38D" : "#DD6B20"}
              borderRadius="18px"
              cursor="pointer"
              onClick={() => setIsIncome(false)}
            >
              <Text color={isIncome ? "#4a4a4a" : "white"}>Uang Keluar</Text>
            </Box>
          </Flex>

          <Divider border="2px solid #808080" mt={"2em"} />

          {isIncome ? <IncomeComponent /> : <OutcomeComponent />}
        </Box>
      </>
    );
  }
  return <></>;
};

export default FinancialReport;
