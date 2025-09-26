import React, { useState } from 'react';
import { Bell, Map, AlertTriangle, User, TrendingDown, Download, BarChart3, LineChart, Database, Code } from 'lucide-react';

// Main App Component
const App = () => {
  // State to track the current view/role
  const [currentView, setCurrentView] = useState('roleSelection');
  const [selectedStation, setSelectedStation] = useState(null);

  // Function to handle role selection
  const handleRoleSelect = (role) => {
    setCurrentView(role);
  };

  // Render the appropriate view based on state
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {currentView === 'roleSelection' && (
        <RoleSelection onRoleSelect={handleRoleSelect} />
      )}
      {currentView === 'farmer' && (
        <FarmerDashboard 
          onStationClick={setSelectedStation} 
          selectedStation={selectedStation}
          setSelectedStation={setSelectedStation}
        />
      )}
      {currentView === 'researcher' && (
        <ResearcherDashboard />
      )}
    </div>
  );
};

// Role Selection Component
const RoleSelection = ({ onRoleSelect }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-blue-800">
        GatiSanchar - Real-Time Groundwater Intelligence
      </h1>
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-2xl">
        <button
          onClick={() => onRoleSelect('researcher')}
          className="flex-1 p-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-lg transition-all transform hover:scale-105"
        >
          <h2 className="text-xl font-semibold mb-2">Researcher / Planner</h2>
          <p className="text-sm opacity-80">Access detailed analytics and research tools</p>
        </button>
        <button
          onClick={() => onRoleSelect('farmer')}
          className="flex-1 p-6 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-lg transition-all transform hover:scale-105"
        >
          <h2 className="text-xl font-semibold mb-2">Farmer / General User</h2>
          <p className="text-sm opacity-80">View local water levels and alerts</p>
        </button>
      </div>
    </div>
  );
};

