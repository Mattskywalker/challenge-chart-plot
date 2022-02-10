import { render, screen } from "@testing-library/react"
import Footer from "."
import ChartProvider from "../../contexts/chartContext"

describe("Footer", () => {
    test("Button generate chart", () => {
        
        render(
            <ChartProvider>
                <Footer></Footer>
            </ChartProvider>
        )

        const button = screen.getByText('GENERATE CHART');
        expect(button).toBeInTheDocument();
    })
})