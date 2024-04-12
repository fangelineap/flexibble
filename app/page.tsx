"use client";

import { ProjectInterface } from "@/common_types";
import Categories from "@/components/Categories";
import ProjectCard from "@/components/ProjectCard";
import { connectToDB } from "@/lib/database";
import { Project, User } from "@/lib/models";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {
    searchParams: {
        category?: string;
    };
};

const Home = ({ searchParams: { category: cat } }: Props) => {
    const { data: session } = useSession();

    const router = useRouter();

    const [projects, setProjects] = useState([]);
    const [allProjects, setAllProjects] = useState([]);
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        const fetchProjects = async () => {
            const respAll = await fetch(`/api/project`);
            const dataAll = await respAll.json();

            setAllProjects(dataAll);

            if (!cat) {
                const response = await fetch(`/api/project/limit/${limit}`);
                const data = await response.json();

                setProjects(data);
            } else {
                const response = await fetch(`/api/project/limit/${limit}/${cat}`);
                const data = await response.json();

                setProjects(data);
            }
        };

        fetchProjects();
    }, [cat, limit]);

    return (
        <section className="flex-start flex-col paddings mb-16">
            <Categories />

            {projects.length != 0 ? (
                <section className="projects-grid">
                    {projects.map((p: ProjectInterface) => (
                        <ProjectCard
                            key={p?._id}
                            _id={p?._id}
                            image={p?.img}
                            title={p?.title}
                            name={p?.author?.name}
                            avatarUrl={p?.author?.avatarUrl}
                            userId={p?.author?._id}
                            session={session}
                        />
                    ))}
                </section>
            ) : (
                <section className="flexStart flex-col paddings">
                    <p className="no-result-text text-center">No projects found, go create some projects first :D</p>
                </section>
            )}

            {(projects.length != 0 && (limit + 10) <= allProjects.length && limit != allProjects.length) && (
                <button
                    type="button"
                    className="flexCenter gap-3 px-4 py-3 my-10 text-white bg-primary-purple rounded-xl text-sm font-medium max-md:w-full"
                    onClick={(e) => {
                        e.preventDefault();
                        setLimit(limit + 10);
                        router.refresh();
                    }}
                >
                    Load more
                </button>
            )}
        </section>
    );
};

export default Home;
