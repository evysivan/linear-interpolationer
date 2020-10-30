import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import styles from "./K11Table.module.css";
import { TextField } from "@material-ui/core";
import { tableInterpolation, interpolation } from "../../utils";
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
    if (value < 1 || value > 10) {
      setErrorMessage1("h/tf out of bounds");
    } else {
      setErrorMessage1("");
    }
    setHtf(value);
  };
  const onBfbwChange = (value) => {
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

    if (htfTopIndex === 0) {
      setResult(1);
      return;
    }
    if (bfbwBottomIndex === 0) {
      setResult(
        interpolation(
          htfValues[htfTopIndex - 1],
          k11Values[htfTopIndex - 1][0],
          htfValues[htfTopIndex],
          k11Values[htfTopIndex][0],
          htf
        )
      );
      return;
    }

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
            <TableRow
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              <TableCell style={{ border: 0, margin: 10 }}></TableCell>
              <TableCell
                style={{
                  position: "absolute",
                  left: "calc(50% - 200px)",
                  padding: "15px 200px",
                }}
              >
                bf/bw
              </TableCell>
            </TableRow>
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
            className={styles.calcButton}
            disabled={
              !htf || !bfbw || errorMessage1 !== "" || errorMessage2 !== ""
            }
            variant="contained"
            onClick={onSubmit}
          >
            Calculate
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
