import { FiltersComponent } from "./filters.component";
import { fireEvent, render, screen } from "@testing-library/angular";

describe("FiltersComponent", () => {
  it("renders platform and version radio buttons", async () => {
    await setup();
    const platformButton = screen.queryByText(/platform/i);
    const versionButton = screen.queryByText(/version/i);
    expect(platformButton).toBeTruthy();
    expect(versionButton).toBeTruthy();
  });

  it("marks default button as provided", async () => {
    await setup();
    const versionInput = screen.getByTestId("version-input");
    //@ts-ignore
    expect(versionInput?.checked).toBeTruthy();
  });

  it("emits propertyChanged on change", async () => {
    const { changedEmit } = await setup();
    const platformInput = screen.getByTestId("platform-input");
    fireEvent.click(platformInput!);
    expect(changedEmit).toHaveBeenCalledWith("platform");
  });
});

const setup = async () => {
  const changedEmit = jest.fn();
  //@ts-ignore
  const fixture = await render(FiltersComponent, {
    componentProperties: {
      selectedGroupingProperty: "version",
      propertyChanged: { emit: changedEmit },
    },
  });

  return { fixture, changedEmit };
};
