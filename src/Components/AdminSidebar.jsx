import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  CgClose, 
  CgMenu,
} from 'react-icons/cg';
import { 
  RiDashboardLine,
  RiCalendarCheckLine,
  RiUserHeartLine,
  RiFileChartLine,
  RiMessage2Line,
  RiSettings4Line,
  RiLogoutCircleRLine,
  RiHospitalLine
} from 'react-icons/ri';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';

function PatientSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth)
      localStorage.removeItem('admin');
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const navItems = [
    { 
      path: '/admin/dashboard', 
      icon: <RiDashboardLine className="text-xl" />, 
      label: 'Dashboard',
      description: 'Overview & Analytics'
    },
    { 
      path: '/admin/appointments', 
      icon: <RiCalendarCheckLine className="text-xl" />, 
      label: 'Appointments',
      description: 'Schedule & Bookings'
    },
    { 
      path: '/admin/patient', 
      icon: <RiUserHeartLine className="text-xl" />, 
      label: 'My Doctors',
      description: 'Records & History'
    },
    { 
      path: '/admin/report', 
      icon: <RiFileChartLine className="text-xl" />, 
      label: 'Reports',
      description: 'Medical Analytics'
    },
    { 
      path: '/admin/message', 
      icon: <RiMessage2Line className="text-xl" />, 
      label: 'Messages',
      description: 'Communications'
    },
    { 
      path: '/admin/settings', 
      icon: <RiSettings4Line className="text-xl" />, 
      label: 'Settings',
      description: 'Preferences'
    },
  ];

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-teal-600 text-white hover:bg-teal-700"
      >
        {isOpen ? <CgClose size={24} /> : <CgMenu size={24} />}
      </button>

      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-gray-900 bg-opacity-50 z-30 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside 
        className={`
          fixed lg:static
          inset-y-0 left-0
          w-72 lg:w-80
          bg-gradient-to-b from-teal-600 to-teal-800
          text-white 
          flex 
          flex-col 
          z-40
          transform
          transition-transform
          duration-300
          ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
          shadow-xl
        `}
      >
        {/* Logo Section */}
        <div className="p-6 border-b border-teal-500/30">
          <div className="flex items-center space-x-3">
            <RiHospitalLine className="text-3xl text-teal-300" />
            <div>
              <h2 className="text-2xl font-bold tracking-wider">MEDICARE</h2>
              <p className="text-xs text-teal-200">Healthcare Management System</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`
                    flex items-center 
                    p-3
                    rounded-lg 
                    transition-all
                    duration-200
                    group
                    ${isActivePath(item.path) 
                      ? 'bg-white/10 text-white shadow-lg' 
                      : 'hover:bg-white/5 text-teal-100 hover:text-white'
                    }
                  `}
                  onClick={() => window.innerWidth < 1024 && setIsOpen(false)}
                >
                  <div className="flex items-center flex-1">
                    <span className={`
                      p-2 rounded-lg 
                      ${isActivePath(item.path) 
                        ? 'bg-teal-500/20 text-teal-200' 
                        : 'text-teal-300 group-hover:text-teal-200'
                      }
                    `}>
                      {item.icon}
                    </span>
                    <div className="ml-3">
                      <p className="font-medium">{item.label}</p>
                      <p className="text-xs text-teal-300/80">{item.description}</p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer with Sign Out */}
        <div className="p-4 border-t border-teal-500/30">
          <button
            onClick={handleSignOut}
            className="
              flex items-center 
              justify-center
              space-x-2 
              p-3 
              rounded-lg 
              bg-red-500/10
              hover:bg-red-500/20 
              text-red-100
              transition-colors 
              w-full
              group
            "
          >
            <RiLogoutCircleRLine className="text-xl group-hover:rotate-180 transition-transform duration-300" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default PatientSidebar;