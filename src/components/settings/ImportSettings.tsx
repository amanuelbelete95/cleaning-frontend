import {
  Box,
  Button,
  FormControl,
  HStack,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import BasicTable from "../table/BasicTable";
import * as XLSX from "xlsx";
import { ColumnDef } from "@tanstack/react-table";

function ImportSettings() {
  const [excelFile, setExcelFile] = useState<null | ArrayBuffer>(null);
  const [excelData, setExcelData] = useState<any[]>([]);
  const [columns, setColumns] = useState<ColumnDef<any>[]>([]);
  const [typeError, setTypeError] = useState<string | null>(null);

  const toast = useToast();

  console.log("excel", excelFile)
  

  // --- Dynamic column generator with editable cells ---
 const generateColumns = (data: any[], setData: React.Dispatch<React.SetStateAction<any[]>>) => {
  if (!data.length) return [];
  return Object.keys(data[0]).map((key) => ({
    header: key,
    accessorKey: key,
    cell: ({ getValue, row, column }) => {
      const initialValue = getValue();
      const [value, setValue] = useState(initialValue ?? "");


      const onBlur = () => {
        setData((old) => {
          const newData = [...old];
          newData[row.index] = { ...newData[row.index], [column.id]: value };
          return newData;
        });
      };
      return (
        <Input
          size="sm"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
        />
      );
    },
  }));
};



  console.log("exceldata", excelData)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    const fileTypesAllowed = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
      "application/vnd.ms-excel",
    ];

    if (selectedFile) {
      if (fileTypesAllowed.includes(selectedFile.type)) {
        setTypeError(null);
        const reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFile(e.target?.result as ArrayBuffer);
        };
      } else {
        setTypeError("Please select only Excel or CSV file types.");
        setExcelFile(null);
      }
    }
  };

  const handleFileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (excelFile) {
      const workBook = XLSX.read(excelFile, { type: "buffer" });
      const workSheetName = workBook.SheetNames[0];
      const workSheet = workBook.Sheets[workSheetName];
      const data = XLSX.utils.sheet_to_json(workSheet);
      setExcelData(data);
      setColumns(generateColumns(data, setExcelData));
    }
  };

  const validateData = (data: any[]) => {
    const errors: string[] = [];
    data.forEach((row, i) => {
      for (const key in row) {
        if (!row[key] || row[key].toString().trim() === "") {
          errors.push(`Row ${i + 1} - "${key}" is empty`);
        }
      }
    });
    return errors;
  };

  const handleSend = () => {
    const errors = validateData(excelData);
    if (errors.length) {
      toast({
        title: "Validation Error",
        description: errors.join("\n"),
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // ✅ Send to backend
    console.log("Sending to backend:", excelData);
    toast({
      title: "Data Sent",
      description: "Excel data successfully sent to the backend.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box>
      <Form onSubmit={handleFileSubmit}>
        <FormControl mb="40px">
          <Input
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
          />
        </FormControl>
        {typeError && <Box color="red.500">{typeError}</Box>}
        <Button
          variant="outline"
          size="lg"
          p="10px"
          fontSize="20px"
          borderRadius="md"
          type="submit"
        >
          Upload
        </Button>
      </Form>

      {excelData.length > 0 ? (
        <Box mt={6}>
          <BasicTable data={excelData} columns={columns} />
          <Button
            mt={4}
            colorScheme="green"
            onClick={handleSend}
          >
            Send to Backend
          </Button>
        </Box>
      ) : (
        <Box>No file uploaded yet</Box>
      )}
    </Box>
  );
}

export default ImportSettings;
