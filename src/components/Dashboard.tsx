
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

interface DashboardProps {
  file: File;
  data: any;
}

// Mock data for visualization
const statusCodeData = [
  { name: '200 OK', value: 12450, color: '#10b981' },
  { name: '404 Not Found', value: 2134, color: '#f59e0b' },
  { name: '500 Error', value: 523, color: '#ef4444' },
  { name: '301 Redirect', value: 740, color: '#8b5cf6' },
];

const trafficData = [
  { hour: '00:00', requests: 245 },
  { hour: '04:00', requests: 123 },
  { hour: '08:00', requests: 1456 },
  { hour: '12:00', requests: 2341 },
  { hour: '16:00', requests: 1987 },
  { hour: '20:00', requests: 1234 },
];

const topEndpoints = [
  { endpoint: '/api/users', hits: 4523, method: 'GET' },
  { endpoint: '/login', hits: 3421, method: 'POST' },
  { endpoint: '/dashboard', hits: 2876, method: 'GET' },
  { endpoint: '/api/orders', hits: 2134, method: 'GET' },
  { endpoint: '/logout', hits: 1876, method: 'POST' },
];

const topIPs = [
  { ip: '192.168.1.15', requests: 532, country: 'United States' },
  { ip: '10.0.0.25', requests: 487, country: 'United Kingdom' },
  { ip: '172.16.0.8', requests: 421, country: 'Canada' },
  { ip: '192.168.0.12', requests: 398, country: 'Germany' },
  { ip: '10.1.1.5', requests: 356, country: 'France' },
];

const Dashboard = ({ file, data }: DashboardProps) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold mb-2">Analysis Results</h2>
          <p className="text-muted-foreground">File: {file.name}</p>
        </div>
        <Badge variant="outline" className="bg-success/10 text-success border-success/20">
          Analysis Complete
        </Badge>
      </div>

      {/* Charts Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Status Codes Distribution */}
        <Card className="chart-container">
          <h3 className="text-xl font-semibold mb-4">HTTP Status Codes</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={statusCodeData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {statusCodeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Traffic Over Time */}
        <Card className="chart-container">
          <h3 className="text-xl font-semibold mb-4">Traffic Patterns</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trafficData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Line 
                type="monotone" 
                dataKey="requests" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Tables Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Top Endpoints */}
        <Card className="analytics-card">
          <h3 className="text-xl font-semibold mb-6">Top Endpoints</h3>
          <div className="space-y-4">
            {topEndpoints.map((endpoint, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Badge variant={endpoint.method === 'GET' ? 'default' : 'secondary'}>
                    {endpoint.method}
                  </Badge>
                  <span className="font-mono text-sm">{endpoint.endpoint}</span>
                </div>
                <span className="font-semibold text-primary">{endpoint.hits.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Top IPs */}
        <Card className="analytics-card">
          <h3 className="text-xl font-semibold mb-6">Top IP Addresses</h3>
          <div className="space-y-4">
            {topIPs.map((ip, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                <div>
                  <span className="font-mono text-sm block">{ip.ip}</span>
                  <span className="text-xs text-muted-foreground">{ip.country}</span>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-primary block">{ip.requests}</span>
                  <span className="text-xs text-muted-foreground">requests</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Method Distribution */}
      <Card className="chart-container">
        <h3 className="text-xl font-semibold mb-4">HTTP Methods Distribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={[
            { method: 'GET', count: 11234 },
            { method: 'POST', count: 3421 },
            { method: 'PUT', count: 876 },
            { method: 'DELETE', count: 234 },
            { method: 'PATCH', count: 82 },
          ]}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="method" stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default Dashboard;
