import ChartComponent from ".";
import "../../setupTests";
import renderer from "react-test-renderer";

const chartData = {
    columns: ["periode", "column1", "column2"],
    rows: [
        [1, 2, 3],
        [2, 4, 2],
    ],
};
const chartDataEmpty = {
    columns: ["periode"],
    rows: [],
};

describe("ChartComponent", () => {
    it("Render chart with valid data", () => {
        const tree = renderer
            .create(<ChartComponent chartData={chartData}></ChartComponent>)
            .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it("No Render chart with invalid or incomplete data", () => {
        const tree = renderer
            .create(
                <ChartComponent chartData={chartDataEmpty}></ChartComponent>
            )
            .toJSON();

        expect(tree).toMatchSnapshot();
    });
});
