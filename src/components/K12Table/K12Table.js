import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import styles from "./K12Table.module.css";
import { TextField } from "@material-ui/core";
import { interpolation } from "../../utils";

const tableValues = [
  { fser: 700, k12: 5.9 },
  { fser: 500, k12: 6.6 },
  { fser: 400, k12: 7.2 },
  { fser: 300, k12: 7.8 },
  { fser: 200, k12: 9 },
  { fser: 150, k12: 9.9 },
  { fser: 100, k12: 11.3 },
  { fser: 50, k12: 14.3 },
  { fser: 35, k12: 16.1 },
  { fser: 25, k12: 18 },
  { fser: 20, k12: 19.3 },
  { fser: 15, k12: 21.3 },
  { fser: 10, k12: 24.4 },
  { fser: 5, k12: 30.7 },
  { fser: 3, k12: 36.4 },
];

function K12Table() {
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onFserChange = (givenFser) => {
    if (!givenFser) {
      setErrorMessage("No input");
      setResult(0);
      setInputText(givenFser);
      return;
    }
    if (givenFser > 700 || givenFser < 3) {
      setErrorMessage("Number out of bounds");
      setResult(0);
      setInputText(givenFser);
      return;
    }
    setErrorMessage("");

    const point1Index = tableValues.findIndex(
      (value) => value.fser < givenFser || value.fser == givenFser
    );
    console.log(point1Index);
    if (point1Index === 0) {
      setResult(tableValues[0].k12);
      setInputText(givenFser);
      return;
    }

    const fser1 = tableValues[point1Index].fser;
    const k1 = tableValues[point1Index].k12;
    const fser2 = tableValues[point1Index - 1].fser;
    const k2 = tableValues[point1Index - 1].k12;

    setResult(interpolation(fser1, k1, fser2, k2, givenFser));
    setInputText(givenFser);
  };

  return (
    <div className={styles.container}>
      <h2>K12 by Fser[kN/m^2]</h2>
      <TableContainer className={styles.tableContainer}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Fser:</TableCell>
              {tableValues.map((value) => (
                <TableCell key={value.fser}>{value.fser}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>K12:</TableCell>
              {tableValues.map((value) => (
                <TableCell key={value.k12}>{value.k12}</TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div className={styles.textFieldContainer}>
        <TextField
          className={styles.textField}
          label="Fser"
          variant="outlined"
          type="number"
          value={inputText}
          onChange={(e) => {
            onFserChange(e.target.value);
          }}
        />
        <p className={styles.errorMessage}>{errorMessage}</p>
      </div>
      <p className={styles.result}>{`K12 = ${errorMessage ? "x" : result}`}</p>
    </div>
  );
}
export default K12Table;
