import {
  Box,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { isMiniMobileHandler } from "../../../../common/helpers/responsive";
import styles from "./styles.module.css";
import { isEmpty } from "lodash";

const OutcomeComponent = () => {
  const formatter = new Intl.NumberFormat("id-ID");
  const toast = useToast();
  const isMobile = isMiniMobileHandler();

  const [namaTransaksi, setNamaTransaksi] = useState("");
  const [nominalTransaksi, setNominalTransaksi] = useState(null);
  const [tanggalTransaksi, setTanggalTransaksi] = useState(
    new Date().getTime()
  );

  const [transactions, setTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);

  useEffect(() => {
    const savedTransactions = localStorage.getItem("transactions");
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
  }, []);

  useEffect(() => {
    const calculateIncome = transactions.reduce((accumulator, currentValue) => {
      if (currentValue.type === "outcome")
        return accumulator + parseInt(currentValue.nominal);
      return accumulator;
    }, 0);

    setTotalIncome(calculateIncome);
  }, [transactions]);

  const onSubmitIncome = () => {
    const validate = validateForms();
    console.log("validate: ", validate);
    if (!validate) return;

    const transactionTemp = {
      type: "outcome",
      name: namaTransaksi,
      nominal: nominalTransaksi,
      transactionDate: tanggalTransaksi,
    };

    const tempTransactions = [...transactions, transactionTemp];
    setTransactions(tempTransactions);
    localStorage.setItem("transactions", JSON.stringify(tempTransactions));

    toast({
      title: "Transaksi berhasil ditambahkan.",
      description: "Pengeluaran telah dicatat.",
      status: "success",
      duration: 3000,
      position: isMobile ? "bottom" : "top",
      isClosable: true,
    });

    setNamaTransaksi("");
    setNominalTransaksi(0);
    setTanggalTransaksi(new Date().getTime());
  };

  const validateForms = () => {
    if (isEmpty(namaTransaksi)) {
      toast({
        title: "Gagal.",
        description: "Mohon mengisi nama transaksi.",
        status: "error",
        duration: 1500,
        position: isMobile ? "bottom" : "top",
        isClosable: true,
      });
      return false;
    }
    if (isEmpty(nominalTransaksi)) {
      toast({
        title: "Gagal.",
        description: "Mohon mengisi jumlah transaksi.",
        status: "error",
        duration: 1500,
        position: isMobile ? "bottom" : "top",
        isClosable: true,
      });
      return false;
    }

    return true;
  };

  return (
    <>
      <Box m={"0 1em"}>
        <Heading as="h4" size="md">
          Input Pengeluaran
        </Heading>
        <FormControl m={"1em 0"} isRequired>
          <FormLabel>Nama Transaksi</FormLabel>
          <Input
            type="text"
            placeholder="Masukan nama Transaksi"
            value={namaTransaksi}
            onChange={(e) => setNamaTransaksi(e.target.value)}
          />
        </FormControl>
        <FormControl m={"1em 0"} isRequired>
          <FormLabel>Jumlah Transaksi</FormLabel>
          <Input
            type="number"
            placeholder="Masukan Nominal Transaksi"
            value={nominalTransaksi}
            onChange={(e) => setNominalTransaksi(e.target.value)}
          />
        </FormControl>
        <FormControl m={"1em 0"}>
          <FormLabel>Tanggal Transaksi</FormLabel>
        </FormControl>
        <DatePicker
          className={styles["datepicker-input"]}
          placeholderText="Date Picker"
          selected={tanggalTransaksi}
          onChange={(date) => setTanggalTransaksi(date.getTime())}
        />
      </Box>
      <Divider border="1px solid #000000" mt={"2em"} />
      <Box m={"0 1em"}>
        <Heading as="h4" size="md">
          Total Pengeluaran saat ini:{" "}
        </Heading>
        <Heading as="h4" size="md" fontWeight="bolder">
          Rp{formatter.format(totalIncome)}
        </Heading>
      </Box>
      <Box mt={"2em"}>
        <Flex
          justifyContent="center"
          alignItems="center"
          onClick={onSubmitIncome}
        >
          <Button colorScheme="teal" size="lg" borderRadius="28px">
            Submit Pengeluaran
          </Button>
        </Flex>
      </Box>
    </>
  );
};

export default OutcomeComponent;
