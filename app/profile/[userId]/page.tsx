'use client'

import ProfilePage from '@/components/ProfilePage';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

const UserProfile = ({ params : { userId } } : { params : { userId : string } }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const response = await fetch(`/api/profile/${userId}/projects`);
      const data = await response.json();

      if(response.status == 404) return <p>{data.error}</p> 

      setProjects(data);
    }

    fetchProjects();
  }, []);

  return (
    <ProfilePage user={projects[0]} projects={projects} />
  )
}

export default UserProfile