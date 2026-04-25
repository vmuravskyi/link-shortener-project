import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { authMock, redirectMock } = vi.hoisted(() => ({
    authMock: vi.fn(),
    redirectMock: vi.fn(),
}));

vi.mock("@clerk/nextjs/server", () => ({
    auth: authMock,
}));

vi.mock("next/navigation", () => ({
    redirect: redirectMock,
}));

vi.mock("@clerk/nextjs", () => ({
    SignUpButton: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="sign-up-button">{children}</div>
    ),
}));

import HomePage from "@/app/page";

describe("HomePage", () => {
    beforeEach(() => {
        authMock.mockReset();
        redirectMock.mockReset();
    });

    it("redirects signed-in users to the dashboard", async () => {
        authMock.mockResolvedValue({ userId: "user_123" });

        await HomePage();

        expect(redirectMock).toHaveBeenCalledWith("/dashboard");
    });

    it("renders the landing page for signed-out users", async () => {
        authMock.mockResolvedValue({ userId: null });

        render(await HomePage());

        expect(
            screen.getByRole("heading", { name: /short links, big\s*results/i }),
        ).toBeInTheDocument();
        expect(
            screen.getByText(/everything you need to manage your links/i),
        ).toBeInTheDocument();
        expect(screen.getAllByTestId("sign-up-button")).toHaveLength(2);
        expect(screen.getByText("Shorten Any URL")).toBeInTheDocument();
        expect(screen.getByText("Click Analytics")).toBeInTheDocument();
        expect(screen.getByText("Secure & Reliable")).toBeInTheDocument();
        expect(screen.getByText("Lightning Fast")).toBeInTheDocument();
        expect(screen.getByText("Custom Slugs")).toBeInTheDocument();
        expect(screen.getByText("Easy to Use")).toBeInTheDocument();
        expect(redirectMock).not.toHaveBeenCalled();
    });
});