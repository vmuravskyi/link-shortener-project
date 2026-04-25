import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

describe("UI primitives", () => {
    it("renders a button with variant classes", () => {
        render(
            <Button variant="outline" size="lg">
                Open
            </Button>,
        );

        const button = screen.getByRole("button", { name: "Open" });

        expect(button).toHaveAttribute("data-slot", "button");
        expect(button.className).toContain("border-border");
        expect(button.className).toContain("h-9");
    });

    it("provides stable class generation for the destructive icon button variant", () => {
        expect(buttonVariants({ variant: "destructive", size: "icon-sm" })).toContain(
            "bg-destructive/10",
        );
        expect(buttonVariants({ variant: "destructive", size: "icon-sm" })).toContain(
            "size-7",
        );
    });

    it("renders badge content with the expected slot", () => {
        render(<Badge variant="secondary">Beta</Badge>);

        const badge = screen.getByText("Beta");

        expect(badge).toHaveAttribute("data-slot", "badge");
        expect(badge.className).toContain("bg-secondary");
    });

    it("renders card sections and size metadata", () => {
        render(
            <Card size="sm">
                <CardHeader>
                    <CardTitle>Card title</CardTitle>
                </CardHeader>
                <CardContent>Card body</CardContent>
            </Card>,
        );

        expect(screen.getByText("Card title")).toHaveAttribute("data-slot", "card-title");
        expect(screen.getByText("Card body")).toHaveAttribute("data-slot", "card-content");
        expect(screen.getByText("Card title").closest("[data-slot='card']")).toHaveAttribute(
            "data-size",
            "sm",
        );
    });
});