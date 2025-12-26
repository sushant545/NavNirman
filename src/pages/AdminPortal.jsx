import React, { useState, useMemo } from 'react';
import { User, Lock, Calendar, CheckCircle, DollarSign, Users, Briefcase, ChevronDown, Search, Filter, FileText } from 'lucide-react';

// YOUR CORRECT WEB APP URL
const API_URL = 'https://script.google.com/macros/s/AKfycbyA8NjJ03yjJIOHQNRFeFAaq85EHKoMkVjPnONxJRW2z7BmEcpRKnWQipW9o94gDvkccA/exec';

const AdminPortal = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Data Store
  const [employees, setEmployees] = useState([]);
  const [attendanceLogs, setAttendanceLogs] = useState([]);
  const [transactionLogs, setTransactionLogs] = useState([]);
  
  const [activeTab, setActiveTab] = useState('attendance'); // 'attendance', 'payroll', 'detail'

  // --- 1. ADMIN LOGIN ---
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify({ action: 'adminLogin', password: password })
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        setIsAdmin(true);
        fetchData(); 
      } else { setError("Invalid Password"); }
    })
    .catch(() => setError("Connection Failed"))
    .finally(() => setLoading(false));
  };

  // --- 2. FETCH DATA ---
  const fetchData = () => {
    setLoading(true);
    fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify({ action: 'getData' })
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        setEmployees(data.employees);
        setAttendanceLogs(data.attendance_logs);
        setTransactionLogs(data.transaction_logs);
      }
    })
    .finally(() => setLoading(false));
  };

  // --- 3. CALCULATE LIVE PAYROLL STATS ---
  const payrollStats = useMemo(() => {
    return employees.map(emp => {
      // Sum earnings for this employee
      const totalEarned = attendanceLogs
        .filter(log => String(log.emp_id) === String(emp.id))
        .reduce((sum, log) => sum + (log.earnings || 0), 0);

      // Sum advances/payments for this employee
      const totalPaid = transactionLogs
        .filter(log => String(log.emp_id) === String(emp.id))
        .reduce((sum, log) => sum + (log.amount || 0), 0);

      return {
        id: emp.id,
        name: emp.name,
        total_earnings: totalEarned,
        total_paid: totalPaid,
        balance: totalEarned - totalPaid
      };
    });
  }, [employees, attendanceLogs, transactionLogs]);

  // --- 4. GLOBAL STATS ---
  const totalDue = payrollStats.reduce((acc, curr) => acc + curr.balance, 0);
  const totalPaid = payrollStats.reduce((acc, curr) => acc + curr.total_paid, 0);

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 pt-40">
        <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center">
          <div className="mb-6 bg-brand-gold/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-brand-gold">
            <Lock size={32} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">NavNirman Admin</h1>
          <p className="text-gray-500 text-sm mb-6">Restricted Access</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="password" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold outline-none" placeholder="Admin Password" value={password} onChange={e => setPassword(e.target.value)} />
            {error && <p className="text-red-500 text-xs font-bold">{error}</p>}
            <button disabled={loading} className="w-full bg-brand-dark text-white font-bold py-3 rounded-lg hover:bg-gray-800 transition-all">{loading ? 'Verifying...' : 'Access Dashboard'}</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-36">
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-36 z-20">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="text-brand-gold" size={24} />
            <span className="font-bold text-gray-900 tracking-tight">Admin Console</span>
          </div>
          <button onClick={() => setIsAdmin(false)} className="text-xs font-bold text-gray-500 hover:text-red-600">LOGOUT</button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatBox label="Active Staff" value={employees.length} icon={<Users size={18} />} />
          <StatBox label="Total Due" value={`₹${totalDue.toLocaleString()}`} icon={<DollarSign size={18} />} color="text-red-600" />
          <StatBox label="Total Paid" value={`₹${totalPaid.toLocaleString()}`} icon={<CheckCircle size={18} />} color="text-green-600" />
          <StatBox label="Pending OT" value="--" icon={<Calendar size={18} />} />
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-gray-200 mb-6 overflow-x-auto">
          {['attendance', 'payroll', 'detail'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 px-3 text-sm font-bold border-b-2 transition-colors capitalize whitespace-nowrap ${activeTab === tab ? 'border-brand-gold text-brand-dark' : 'border-transparent text-gray-400'}`}
            >
              {tab === 'detail' ? 'Employee Details' : tab === 'attendance' ? 'Mark Attendance' : 'Payroll Overview'}
            </button>
          ))}
        </div>

        {activeTab === 'attendance' && <AttendanceForm employees={employees} apiUrl={API_URL} />}
        {activeTab === 'payroll' && <PayrollTable payrollStats={payrollStats} />}
        {activeTab === 'detail' && <EmployeeDetailView employees={employees} attendanceLogs={attendanceLogs} transactionLogs={transactionLogs} />}

      </div>
    </div>
  );
};

// --- SUB COMPONENTS ---

const StatBox = ({ label, value, icon, color = "text-gray-900" }) => (
  <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
    <div className="flex justify-between items-start mb-2">
      <span className="text-gray-400 text-[10px] font-bold uppercase">{label}</span>
      <span className="text-brand-gold">{icon}</span>
    </div>
    <div className={`text-2xl font-bold ${color}`}>{value}</div>
  </div>
);

const PayrollTable = ({ payrollStats }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 font-bold text-gray-500">Employee</th>
            <th className="px-6 py-4 font-bold text-gray-500 text-right">Total Earnings</th>
            <th className="px-6 py-4 font-bold text-gray-500 text-right">Paid/Advance</th>
            <th className="px-6 py-4 font-bold text-gray-500 text-right">Balance Due</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {payrollStats.map((stat, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              <td className="px-6 py-4 font-medium text-gray-900">{stat.name} <span className="text-gray-400 text-xs ml-1">({stat.id})</span></td>
              <td className="px-6 py-4 text-right">₹{stat.total_earnings.toLocaleString()}</td>
              <td className="px-6 py-4 text-right text-green-600">₹{stat.total_paid.toLocaleString()}</td>
              <td className={`px-6 py-4 text-right font-bold ${stat.balance > 0 ? 'text-red-600' : 'text-gray-400'}`}>
                ₹{stat.balance.toLocaleString()}
              </td>
            </tr>
          ))}
          {payrollStats.length === 0 && (
            <tr><td colSpan="4" className="text-center py-8 text-gray-400">No data found</td></tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

// ✅ NEW: GRANULAR EMPLOYEE DETAIL VIEW
const EmployeeDetailView = ({ employees, attendanceLogs, transactionLogs }) => {
  const [selectedEmp, setSelectedEmp] = useState('');
  const [siteFilter, setSiteFilter] = useState('All');
  const [monthFilter, setMonthFilter] = useState(new Date().getMonth()); // Default to current month (0-11)

  // 1. FILTER EMPLOYEES
  const uniqueSites = useMemo(() => ['All', ...new Set(employees.map(e => e.current_site || 'Unassigned'))], [employees]);
  
  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => siteFilter === 'All' || emp.current_site === siteFilter);
  }, [employees, siteFilter]);

  // 2. CALCULATE MONTHLY STATS FOR SELECTED EMPLOYEE
  const empStats = useMemo(() => {
    if (!selectedEmp) return null;
    
    // Filter logs by Employee AND Month
    const monthlyAttendance = attendanceLogs.filter(log => {
      const logDate = new Date(log.date);
      return String(log.emp_id) === String(selectedEmp) && logDate.getMonth() === Number(monthFilter);
    });

    const totalEarned = monthlyAttendance.reduce((sum, log) => sum + (log.earnings || 0), 0);
    
    // Calculate Advances (assuming transactionLogs has dates)
    const totalAdvance = transactionLogs
      .filter(log => String(log.emp_id) === String(selectedEmp)) // Add month check if trans has dates
      .reduce((sum, log) => sum + (log.amount || 0), 0);

    return { totalEarned, totalAdvance, logs: monthlyAttendance };
  }, [selectedEmp, monthFilter, attendanceLogs, transactionLogs]);

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className="space-y-6">
      {/* Filters Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase mb-1">Filter Site</label>
          <select className="w-full p-2 bg-gray-50 rounded-lg text-sm border border-gray-200" value={siteFilter} onChange={e => setSiteFilter(e.target.value)}>
             {uniqueSites.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="flex-[2]">
          <label className="text-[10px] font-bold text-gray-400 uppercase mb-1">Select Employee</label>
          <select className="w-full p-2 bg-gray-50 rounded-lg text-sm border border-gray-200" value={selectedEmp} onChange={e => setSelectedEmp(e.target.value)}>
             <option value="">-- Select --</option>
             {filteredEmployees.map(e => <option key={e.id} value={e.id}>{e.name} ({e.current_site})</option>)}
          </select>
        </div>
        <div className="flex-1">
          <label className="text-[10px] font-bold text-gray-400 uppercase mb-1">Select Month</label>
          <select className="w-full p-2 bg-gray-50 rounded-lg text-sm border border-gray-200" value={monthFilter} onChange={e => setMonthFilter(Number(e.target.value))}>
             {months.map((m, i) => <option key={i} value={i}>{m}</option>)}
          </select>
        </div>
      </div>

      {selectedEmp && empStats ? (
        <>
          {/* Monthly Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <p className="text-xs font-bold text-blue-400 uppercase">Monthly Earnings</p>
              <p className="text-2xl font-bold text-blue-900">₹{empStats.totalEarned.toLocaleString()}</p>
            </div>
            <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
              <p className="text-xs font-bold text-orange-400 uppercase">Advances Taken</p>
              <p className="text-2xl font-bold text-orange-900">₹{empStats.totalAdvance.toLocaleString()}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-xl border border-green-100">
              <p className="text-xs font-bold text-green-400 uppercase">Net Payable (As of now)</p>
              <p className="text-2xl font-bold text-green-900">₹{(empStats.totalEarned - empStats.totalAdvance).toLocaleString()}</p>
            </div>
          </div>

          {/* Detailed Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 font-bold text-gray-700">
              Detailed Log for {months[monthFilter]}
            </div>
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-500">
                 <tr>
                   <th className="px-6 py-3">Date</th>
                   <th className="px-6 py-3">Location</th>
                   <th className="px-6 py-3">Status</th>
                   <th className="px-6 py-3 text-right">Daily Earning</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {empStats.logs.length > 0 ? (
                  empStats.logs.map((log, idx) => (
                    <tr key={idx}>
                      <td className="px-6 py-3 font-medium">{new Date(log.date).toLocaleDateString()}</td>
                      <td className="px-6 py-3">{log.location}</td>
                      <td className="px-6 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${log.status === 'Present' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {log.status}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-right font-bold">₹{log.earnings}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="4" className="text-center py-6 text-gray-400">No attendance records found for this month</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300 text-gray-400">
          Select an Employee to view details
        </div>
      )}
    </div>
  );
};

const AttendanceForm = ({ employees, apiUrl }) => {
  const [selectedEmp, setSelectedEmp] = useState('');
  const [siteFilter, setSiteFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    location: 'Factory',
    status: 'Present',
    reg_hours: 8,
    ot_hours: 0
  });
  const [msg, setMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const uniqueSites = useMemo(() => {
    if (!employees.length) return ['All'];
    return ['All', ...new Set(employees.map(e => e.current_site || 'Unassigned'))];
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchesSite = siteFilter === 'All' || emp.current_site === siteFilter;
      const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (emp.current_site && emp.current_site.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesSite && matchesSearch;
    });
  }, [employees, siteFilter, searchQuery]);

  const handleSubmit = () => {
    if (!selectedEmp) { setMsg('⚠️ Select an employee'); return; }
    setSubmitting(true);
    setMsg('');

    try {
      const employeeData = employees.find(e => String(e.id) === String(selectedEmp));
      if (!employeeData) throw new Error("Employee not found.");

      const payload = {
        action: 'markAttendance',
        emp_id: selectedEmp,
        emp_name: employeeData.name,
        rate_factory: employeeData.rate_factory,
        rate_offsite: employeeData.rate_offsite,
        rate_ot: employeeData.rate_ot,
        ...formData
      };

      fetch(apiUrl, { 
        method: 'POST',
        redirect: "follow",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload) 
      })
      .then(res => res.json())
      .then(data => {
        if(data.status === 'success') setMsg(`✅ Marked: ${employeeData.name}`);
        else setMsg('❌ Failed: ' + data.message);
      })
      .catch(() => setMsg('❌ Network Error'))
      .finally(() => setSubmitting(false));

    } catch (error) {
      setMsg('❌ Error: ' + error.message);
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 md:p-8 max-w-2xl mx-auto">
      <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
        <CheckCircle className="text-green-500" size={20} /> Daily Entry
      </h2>

      <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6 space-y-4">
        <div>
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1 flex items-center gap-1">
             <Filter size={10} /> Filter by Site
          </label>
          <div className="flex flex-wrap gap-2">
            {uniqueSites.map(site => (
              <button
                key={site}
                onClick={() => setSiteFilter(site)}
                className={`px-3 py-1.5 text-xs font-bold rounded-full border transition-all ${
                  siteFilter === site 
                  ? 'bg-brand-gold text-brand-dark border-brand-gold shadow-sm' 
                  : 'bg-white text-gray-500 border-gray-200 hover:border-brand-gold'
                }`}
              >
                {site}
              </button>
            ))}
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={16} />
          <input 
            type="text"
            placeholder="Search by Name or Site..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-brand-gold outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
            Select Employee ({filteredEmployees.length})
          </label>
          <div className="relative">
            <select className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl appearance-none outline-none focus:ring-2 focus:ring-brand-gold font-bold text-gray-700" value={selectedEmp} onChange={(e) => setSelectedEmp(e.target.value)}>
              <option value="">-- Choose from {filteredEmployees.length} Results --</option>
              {filteredEmployees.map(emp => <option key={emp.id} value={emp.id}>{emp.name} — {emp.current_site} ({emp.role})</option>)}
            </select>
            <ChevronDown className="absolute right-4 top-4 text-gray-400 pointer-events-none" size={20} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Date</label>
            <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="input-field" />
          </div>
          <div>
            <label className="label">Location</label>
            <div className="flex bg-gray-50 p-1 rounded-lg border border-gray-200">
               {['Factory', 'Offsite'].map(loc => (
                 <button key={loc} onClick={() => setFormData({...formData, location: loc})} className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${formData.location === loc ? 'bg-white shadow text-brand-dark' : 'text-gray-400'}`}>{loc}</button>
               ))}
            </div>
          </div>
        </div>

        <div>
           <label className="label">Work Status</label>
           <div className="flex bg-gray-50 p-1 rounded-lg border border-gray-200">
               {['Present', 'Half-Day', 'Absent'].map(stat => (
                 <button key={stat} onClick={() => setFormData({...formData, status: stat})} className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${formData.status === stat ? 'bg-white shadow text-brand-dark' : 'text-gray-400'}`}>{stat}</button>
               ))}
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
           <div>
             <label className="label">Regular Hours</label>
             <input type="number" value={formData.reg_hours} onChange={e => setFormData({...formData, reg_hours: Number(e.target.value)})} className="input-field" />
           </div>
           <div>
             <label className="label">OT Hours</label>
             <input type="number" value={formData.ot_hours} onChange={e => setFormData({...formData, ot_hours: Number(e.target.value)})} className="input-field text-blue-600" />
           </div>
        </div>

        {msg && <div className={`text-center font-bold p-3 rounded-lg ${msg.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>{msg}</div>}

        <button onClick={handleSubmit} disabled={submitting} className="w-full bg-brand-dark text-white font-bold py-4 rounded-xl hover:bg-brand-gold hover:text-brand-dark transition-all shadow-lg flex justify-center items-center gap-2">
          {submitting ? 'Saving...' : 'Save Attendance Record'}
        </button>
      </div>

      <style>{`
        .label { display: block; font-size: 0.7rem; font-weight: 800; color: #a0aec0; text-transform: uppercase; margin-bottom: 0.5rem; letter-spacing: 0.05em; }
        .input-field { width: 100%; padding: 0.75rem; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 0.75rem; font-weight: 600; outline: none; transition: all; }
        .input-field:focus { border-color: #D4AF37; background: white; }
      `}</style>
    </div>
  );
};

export default AdminPortal;