import { axiosInstance } from '@/api';
import { ProjectResponse, ProjectInput, SignedUrl } from '@/api/project/types';

const createProject = (data: ProjectInput) => {
  return axiosInstance.request({
    method: 'POST',
    url: 'api/v1/projects',
    data,
  });
};

const deleteProject = (id: string) => {
  return axiosInstance.request({
    method: 'DELETE',
    url: `api/v1/projects/${id}`,
  });
};

const getProject = (id: string) => {
  return axiosInstance.request<ProjectResponse>({
    method: 'GET',
    url: `api/v1/projects/${id}`,
  });
};

const getProjects = () => {
  return axiosInstance.request<{ projects: ProjectResponse[] }>({
    method: 'GET',
    url: 'api/v1/projects',
  });
};

const getPresignedUrl = (name: string) => {
  return axiosInstance.request<{ signedUrl: SignedUrl; filename: string }>({
    method: 'GET',
    url: `api/v1/presigned-url?filename=${name}`,
  });
};

export const project = {
  create: createProject,
  delete: deleteProject,
  get: getProject,
  getList: getProjects,
  getPresignedUrl,
};
