'use client'

import Image from 'next/image'
import React, { ChangeEvent, useEffect, useState } from 'react'
import FormField from './FormField'
import { categoryFilters } from '@/constants'
import CustomMenu from './CustomMenu'
import Button from './Button'
import { useRouter } from 'next/navigation'
import { ProjectInterface } from '@/common_types'

type ProjectFormProps = {
    type: string,
    project?: ProjectInterface
}

const ProjectForm = ({ type, project }: ProjectFormProps) => {
    const router = useRouter();

    const [submitting, setSubmitting] = useState(false);
    const [form, setForm] = useState({
        image: type == 'edit' ? project?.img : '',
        title: type == 'edit' ? project?.title : '',
        description: type == 'edit' ? project?.desc : '',
        livesiteUrl: type == 'edit' ? project?.livesiteUrl : '',
        githubUrl: type == 'edit' ? project?.githubUrl : '',
        category: type == 'edit' ? project?.category : '',
        author: type == 'edit' ? project?.author._id : '',
    })

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setSubmitting(true);

        try {
            if(type === 'create') {
                const response = await fetch('/api/project/new', {
                    method: 'POST',
                    body: JSON.stringify({
                        title: form.title,
                        desc: form.description,
                        img: form.image,
                        livesiteUrl: form.livesiteUrl,
                        githubUrl: form.githubUrl,
                        category: form.category,
                        author: form.author,
                    })
                });

                if(response.ok) router.push('/');
            }

            if(type === "edit") {
                const response = await fetch(`/api/project/${project?._id}`, {
                    method: 'PATCH',
                    body: JSON.stringify({
                        title: form.title,
                        desc: form.description,
                        img: form.image,
                        livesiteUrl: form.livesiteUrl,
                        githubUrl: form.githubUrl,
                        category: form.category,
                        // author: form.author,
                    })
                });

                if(response.ok) router.push('/');
            }
        } catch (error) {  
            throw new Error('Error submitting report');
        } finally {
            setSubmitting(false);
        }
    }

    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const file = e.target.files?.[0];

        if(!file) return;

        if(!file.type.includes('image')) {
            return alert('Please upload an image file');
        }

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
            const result = reader.result as string;
            handleStateChange('image', result);
        }
    }

    const handleStateChange = (fieldName: string, value: string) => {
        setForm(prevState => ({ ...prevState, [fieldName]: value }))
    }

  return (
    <form 
        onSubmit={handleFormSubmit}
        className='flexStart form'
    >
        <div className='flexStart form_image-container'>
            <label htmlFor="poster" className='flexCenter form_image-label'>
                {!form.image && 'Choose a poster for your project'}
            </label>

            <input 
                type="file" 
                id='image' 
                accept='image/*'
                required={type === 'create'}
                className='form_image-input'
                onChange={handleChangeImage} 
            />
            {form.image && (
                <Image 
                    src={form.image} 
                    className='sm:p-10 object-contain z-20' 
                    alt='Project poster' 
                    fill 
                />
            )}
        </div>

        <FormField
            title="Title"
            state={form.title}
            placeholder="Flexibble"
            setState={(value) => handleStateChange('title', value)} 
        />
        <FormField
            title="Description"
            state={form.description}
            placeholder="Showcase and discover remarkable developer projects."
            setState={(value) => handleStateChange('description', value)} 
        />
        <FormField
            type='url'
            title="Website URL"
            state={form.livesiteUrl}
            placeholder="https://fangeline.ap"
            setState={(value) => handleStateChange('livesiteUrl', value)} 
        />
        <FormField
            type='url'
            title="GitHub URL"
            state={form.githubUrl}
            placeholder="https://github.com/fangelineap"
            setState={(value) => handleStateChange('githubUrl', value)} 
        />


        {/* Custom Input Category */}

        <CustomMenu
            title="Category"
            state={form.category}
            filters={categoryFilters}
            setState={(value) => handleStateChange('category', value)} 
        />

        <div className='flexStart w-full'>
            <Button
                title={submitting ? `${type === 'create' 
                ? 'Creating' : 'Editing'}`
                : `${type === 'create' ? 'Create' : 'Edit'}`} 
                type="submit"
                leftIcon={submitting ? "" : '/plus.svg'}
                submitting={submitting}
            />
        </div>
    </form>
  )
}

export default ProjectForm