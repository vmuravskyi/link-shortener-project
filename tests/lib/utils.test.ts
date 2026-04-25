import { describe, expect, it } from "vitest";

import { cn } from "@/lib/utils";

describe("cn", () => {
    it("merges conditional classes", () => {
        expect(cn("inline-flex", true && "items-center", false && "hidden")).toBe(
            "inline-flex items-center",
        );
    });

    it("deduplicates conflicting tailwind classes by keeping the last one", () => {
        expect(cn("px-2", "px-4", "text-sm", "text-lg")).toBe("px-4 text-lg");
    });
});