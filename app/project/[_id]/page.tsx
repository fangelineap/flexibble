"use client";

import Modal from "@/components/Modal";
import ProjectActions from "@/components/ProjectActions";
import RelatedProjects from "@/components/RelatedProjects";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

type IndividualProjectProps = {
    _id: string,
    title: string,
    desc: string,
    img: string,
    livesiteUrl: string,
    githubUrl: string,
    category: string,
    author: {
        _id: string,
        name: string,
        email: string,
        avatarUrl: string
    },
    createdAt: string,
    updatedAt: string
}

const Project = ({ params }: { params: any }) => {
    const [individualProject, setIndividualProject] = useState<IndividualProjectProps>();

    const { data: session } = useSession();
    const pathName = usePathname();

    useEffect(() => {
        const fetchIndividualProject = async (id: string) => {
            const response = await fetch(`/api/project/${id}`);
            const data = await response.json();

            if(data.length === 0) {
                <p>Failed to fetch project information</p>
            }
            setIndividualProject(data);
        };

        if (session?.user) fetchIndividualProject(params._id);
    }, [ ,pathName]);

    const renderLink = () => `/profile/${individualProject?.author._id}}`

    return (
        <Modal>
            <section className="flexBetween gap-y-8 max-w-4xl max-xs:flex-col w-full">
                <div className="flex-1 flex items-start gap-5 w-full max-xs:flex-col">
                    <Link href={renderLink()}>
                        <Image
                            src={individualProject?.author.avatarUrl || '/hearth-purple.svg'}
                            width={50}
                            height={50}
                            alt="profile"
                            className="rounded-full"
                        />
                    </Link>

                    <div className="flex-1 flexStart flex-col gap-1">
                        <p className="self-start text-lg font-semibold">
                            {individualProject?.title}
                        </p>
                        <div className="user-info">
                            <Link href={renderLink()}>
                                {individualProject?.author?.name}
                            </Link>
                            <Image src="/dot.svg" width={4} height={4} alt="dot" />
                            <Link href={`/?category=${individualProject?.category}`} className="text-primary-purple font-semibold"> 
                                {individualProject?.category}
                            </Link>
                        </div>
                    </div>
                </div>

                {session?.user?.email === individualProject?.author?.email && (
                    <div className="flex justify-end items-center gap-2">
                        <ProjectActions projectId={individualProject?._id || ''} />
                    </div>
                )}
            </section>

            <section className="mt-14">
                <Image
                    src={individualProject?.img || ''}
                    className="object-cover rounded-2xl"
                    width={1064}
                    height={798}
                    alt="poster"
                />
            </section>

            <section className="flexCenter flex-col mt-20">
                <p className="max-w-5xl text-xl font-normal">
                    {individualProject?.desc}
                </p>

                <div className="flex flex-wrap mt-5 gap-5">
                    <Link href={individualProject?.githubUrl || '/'} target="_blank" rel="noreferrer" className="flexCenter gap-2 tex-sm font-medium text-primary-purple">
                        🖥 <span className="underline">Github</span> 
                    </Link>
                    <Image src="/dot.svg" width={4} height={4} alt="dot" />
                    <Link href={individualProject?.livesiteUrl || '/'} target="_blank" rel="noreferrer" className="flexCenter gap-2 tex-sm font-medium text-primary-purple">
                        🚀 <span className="underline">Live Site</span> 
                    </Link>
                </div>
            </section>
      
            <section className="flexCenter w-full gap-8 mt-28">
                <span className="w-full h-0.5 bg-light-white-200" />
                <Link href={renderLink()} className="min-w-[82px] h-[82px]">
                    <Image
                        src={individualProject?.author?.avatarUrl || '/hearth-purple.svg'}
                        className="rounded-full"
                        width={82}
                        height={82}
                        alt="profile image"
                    />
                </Link>
                <span className="w-full h-0.5 bg-light-white-200" />
            </section>

            <RelatedProjects userProfile={individualProject?.author || {_id: '', name: '', email: '', avatarUrl: ''}} projectId={individualProject?._id || ''} />
        </Modal>
    );
};

export default Project;