"use client";

import Modal from "@/components/Modal";
import ProjectForm from "@/components/ProjectForm";
import { useSession } from "next-auth/react";
import React from "react";
import { redirect } from "next/navigation";

const page = () => {
    const { data: session } = useSession();

    if (!session?.user) redirect("/");

    return (
        <Modal>
            <h3 className="modal-head-text">Create a New Project</h3>

            <ProjectForm type="create" />
        </Modal>
    );
};

export default page;
