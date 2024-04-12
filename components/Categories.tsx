"use client";

import { categoryFilters } from "@/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Categories = () => {
    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();

    const category = searchParams.get("category");

    const handleTags = (category: string) => {
        router.push(`${pathName}?category=${category}`);
    };

    return (
        <div className="flexBetween w-full gap-5 flex-wrap">
            <ul className="flex gap-2 overflow-auto">
                {categoryFilters.map((cat) => (
                    <button
                        key={cat}
                        type="button"
                        onClick={() => handleTags(cat)}
                        className={`${
                            category === cat ? "bg-light-white-300 font-medium" : "font-normal"
                        } px-4 py-3 rounded-lg capitalize whitespace-nowrap`}
                    >
                        {cat}
                    </button>
                ))}
            </ul>
        </div>
    );
};

export default Categories;
