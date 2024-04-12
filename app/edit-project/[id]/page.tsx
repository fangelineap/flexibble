'use client'

import Modal from '@/components/Modal';
import ProjectForm from '@/components/ProjectForm';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const page = ({ params: { id } } : { params : { id : string} }) => {
  const [project, setProject] = useState(null);
  const { data: session } = useSession();

  if (!session?.user) redirect("/");

  useEffect(() => {
    const fetchProject = async () => {
      const response = await fetch(`/api/project/${id}`);
      const data = await response.json();
      setProject(data);
    }
    
    fetchProject();
  }, [])

  return (
      <Modal>
          <h3 className="modal-head-text">Edit Project</h3>

          { project && (
            <ProjectForm type="edit" project={project}/>
          )}
      </Modal>
  );
}

export default page