// --- File: src/pages/CoordinatorDashboard/ManageAchievements.js ---
import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext'; // Adjusted path
import CustomModal from '../../components/Modal'; // Adjusted path
import LoadingSpinner from '../../components/LoadingSpinner'; // Adjusted path
import { Edit3, Trash2, PlusCircle } from 'lucide-react';

const ManageAchievements = () => {
    const { achievements, addDataItem, updateDataItem, deleteDataItem, uploadImage, loadingData } = useData();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [clubName, setClubName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', message: '', type: 'info' });
    const [confirmAction, setConfirmAction] = useState(null);

    const resetForm = () => {
        setTitle(''); setDescription(''); setDate(''); setClubName(''); setImageUrl(''); 
        setImageFile(null); setEditingId(null);
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImageFile(e.target.files[0]);
            setImageUrl(URL.createObjectURL(e.target.files[0]));
        } else {
            setImageFile(null);
            if (!editingId) setImageUrl(''); 
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) {
            setModalContent({ title: 'Validation Error', message: 'Title and Description are required.', type: 'error' });
            setModalOpen(true); return;
        }
        setIsSubmitting(true);
        let finalImageUrl = editingId && imageUrl && !imageFile ? imageUrl : '';
        if (imageFile) {
            try {
                finalImageUrl = await uploadImage(imageFile, 'achievements'); 
            } catch (err) {
                setModalContent({ title: 'Upload Error', message: `Failed to upload image: ${err.message}`, type: 'error' });
                setModalOpen(true); setIsSubmitting(false); return;
            }
        }
        
        const achievementData = { title, description, date, clubName, imageUrl: finalImageUrl };

        try {
            if (editingId) {
                await updateDataItem('achievements', editingId, achievementData);
                setModalContent({ title: 'Success!', message: 'Achievement updated successfully.', type: 'success' });
            } else {
                await addDataItem('achievements', achievementData);
                setModalContent({ title: 'Success!', message: 'Achievement added successfully.', type: 'success' });
            }
            resetForm();
        } catch (err) {
            setModalContent({ title: 'Database Error', message: `Failed to save achievement: ${err.message}`, type: 'error' });
        } finally {
            setIsSubmitting(false); setModalOpen(true);
        }
    };

    const handleEdit = (ach) => {
        setEditingId(ach.id); setTitle(ach.title); setDescription(ach.description);
        setDate(ach.date || ''); setClubName(ach.clubName || ''); setImageUrl(ach.imageUrl || '');
        setImageFile(null);
        document.getElementById('manage-achievements-form')?.scrollIntoView({behavior: "smooth"});
    };

    const handleDeleteRequest = (id) => {
        setConfirmAction(() => () => handleDeleteConfirm(id));
        setModalContent({ title: 'Confirm Deletion', message: 'Are you sure you want to delete this achievement? This action cannot be undone.', type: 'warning' });
        setModalOpen(true);
    };

    const handleDeleteConfirm = async (id) => {
        setModalOpen(false); setIsSubmitting(true);
        try {
            await deleteDataItem('achievements', id);
            setModalContent({ title: 'Deleted!', message: 'Achievement has been successfully deleted.', type: 'success' });
        } catch (err) {
            setModalContent({ title: 'Deletion Error', message: `Failed to delete achievement: ${err.message}`, type: 'error' });
        } finally {
            setIsSubmitting(false); setModalOpen(true); setConfirmAction(null);
        }
    };

    return (
        <>
        <CustomModal isOpen={modalOpen} onClose={() => { setModalOpen(false); setConfirmAction(null); }} title={modalContent.title} type={modalContent.type} showConfirm={!!confirmAction} onConfirm={confirmAction} confirmText="Yes, Delete">
            <p>{modalContent.message}</p>
        </CustomModal>
        <div className="p-6 md:p-8 bg-white rounded-xl shadow-xl">
            <h2 className="text-3xl font-semibold mb-8 text-indigo-700 border-b pb-4">Manage Site-Wide Achievements</h2>
            <form onSubmit={handleSubmit} id="manage-achievements-form" className="space-y-6 mb-12 p-6 border border-slate-200 rounded-lg bg-indigo-50 shadow-sm">
                <h3 className="text-xl font-medium text-slate-800 mb-4">{editingId ? 'Edit Achievement Details' : 'Add New Achievement'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="achTitle" className="block text-sm font-medium text-slate-700 mb-1">Title <span className="text-red-500">*</span></label>
                        <input type="text" id="achTitle" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1 block w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors" />
                    </div>
                    <div>
                        <label htmlFor="achClubName" className="block text-sm font-medium text-slate-700 mb-1">Associated Club (Optional)</label>
                        <input type="text" id="achClubName" value={clubName} onChange={(e) => setClubName(e.target.value)} className="mt-1 block w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors" />
                    </div>
                </div>
                <div>
                    <label htmlFor="achDesc" className="block text-sm font-medium text-slate-700 mb-1">Description <span className="text-red-500">*</span></label>
                    <textarea id="achDesc" value={description} onChange={(e) => setDescription(e.target.value)} required rows="4" className="mt-1 block w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors"></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="achDate" className="block text-sm font-medium text-slate-700 mb-1">Date of Achievement</label>
                        <input type="date" id="achDate" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1 block w-full px-4 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors" />
                    </div>
                    <div>
                        <label htmlFor="achImage" className="block text-sm font-medium text-slate-700 mb-1">Image (Optional)</label>
                        <input type="file" id="achImage" accept="image/*" onChange={handleImageChange} className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200 transition-colors cursor-pointer" />
                        {imageUrl && <img src={imageUrl} alt="Preview" className="mt-3 h-36 w-auto rounded-lg object-cover shadow-md border border-slate-200" />}
                    </div>
                </div>
                <div className="flex items-center space-x-4 pt-2">
                    <button type="submit" disabled={isSubmitting} className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 flex items-center shadow-md hover:shadow-lg transition-all">
                        {isSubmitting ? <LoadingSpinner size="h-5 w-5" message="" color="text-white"/> : (editingId ? 'Update Achievement' : 'Add Achievement')}
                        {!isSubmitting && (editingId ? <Edit3 size={18} className="ml-2"/> : <PlusCircle size={18} className="ml-2"/>)}
                    </button>
                    {editingId && <button type="button" onClick={resetForm} className="px-5 py-2.5 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 font-medium transition-colors">Cancel Edit</button>}
                </div>
            </form>

            <h3 className="text-2xl font-semibold mb-6 text-slate-800 border-t pt-8">Current Achievements List</h3>
            {loadingData && achievements.length === 0 && <LoadingSpinner message="Loading achievements..."/>}
            {!loadingData && achievements.length === 0 && <p className="text-slate-500 text-center py-8">No achievements have been added yet.</p>}
            <div className="space-y-5">
                {achievements.map(ach => (
                    <div key={ach.id} className="p-5 border border-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col sm:flex-row justify-between items-start gap-4">
                        <div className="flex-grow">
                            <h4 className="font-semibold text-lg text-indigo-700">{ach.title}</h4>
                            <p className="text-sm text-slate-600 mt-1 mb-2">{ach.description.substring(0,120)}...</p>
                            <div className="text-xs text-slate-500 space-x-3">
                                {ach.date && <span>Date: {new Date(ach.date).toLocaleDateString()}</span>}
                                {ach.clubName && <span className="font-medium text-purple-600">Club: {ach.clubName}</span>}
                            </div>
                             {ach.imageUrl && <img src={ach.imageUrl} alt={ach.title} className="mt-3 h-24 w-auto rounded-md object-cover border border-slate-200"/>}
                        </div>
                        <div className="flex space-x-2 flex-shrink-0 mt-3 sm:mt-0">
                            <button onClick={() => handleEdit(ach)} className="p-2.5 text-blue-600 hover:text-blue-800 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors" title="Edit Achievement"><Edit3 size={20}/></button>
                            <button onClick={() => handleDeleteRequest(ach.id)} className="p-2.5 text-red-600 hover:text-red-800 bg-red-100 hover:bg-red-200 rounded-lg transition-colors" title="Delete Achievement"><Trash2 size={20}/></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};
export default ManageAchievements;
// --- End File: src/pages/CoordinatorDashboard/ManageAchievements.js ---
