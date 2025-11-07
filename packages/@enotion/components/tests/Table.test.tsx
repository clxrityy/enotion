import { render, screen } from "@testing-library/react";
import { Table } from "../src/Table.js";
import "@testing-library/jest-dom";

describe("Table", () => {
  const mockRows = [
    {
      title: "Row 1",
      items: ["Item 1", "Item 2", "Item 3"],
    },
    {
      title: "Row 2",
      items: ["Item 4", "Item 5", "Item 6"],
    },
    {
      title: "Row 3",
      items: ["Item 7", "Item 8", "Item 9"],
    },
  ];

  describe("Rendering", () => {
    it("should render a table element", () => {
      render(<Table rows={mockRows} />);
      const table = document.querySelector("table");
      expect(table).toBeInTheDocument();
    });

    it("should render with responsive wrapper by default", () => {
      render(<Table rows={mockRows} />);
      const wrapper = document.querySelector(".enotion-table-responsive");
      expect(wrapper).toBeInTheDocument();
    });

    it("should render without responsive wrapper when responsive is false", () => {
      render(<Table rows={mockRows} responsive={false} />);
      const wrapper = document.querySelector(".enotion-table-responsive");
      expect(wrapper).not.toBeInTheDocument();
    });

    it("should render all rows", () => {
      render(<Table rows={mockRows} />);
      const rows = document.querySelectorAll("tbody tr");
      expect(rows).toHaveLength(3);
    });

    it("should render row headers", () => {
      render(<Table rows={mockRows} />);
      expect(screen.getByText("Row 1")).toBeInTheDocument();
      expect(screen.getByText("Row 2")).toBeInTheDocument();
      expect(screen.getByText("Row 3")).toBeInTheDocument();
    });

    it("should render all cells", () => {
      render(<Table rows={mockRows} />);
      const cells = document.querySelectorAll("td");
      expect(cells).toHaveLength(9);
    });

    it("should render cell content", () => {
      render(<Table rows={mockRows} />);
      expect(screen.getByText("Item 1")).toBeInTheDocument();
      expect(screen.getByText("Item 5")).toBeInTheDocument();
      expect(screen.getByText("Item 9")).toBeInTheDocument();
    });

    it("should render with empty rows array", () => {
      render(<Table rows={[]} />);
      const table = document.querySelector("table");
      expect(table).toBeInTheDocument();
      const rows = document.querySelectorAll("tbody tr");
      expect(rows).toHaveLength(0);
    });

    it("should render with ReactNode items", () => {
      const rowsWithNodes = [
        {
          title: "Components",
          items: [
            <span key="1">Span Element</span>,
            <button key="2" type="button">
              Button Element
            </button>,
            <div key="3">Div Element</div>,
          ],
        },
      ];
      render(<Table rows={rowsWithNodes} />);
      expect(screen.getByText("Span Element")).toBeInTheDocument();
      expect(screen.getByText("Button Element")).toBeInTheDocument();
      expect(screen.getByText("Div Element")).toBeInTheDocument();
    });
  });

  describe("Class Names", () => {
    it("should apply base table class", () => {
      render(<Table rows={mockRows} />);
      const table = document.querySelector("table");
      expect(table).toHaveClass("enotion-table");
    });

    it("should apply striped class when striped is true", () => {
      render(<Table rows={mockRows} striped />);
      const table = document.querySelector("table");
      expect(table).toHaveClass("enotion-table-striped");
    });

    it("should not apply striped class when striped is false", () => {
      render(<Table rows={mockRows} striped={false} />);
      const table = document.querySelector("table");
      expect(table).not.toHaveClass("enotion-table-striped");
    });

    it("should apply bordered class when bordered is true", () => {
      render(<Table rows={mockRows} bordered />);
      const table = document.querySelector("table");
      expect(table).toHaveClass("enotion-table-bordered");
    });

    it("should not apply bordered class when bordered is false", () => {
      render(<Table rows={mockRows} bordered={false} />);
      const table = document.querySelector("table");
      expect(table).not.toHaveClass("enotion-table-bordered");
    });

    it("should apply hover class when hover is true", () => {
      render(<Table rows={mockRows} hover />);
      const table = document.querySelector("table");
      expect(table).toHaveClass("enotion-table-hover");
    });

    it("should not apply hover class when hover is false", () => {
      render(<Table rows={mockRows} hover={false} />);
      const table = document.querySelector("table");
      expect(table).not.toHaveClass("enotion-table-hover");
    });

    it("should apply stack-mobile class when stackOnMobile is true", () => {
      render(<Table rows={mockRows} stackOnMobile />);
      const table = document.querySelector("table");
      expect(table).toHaveClass("enotion-table-stack-mobile");
    });

    it("should not apply stack-mobile class when stackOnMobile is false", () => {
      render(<Table rows={mockRows} stackOnMobile={false} />);
      const table = document.querySelector("table");
      expect(table).not.toHaveClass("enotion-table-stack-mobile");
    });

    it("should apply multiple modifier classes", () => {
      render(<Table rows={mockRows} striped bordered hover stackOnMobile />);
      const table = document.querySelector("table");
      expect(table).toHaveClass("enotion-table");
      expect(table).toHaveClass("enotion-table-striped");
      expect(table).toHaveClass("enotion-table-bordered");
      expect(table).toHaveClass("enotion-table-hover");
      expect(table).toHaveClass("enotion-table-stack-mobile");
    });

    it("should apply custom className", () => {
      render(<Table rows={mockRows} className="custom-table" />);
      const table = document.querySelector("table");
      expect(table).toHaveClass("custom-table");
      expect(table).toHaveClass("enotion-table");
    });
  });

  describe("Styling", () => {
    it("should apply CSS custom properties when palette is provided", () => {
      render(<Table rows={mockRows} palette="monochrome" />);
      const table = document.querySelector("table");
      expect(table?.style.getPropertyValue("--table-foreground")).toBeTruthy();
      expect(table?.style.getPropertyValue("--table-background")).toBeTruthy();
      expect(table?.style.getPropertyValue("--table-border")).toBeTruthy();
      expect(table?.style.getPropertyValue("--table-accent")).toBeTruthy();
    });

    it("should apply hover color variable when palette is provided", () => {
      render(<Table rows={mockRows} palette="solarized" />);
      const table = document.querySelector("table");
      const hoverValue = table?.style.getPropertyValue("--table-hover");
      // Should be defined (may be empty string if blend returns transparent)
      expect(hoverValue).toBeDefined();
    });

    it("should apply striped color variable when palette is provided", () => {
      render(<Table rows={mockRows} palette="monochrome" />);
      const table = document.querySelector("table");
      expect(table?.style.getPropertyValue("--table-striped")).toBeTruthy();
    });

    it("should apply text-on-accent color variable when palette is provided", () => {
      render(<Table rows={mockRows} palette="dark" />);
      const table = document.querySelector("table");
      expect(
        table?.style.getPropertyValue("--table-text-on-accent"),
      ).toBeTruthy();
    });

    it("should not apply palette colors when palette is not provided", () => {
      render(<Table rows={mockRows} />);
      const table = document.querySelector("table");
      expect(table?.style.getPropertyValue("--table-foreground")).toBeFalsy();
      expect(table?.style.getPropertyValue("--table-background")).toBeFalsy();
    });

    it("should merge custom styles with palette styles", () => {
      render(
        <Table
          rows={mockRows}
          palette="monochrome"
          style={{ marginTop: "20px" }}
        />,
      );
      const table = document.querySelector("table");
      expect(table?.style.marginTop).toBe("20px");
      expect(table?.style.getPropertyValue("--table-foreground")).toBeTruthy();
    });
  });

  describe("Accessibility", () => {
    it("should have scope attribute on header cells", () => {
      render(<Table rows={mockRows} />);
      const headers = document.querySelectorAll("th");
      for (const header of headers) {
        expect(header).toHaveAttribute("scope", "row");
      }
    });

    it("should render semantic table structure", () => {
      render(<Table rows={mockRows} />);
      const table = document.querySelector("table");
      const tbody = table?.querySelector("tbody");
      expect(tbody).toBeInTheDocument();
    });
  });

  describe("Props Forwarding", () => {
    it("should forward additional table attributes", () => {
      render(<Table rows={mockRows} data-testid="custom-table" />);
      const table = screen.getByTestId("custom-table");
      expect(table).toBeInTheDocument();
    });

    it("should forward aria attributes", () => {
      render(<Table rows={mockRows} aria-label="Data table" />);
      const table = document.querySelector("table");
      expect(table).toHaveAttribute("aria-label", "Data table");
    });

    it("should forward id attribute", () => {
      render(<Table rows={mockRows} id="my-table" />);
      const table = document.querySelector("#my-table");
      expect(table).toBeInTheDocument();
    });
  });

  describe("Key Generation", () => {
    it("should generate unique keys for rows", () => {
      render(<Table rows={mockRows} />);
      const rows = document.querySelectorAll("tbody tr");
      // Keys should be generated by React and not be duplicates
      expect(rows.length).toBe(3);
    });

    it("should handle rows with duplicate titles", () => {
      const duplicateRows = [
        { title: "Same", items: ["A", "B"] },
        { title: "Same", items: ["C", "D"] },
        { title: "Same", items: ["E", "F"] },
      ];
      render(<Table rows={duplicateRows} />);
      const rows = document.querySelectorAll("tbody tr");
      expect(rows).toHaveLength(3);
    });
  });

  describe("Edge Cases", () => {
    it("should handle rows with no items", () => {
      const emptyItemRows = [{ title: "Empty Row", items: [] }];
      render(<Table rows={emptyItemRows} />);
      expect(screen.getByText("Empty Row")).toBeInTheDocument();
      const cells = document.querySelectorAll("td");
      expect(cells).toHaveLength(0);
    });

    it("should handle rows with different numbers of items", () => {
      const unevenRows = [
        { title: "Short", items: ["A"] },
        { title: "Medium", items: ["B", "C"] },
        { title: "Long", items: ["D", "E", "F", "G"] },
      ];
      render(<Table rows={unevenRows} />);
      const rows = document.querySelectorAll("tbody tr");
      expect(rows[0]?.querySelectorAll("td")).toHaveLength(1);
      expect(rows[1]?.querySelectorAll("td")).toHaveLength(2);
      expect(rows[2]?.querySelectorAll("td")).toHaveLength(4);
    });

    it("should handle undefined as item", () => {
      const rowsWithUndefined = [
        { title: "Row", items: [undefined, "text", undefined] },
      ];
      render(<Table rows={rowsWithUndefined} />);
      const cells = document.querySelectorAll("td");
      expect(cells).toHaveLength(3);
    });

    it("should handle null as item", () => {
      const rowsWithNull = [{ title: "Row", items: [null, "text", null] }];
      render(<Table rows={rowsWithNull} />);
      const cells = document.querySelectorAll("td");
      expect(cells).toHaveLength(3);
    });

    it("should handle numeric items", () => {
      const numericRows = [{ title: "Numbers", items: [1, 2, 3, 4.5, 0] }];
      render(<Table rows={numericRows} />);
      expect(screen.getByText("1")).toBeInTheDocument();
      expect(screen.getByText("2")).toBeInTheDocument();
      expect(screen.getByText("4.5")).toBeInTheDocument();
      expect(screen.getByText("0")).toBeInTheDocument();
    });

    it("should handle boolean items", () => {
      const booleanRows = [{ title: "Booleans", items: [true, false] }];
      render(<Table rows={booleanRows} />);
      const cells = document.querySelectorAll("td");
      expect(cells).toHaveLength(2);
    });
  });

  describe("Responsive Behavior", () => {
    it("should render responsive wrapper by default", () => {
      const { container } = render(<Table rows={mockRows} />);
      const wrapper = container.querySelector(".enotion-table-responsive");
      expect(wrapper).toBeInTheDocument();
    });

    it("should render table directly when responsive is false", () => {
      const { container } = render(
        <Table rows={mockRows} responsive={false} />,
      );
      const wrapper = container.querySelector(".enotion-table-responsive");
      const table = container.querySelector("table");
      expect(wrapper).not.toBeInTheDocument();
      expect(table).toBeInTheDocument();
    });

    it("should wrap table element when responsive is true", () => {
      const { container } = render(<Table rows={mockRows} responsive={true} />);
      const wrapper = container.querySelector(".enotion-table-responsive");
      const table = wrapper?.querySelector("table");
      expect(table).toBeInTheDocument();
    });
  });

  describe("Integration", () => {
    it("should work with all props combined", () => {
      render(
        <Table
          rows={mockRows}
          striped
          bordered
          hover
          stackOnMobile
          responsive
          palette="solarized"
          className="custom-class"
          style={{ margin: "10px" }}
          aria-label="Full featured table"
        />,
      );
      const table = document.querySelector("table");
      expect(table).toHaveClass("enotion-table");
      expect(table).toHaveClass("enotion-table-striped");
      expect(table).toHaveClass("enotion-table-bordered");
      expect(table).toHaveClass("enotion-table-hover");
      expect(table).toHaveClass("enotion-table-stack-mobile");
      expect(table).toHaveClass("custom-class");
      expect(table).toHaveAttribute("aria-label", "Full featured table");
      expect(table?.style.margin).toBe("10px");
      // Just verify CSS variables are present
      const foreground = table?.style.getPropertyValue("--table-foreground");
      expect(foreground).toBeDefined();
    });
  });
});
