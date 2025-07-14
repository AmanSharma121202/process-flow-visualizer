
import React from 'react';
import { SchedulingResult } from '../types/scheduling';
import { Clock, Cpu, Loader } from 'lucide-react';

interface SchedulerVisualizerProps {
  result: SchedulingResult | null;
  algorithm: string;
  isRunning: boolean;
}

export const SchedulerVisualizer: React.FC<SchedulerVisualizerProps> = ({
  result,
  algorithm,
  isRunning,
}) => {
  const algorithmNames = {
    fcfs: 'First Come First Serve',
    sjf: 'Shortest Job First',
    priority: 'Priority Scheduling',
    rr: 'Round Robin',
  };

  if (isRunning) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-center space-x-3">
          <Loader className="w-6 h-6 animate-spin text-blue-600" />
          <span className="text-lg font-medium text-gray-700">
            Running {algorithmNames[algorithm as keyof typeof algorithmNames]} Algorithm...
          </span>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <Cpu className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Visualization Yet</h3>
          <p className="text-gray-600">
            Add some processes and run a scheduling algorithm to see the visualization
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Algorithm Header */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Clock className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-800">
            {algorithmNames[algorithm as keyof typeof algorithmNames]} Visualization
          </h2>
        </div>
        
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {result.averageWaitingTime.toFixed(2)}
            </div>
            <div className="text-sm text-gray-600">Avg Waiting Time</div>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {result.averageTurnaroundTime.toFixed(2)}
            </div>
            <div className="text-sm text-gray-600">Avg Turnaround Time</div>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">
              {result.totalTime}
            </div>
            <div className="text-sm text-gray-600">Total Time</div>
          </div>
        </div>
      </div>

      {/* Gantt Chart */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Gantt Chart</h3>
        
        {/* Custom Gantt Chart Visualization */}
        <div className="mb-4">
          <div className="relative h-20 bg-gray-100 rounded-lg overflow-hidden">
            {result.ganttChart.map((item, index) => {
              const widthPercentage = ((item.endTime - item.startTime) / result.totalTime) * 100;
              const leftPercentage = (item.startTime / result.totalTime) * 100;
              
              return (
                <div
                  key={index}
                  className="absolute h-full flex items-center justify-center text-white font-medium text-sm"
                  style={{
                    backgroundColor: item.color,
                    left: `${leftPercentage}%`,
                    width: `${widthPercentage}%`,
                  }}
                  title={`${item.processName}: ${item.startTime}-${item.endTime}`}
                >
                  {widthPercentage > 8 ? item.processName : ''}
                </div>
              );
            })}
          </div>
          
          {/* Time Scale */}
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            {Array.from({ length: result.totalTime + 1 }, (_, i) => (
              <span key={i} className="text-center" style={{ width: `${100 / result.totalTime}%` }}>
                {i}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Process Execution Order */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Execution Order</h3>
        <div className="flex flex-wrap gap-2">
          {result.ganttChart.map((item, index) => (
            <div
              key={index}
              className="px-4 py-2 rounded-lg text-white font-medium"
              style={{ backgroundColor: item.color }}
            >
              <span className="text-sm">
                {item.processName} ({item.startTime}-{item.endTime})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
