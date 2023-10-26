import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { LocaleGuideDashboard } from "../components/LocaleGuideDashboard";

const languageSpeakers = {
    Italiano: ["Emanuele", "Sara", "Paola"],
    Français: ["Emanuele", "Paola", "Amandio"],
    Deutsch: ["Oliver"],
};

describe("LocalGuides", () => {
    test("hosts that speak a language are correctly rendered when the language checkbox is clicked", async () => {
        render(<LocaleGuideDashboard />);

        // wait for all guides to load
        await waitFor(() => {
            expect(screen.getByText("Local guide language")).toBeInTheDocument();
        });

        Object.keys(languageSpeakers).forEach((language) => {
            fireEvent.click(screen.getByTestId(`language-filter-${language}`));

            // assert that associated list of names are on the screen
            languageSpeakers[language as keyof typeof languageSpeakers].forEach((localGuide) => {
                expect(screen.getByText(localGuide)).toBeInTheDocument();
            });

            // cleanup since this is a single filter test
            fireEvent.click(screen.getByTestId(`language-filter-${language}`));
        });
    });

    test("hosts that cannot speak a language are not rendered when the language checkbox is clicked", async () => {
        render(<LocaleGuideDashboard />);

        // wait for all guides to load
        await waitFor(() => {
            expect(screen.getByText("Local guide language")).toBeInTheDocument();
        });

        const language = "Italiano";
        const nonMatchingGuide = "Oliver";

        fireEvent.click(screen.getByTestId(`language-filter-${language}`));
        expect(screen.queryAllByTestId(nonMatchingGuide)).toEqual([]);
    });

    test("hosts that speak all selected languages are correctly rendered when multiple checkboxes are clicked", async () => {
        render(<LocaleGuideDashboard />);

        // wait for all guides to load
        await waitFor(() => {
            expect(screen.getByText("Local guide language")).toBeInTheDocument();
        });

        const languages = ["Italiano", "Français"];
        const expectedMatchingGuides = ["Emanuele", "Paola"];
        languages.forEach((language) => {
            fireEvent.click(screen.getByTestId(`language-filter-${language}`));
        });

        // assert that associated list of names are on the screen
        expectedMatchingGuides.forEach((localGuide) => {
            expect(screen.getByText(localGuide)).toBeInTheDocument();
        });
    });

    test("hosts that do not speak all selected languages are not rendered when multiple checkboxes are clicked", async () => {
        render(<LocaleGuideDashboard />);

        // wait for all guides to load
        await waitFor(() => {
            expect(screen.getByText("Local guide language")).toBeInTheDocument();
        });

        const languages = ["Italiano", "Français"];
        const nonMatchingGuides = ["Sara", "Amandio", "Oliver"];

        languages.forEach((language) => {
            fireEvent.click(screen.getByTestId(`language-filter-${language}`));
        });

        // assert that associated list of names are on the screen
        nonMatchingGuides.forEach((localGuide) => {
            expect(screen.queryAllByTestId(localGuide)).toEqual([]);
        });
    });
});
