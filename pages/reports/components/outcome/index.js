import {
  Box,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import styles from "./styles.module.css";

const OutcomeComponent = () => {
  const [outcomeDate, setOutcomeDate] = useState(new Date());

  return (
    <>
      <Box m={"0 1em"}>
        <Heading as="h4" size="md">
          Keterangan Barang
        </Heading>
        <FormControl m={"1em 0"}>
          <FormLabel>Nama Transaksi</FormLabel>
          <Input type="text" />
        </FormControl>
        <FormControl m={"1em 0"}>
          <FormLabel>Jumlah Transaksi</FormLabel>
          <Input type="number" />
        </FormControl>
        <FormControl m={"1em 0"}>
          <FormLabel>Tanggal Transaksi</FormLabel>
        </FormControl>
        <DatePicker
          placeholderText="Date Picker"
          selected={outcomeDate}
          onChange={(date) => setOutcomeDate(date)}
        />
      </Box>
      <Divider border="1px solid #000000" mt={"2em"} />
      <Box m={"0 1em"}>
        <Heading as="h4" size="md">
          Total Pengeluaran
        </Heading>
      </Box>
    </>
  );
};

export default OutcomeComponent;
