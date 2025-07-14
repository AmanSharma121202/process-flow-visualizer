
import React from 'react';
import { SchedulingResult } from '../types/scheduling';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface MetricsDisplayProps {
  result: SchedulingResult;
}

export const MetricsDisplay: React.FC<MetricsDisplayProps> = ({ result }) => {
  const chartData = result.processMetrics.map(metric => ({
    name: metric.processName,
    waitingTime: metric.waitingTime,
    turnaroundTime: metric.turnaroundTime,
    responseTime: metric.responseTime,
    burstTime: metric.burstTime,
  }));

  const pieData = [
    { name: 'CPU Utilization', value: result.totalTime, fill: '#3B82F6' },
    { name: 'Idle Time', value: 0, fill: '#E5E7EB' }
  ];

  const COLORS = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444'];

  return (
    <div className="space-y-6">
      {/* Process Metrics Table */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Process Metrics</h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Process
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Arrival Time
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Burst Time
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Completion Time
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Waiting Time
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Turnaround Time
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Response Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {result.processMetrics.map((metric, index) => (
                <tr key={metric.processId} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {metric.processName}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {metric.arrivalTime}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {metric.burstTime}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {metric.completionTime}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {metric.waitingTime}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {metric.turnaroundTime}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {metric.responseTime}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Time Comparison Chart */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Time Comparison</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="waitingTime" fill="#3B82F6" name="Waiting Time" />
              <Bar dataKey="turnaroundTime" fill="#8B5CF6" name="Turnaround Time" />
              <Bar dataKey="responseTime" fill="#10B981" name="Response Time" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Summary Statistics */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Performance Summary</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="font-medium text-blue-800">Average Waiting Time</span>
              <span className="text-2xl font-bold text-blue-600">
                {result.averageWaitingTime.toFixed(2)}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <span className="font-medium text-purple-800">Average Turnaround Time</span>
              <span className="text-2xl font-bold text-purple-600">
                {result.averageTurnaroundTime.toFixed(2)}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="font-medium text-green-800">Average Response Time</span>
              <span className="text-2xl font-bold text-green-600">
                {result.averageResponseTime.toFixed(2)}
              </span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
              <span className="font-medium text-yellow-800">Total Execution Time</span>
              <span className="text-2xl font-bold text-yellow-600">
                {result.totalTime}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
