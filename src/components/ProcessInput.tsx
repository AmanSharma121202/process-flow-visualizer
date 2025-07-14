
import React, { useState } from 'react';
import { Process } from '../types/scheduling';

interface ProcessInputProps {
  onAddProcess: (process: Process) => void;
}

export const ProcessInput: React.FC<ProcessInputProps> = ({ onAddProcess }) => {
  const [processName, setProcessName] = useState('');
  const [arrivalTime, setArrivalTime] = useState<number>(0);
  const [burstTime, setBurstTime] = useState<number>(1);
  const [priority, setPriority] = useState<number>(1);
  const [processCounter, setProcessCounter] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newProcess: Process = {
      id: `P${processCounter}`,
      name: processName || `P${processCounter}`,
      arrivalTime,
      burstTime,
      priority,
    };

    onAddProcess(newProcess);
    
    // Reset form with next process name
    setProcessCounter(processCounter + 1);
    setProcessName('');
    setArrivalTime(0);
    setBurstTime(1);
    setPriority(1);
  };

  const generateRandomProcesses = () => {
    const randomProcesses: Process[] = [];
    const numProcesses = Math.floor(Math.random() * 4) + 3; // 3-6 processes
    
    for (let i = 0; i < numProcesses; i++) {
      randomProcesses.push({
        id: `P${processCounter + i}`,
        name: `P${processCounter + i}`,
        arrivalTime: Math.floor(Math.random() * 8),
        burstTime: Math.floor(Math.random() * 8) + 1,
        priority: Math.floor(Math.random() * 5) + 1,
      });
    }
    
    randomProcesses.forEach(process => onAddProcess(process));
    setProcessCounter(processCounter + numProcesses);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Add Process</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Process Name
          </label>
          <input
            type="text"
            value={processName}
            onChange={(e) => setProcessName(e.target.value)}
            placeholder={`P${processCounter}`}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Arrival Time
            </label>
            <input
              type="number"
              min="0"
              value={arrivalTime}
              onChange={(e) => setArrivalTime(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Burst Time
            </label>
            <input
              type="number"
              min="1"
              value={burstTime}
              onChange={(e) => setBurstTime(parseInt(e.target.value) || 1)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Priority (1 = Highest)
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={priority}
            onChange={(e) => setPriority(parseInt(e.target.value) || 1)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
        >
          Add Process
        </button>
      </form>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <button
          onClick={generateRandomProcesses}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
        >
          Generate Random Processes
        </button>
      </div>
    </div>
  );
};
