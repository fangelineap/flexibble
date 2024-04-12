import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const ProjectActions = ({ projectId } : { projectId : string }) => {
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const router = useRouter();

    const handleDelete = async () => {
        setIsDeleting(true);

        const response = await fetch(`/api/project/${projectId}/delete`);

        if(response.status === 200) {
            setIsDeleting(false);
            router.push('/');
            router.refresh();
        }
    }

  return (
    <>
        <Link 
            href={`/edit-project/${projectId}`}
            className='flexCenter edit-action_btn'
        >
            <Image src="/pencile.svg" width={15} height={15} alt='edit' />
        </Link>

        <button 
            type='button' 
            className={`flexCenter delete-action_btn ${isDeleting ? 'bg-gray' : 'bg-primary-purple'}`}
            onClick={handleDelete}
        >
            <Image src="/trash.svg" width={15} height={15} alt='delete' />
        </button>
    </>
  )
}

export default ProjectActions