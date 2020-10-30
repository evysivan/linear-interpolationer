import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import styles from "./K11Table.module.css";
import { TextField } from "@material-ui/core";
import { tableInterpolation } from "../../utils";
import Button from "@material-ui/core/Button";

const htfValues = [1, 2, 5, 7, 10];
const bfbwValues = [10, 7, 5, 3, 1];

const k11Values = [
  [1, 1, 1, 1, 1],
  [0.649, 0.691, 0.737, 0.815, 1],
  [0.613, 0.669, 0.722, 0.805, 1],
  [0.61, 0.662, 0.713, 0.793, 1],
  [0.6, 0.649, 0.698, 0.777, 1],
];

function K11Table() {
  const [htf, setHtf] = useState("");
  const [bfbw, setBfbw] = useState("");
  const [result, setResult] = useState("");
  const [errorMessage1, setErrorMessage1] = useState("");
  const [errorMessage2, setErrorMessage2] = useState("");

  const onHtfChange = (value) => {
    console.log(value);
    if (value < 1 || value > 10) {
      setErrorMessage1("h/tf out of bounds");
    } else {
      setErrorMessage1("");
    }
    setHtf(value);
  };
  const onBfbwChange = (value) => {
    console.log(value);
    if (value < 1 || value > 10) {
      setErrorMessage2("bf/bw out of bounds");
    } else {
      setErrorMessage2("");
    }
    setBfbw(value);
  };

  const onSubmit = () => {
    const htfTopIndex = htfValues.findIndex(
      (value) => value > htf || value == htf
    );
    const bfbwBottomIndex = bfbwValues.findIndex(
      (value) => value < bfbw || value == bfbw
    );

    const result = tableInterpolation(
      bfbwValues[bfbwBottomIndex - 1],
      bfbwValues[bfbwBottomIndex],
      htfValues[htfTopIndex - 1],
      htfValues[htfTopIndex],
      k11Values[htfTopIndex - 1][bfbwBottomIndex - 1],
      k11Values[htfTopIndex - 1][bfbwBottomIndex],
      k11Values[htfTopIndex][bfbwBottomIndex - 1],
      k11Values[htfTopIndex][bfbwBottomIndex],
      bfbw,
      htf
    );

    setResult(result);
  };

  return (
    <div className={styles.container}>
      <h2>K11 for T/r by h/tf and bf/bw[kN/m^2]</h2>
      <TableContainer className={styles.tableContainer}>
        <Table aria-label="simple table">
          <TableHead className={styles.tableBfBwHead}>
            <span style={{ position: "absolute", left: "50%" }}>bf/bw</span>
          </TableHead>
          <TableHead>
            <TableRow>
              <TableCell>h/tf</TableCell>
              {bfbwValues.map((value) => (
                <TableCell key={value}>{value}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {htfValues.map((value, index) => (
              <TableRow key={value}>
                <TableCell key={value + "cell"}>{value}</TableCell>
                {k11Values[index].map((value, index) => (
                  <TableCell key={value + "row" + index}>{value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className={styles.inputsContainer}>
        <div className={styles.textFieldContainer}>
          <TextField
            className={styles.textField}
            label="h/tf"
            variant="outlined"
            type="number"
            value={htf}
            onChange={(e) => {
              onHtfChange(e.target.value);
            }}
          />
          <TextField
            className={styles.textField}
            label="bf/bw"
            variant="outlined"
            type="number"
            value={bfbw}
            onChange={(e) => {
              onBfbwChange(e.target.value);
            }}
          />
          <Button
            disabled={
              !htf || !bfbw || errorMessage1 !== "" || errorMessage2 !== ""
            }
            variant="contained"
            onClick={onSubmit}
          >
            Send
          </Button>
        </div>
        <p className={styles.errorMessage}>
          {errorMessage1 + " " + errorMessage2}
        </p>
      </div>

      <p className={styles.result}>{`K11 = ${
        errorMessage1 || errorMessage2 ? "x" : result
      }`}</p>
    </div>
  );
}

export default K11Table;
