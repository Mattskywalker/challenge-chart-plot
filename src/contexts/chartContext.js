import { createContext, useState } from "react";
import { toast } from "react-toastify"; // This lib shows toast messages;

export const ChartContext = createContext({});

function ChartProvider({ children }) {
    //The ContextApi was chose because many components need to access these states.

    const [events, setEvent] = useState(""); //This state refers to the TextArea value.
    const [chartData, setChartData] = useState({
        columns: ["periode"],
        rows: [],
    }); //chartData is the state that contains the data format that the chartComponent will consume, "rows" and "columns".

    /**
     *
     * @param {chartData} chartData - Object that contains the chartData.
     * @description This function verifies the chartData, if they're incomplete,
     * it clears the data and shows an error toast on the user interface, and if they're complete,
     * it sets the data on the state.
     */
    function handleChartData(chartData) {
        const { columns, rows } = chartData;

        try {
            if (rows.length === 0) {
                //Rows verification. The rows can't be empty, because the data can't be incomplete.
                throw new Error(
                    "No start events were found, please verify the inputs and try again."
                );
            }

            rows.forEach((line) => {
                //The lines can't be null or empty, they must have the same size as the columns; if they haven't, the data would be incomplete, and it would cause an error on the chat plotting.
                if (columns.length !== line.length) {
                    throw new Error(
                        "Incomplete data, please verify the inputs and try again."
                    );
                }
            });

            setChartData({ ...chartData });
        } catch (error) {
            columns.splice(0, columns.length);
            rows.splice(0, rows.length);

            setChartData({ columns, rows });
            toast.error(error.message);
        }
    }
    /**
     * @param {String} columnName - Column name.
     * @param {Array} columns - Array of columns.
     * @description - This function adds a new data column and returns its position.
     */
    function addColumns(columnName, columns) {
        if (!columns.includes(columnName)) {
            columns.push(columnName);
            return columns.indexOf(columnName);
        } else {
            return columns.indexOf(columnName);
        }
    }

    /**
     * @param {number} columnIndex - The column index, where the data must be placed.
     * @param {any} value - Value to be placed.
     * @param {Array} rows - Array that contains all lines of chartData.
     * @description - This function places correctly each data in its column. When necessary, the function creates a new data row.
     */
    function addRows(columnIndex, value, rows) {
        if (rows.length === 0) {
            //Verifies if it's necessary to create a new Row. If it is, insert the data value in the correct column of the new row.

            const line = [];
            line[columnIndex] = value;
            rows.push(line);
        } else {
            for (var i = 0; i <= rows.length; i++) {
                var nextLine = i + 1;

                if (rows[i][columnIndex] && !rows[nextLine]) {
                    //If both row and column already have got a value, this condition creates a new Line and places the data in the correct column of this new line;
                    const line = [];
                    line[columnIndex] = value;
                    rows.push(line);
                    break;
                } else if (!rows[i][columnIndex]) {
                    //If those row and column haven't got any value, this condition places the data in the empty gap;

                    rows[i][columnIndex] = value;
                    break;
                }
            }
        }
    }

    /**
     * @description - This function organizes the events and data so they can be consumed by the chartComponent.
     */
    function buildData(listEventObject) {
        let eventPlot = [];
        const data = { columns: [], rows: [] };
        let stopped = true;
        let startEvent = null;

        try {
            for (let i = 0; i < listEventObject.length; i++) {
                /*Separates the events correctly, 
                a "for" loop was chose due to the possibility of stopping the loop using break when the stop event is found. */

                switch (listEventObject[i].type) {
                    case "start":
                        data.columns = [];
                        data.rows = [];
                        eventPlot = [listEventObject[i]];
                        startEvent = listEventObject[i];
                        stopped = false;
                        break;

                    case "data":
                        if (!stopped) {
                            eventPlot.push(listEventObject[i]);
                            const groupValues = [];
                            startEvent.group.forEach((groupName) => {
                                /*This forEach gets all the group values, it gives the system the ability to support more than one group name, instead of a static property name.*/
                                groupValues.push(listEventObject[i][groupName]);
                            });

                            startEvent.select.forEach((select) => {
                                /*This forEach gets all the group values, it gives the system the ability to support more than one group name, instead of a static parameter.*/

                                const groupName = groupValues
                                    .toString()
                                    .replace(/,/g, " ");
                                const selectName = select.replace(/_/g, " ");
                                const columnName =
                                    `${groupName} ${selectName}`.replace(
                                        /\w\S*/g,
                                        (w) =>
                                            w.replace(/^\w/, (c) =>
                                                c.toUpperCase()
                                            )
                                    );
                                /*The expressions above format the text that will name the column, this action can be
                                done using CSS, but the text in React-google-chart cant be customized */

                                const columnIndex = addColumns(
                                    columnName,
                                    data.columns
                                );

                                addRows(
                                    columnIndex,
                                    listEventObject[i][select],
                                    data.rows
                                );
                            });
                        }
                        break;
                    case "span":
                        if (!stopped) {
                            eventPlot.push(listEventObject[i]);
                            const { begin, end } = listEventObject[i];
                            const column = addColumns("Periode", data.columns);

                            addRows(column, begin, data.rows);
                            addRows(column, end, data.rows);
                        }
                        break;
                    case "stop":
                        eventPlot.push(listEventObject[i]);
                        stopped = true;
                        break;
                    default:
                        break;
                }
            }
        } catch (error) {
        } finally {
            handleChartData(data);
        }
    }

    /**
     * @description - this function gets the input value on the TextArea and transforms it into an object;
     */
    function runChart() {
        try {
            const dataString = `[${events
                .map((data) => data.trim())
                .filter(Boolean)
                .toString()}]`;
            /*this line splits the strings of textArea and remove false values,
             this way we can prevent the user from getting error messages because of empty spaces, empty lines or tabs*/
            const objects = JSON.parse(dataString);

            if (objects.length === 0) {
                throw new Error("The data input cannot be null or empty");
            } //verifies if exists some object, if not, trhow Error.

            buildData(objects);
        } catch (error) {
            //two types of error are possible, syntax error or null or empty value;
            error.name === "Error"
                ? toast.error(
                      `${error.message}, please insert a valid JSON format and try again.`
                  )
                : toast.error(
                      "Data input error, please insert a valid JSON format and try again."
                  );
        }
    }

    return (
        <ChartContext.Provider
            value={{ saveEvent: setEvent, events, runChart, chartData }}
        >
            {children}
        </ChartContext.Provider>
    );
}

export default ChartProvider; //default export
