// --- File: src/pages/CoordinatorDashboard/ManageClubs.js ---
import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext'; // Adjusted path
import CustomModal from '../../components/Modal'; // Adjusted path
import LoadingSpinner from '../../components/LoadingSpinner'; // Adjusted path
import { Edit3, Trash2, PlusCircle, Rocket, UsersRound, CalendarDays, Award } from 'lucide-react';


const ManageClubs = () => {
    const { clubs, addDataItem, updateDataItem, deleteDataItem, uploadImage, loadingData } = useData();
    
    const [name, setName] = useState('');
    const [category, setCategory] = useState('Technical');
    const [shortDescription, setShortDescription] = useState('');
    const [about, setAbout] = useState('');
    const [tagline, setTagline] = useState('');
    const [logoUrl, setLogoUrl] = useState('');
    const [logoFile, setLogoFile] = useState(null);
    const [joinCriteria, setJoinCriteria] = useState('');

    const [projects, setProjects] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);
    const [clubEvents, setClubEvents] = useState([]);
    const [clubAchievements, setClubAchievements] = useState([]);

    const [editingId, setEditingId] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', message: '', type: 'info' });
    const [confirmAction, setConfirmAction] = useState(null);

    const clubCategories = ['Technical', 'Cultural', 'Sports', 'Literary', 'Social', 'Other'];

    const handleSubItemChange = (section, index, field, value) => {
        const setterMap = { projects: setProjects, teamMembers: setTeamMembers, clubEvents: setClubEvents, clubAchievements: setClubAchievements };
        const itemsMap = { projects, teamMembers, clubEvents, clubAchievements };
        
        const setter = setterMap[section];
        const items = itemsMap[section];

        if (setter && items) {
            const updatedItems = items.map((item, i) => i === index ? { ...item, [field]: value } : item);
            setter(updatedItems);
        }
    };
    
    const handleSocialLinkChange = (teamMemberIndex, socialField, value) => {
        const updatedTeamMembers = teamMembers.map((member, i) => {
            if (i === teamMemberIndex) {
                return { ...member, socialLinks: { ...(member.socialLinks || {}), [socialField]: value } };
            }
            return member;
        });
        setTeamMembers(updatedTeamMembers);
    };


    const addSubItem = (section) => {
        const setterMap = { projects: setProjects, teamMembers: setTeamMembers, clubEvents: setClubEvents, clubAchievements: setClubAchievements };
        const setter = setterMap[section];

        if (setter) {
            const newItem = { 
                projects: { id: crypto.randomUUID(), title: '', description: '', techStack: '', imageUrl: '', link: '' },
                teamMembers: { id: crypto.randomUUID(), name: '', role: '', photoUrl: '', bio: '', socialLinks: { linkedin: '', github: '' } },
                clubEvents: { id: crypto.randomUUID(), title: '', date: '', description: '', imageUrl: '' },
                clubAchievements: { id: crypto.randomUUID(), title: '', date: '', description: '', imageUrl: '' }
            }[section];
            setter(prev => [...prev, newItem]);
        }
    };

    const removeSubItem = (section, index) => {
        const setterMap = { projects: setProjects, teamMembers: setTeamMembers, clubEvents: setClubEvents, clubAchievements: setClubAchievements };
        const setter = setterMap[section];
        if (setter) {
            setter(prev => prev.filter((_, i) => i !== index));
        }
    };

    const handleSubItemImageUpload = async (section, index, file) => {
        if (!file) return;
        const clubIdentifier = name.replace(/\s+/g, '-').toLowerCase() || 'unknown-club';
        const imagePath = `clubs/${clubIdentifier}/${section}/${Date.now()}-${file.name}`;
        
        setIsSubmitting(true);
        try {
            const uploadedUrl = await uploadImage(file, imagePath); 
            const fieldToUpdate = section === 'teamMembers' ? 'photoUrl' : 'imageUrl';
            handleSubItemChange(section, index, fieldToUpdate, uploadedUrl);
             setModalContent({ title: 'Image Uploaded', message: `${section.slice(0, -1)} image uploaded successfully.`, type: 'success' });
        } catch (error) {
            console.error(`Error uploading image for ${section}:`, error);
            setModalContent({ title: 'Image Upload Error', message: `Failed to upload image for ${section}. ${error.message}`, type: 'error' });
        } finally {
            setIsSubmitting(false);
            setModalOpen(true);
        }
    };


    const resetForm = () => {
        setName(''); setCategory('Technical'); setShortDescription(''); setAbout(''); setTagline('');
        setLogoUrl(''); setLogoFile(null); setJoinCriteria('');
        setProjects([]); setTeamMembers([]); setClubEvents([]); setClubAchievements([]);
        setEditingId(null);
    };

    const handleLogoChange = (e) => {
        if (e.target.files[0]) {
            setLogoFile(e.target.files[0]);
            setLogoUrl(URL.createObjectURL(e.target.files[0]));
        } else {
            setLogoFile(null);
            if (!editingId) setLogoUrl('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim() || !category || !shortDescription.trim()) {
             setModalContent({ title: 'Validation Error', message: 'Club Name, Category, and Short Description are mandatory.', type: 'error' });
             setModalOpen(true); return;
        }
        setIsSubmitting(true);
        let finalLogoUrl = editingId && logoUrl && !logoFile ? logoUrl : '';
        if (logoFile) {
            try {
                const clubPathName = name.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                finalLogoUrl = await uploadImage(logoFile, `clubs/${clubPathName}/logo`);
            } catch (err) {
                setModalContent({ title: 'Logo Upload Error', message: `Failed to upload club logo: ${err.message}`, type: 'error' });
                setModalOpen(true); setIsSubmitting(false); return;
            }
        }
        
        const clubData = { 
            name, category, shortDescription, about, tagline, logoUrl: finalLogoUrl || '', joinCriteria,
            projects, teamMembers, clubEvents, clubAchievements 
        };

        try {
            if (editingId) {
                await updateDataItem('clubs', editingId, clubData);
                setModalContent({ title: 'Success!', message: 'Club details updated successfully.', type: 'success' });
            } else {
                await addDataItem('clubs', clubData);
                setModalContent({ title: 'Success!', message: 'New club added successfully.', type: 'success' });
            }
            resetForm();
        } catch (err) {
            setModalContent({ title: 'Database Error', message: `Failed to save club data: ${err.message}`, type: 'error' });
        } finally {
            setIsSubmitting(false); setModalOpen(true);
        }
    };
    
    const handleEdit = (club) => {
        setEditingId(club.id); setName(club.name); setCategory(club.category);
        setShortDescription(club.shortDescription || ''); setAbout(club.about || '');
        setTagline(club.tagline || ''); setLogoUrl(club.logoUrl || ''); setJoinCriteria(club.joinCriteria || '');
        setProjects(club.projects || []); 
        const formattedTeamMembers = (club.teamMembers || []).map(tm => ({...tm, socialLinks: tm.socialLinks || {linkedin: '', github: ''}}));
        setTeamMembers(formattedTeamMembers); 
        setClubEvents(club.clubEvents || []); setClubAchievements(club.clubAchievements || []);
        setLogoFile(null);
        document.getElementById('manage-clubs-form')?.scrollIntoView({behavior: "smooth"});
    };

    const handleDeleteRequest = (id) => {
        setConfirmAction(() => () => handleDeleteConfirm(id));
        setModalContent({ title: 'Confirm Club Deletion', message: 'Are you sure you want to delete this club? This action cannot be undone.', type: 'warning' });
        setModalOpen(true);
    };

    const handleDeleteConfirm = async (id) => {
        setModalOpen(false); setIsSubmitting(true);
        try {
            await deleteDataItem('clubs', id);
            setModalContent({ title: 'Deleted!', message: 'Club has been successfully deleted.', type: 'success' });
        } catch (err) {
            setModalContent({ title: 'Deletion Error', message: `Failed to delete club: ${err.message}`, type: 'error' });
        } finally {
            setIsSubmitting(false); setModalOpen(true); setConfirmAction(null);
        }
    };

    const renderSubSectionFields = (sectionName, items, itemFieldsConfig) => (
        <div className="mt-6 p-4 border border-slate-300 rounded-lg bg-slate-50">
            <h4 className="text-lg font-semibold text-slate-700 mb-3 capitalize flex items-center">
                {sectionName === 'projects' && <Rocket size={20} className="mr-2 text-indigo-500"/>}
                {sectionName === 'teamMembers' && <UsersRound size={20} className="mr-2 text-indigo-500"/>}
                {sectionName === 'clubEvents' && <CalendarDays size={20} className="mr-2 text-indigo-500"/>}
                {sectionName === 'clubAchievements' && <Award size={20} className="mr-2 text-indigo-500"/>}
                Manage Club {sectionName.replace(/([A-Z])/g, ' $1')}
            </h4>
            {items.map((item, index) => (
                <div key={item.id || index} className="mb-6 p-4 border border-slate-200 rounded-md bg-white shadow-sm relative">
                    <h5 className="font-medium text-slate-600 mb-2 capitalize">{sectionName.slice(0, -1)} #{index + 1}</h5>
                    {itemFieldsConfig.map(field => (
                        <div key={field.name} className="mb-3">
                            <label htmlFor={`${sectionName}-${index}-${field.name}`} className="block text-xs font-medium text-slate-600 mb-0.5">{field.label}</label>
                            {field.type === 'textarea' ? (
                                <textarea id={`${sectionName}-${index}-${field.name}`} value={item[field.name] || ''}
                                          onChange={(e) => handleSubItemChange(sectionName, index, field.name, e.target.value)}
                                          rows="3" placeholder={field.placeholder}
                                          className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors text-sm"/>
                            ) : field.type === 'file' ? (
                                <>
                                    <input type="file" id={`${sectionName}-${index}-${field.name}`} accept="image/*"
                                           onChange={(e) => handleSubItemImageUpload(sectionName, index, e.target.files[0])}
                                           className="mt-1 block w-full text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200 cursor-pointer"/>
                                    {item[field.name] && <img src={item[field.name]} alt="Preview" className="mt-2 h-20 w-auto rounded object-cover border"/>}
                                </>
                            ) : field.name.startsWith('socialLinks.') ? ( 
                                <input type="url" id={`${sectionName}-${index}-${field.name}`} value={item.socialLinks?.[field.name.split('.')[1]] || ''}
                                       onChange={(e) => handleSocialLinkChange(index, field.name.split('.')[1], e.target.value)}
                                       placeholder={field.placeholder}
                                       className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors text-sm"/>
                            ) : (
                                <input type={field.type || 'text'} id={`${sectionName}-${index}-${field.name}`} value={item[field.name] || ''}
                                       onChange={(e) => handleSubItemChange(sectionName, index, field.name, e.target.value)}
                                       placeholder={field.placeholder}
                                       className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors text-sm"/>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={() => removeSubItem(sectionName, index)}
                            className="absolute top-2 right-2 p-1.5 text-red-500 hover:text-red-700 bg-red-100 hover:bg-red-200 rounded-full transition-colors">
                        <Trash2 size={16}/>
                    </button>
                </div>
            ))}
            <button type="button" onClick={() => addSubItem(sectionName)}
                    className="mt-2 px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-md hover:bg-green-600 transition-colors flex items-center">
                <PlusCircle size={16} className="mr-1.5"/> Add {sectionName.slice(0, -1)}
            </button>
        </div>
    );

    const projectFields = [
        { name: 'title', label: 'Project Title', placeholder: 'E.g., AI Chatbot' },
        { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Briefly describe the project' },
        { name: 'techStack', label: 'Tech Stack (comma-separated)', placeholder: 'React, Firebase, Python' },
        { name: 'imageUrl', label: 'Project Image', type: 'file' },
        { name: 'link', label: 'Project Link (Optional)', type: 'url', placeholder: 'https://github.com/project' },
    ];
    const teamMemberFields = [
        { name: 'name', label: 'Member Name', placeholder: 'Full Name' },
        { name: 'role', label: 'Role/Position', placeholder: 'E.g., President, Tech Lead' },
        { name: 'bio', label: 'Short Bio (Optional)', type: 'textarea', placeholder: 'A brief introduction' },
        { name: 'photoUrl', label: 'Photo', type: 'file' },
        { name: 'socialLinks.linkedin', label: 'LinkedIn Profile URL (Optional)', type: 'url', placeholder: 'https://linkedin.com/in/...' },
        { name: 'socialLinks.github', label: 'GitHub Profile URL (Optional)', type: 'url', placeholder: 'https://github.com/...' },
    ];
    const clubEventFields = [
        { name: 'title', label: 'Event Title', placeholder: 'E.g., Annual Hackathon' },
        { name: 'date', label: 'Event Date', type: 'date' },
        { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Details about the event' },
        { name: 'imageUrl', label: 'Event Image/Banner', type: 'file' },
    ];
     const clubAchievementFields = [
        { name: 'title', label: 'Achievement Title', placeholder: 'E.g., Won National Robotics Competition' },
        { name: 'date', label: 'Date of Achievement', type: 'date' },
        { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Details about the achievement' },
        { name: 'imageUrl', label: 'Image/Certificate (Optional)', type: 'file' },
    ];

    return (
         <>
        <CustomModal isOpen={modalOpen} onClose={() => { setModalOpen(false); setConfirmAction(null); }} title={modalContent.title} type={modalContent.type} showConfirm={!!confirmAction} onConfirm={confirmAction} confirmText="Yes, Delete Club">
            <p>{modalContent.message}</p>
        </CustomModal>
        <div className="p-6 md:p-8 bg-white rounded-xl shadow-xl">
            <h2 className="text-3xl font-semibold mb-8 text-indigo-700 border-b pb-4">Manage Clubs</h2>
            <form onSubmit={handleSubmit} id="manage-clubs-form" className="space-y-6 mb-12 p-6 border border-slate-200 rounded-lg bg-indigo-50 shadow-sm">
                <h3 className="text-xl font-medium text-slate-800 mb-4">{editingId ? 'Edit Club Information' : 'Register New Club'}</h3>
                {/* Basic Club Info Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="clubNameDash" className="block text-sm font-medium text-slate-700 mb-1">Club Name <span className="text-red-500">*</span></label>
                        <input type="text" id="clubNameDash" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors" />
                    </div>
                    <div>
                        <label htmlFor="clubCategoryDash" className="block text-sm font-medium text-slate-700 mb-1">Category <span className="text-red-500">*</span></label>
                        <select id="clubCategoryDash" value={category} onChange={(e) => setCategory(e.target.value)} required className="mt-1 block w-full px-4 py-2.5 border border-slate-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors">
                            {clubCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                </div>
                <div>
                    <label htmlFor="clubTagline" className="block text-sm font-medium text-slate-700 mb-1">Tagline / Motto</label>
                    <input type="text" id="clubTagline" value={tagline} onChange={(e) => setTagline(e.target.value)} maxLength="100" className="mt-1 block w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors" />
                </div>
                 <div>
                    <label htmlFor="clubShortDesc" className="block text-sm font-medium text-slate-700 mb-1">Short Description (for cards) <span className="text-red-500">*</span></label>
                    <textarea id="clubShortDesc" value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} required maxLength="200" rows="3" className="mt-1 block w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors" placeholder="Max 200 chars"></textarea>
                </div>
                <div>
                    <label htmlFor="clubAbout" className="block text-sm font-medium text-slate-700 mb-1">About Club (detailed)</label>
                    <textarea id="clubAbout" value={about} onChange={(e) => setAbout(e.target.value)} rows="5" className="mt-1 block w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors" placeholder="Full description..."></textarea>
                </div>
                <div>
                    <label htmlFor="clubJoinCriteria" className="block text-sm font-medium text-slate-700 mb-1">How to Join / Criteria</label>
                    <textarea id="clubJoinCriteria" value={joinCriteria} onChange={(e) => setJoinCriteria(e.target.value)} rows="4" className="mt-1 block w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors" placeholder="Describe the process or criteria for joining the club..."></textarea>
                </div>
                <div>
                    <label htmlFor="clubLogoDash" className="block text-sm font-medium text-slate-700 mb-1">Club Logo / Banner</label>
                    <input type="file" id="clubLogoDash" accept="image/*" onChange={handleLogoChange} className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200 transition-colors cursor-pointer" />
                    {logoUrl && <img src={logoUrl} alt="Logo Preview" className="mt-3 h-32 w-auto rounded-lg object-contain shadow-md border border-slate-200" />}
                </div>
                
                {/* Club Sub-sections Management */}
                {renderSubSectionFields('projects', projects, projectFields)}
                {renderSubSectionFields('teamMembers', teamMembers, teamMemberFields)}
                {renderSubSectionFields('clubEvents', clubEvents, clubEventFields)}
                {renderSubSectionFields('clubAchievements', clubAchievements, clubAchievementFields)}

                <div className="flex items-center space-x-4 pt-4 border-t mt-6">
                    <button type="submit" disabled={isSubmitting} className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 disabled:opacity-60 flex items-center shadow-md hover:shadow-lg transition-all">
                        {isSubmitting ? <LoadingSpinner size="h-5 w-5" message="" color="text-white"/> : (editingId ? 'Update Club Info' : 'Add New Club')}
                         {!isSubmitting && (editingId ? <Edit3 size={18} className="ml-2"/> : <PlusCircle size={18} className="ml-2"/>)}
                    </button>
                    {editingId && <button type="button" onClick={resetForm} className="px-5 py-2.5 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 font-medium transition-colors">Cancel Edit</button>}
                </div>
            </form>

            <h3 className="text-2xl font-semibold mb-6 text-slate-800 border-t pt-8">Registered Clubs List</h3>
            {loadingData && clubs.length === 0 && <LoadingSpinner message="Loading clubs list..."/>}
            {!loadingData && clubs.length === 0 && <p className="text-slate-500 text-center py-8">No clubs registered yet.</p>}
            <div className="space-y-5">
                {clubs.map(club => (
                    <div key={club.id} className="p-5 border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div className="flex items-start gap-4 flex-grow">
                            {club.logoUrl && <img src={club.logoUrl} alt={club.name} className="h-20 w-20 rounded-md object-cover border border-slate-200 flex-shrink-0"/>}
                            <div className="flex-grow">
                                <h4 className="font-semibold text-lg text-indigo-700">{club.name} <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-medium">{club.category}</span></h4>
                                <p className="text-sm text-slate-600 mt-1 mb-2">{club.shortDescription?.substring(0,100)}...</p>
                                {club.tagline && <p className="text-xs italic text-slate-500">"{club.tagline}"</p>}
                            </div>
                        </div>
                        <div className="flex space-x-2 flex-shrink-0 mt-3 sm:mt-0 self-start sm:self-center">
                            <button onClick={() => handleEdit(club)} className="p-2.5 text-blue-600 hover:text-blue-800 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors" title="Edit Club"><Edit3 size={20}/></button>
                            <button onClick={() => handleDeleteRequest(club.id)} className="p-2.5 text-red-600 hover:text-red-800 bg-red-100 hover:bg-red-200 rounded-lg transition-colors" title="Delete Club"><Trash2 size={20}/></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};
export default ManageClubs;
// --- End File: src/pages/CoordinatorDashboard/ManageClubs.js ---