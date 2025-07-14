
import React from 'react';

interface AlgorithmSelectorProps {
  selectedAlgorithm: string;
  onAlgorithmChange: (algorithm: string) => void;
  timeQuantum: number;
  onTimeQuantumChange: (quantum: number) => void;
}

export const AlgorithmSelector: React.FC<AlgorithmSelectorProps> = ({
  selectedAlgorithm,
  onAlgorithmChange,
  timeQuantum,
  onTimeQuantumChange,
}) => {
  const algorithms = [
    { id: 'fcfs', name: 'First Come First Serve', description: 'Processes are executed in arrival order' },
    { id: 'sjf', name: 'Shortest Job First', description: 'Shortest burst time process first' },
    { id: 'priority', name: 'Priority Scheduling', description: 'Higher priority processes first' },
    { id: 'rr', name: 'Round Robin', description: 'Time quantum based execution' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Algorithm</h3>
      
      <div className="space-y-3">
        {algorithms.map((algorithm) => (
          <div
            key={algorithm.id}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedAlgorithm === algorithm.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            onClick={() => onAlgorithmChange(algorithm.id)}
          >
            <div className="flex items-center">
              <input
                type="radio"
                id={algorithm.id}
                name="algorithm"
                value={algorithm.id}
                checked={selectedAlgorithm === algorithm.id}
                onChange={() => onAlgorithmChange(algorithm.id)}
                className="mr-3 text-blue-600"
              />
              <div>
                <label htmlFor={algorithm.id} className="font-medium text-gray-800 cursor-pointer">
                  {algorithm.name}
                </label>
                <p className="text-sm text-gray-600">{algorithm.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedAlgorithm === 'rr' && (
        <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time Quantum
          </label>
          <input
            type="number"
            min="1"
            max="10"
            value={timeQuantum}
            onChange={(e) => onTimeQuantumChange(parseInt(e.target.value) || 1)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-600 mt-1">
            Each process gets {timeQuantum} time unit(s) before being preempted
          </p>
        </div>
      )}
    </div>
  );
};