// Farmer Dashboard Component
const FarmerDashboard = ({ onStationClick, selectedStation, setSelectedStation }) => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('map');
  // State for selected area on map
  const [selectedArea, setSelectedArea] = useState(null);
  // State for alerts
  const [alerts, setAlerts] = useState([
    { id: 1, title: 'Critical Water Level', message: 'Station 458-2 has reached critical level', date: '2023-10-15' },
    { id: 2, title: 'Weekly Report', message: 'Your area shows declining water levels', date: '2023-10-12' },
    { id: 3, title: 'Conservation Tips', message: 'New water conservation tips available', date: '2023-10-10' },
  ]);

  // Mock data for DWLR stations
  const stations = [
    { id: '458-2', lat: 28.7, lng: 77.1, status: 'critical', level: 15.2, area: 'North Delhi', depth: 120, trend: 'declining', lastUpdated: '2023-10-15' },
    { id: '321-5', lat: 19.1, lng: 72.9, status: 'safe', level: 42.8, area: 'Mumbai Suburban', depth: 85, trend: 'stable', lastUpdated: '2023-10-14' },
    { id: '567-1', lat: 13.1, lng: 80.3, status: 'caution', level: 28.5, area: 'Chennai Central', depth: 95, trend: 'declining', lastUpdated: '2023-10-15' },
    { id: '789-3', lat: 22.6, lng: 88.4, status: 'safe', level: 35.1, area: 'Kolkata East', depth: 110, trend: 'improving', lastUpdated: '2023-10-13' },
    { id: '234-7', lat: 17.4, lng: 78.5, status: 'critical', level: 12.3, area: 'Hyderabad West', depth: 130, trend: 'declining', lastUpdated: '2023-10-15' },
    { id: '654-9', lat: 26.8, lng: 80.9, status: 'caution', level: 22.7, area: 'Lucknow Central', depth: 100, trend: 'stable', lastUpdated: '2023-10-14' },
    { id: '876-2', lat: 30.7, lng: 76.7, status: 'safe', level: 38.4, area: 'Chandigarh', depth: 90, trend: 'improving', lastUpdated: '2023-10-13' },
    { id: '543-8', lat: 23.2, lng: 77.4, status: 'critical', level: 10.9, area: 'Bhopal North', depth: 140, trend: 'declining', lastUpdated: '2023-10-15' },
  ];

  // Mock profile data
  const profileData = {
    name: 'Rajesh Kumar',
    location: 'Jaipur, Rajasthan',
    farmSize: '5 acres',
    crops: ['Wheat', 'Rice', 'Vegetables'],
    waterUsage: '120,000 liters/month',
    registeredDate: '2022-05-15',
    notifications: 'Enabled',
    preferredLanguage: 'Hindi'
  };

  // Mock weather data
  const weatherData = {
    current: {
      temp: 32,
      condition: 'Sunny',
      humidity: 65,
      windSpeed: 12
    },
    forecast: [
      { day: 'Today', temp: 32, condition: 'Sunny', precipitation: '0%' },
      { day: 'Tomorrow', temp: 30, condition: 'Partly Cloudy', precipitation: '20%' },
      { day: 'Wed', temp: 29, condition: 'Cloudy', precipitation: '40%' },
      { day: 'Thu', temp: 28, condition: 'Rain', precipitation: '80%' },
      { day: 'Fri', temp: 30, condition: 'Partly Cloudy', precipitation: '30%' }
    ]
  };

  // Mock resources data
  const resourcesData = [
    { id: 1, title: 'Water Conservation Techniques', type: 'PDF', date: '2023-09-10', size: '2.5 MB' },
    { id: 2, title: 'Sustainable Farming Guide', type: 'Video', date: '2023-08-22', size: '15 MB' },
    { id: 3, title: 'Groundwater Management', type: 'PDF', date: '2023-10-05', size: '1.8 MB' },
    { id: 4, title: 'Crop Selection Based on Water Availability', type: 'PDF', date: '2023-07-18', size: '3.2 MB' },
    { id: 5, title: 'Rainwater Harvesting Tutorial', type: 'Video', date: '2023-06-30', size: '22 MB' }
  ];

  // Function to handle area selection
  const handleAreaSelect = (area) => {
    setSelectedArea(area);
  };

  return (
    <div className="flex flex-col min-h-screen relative pb-16">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-xl font-semibold text-blue-800">GatiSanchar</h1>
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-full hover:bg-gray-100 relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
              {alerts.length}
            </span>
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <User size={20} />
          </button>
        </div>
      </header>

      {/* Main Content - Based on active tab */}
      <main className="flex-1 p-4 overflow-auto">
        {activeTab === 'map' && (
          <div className="bg-white rounded-lg shadow-md p-4 h-full relative">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium">Groundwater Monitoring Stations</h2>
              <div className="flex space-x-2">
                <select 
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                  onChange={(e) => handleAreaSelect(e.target.value)}
                  value={selectedArea || ''}
                >
                  <option value="">Select Area</option>
                  <option value="North Delhi">North Delhi</option>
                  <option value="Mumbai Suburban">Mumbai Suburban</option>
                  <option value="Chennai Central">Chennai Central</option>
                  <option value="Kolkata East">Kolkata East</option>
                  <option value="Hyderabad West">Hyderabad West</option>
                </select>
                <button className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-sm hover:bg-blue-200">
                  Filter
                </button>
              </div>
            </div>
            
            {/* Enhanced Interactive Map of India */}
            <div className="relative w-full h-[60vh] border border-gray-200 rounded-lg overflow-hidden">
              <div className="absolute top-2 right-2 z-10 bg-white p-2 rounded-md shadow-md">
                <div className="flex flex-col gap-1">
                  <button className="p-1 text-xs bg-blue-100 hover:bg-blue-200 rounded" title="Zoom In">+</button>
                  <button className="p-1 text-xs bg-blue-100 hover:bg-blue-200 rounded" title="Zoom Out">-</button>
                  <button className="p-1 text-xs bg-blue-100 hover:bg-blue-200 rounded" title="Reset View">↺</button>
                </div>
              </div>
              
              <div className="absolute bottom-2 left-2 z-10 bg-white/80 p-2 rounded-md shadow-md">
                <div className="text-xs font-semibold mb-1">Legend</div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
                  <span className="text-xs">Safe</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-3 h-3 rounded-full bg-yellow-500"></span>
                  <span className="text-xs">Caution</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block w-3 h-3 rounded-full bg-red-500"></span>
                  <span className="text-xs">Critical</span>
                </div>
              </div>
              
              <svg viewBox="0 0 400 400" className="w-full h-full">
                {/* Enhanced India map outline with clickable regions */}
                <defs>
                  <pattern id="water-pattern" patternUnits="userSpaceOnUse" width="10" height="10">
                    <path d="M0,5 Q2.5,0 5,5 T10,5" fill="none" stroke="#99ccff" strokeWidth="1"/>
                  </pattern>
                </defs>
                
                <path 
                  d="M100,50 L150,40 L200,50 L250,40 L300,60 L320,100 L330,150 L320,200 L330,250 L300,300 L250,320 L200,330 L150,320 L120,300 L100,250 L80,200 L70,150 L80,100 Z" 
                  fill="url(#water-pattern)" 
                  stroke="#3388ff" 
                  strokeWidth="2"
                />
                
                {/* North Region - Enhanced */}
                <path 
                  d="M150,40 L200,50 L250,40 L250,100 L200,120 L150,100 Z" 
                  fill={selectedArea === 'North Delhi' ? '#bbdefb' : 'rgba(187, 222, 251, 0.3)'} 
                  stroke="#3388ff" 
                  strokeWidth="1.5"
                  className="cursor-pointer hover:fill-blue-200 transition-colors duration-200"
                  onClick={() => handleAreaSelect('North Delhi')}
                />
                
                {/* West Region - Enhanced */}
                <path 
                  d="M100,50 L150,100 L150,200 L100,250 L80,200 L70,150 L80,100 Z" 
                  fill={selectedArea === 'Mumbai Suburban' ? '#bbdefb' : 'rgba(187, 222, 251, 0.3)'} 
                  stroke="#3388ff" 
                  strokeWidth="1.5"
                  className="cursor-pointer hover:fill-blue-200 transition-colors duration-200"
                  onClick={() => handleAreaSelect('Mumbai Suburban')}
                />
                
                {/* South Region - Enhanced */}
                <path 
                  d="M150,200 L200,220 L250,200 L250,250 L200,280 L150,250 Z" 
                  fill={selectedArea === 'Chennai Central' ? '#bbdefb' : 'rgba(187, 222, 251, 0.3)'} 
                  stroke="#3388ff" 
                  strokeWidth="1.5"
                  className="cursor-pointer hover:fill-blue-200 transition-colors duration-200"
                  onClick={() => handleAreaSelect('Chennai Central')}
                />
                
                {/* East Region - Enhanced */}
                <path 
                  d="M250,100 L300,60 L320,100 L320,200 L250,200 L250,150 Z" 
                  fill={selectedArea === 'Kolkata East' ? '#bbdefb' : 'rgba(187, 222, 251, 0.3)'} 
                  stroke="#3388ff" 
                  strokeWidth="1.5"
                  className="cursor-pointer hover:fill-blue-200 transition-colors duration-200"
                  onClick={() => handleAreaSelect('Kolkata East')}
                />
                
                {/* Central Region - Enhanced */}
                <path 
                  d="M150,100 L250,100 L250,200 L150,200 Z" 
                  fill={selectedArea === 'Hyderabad West' ? '#bbdefb' : 'rgba(187, 222, 251, 0.3)'} 
                  stroke="#3388ff" 
                  strokeWidth="1.5"
                  className="cursor-pointer hover:fill-blue-200 transition-colors duration-200"
                  onClick={() => handleAreaSelect('Hyderabad West')}
                />
                
                {/* Enhanced Station Markers */}
                {stations
                  .filter(station => !selectedArea || station.area === selectedArea)
                  .map((station) => (
                    <g key={station.id} className="cursor-pointer" onClick={() => onStationClick(station)}>
                      <circle
                        cx={station.lng}
                        cy={station.lat}
                        r="8"
                        fill={
                          station.status === 'safe' 
                            ? '#10b981' 
                            : station.status === 'caution' 
                              ? '#f59e0b' 
                              : '#ef4444'
                        }
                        stroke="#fff"
                        strokeWidth="2"
                        className="hover:r-10 transition-all duration-200"
                      />
                      <text
                        x={station.lng}
                        y={station.lat - 12}
                        textAnchor="middle"
                        fill="#333"
                        fontSize="10"
                        fontWeight="bold"
                        className="pointer-events-none"
                      >
                        {station.id}
                      </text>
                    </g>
                ))}
                
                {/* Removed duplicate station markers */}
              </svg>
              
              {/* Map Controls */}
              <div className="absolute top-2 right-2 bg-white rounded-md shadow p-1 flex flex-col space-y-1">
                <button className="p-1 hover:bg-gray-100 rounded">+</button>
                <button className="p-1 hover:bg-gray-100 rounded">−</button>
              </div>
            </div>
            
            <div className="mt-4 flex justify-between items-center">
              <div className="flex space-x-6">
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                  <span className="text-sm">Safe</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
                  <span className="text-sm">Caution</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                  <span className="text-sm">Critical</span>
                </div>
              </div>
              
              {selectedArea && (
                <button 
                  onClick={() => setSelectedArea(null)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Clear Selection
                </button>
              )}
            </div>
          </div>
        )}
        
        {activeTab === 'alerts' && (
          <div className="bg-white rounded-lg shadow-md p-4 h-full">
            <h2 className="text-lg font-medium mb-4">Alerts & Notifications</h2>
            
            {alerts.length > 0 ? (
              <div className="space-y-3">
                {alerts.map(alert => (
                  <div key={alert.id} className="border-l-4 border-yellow-500 bg-yellow-50 p-4 rounded-r-lg">
                    <div className="flex justify-between">
                      <h3 className="font-medium">{alert.title}</h3>
                      <span className="text-xs text-gray-500">{alert.date}</span>
                    </div>
                    <p className="text-sm mt-1">{alert.message}</p>
                    <div className="mt-2 flex justify-end space-x-2">
                      <button className="text-xs text-blue-600 hover:underline">Mark as Read</button>
                      <button className="text-xs text-gray-600 hover:underline">Dismiss</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>No new alerts</p>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'profile' && (
          <div className="bg-white rounded-lg shadow-md p-4 h-full">
            <h2 className="text-lg font-medium mb-4">User Profile</h2>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="bg-blue-100 text-blue-800 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold">
                    {profileData.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-xl font-medium">{profileData.name}</h3>
                    <p className="text-gray-600">{profileData.location}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Farm Size</h4>
                    <p>{profileData.farmSize}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Crops</h4>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {profileData.crops.map((crop, index) => (
                        <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                          {crop}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Average Water Usage</h4>
                    <p>{profileData.waterUsage}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="font-medium mb-3">Water Conservation Tips</h3>
                <ul className="list-disc list-inside space-y-2 text-sm">
                  <li>Consider drip irrigation for your crops</li>
                  <li>Implement rainwater harvesting systems</li>
                  <li>Schedule irrigation during early morning or evening</li>
                  <li>Use mulch to reduce evaporation</li>
                </ul>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-3">Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Receive SMS Alerts</span>
                      <div className="bg-gray-200 rounded-full w-10 h-6 flex items-center p-1">
                        <div className="bg-white w-4 h-4 rounded-full ml-auto"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Email Notifications</span>
                      <div className="bg-blue-600 rounded-full w-10 h-6 flex items-center p-1">
                        <div className="bg-white w-4 h-4 rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Weekly Reports</span>
                      <div className="bg-blue-600 rounded-full w-10 h-6 flex items-center p-1">
                        <div className="bg-white w-4 h-4 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {activeTab === 'weather' && (
          <div className="bg-white rounded-lg shadow-md p-4 h-full">
            <h2 className="text-lg font-medium mb-4">Weather Information</h2>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 bg-gradient-to-br from-blue-400 to-blue-600 text-white p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-bold">{weatherData.current.temp}°C</h3>
                    <p>{weatherData.current.condition}</p>
                    <div className="mt-4 text-sm">
                      <p>Humidity: {weatherData.current.humidity}%</p>
                      <p>Wind: {weatherData.current.windSpeed} km/h</p>
                    </div>
                  </div>
                  <div className="text-5xl">
                    {weatherData.current.condition === 'Sunny' ? '☀️' : 
                     weatherData.current.condition === 'Partly Cloudy' ? '⛅' : 
                     weatherData.current.condition === 'Cloudy' ? '☁️' : '🌧️'}
                  </div>
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="font-medium mb-3">5-Day Forecast</h3>
                <div className="space-y-2">
                  {weatherData.forecast.map((day, index) => (
                    <div key={index} className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                      <span className="font-medium">{day.day}</span>
                      <div className="flex items-center">
                        <span className="mr-2">
                          {day.condition === 'Sunny' ? '☀️' : 
                           day.condition === 'Partly Cloudy' ? '⛅' : 
                           day.condition === 'Cloudy' ? '☁️' : '🌧️'}
                        </span>
                        <span>{day.temp}°C</span>
                      </div>
                      <span className="text-sm text-blue-600">{day.precipitation}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <h4 className="text-sm font-medium text-blue-800">Water Conservation Advisory</h4>
                  <p className="text-xs mt-1">Based on the forecast, consider adjusting your irrigation schedule. Expected rainfall may reduce water needs later this week.</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'resources' && (
          <div className="bg-white rounded-lg shadow-md p-4 h-full">
            <h2 className="text-lg font-medium mb-4">Resources & Learning</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {resourcesData.map((resource) => (
                    <tr key={resource.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{resource.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`px-2 py-1 rounded-full text-xs ${resource.type === 'PDF' ? 'bg-red-100 text-red-800' : 'bg-purple-100 text-purple-800'}`}>
                          {resource.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{resource.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{resource.size}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900">Download</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6">
              <h3 className="font-medium mb-3">Request Resources</h3>
              <div className="flex space-x-2">
                <input 
                  type="text" 
                  placeholder="What topic are you interested in?" 
                  className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}

      {/* Bottom Navigation */}
      <nav className="bg-white shadow-lg border-t border-gray-200 fixed bottom-0 left-0 right-0 flex justify-around p-3">
        <button 
          onClick={() => setActiveTab('map')}
          className={`flex flex-col items-center p-2 rounded-md ${activeTab === 'map' ? 'text-blue-600' : 'text-gray-600'}`}
        >
          <Map size={20} />
          <span className="text-xs mt-1">Map</span>
        </button>
        <button 
          onClick={() => setActiveTab('alerts')}
          className={`flex flex-col items-center p-2 rounded-md ${activeTab === 'alerts' ? 'text-blue-600' : 'text-gray-600'}`}
        >
          <AlertTriangle size={20} />
          <span className="text-xs mt-1">Alerts</span>
        </button>
        <button 
          onClick={() => setActiveTab('weather')}
          className={`flex flex-col items-center p-2 rounded-md ${activeTab === 'weather' ? 'text-blue-600' : 'text-gray-600'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
          </svg>
          <span className="text-xs mt-1">Weather</span>
        </button>
        <button 
          onClick={() => setActiveTab('resources')}
          className={`flex flex-col items-center p-2 rounded-md ${activeTab === 'resources' ? 'text-blue-600' : 'text-gray-600'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>
          </svg>
          <span className="text-xs mt-1">Resources</span>
        </button>
        <button 
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center p-2 rounded-md ${activeTab === 'profile' ? 'text-blue-600' : 'text-gray-600'}`}
        >
          <User size={20} />
          <span className="text-xs mt-1">Profile</span>
        </button>
      </nav>

      {/* Station Detail Modal */}
      {selectedStation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold">Station Details</h3>
              <button 
                onClick={() => setSelectedStation(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Location:</span>
                <span className="font-medium">Well ID {selectedStation.id} ({selectedStation.area})</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Current Level:</span>
                <span className="font-medium">{selectedStation.level} meters</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Weekly Trend:</span>
                <div className="flex items-center text-red-500">
                  <span className="font-medium mr-1">Falling</span>
                  <TrendingDown size={16} />
                </div>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Prediction:</span>
                <span className="font-medium text-red-500">Critical level possible in 2 weeks.</span>
              </div>
              
              {/* Mock Line Chart */}
              <div className="mt-4 border border-gray-200 rounded-lg p-3">
                <h4 className="text-sm font-medium mb-2">30-Day Water Level Trend</h4>
                <svg viewBox="0 0 200 100" className="w-full h-24">
                  <polyline
                    points="0,50 20,48 40,52 60,45 80,40 100,42 120,35 140,30 160,25 180,15 200,10"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="2"
                  />
                  <line x1="0" y1="90" x2="200" y2="90" stroke="#e5e7eb" />
                  <text x="0" y="98" fontSize="8" fill="#6b7280">30 days ago</text>
                  <text x="180" y="98" fontSize="8" fill="#6b7280">Today</text>
                </svg>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-sm font-medium mb-2">Recommendations</h4>
                <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
                  <li>Reduce irrigation frequency</li>
                  <li>Consider alternative water sources</li>
                  <li>Monitor daily for changes</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 flex space-x-3">
              <button 
                className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
              >
                Download Data
              </button>
              <button 
                onClick={() => setSelectedStation(null)}
                className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Researcher Dashboard Component
const ResearcherDashboard = () => {
  // State for active section
  const [activeSection, setActiveSection] = useState('dashboard');
  
  // Mock data for stations
  const stationStatuses = {
    safe: 3200,
    caution: 1560,
    critical: 500
  };
  
  // Mock data for regional trends
  const regionalTrends = [
    { month: 'Jan', level: 42 },
    { month: 'Feb', level: 40 },
    { month: 'Mar', level: 38 },
    { month: 'Apr', level: 36 },
    { month: 'May', level: 34 },
    { month: 'Jun', level: 32 },
    { month: 'Jul', level: 30 },
    { month: 'Aug', level: 28 },
    { month: 'Sep', level: 26 },
    { month: 'Oct', level: 24 },
    { month: 'Nov', level: 22 },
    { month: 'Dec', level: 20 },
  ];
  
  // Mock data for stations table
  const stationsData = [
    { id: 'DWL-001', district: 'Jaipur', state: 'Rajasthan', level: 15.2, trend: 'falling', status: 'critical' },
    { id: 'DWL-002', district: 'Ahmedabad', state: 'Gujarat', level: 42.8, trend: 'stable', status: 'safe' },
    { id: 'DWL-003', district: 'Chennai', state: 'Tamil Nadu', level: 28.5, trend: 'falling', status: 'caution' },
    { id: 'DWL-004', district: 'Pune', state: 'Maharashtra', level: 35.1, trend: 'rising', status: 'safe' },
    { id: 'DWL-005', district: 'Lucknow', state: 'Uttar Pradesh', level: 12.3, trend: 'falling', status: 'critical' },
    { id: 'DWL-006', district: 'Bhopal', state: 'Madhya Pradesh', level: 22.7, trend: 'stable', status: 'caution' },
    { id: 'DWL-007', district: 'Patna', state: 'Bihar', level: 31.5, trend: 'falling', status: 'caution' },
    { id: 'DWL-008', district: 'Kochi', state: 'Kerala', level: 45.2, trend: 'rising', status: 'safe' },
  ];
  
  // Mock data for raw data section
  const rawDataSets = [
    { id: 1, name: 'National Groundwater Dataset 2023', format: 'CSV', size: '1.2 GB', lastUpdated: '2023-10-01', records: '4.5 million' },
    { id: 2, name: 'Historical Trends (2010-2022)', format: 'Excel', size: '450 MB', lastUpdated: '2023-09-15', records: '1.8 million' },
    { id: 3, name: 'Seasonal Variations Analysis', format: 'CSV', size: '780 MB', lastUpdated: '2023-08-22', records: '2.3 million' },
    { id: 4, name: 'Regional Aquifer Mapping', format: 'GeoJSON', size: '350 MB', lastUpdated: '2023-07-30', records: '125,000' },
    { id: 5, name: 'Water Quality Indicators', format: 'CSV', size: '620 MB', lastUpdated: '2023-09-28', records: '1.5 million' },
  ];
  
  // Mock data for API endpoints
  const apiEndpoints = [
    { id: 1, name: 'Station Data', endpoint: '/api/v1/stations', method: 'GET', parameters: 'region, status, limit', description: 'Retrieve station information with filtering options' },
    { id: 2, name: 'Water Levels', endpoint: '/api/v1/levels', method: 'GET', parameters: 'station_id, from_date, to_date', description: 'Historical water level data for specified stations' },
    { id: 3, name: 'Predictions', endpoint: '/api/v1/predictions', method: 'GET', parameters: 'station_id, days', description: 'ML-based predictions for future water levels' },
    { id: 4, name: 'Regional Stats', endpoint: '/api/v1/regions/stats', method: 'GET', parameters: 'region_id, metrics', description: 'Aggregated statistics by geographical region' },
    { id: 5, name: 'Alerts', endpoint: '/api/v1/alerts', method: 'GET', parameters: 'severity, region, limit', description: 'Current active alerts for water levels' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar (desktop only) */}
      <aside className="hidden md:block w-64 bg-blue-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">GatiSanchar</h2>
        <nav className="space-y-2">
          <button 
            onClick={() => setActiveSection('dashboard')}
            className={`flex items-center space-x-2 p-2 w-full text-left ${activeSection === 'dashboard' ? 'bg-blue-700' : 'hover:bg-blue-700'} rounded`}
          >
            <BarChart3 size={18} />
            <span>Dashboard</span>
          </button>
          <button 
            onClick={() => setActiveSection('rawData')}
            className={`flex items-center space-x-2 p-2 w-full text-left ${activeSection === 'rawData' ? 'bg-blue-700' : 'hover:bg-blue-700'} rounded`}
          >
            <Database size={18} />
            <span>Raw Data</span>
          </button>
          <button 
            onClick={() => setActiveSection('analytics')}
            className={`flex items-center space-x-2 p-2 w-full text-left ${activeSection === 'analytics' ? 'bg-blue-700' : 'hover:bg-blue-700'} rounded`}
          >
            <LineChart size={18} />
            <span>Analytics</span>
          </button>
          <button 
            onClick={() => setActiveSection('apiAccess')}
            className={`flex items-center space-x-2 p-2 w-full text-left ${activeSection === 'apiAccess' ? 'bg-blue-700' : 'hover:bg-blue-700'} rounded`}
          >
            <Code size={18} />
            <span>API Access</span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Researcher Dashboard</h1>
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Download size={16} />
            <span>Download Report</span>
          </button>
        </header>

        {/* Dashboard Content - Based on active section */}
        <main className="p-4">
          {activeSection === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Widget 1: National Overview Map */}
              <div className="bg-white p-4 rounded-lg shadow col-span-1 md:col-span-2 lg:col-span-1">
                <h2 className="text-lg font-medium mb-3">National Overview</h2>
                <div className="border border-gray-200 rounded-lg p-2 h-64 relative">
                  {/* Simplified India map */}
                  <svg viewBox="0 0 400 400" className="w-full h-full">
                    <path 
                      d="M100,50 L150,40 L200,50 L250,40 L300,60 L320,100 L330,150 L320,200 L330,250 L300,300 L250,320 L200,330 L150,320 L120,300 L100,250 L80,200 L70,150 L80,100 Z" 
                      fill="#e6f2ff" 
                      stroke="#99ccff" 
                      strokeWidth="2"
                    />
                    
                    {/* Sample station dots */}
                    <circle cx="150" cy="150" r="4" fill="#10b981" />
                    <circle cx="200" cy="100" r="4" fill="#10b981" />
                    <circle cx="250" cy="150" r="4" fill="#f59e0b" />
                    <circle cx="150" cy="200" r="4" fill="#ef4444" />
                    <circle cx="200" cy="250" r="4" fill="#10b981" />
                    <circle cx="250" cy="200" r="4" fill="#f59e0b" />
                  </svg>
                </div>
              </div>

              {/* Widget 2: Station Status Breakdown */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-medium mb-3">Station Status Breakdown</h2>
                <div className="h-64 flex flex-col justify-center">
                  {/* Bar chart */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Safe</span>
                        <span>{stationStatuses.safe}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div className="bg-green-500 h-4 rounded-full" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Caution</span>
                        <span>{stationStatuses.caution}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div className="bg-yellow-500 h-4 rounded-full" style={{ width: '30%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Critical</span>
                        <span>{stationStatuses.critical}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4">
                        <div className="bg-red-500 h-4 rounded-full" style={{ width: '10%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Widget 3: Regional Trend Analysis */}
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-medium mb-3">Regional Trend Analysis</h2>
                <div className="h-64 flex flex-col justify-center">
                  <h3 className="text-sm text-gray-500 mb-2">Average Water Level (meters)</h3>
                  {/* Line chart */}
                  <svg viewBox="0 0 300 150" className="w-full">
                    {/* X-axis */}
                    <line x1="30" y1="120" x2="280" y2="120" stroke="#e5e7eb" strokeWidth="1" />
                    
                    {/* Y-axis */}
                    <line x1="30" y1="20" x2="30" y2="120" stroke="#e5e7eb" strokeWidth="1" />
                    
                    {/* Data points */}
                    <polyline
                      points="
                        30,20
                        50,25
                        70,30
                        90,35
                        110,40
                        130,45
                        150,50
                        170,60
                        190,70
                        210,80
                        230,90
                        250,100
                      "
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="2"
                    />
                    
                    {/* X-axis labels (months) */}
                    {regionalTrends.map((data, index) => (
                      <text
                        key={data.month}
                        x={30 + index * 20}
                        y="135"
                        fontSize="8"
                        textAnchor="middle"
                        fill="#6b7280"
                      >
                        {data.month.substring(0, 1)}
                      </text>
                    ))}
                    
                    {/* Y-axis labels */}
                    <text x="20" y="25" fontSize="8" textAnchor="end" fill="#6b7280">45</text>
                    <text x="20" y="50" fontSize="8" textAnchor="end" fill="#6b7280">35</text>
                    <text x="20" y="75" fontSize="8" textAnchor="end" fill="#6b7280">25</text>
                    <text x="20" y="100" fontSize="8" textAnchor="end" fill="#6b7280">15</text>
                    <text x="20" y="125" fontSize="8" textAnchor="end" fill="#6b7280">5</text>
                  </svg>
                </div>
              </div>

              {/* Widget 4: Data Table */}
              <div className="bg-white p-4 rounded-lg shadow col-span-1 md:col-span-2 lg:col-span-3">
                <h2 className="text-lg font-medium mb-3">Station Data</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Station ID</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">District</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Level (m)</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weekly Trend</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {stationsData.map((station) => (
                        <tr key={station.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{station.id}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{station.district}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{station.state}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{station.level}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{station.trend}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${station.status === 'safe' ? 'bg-green-100 text-green-800' : 
                                station.status === 'caution' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-red-100 text-red-800'}`}>
                              {station.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Raw Data Section */}
          {activeSection === 'rawData' && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Raw Data Access</h2>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                    <Download size={16} className="mr-2" />
                    <span>Download All</span>
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center">
                    <span>Filter</span>
                  </button>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-gray-600 mb-4">
                  Access comprehensive groundwater monitoring data collected from DWLR stations across India. 
                  These datasets are updated regularly and available in multiple formats for research and analysis.
                </p>
                
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-700">
                        Data usage is subject to our terms and conditions. Please cite GatiSanchar as the source in your research publications.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dataset Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Format</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Records</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {rawDataSets.map((dataset) => (
                      <tr key={dataset.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{dataset.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dataset.format}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dataset.size}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dataset.lastUpdated}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{dataset.records}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-blue-600 hover:text-blue-800 mr-3">Download</button>
                          <button className="text-gray-600 hover:text-gray-800">Preview</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-8 bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-3">Custom Data Request</h3>
                <p className="text-sm text-gray-600 mb-4">Need a specific dataset or format? Submit a custom data request and our team will process it for you.</p>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                    New Request
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
                    View Previous Requests
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Section */}
          {activeSection === 'analytics' && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Analytics Tools</h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Generate Report
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-3">Trend Analysis</h3>
                  <p className="text-sm text-gray-600 mb-4">Analyze historical trends and patterns in groundwater levels across different regions.</p>
                  
                  <div className="h-64 border border-gray-200 rounded-lg bg-white p-4 mb-4">
                    {/* Placeholder for trend chart */}
                    <svg viewBox="0 0 400 200" className="w-full h-full">
                      <path d="M50,150 L100,100 L150,125 L200,75 L250,100 L300,50 L350,75" fill="none" stroke="#3b82f6" strokeWidth="2" />
                      <line x1="50" y1="150" x2="350" y2="150" stroke="#e5e7eb" strokeWidth="1" />
                      <line x1="50" y1="150" x2="50" y2="50" stroke="#e5e7eb" strokeWidth="1" />
                      <text x="50" y="170" fontSize="10" textAnchor="middle">Jan</text>
                      <text x="100" y="170" fontSize="10" textAnchor="middle">Feb</text>
                      <text x="150" y="170" fontSize="10" textAnchor="middle">Mar</text>
                      <text x="200" y="170" fontSize="10" textAnchor="middle">Apr</text>
                      <text x="250" y="170" fontSize="10" textAnchor="middle">May</text>
                      <text x="300" y="170" fontSize="10" textAnchor="middle">Jun</text>
                      <text x="350" y="170" fontSize="10" textAnchor="middle">Jul</text>
                    </svg>
                  </div>
                  
                  <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Open Trend Analyzer
                  </button>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-3">Comparative Analysis</h3>
                  <p className="text-sm text-gray-600 mb-4">Compare groundwater data across different regions, time periods, or against rainfall patterns.</p>
                  
                  <div className="h-64 border border-gray-200 rounded-lg bg-white p-4 mb-4">
                    {/* Placeholder for comparison chart */}
                    <svg viewBox="0 0 400 200" className="w-full h-full">
                      <rect x="50" y="50" width="40" height="100" fill="#3b82f6" />
                      <rect x="100" y="75" width="40" height="75" fill="#3b82f6" />
                      <rect x="150" y="100" width="40" height="50" fill="#3b82f6" />
                      <rect x="200" y="25" width="40" height="125" fill="#3b82f6" />
                      <rect x="250" y="75" width="40" height="75" fill="#3b82f6" />
                      <rect x="300" y="50" width="40" height="100" fill="#3b82f6" />
                      <line x1="50" y1="150" x2="340" y2="150" stroke="#e5e7eb" strokeWidth="1" />
                    </svg>
                  </div>
                  
                  <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Open Comparison Tool
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-8">
                <h3 className="text-lg font-medium mb-3">Predictive Modeling</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Access our machine learning models to predict future groundwater levels based on historical data and environmental factors.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <h4 className="font-medium text-sm mb-2">Short-term Forecast</h4>
                    <p className="text-xs text-gray-600">7-30 day predictions</p>
                    <div className="mt-2 text-right">
                      <button className="text-blue-600 text-sm hover:underline">Run Model</button>
                    </div>
                  </div>
                  
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <h4 className="font-medium text-sm mb-2">Seasonal Forecast</h4>
                    <p className="text-xs text-gray-600">1-6 month predictions</p>
                    <div className="mt-2 text-right">
                      <button className="text-blue-600 text-sm hover:underline">Run Model</button>
                    </div>
                  </div>
                  
                  <div className="bg-white p-3 rounded border border-gray-200">
                    <h4 className="font-medium text-sm mb-2">Long-term Forecast</h4>
                    <p className="text-xs text-gray-600">1-5 year projections</p>
                    <div className="mt-2 text-right">
                      <button className="text-blue-600 text-sm hover:underline">Run Model</button>
                    </div>
                  </div>
                </div>
                
                <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Advanced Modeling Options
                </button>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium mb-3">Export Options</h3>
                <p className="text-sm text-gray-600 mb-4">Export your analysis results in various formats for presentations or further research.</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button className="p-3 bg-white border border-gray-200 rounded hover:bg-gray-50 flex flex-col items-center">
                    <span className="text-sm font-medium">PDF Report</span>
                  </button>
                  <button className="p-3 bg-white border border-gray-200 rounded hover:bg-gray-50 flex flex-col items-center">
                    <span className="text-sm font-medium">Excel</span>
                  </button>
                  <button className="p-3 bg-white border border-gray-200 rounded hover:bg-gray-50 flex flex-col items-center">
                    <span className="text-sm font-medium">CSV</span>
                  </button>
                  <button className="p-3 bg-white border border-gray-200 rounded hover:bg-gray-50 flex flex-col items-center">
                    <span className="text-sm font-medium">Images</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* API Access Section */}
          {activeSection === 'apiAccess' && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">API Documentation</h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Get API Key
                </button>
              </div>
              
              <div className="mb-8">
                <p className="text-gray-600 mb-4">
                  Our REST API provides programmatic access to groundwater data for integration with your applications.
                  All endpoints return data in JSON format and require authentication via API key.
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h3 className="text-md font-medium mb-2">Base URL</h3>
                  <div className="bg-gray-800 text-green-400 p-3 rounded font-mono text-sm">
                    https://api.gatisanchar.gov.in/v1
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <h3 className="text-md font-medium mb-2">Authentication</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Include your API key in the request header:
                  </p>
                  <div className="bg-gray-800 text-green-400 p-3 rounded font-mono text-sm">
                    Authorization: Bearer YOUR_API_KEY
                  </div>
                </div>
              </div>
              
              <h3 className="text-lg font-medium mb-4">Available Endpoints</h3>
              
              <div className="space-y-6">
                {apiEndpoints.map((endpoint) => (
                  <div key={endpoint.id} className="border border-gray-200 rounded-lg">
                    <div className="bg-gray-50 p-4 flex justify-between items-center">
                      <div>
                        <span className={`inline-block px-2 py-1 text-xs font-bold rounded mr-3 ${
                          endpoint.method === 'GET' ? 'bg-green-100 text-green-800' : 
                          endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {endpoint.method}
                        </span>
                        <span className="font-medium">{endpoint.name}</span>
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        Try it
                      </button>
                    </div>
                    
                    <div className="p-4">
                      <div className="font-mono text-sm mb-3 text-gray-800">
                        {endpoint.endpoint}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        {endpoint.description}
                      </p>
                      <div className="bg-gray-50 p-3 rounded">
                        <h4 className="text-xs font-medium text-gray-500 uppercase mb-2">Parameters</h4>
                        <p className="text-sm font-mono">{endpoint.parameters}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      Need help with API integration? Check our <a href="#" className="font-medium underline">developer guides</a> or <a href="#" className="font-medium underline">contact support</a>.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;