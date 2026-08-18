import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import api from '../api/client';

const DataContext = createContext();
const dateOnly = (value) => (value ? new Date(value).toISOString().slice(0, 10) : '');
const mapFlat = (flat) => ({ id: flat._id, block: flat.block_name, flatNumber: flat.flat_number, resident: flat.resident_id?.name || 'Unassigned', residentId: flat.resident_id?._id || null, status: flat.resident_id ? 'Occupied' : 'Available' });
const mapBill = (bill) => ({ id: bill._id, flatNumber: bill.flat_id?.flat_number || '-', resident: bill.flat_id?.resident_id?.name || 'Unassigned', amount: bill.amount_due, dueDate: dateOnly(bill.due_date), status: bill.status, type: 'Society Bill' });
const mapComplaint = (item) => ({ id: item._id, resident: item.resident_id?.name || 'Resident', flat: item.resident_id?.flat_id?.flat_number || '-', category: item.category, description: item.description, image: item.image_url, status: item.status, date: dateOnly(item.createdAt) });
const mapVisitor = (item) => ({ id: item._id, visitorName: item.visitor_name, phone: item.phone, flat: item.flat_id?.flat_number || '-', vehicle: item.vehicle_number, entryTime: new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), status: item.status === 'Entered' ? 'Active' : item.status, passCode: item.gate_pass_code, type: item.type });

export const DataProvider = ({ children }) => {
  const [flats, setFlats] = useState([]);
  const [bills, setBills] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [activeVisitors, setActiveVisitors] = useState([]);
  const [residents, setResidents] = useState([]);
  const [dashboardStats, setDashboardStats] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem('society_user') || 'null');
  const loadFlats = useCallback(async () => { const { data } = await api.get('/api/admin/flats'); setFlats(data.data.map(mapFlat)); }, []);
  const loadBills = useCallback(async () => { const url = currentUser?.role === 'Resident' ? `/api/resident/bills?flat_id=${currentUser.flat_id || ''}` : '/api/admin/bills'; const { data } = await api.get(url); setBills(data.data.map(mapBill)); }, [currentUser?.flat_id, currentUser?.role]);
  const loadComplaints = useCallback(async () => { const { data } = await api.get('/api/admin/complaints'); setComplaints(data.data.map(mapComplaint)); }, []);
  const loadVisitors = useCallback(async () => { const { data } = await api.get('/api/guard/visitors'); setActiveVisitors(data.data.map(mapVisitor)); }, []);
  const loadResidents = useCallback(async () => { const { data } = await api.get('/api/users'); setResidents(data.filter((user) => user.role === 'Resident').map((user) => ({ id: user._id, name: user.name, email: user.email, flatId: user.flat_id }))); }, []);
  const loadDashboardStats = useCallback(async () => { const { data } = await api.get('/api/admin/dashboard'); setDashboardStats(data.data); }, []);

  useEffect(() => { (async () => { try {
    if (currentUser?.role === 'Admin') await Promise.all([loadFlats(), loadBills(), loadComplaints(), loadResidents(), loadDashboardStats()]);
    if (currentUser?.role === 'Resident') await loadBills();
    if (currentUser?.role === 'Guard') await Promise.all([loadFlats(), loadVisitors()]);
  } catch (error) { console.error('Unable to load society data:', error); } })(); }, [currentUser?.role, loadBills, loadComplaints, loadDashboardStats, loadFlats, loadResidents, loadVisitors]);

  const addFlat = async ({ block, flatNumber }) => { const { data } = await api.post('/api/admin/flats', { block_name: block, flat_number: flatNumber }); setFlats((items) => [mapFlat(data.data), ...items]); };
  const assignResident = async (flatId, residentId) => { const { data } = await api.put(`/api/admin/flats/${flatId}/assign`, { resident_id: residentId }); setFlats((items) => items.map((item) => item.id === flatId ? mapFlat({ ...data.data, resident_id: residents.find((resident) => resident.id === residentId) ? { _id: residentId, name: residents.find((resident) => resident.id === residentId).name } : data.data.resident_id }) : item)); await Promise.all([loadResidents(), loadDashboardStats()]); };
  const generateBill = async ({ flatId, amount, dueDate }) => { const { data } = await api.post('/api/admin/bills', { flat_id: flatId, amount_due: Number(amount), due_date: dueDate }); setBills((items) => [mapBill(data.data), ...items]); };
  const lodgeComplaint = async ({ category, description, image }) => { const form = new FormData(); form.append('resident_id', currentUser._id); form.append('category', category); form.append('description', description); if (image) form.append('image', image); const { data } = await api.post('/api/resident/complaints', form); setComplaints((items) => [mapComplaint(data.data), ...items]); };
  const updateComplaintStatus = async (id, status) => { const { data } = await api.put(`/api/admin/complaints/${id}`, { status }); setComplaints((items) => items.map((item) => item.id === id ? mapComplaint(data.data) : item)); };
  const bookAmenity = async ({ amenity, date }) => { const { data } = await api.post('/api/resident/amenity', { resident_id: currentUser._id, amenity_name: amenity, booking_date: date }); return data.data; };
  const generateVisitorPass = async ({ visitorName, phone, vehicleNumber }) => { const { data } = await api.post('/api/resident/visitor-pass', { flat_id: currentUser.flat_id, visitor_name: visitorName, phone, vehicle_number: vehicleNumber || '' }); return mapVisitor(data.data); };
  const verifyPass = async (code) => { const { data } = await api.post('/api/guard/verify-pass', { gate_pass_code: code }); await loadVisitors(); return { success: true, pass: mapVisitor(data.data) }; };
  const registerWalkInVisitor = async ({ flatId, visitorName, phone, vehicle }) => { const { data } = await api.post('/api/guard/walk-in', { flat_id: flatId, visitor_name: visitorName, phone, vehicle_number: vehicle }); const item = mapVisitor(data.data); setActiveVisitors((items) => [item, ...items]); return item; };
  const markVisitorExit = async (id) => { await api.post(`/api/guard/exit/${id}`); setActiveVisitors((items) => items.filter((item) => item.id !== id)); };

  return <DataContext.Provider value={{ flats, bills, complaints, activeVisitors, residents, dashboardStats, addFlat, assignResident, generateBill, lodgeComplaint, updateComplaintStatus, bookAmenity, generateVisitorPass, verifyPass, registerWalkInVisitor, markVisitorExit }}>{children}</DataContext.Provider>;
};
export const useData = () => useContext(DataContext);
