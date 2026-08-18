import React, { useState } from 'react';
import Swal from 'sweetalert2';
import StatusBadge from '../../components/StatusBadge';
import { getErrorMessage } from '../../api/client';
import { useData } from '../../context/DataContext';

const GenerateVisitorPass = () => {
  const { generateVisitorPass } = useData();
  const [visitorName, setVisitorName] = useState(''); const [phone, setPhone] = useState(''); const [vehicleNumber, setVehicleNumber] = useState(''); const [pass, setPass] = useState(null);
  const submit = async (event) => { event.preventDefault(); try { const result = await generateVisitorPass({ visitorName, phone, vehicleNumber }); setPass(result); setVisitorName(''); setPhone(''); setVehicleNumber(''); Swal.fire({ icon: 'success', title: 'Gate pass generated', html: `Pass code: <strong>${result.passCode}</strong>` }); } catch (error) { Swal.fire({ icon: 'error', title: 'Could not generate pass', text: getErrorMessage(error) }); } };
  return <div><div className="mb-4"><h2 className="fw-bold mb-1">Generate Visitor Pass</h2><p className="text-muted mb-0">Create a gate pass for an upcoming visitor.</p></div><div className="row g-4"><div className="col-lg-7"><div className="society-card"><form onSubmit={submit} className="row g-3"><div className="col-md-6"><label className="form-label">VISITOR NAME</label><input required className="form-control" value={visitorName} onChange={(e) => setVisitorName(e.target.value)} /></div><div className="col-md-6"><label className="form-label">PHONE</label><input required className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} /></div><div className="col-md-6"><label className="form-label">VEHICLE NUMBER</label><input className="form-control" value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} /></div><div className="col-12 text-end"><button className="btn btn-society-red">Generate Gate Pass</button></div></form></div></div><div className="col-lg-5"><div className="society-card h-100"><h3 className="society-card-title">Latest Generated Pass</h3>{pass ? <div className="gate-pass-box"><div className="gate-pass-code">{pass.passCode}</div><p><strong>Visitor:</strong> {pass.visitorName}</p><p><strong>Flat:</strong> {pass.flat}</p><StatusBadge status={pass.status} /></div> : <p className="text-muted">Your generated pass will appear here.</p>}</div></div></div></div>;
};
export default GenerateVisitorPass;
