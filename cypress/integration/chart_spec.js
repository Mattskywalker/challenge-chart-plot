const dataSet = `{"type": "start", "timestamp": 1519780251293, "select": ["min_response_time", "max_response_time"], "group": ["os", "browser"]}
{"type": "span", "timestamp": 1519780251293, "begin": 1, "end": 2}
{"type": "data", "timestamp": 1519780251000, "os": "linux", "browser": "chrome", "min_response_time": 1, "max_response_time": 2}
{"type": "data", "timestamp": 1519780251000, "os": "linux", "browser": "chrome", "min_response_time": 2, "max_response_time": 3}
{"type": "data", "timestamp": 1519780251000, "os": "windows", "browser": "Opera", "min_response_time": 1.5, "max_response_time": 2.1}
{"type": "data", "timestamp": 1519780251000, "os": "windows", "browser": "Opera", "min_response_time": 2.2, "max_response_time":5.8}
{"type": "span", "timestamp": 1519780251293, "begin": 3, "end": 4}
{"type": "data", "timestamp": 1519780251000, "os": "linux", "browser": "chrome", "min_response_time": 6, "max_response_time": 2}
{"type": "data", "timestamp": 1519780251000, "os": "linux", "browser": "chrome", "min_response_time": 3, "max_response_time": 1}
{"type": "data", "timestamp": 1519780251000, "os": "windows", "browser": "Opera", "min_response_time": 4, "max_response_time": 7}
{"type": "data", "timestamp": 1519780251000, "os": "windows", "browser": "Opera", "min_response_time": 1, "max_response_time":1.2}
{"type": "stop", "timestamp": 1519780251293}`;

const dataSetWithBug = `{"type": "sta<>rt", "timestamp": 1519780251293, "select": ["min_response_time", "max_response_time"], "group": ["os", "browser"]}
{"type": "span", "timestamp": 1519780251293, "begin": 1, "end": 2}
{"type": "data", "timestamp": 1519780251000, "os": "linux", "browser": "chrome", "min_response_time": 1, "max_response_time": 2}
{"type": "data", "timestamp": 1519780251000, "os": "linux", "browser": "chrome", "min_response_time": 2, "max_response_time": 3}
{"type": "data", "timestamp": 1519780251000, "os": "windows", "browser": "Opera", "min_response_time": 1.5, "max_response_time": 2.1}
{"type": "data", "timestamp": 1519780251000, "os": "windows", "browser": "Opera", "min_response_time": 2.2, "max_response_time":5.8}
{"type": "stop", "timestamp": 1519780251293}`;

describe("Testing chart", () => {
    it("should render correctly", () => {
        cy.visit("http://localhost:3000");

        cy.get(".CodeMirror .cm-content").type(dataSet, {
            parseSpecialCharSequences: false,
        });

        cy.get(".GenerateButton").click();
        cy.wait(5000);
        cy.get(".ChartComponent .Chart svg").should("be.visible").snapshot();
    });

    it("should not render if dataset is incorrect", () => {
        cy.visit("http://localhost:3000");

        cy.get(".CodeMirror .cm-content").type(dataSetWithBug, {
            parseSpecialCharSequences: false,
        });

        cy.get(".GenerateButton").click();
        cy.wait(5000);
        cy.get(".ChartComponent .Chart svg").should("not.visible");
    });
});
