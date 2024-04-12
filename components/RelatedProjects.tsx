import { ProjectInterface, UserProfile } from "@/common_types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type RelatedProjectsProps = {
    userProfile: {
        _id: string;
        name: string;
        email: string;
        avatarUrl: string;
    };
    projectId: string;
};

const RelatedProjects = ({ userProfile, projectId }: RelatedProjectsProps) => {
    const [filtered, setFiltered] = useState<ProjectInterface[]>([]);

    const { _id: userId } = userProfile;

    useEffect(() => {
        const related = async () => {
            const response = await fetch(`/api/project/individual/${userId}/${projectId}`);

            if (response.status == 404) {
                // console.log('no data')
                <p>Failed to fetch project information</p>;
            } else {
                const data = await response.json();
                setFiltered(data);
            }
        };

        related();
    }, [userId]);

    return (
        <section className="flex flex-col mt-32 w-full">
            <div className="flexBetween">
                <p className="text-base font-bold">More by {userProfile.name}</p>
                <Link href={`/profile/${userId}`} className="text-primary-purple text-base">
                    View All
                </Link>
            </div>
            <div className="related_projects-grid">
                {filtered.length >= 1 &&
                    filtered.map((project: ProjectInterface) => (
                        <div className="flexCenter related_project-card drop-shadow-card">
                            <Link href={`/project/${project._id}`} className="flexCenter group relative w-full h-full">
                                <Image
                                    src={project.img}
                                    width={414}
                                    height={314}
                                    alt="project image"
                                    className="w-full h-full object-cover rounded-2xl"
                                />
                            </Link>
                        </div>
                    ))}
            </div>
        </section>
    );
};

export default RelatedProjects;
