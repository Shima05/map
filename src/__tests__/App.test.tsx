import { fireEvent, render, screen } from "@testing-library/react";
import ElevationForm from "../components/ElevationForm";
import { describe, expect, it, test, vi } from "vitest";

const defaultProps = {
  latitude: "10",
  longitude: "20",
  elevation: "100 meters",
  loading: false,
  error: null,
  onLatitudeChange: vi.fn(),
  onLongitudeChange: vi.fn(),
  onGetElevation: vi.fn(),
  setMapLatitude: vi.fn(),
  setMapLongitude: vi.fn(),
};

const renderComponent = (props = {}) => {
  return render(<ElevationForm {...defaultProps} {...props} />);
};

test("renders ElevationForm without crashing", () => {
  renderComponent({
    latitude: "35.6892",
    longitude: "51.3890",
    elevation: "Elevation: 1200 meters",
  });
  expect(screen.getByText(/Elevation: 1200 meters/)).toBeInTheDocument();
});

describe("ElevationForm Component", () => {
  it("renders ElevationForm with inputs and button", () => {
    renderComponent();
    expect(
      screen.getByPlaceholderText("Latitude (e.g., 35.6892)")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Longitude (e.g., 51.3890)")
    ).toBeInTheDocument();
    expect(screen.getByText("Get Elevation")).toBeInTheDocument();
  });

  it("calls onLatitudeChange when latitude input is changed", () => {
    renderComponent();
    const latitudeInput = screen.getByPlaceholderText(
      "Latitude (e.g., 35.6892)"
    );
    fireEvent.change(latitudeInput, { target: { value: "35.6892" } });
    expect(defaultProps.onLatitudeChange).toHaveBeenCalled();
  });

  it("calls onLongitudeChange when longitude input is changed", () => {
    renderComponent();
    const longitudeInput = screen.getByPlaceholderText(
      "Longitude (e.g., 51.3890)"
    );
    fireEvent.change(longitudeInput, { target: { value: "51.3890" } });
    expect(defaultProps.onLongitudeChange).toHaveBeenCalled();
  });

  it("calls onGetElevation when button is clicked", () => {
    renderComponent();
    fireEvent.click(screen.getByRole("button", { name: /Get Elevation/i }));
    expect(defaultProps.onGetElevation).toHaveBeenCalled();
  });

  it("displays error message when error prop is provided", () => {
    renderComponent({ error: "Invalid coordinates" });
    expect(screen.getByText("Invalid coordinates")).toBeInTheDocument();
  });

  it("does not display error message when error is null", () => {
    renderComponent();
    expect(screen.queryByText(/Invalid coordinates/i)).not.toBeInTheDocument();
  });

  it("disables the button when loading is true", () => {
    renderComponent({ loading: true });
    const button = screen.getByRole("button", { name: /Loading.../i });
    expect(button).toBeDisabled();
  });

  it("updates map latitude and longitude on valid input change", () => {
    renderComponent();
    const latitudeInput = screen.getByPlaceholderText(
      "Latitude (e.g., 35.6892)"
    );
    const longitudeInput = screen.getByPlaceholderText(
      "Longitude (e.g., 51.3890)"
    );
    fireEvent.change(latitudeInput, { target: { value: "35.6892" } });
    fireEvent.change(longitudeInput, { target: { value: "51.3890" } });
    expect(defaultProps.setMapLatitude).toHaveBeenCalledWith(35.6892);
    expect(defaultProps.setMapLongitude).toHaveBeenCalledWith(51.389);
  });
});
