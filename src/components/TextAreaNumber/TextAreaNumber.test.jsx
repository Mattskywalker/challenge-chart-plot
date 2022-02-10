import { render, screen } from "@testing-library/react"
import TextAreaNumber from "."
import ChartProvider from "../../contexts/chartContext"


describe("TextAreaNumber", () => {
    test("TextAreaNumber render", () => {
    
        render(
            <ChartProvider>
                <TextAreaNumber></TextAreaNumber>
            </ChartProvider>
            )

    })

})