import { User, Session } from 'next-auth'

export type FormState = {
    title: string;
    description: string;
    image: string;
    liveSiteUrl: string;
    githubUrl: string;
    category: string;
};

export interface ProjectInterface {
    title: string;
    desc: string;
    img: string;
    livesiteUrl: string;
    githubUrl: string;
    category: string;
    _id: string;
    author: {
      name: string;
      email: string;
      avatarUrl: string;
      _id: string;
    };
}

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    description: string | null;
    avatarUrl: string;
    githubUrl: string | null;
    linkedinUrl: string | null;
    // projects: {
    //   edges: { node: ProjectInterface }[];
    //   pageInfo: {
    //     hasPreviousPage: boolean;
    //     hasNextPage: boolean;
    //     startCursor: string;
    //     endCursor: string;
    //   };
    // };
}

export interface SessionInterface extends Session {
    user: {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
  };
}

export interface ProjectForm {
  title: string;
  description: string;
  image: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
}

export interface FormFieldProps {
  type?: string,
  title: string,
  state?: string,
  placeholder: string,
  isTextArea?: boolean,
  setState: (value: string) => void,
}