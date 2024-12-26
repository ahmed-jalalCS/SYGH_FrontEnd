"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface ProjectMember {
  id: string;
  name: string;
  role: string;
  department: string;
}

interface Project {
  id: string;
  title: string;
  supervisor: {
    name: string;
    department: string;
  };
  teamMembers: ProjectMember[];
  year: string;
  university: string;
  college: string;
  department: string;
}

// Test data array
const testProjects: Project[] = [
  {
    id: "1",
    title: "AI-Powered Healthcare Diagnosis System",
    supervisor: {
      name: "Dr. Ahmed Mohammed",
      department: "Computer Science"
    },
    teamMembers: [
      {
        id: "m1",
        name: "Sohayb Al-Hetar",
        role: "Team Leader",
        department: "Computer Science"
      },
      {
        id: "m2",
        name: "Mohammed Al-Hetar",
        role: "Developer",
        department: "Computer Science"
      },
      {
        id: "m3",
        name: "Sarah Ahmed",
        role: "Researcher",
        department: "Computer Science"
      }
    ],
    year: "2024",
    university: "Sana'a University",
    college: "Faculty of Computing and Information Technology",
    department: "Computer Science"
  },
  {
    id: "2",
    title: "Smart Agriculture Monitoring System",
    supervisor: {
      name: "Dr. Fatima Ali",
      department: "Engineering"
    },
    teamMembers: [
      {
        id: "m4",
        name: "Ali Hassan",
        role: "Team Leader",
        department: "Engineering"
      },
      {
        id: "m5",
        name: "Noor Mohammed",
        role: "Hardware Engineer",
        department: "Engineering"
      }
    ],
    year: "2024",
    university: "Sana'a University",
    college: "Faculty of Engineering",
    department: "Electronic Engineering"
  },
  {
    id: "3",
    title: "Smart Agriculture Monitoring System",
    supervisor: {
      name: "Dr. Fatima Ali",
      department: "Engineering"
    },
    teamMembers: [
      {
        id: "m6",
        name: "Ouis Al-Hetar",
        role: "Team Leader",
        department: "Engineering"
      },
      {
        id: "m7",
        name: "Noory Qusailah",
        role: "Hardware Engineer",
        department: "Engineering"
      },
    ],
    year: "2015",
    university: "Sana'a University",
    college: "Faculty of Engineering",
    department: "Electronic Engineering"
  },
];

const UploadProjectForm = () => {
  const router = useRouter();
  const [projects] = useState<Project[]>(testProjects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    description: '',
    supervisor: { name: '', department: '' },
    teamMembers: [] as ProjectMember[],
    year: '',
    university: '',
    college: '',
    department: ''
  });
  const [files, setFiles] = useState<FileList | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleProjectSelect = (projectId: string) => {
    const project = projects.find(p => p.id === projectId);
    if (project) {
      setSelectedProject(project);
      setFormData({
        description: '',
        supervisor: { ...project.supervisor },
        teamMembers: [...project.teamMembers],
        year: project.year,
        university: project.university,
        college: project.college,
        department: project.department
      });
    } else {
      setSelectedProject(null);
    }
  };

  const handleTeamMemberUpdate = (index: number, field: keyof ProjectMember, value: string) => {
    const updatedMembers = [...formData.teamMembers];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setFormData({ ...formData, teamMembers: updatedMembers });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log({
        projectId: selectedProject?.id,
        ...formData,
        files: files ? Array.from(files).map(f => f.name) : [],
      });
      alert('Project uploaded successfully!');
      router.push(`/projects/${selectedProject?.id}`);
    } catch (err) {
      setError('Failed to upload project');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 space-y-8">
          <div className="border-b border-gray-200 pb-8">
            <h1 className="text-3xl font-bold text-gray-900">Upload Project</h1>
            <p className="mt-2 text-gray-600">Share your research project with the academic community</p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Project Selection */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Select Your Project
              </label>
              <select
                className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                onChange={(e) => handleProjectSelect(e.target.value)}
                required
              >
                <option value="">Choose a project</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.title}
                  </option>
                ))}
              </select>
            </div>

            {selectedProject && (
              <div className="space-y-8">
                {/* Supervisor Section */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Supervisor</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        value={formData.supervisor.name}
                        onChange={(e) => setFormData({
                          ...formData,
                          supervisor: { ...formData.supervisor, name: e.target.value }
                        })}
                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                      <input
                        type="text"
                        value={formData.supervisor.department}
                        onChange={(e) => setFormData({
                          ...formData,
                          supervisor: { ...formData.supervisor, department: e.target.value }
                        })}
                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Team Members Section */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Members</h3>
                  <div className="space-y-4">
                    {formData.teamMembers.map((member, index) => (
                      <div key={member.id} className="p-4 bg-white rounded-lg shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                              type="text"
                              value={member.name}
                              onChange={(e) => handleTeamMemberUpdate(index, 'name', e.target.value)}
                              className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                            <input
                              type="text"
                              value={member.role}
                              onChange={(e) => handleTeamMemberUpdate(index, 'role', e.target.value)}
                              className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                            <input
                              type="text"
                              value={member.department}
                              onChange={(e) => handleTeamMemberUpdate(index, 'department', e.target.value)}
                              className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Project Details Section */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                      <input
                        type="text"
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
                      <input
                        type="text"
                        value={formData.university}
                        onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">College</label>
                      <input
                        type="text"
                        value={formData.college}
                        onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                      <input
                        type="text"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Description Section */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Project Description
                  </label>
                  <textarea
                    rows={5}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter a detailed description of your project..."
                    required
                  />
                </div>

                {/* File Upload Section */}
                <div className="bg-gray-50 p-6 rounded-xl">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Project Files
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-400 transition-colors">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                          <span>Upload files</span>
                          <input
                            type="file"
                            multiple
                            className="sr-only"
                            onChange={(e) => setFiles(e.target.files)}
                            accept=".pdf,.doc,.docx"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                    </div>
                  </div>
                  {files && (
                    <ul className="mt-4 space-y-2">
                      {Array.from(files).map((file, index) => (
                        <li key={index} className="text-sm text-gray-600 flex items-center space-x-2">
                          <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                          </svg>
                          <span>{file.name}</span>
                          <span className="text-gray-400">({(file.size / 1024 / 1024).toFixed(2)}MB)</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading || !selectedProject}
                className={`
                  inline-flex items-center px-6 py-3 border border-transparent 
                  text-base font-medium rounded-lg shadow-sm text-white 
                  bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 
                  focus:ring-offset-2 focus:ring-blue-500 transition-colors
                  ${(isLoading || !selectedProject) && 'opacity-50 cursor-not-allowed'}
                `}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </>
                ) : (
                  'Upload Project'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadProjectForm; 