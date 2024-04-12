'use client'

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import ProjectCard from "./ProjectCard";
import { ProjectInterface, UserProfile } from "@/common_types";
import { useRouter } from "next/navigation";

const ProfilePage = ({ projects, user } : { projects : ProjectInterface[], user : ProjectInterface }) => {
    return (
        <section className="flexCenter flex-col max-w-10xl w-full mx-auto paddings">
            <section className="flexBetween max-lg:flex-col gap-10 w-full">
                <div className="flex items-start flex-col w-full">
                    <Image src={user?.author.avatarUrl} width={100} height={100} className="rounded-full" alt="user image" />
                    <p className="text-4xl font-bold mt-10">{user?.author.name}</p>
                    <p className="md:text-5xl text-3xl font-extrabold md:mt-10 mt-5 max-w-lg">
                        I’m Software Engineer at JSM 👋
                    </p>

                    <div className="flex mt-8 gap-5 w-full flex-wrap">
                        <Button
                            type="button"
                            title="Follow"
                            leftIcon="/plus-round.svg"
                            bgColor="bg-light-white-400 !w-max"
                            textColor="text-black-100"
                        />
                        <Link href={`mailto:${user?.author.email}`}>
                            <Button type="button" title="Hire Me" leftIcon="/email.svg" />
                        </Link>
                    </div>
                </div>

                {projects.length > 0 ? (
                    <Image
                        src={projects[0].img}
                        alt="project image"
                        width={739}
                        height={554}
                        className="rounded-xl object-contain"
                    />
                ) : (
                    <Image
                        src="/profile-post.png"
                        width={739}
                        height={554}
                        alt="project image"
                        className="rounded-xl"
                    />
                )}
            </section>

            <section className="flexStart flex-col lg:mt-28 mt-16 w-full">
                <p className="w-full text-left text-lg font-semibold">Recent Work</p>

                <div className="profile_projects">
                    {projects.length > 0 && projects.map((project: ProjectInterface) => (
                        <ProjectCard
                            key={`${project?._id}`}
                            _id={project?._id}
                            image={project?.img}
                            title={project?.title}
                            name={project.author.name}
                            avatarUrl={project.author.avatarUrl}
                            userId={project.author._id}
                        />
                    ))}
                </div>
            </section>
        </section>
    );
};

export default ProfilePage;
