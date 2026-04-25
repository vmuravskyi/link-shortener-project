import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import DashboardPage from "@/app/dashboard/page";

describe("DashboardPage", () => {
    it("renders the dashboard heading", async () => {
        render(await DashboardPage());

        expect(
            screen.getByRole("heading", { name: "Dashboard" }),
        ).toBeInTheDocument();
    });
});