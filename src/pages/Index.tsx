
import React, { useState } from 'react';
import { ProcessInput } from '../components/ProcessInput';
import { SchedulerVisualizer } from '../components/SchedulerVisualizer';
import { AlgorithmSelector } from '../components/AlgorithmSelector';
import { MetricsDisplay } from '../components/MetricsDisplay';
import { Process, SchedulingResult } from '../types/scheduling';
import { 
  firstComeFirstServe, 
  shortestJobFirst, 
  priorityScheduling, 
  roundRobin 
} from '../utils/schedulingAlgorithms';

const Index = () => {
  const [processes, setProcesses] = useState<Process[]>([]);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>('fcfs');
  const [timeQuantum, setTimeQuantum] = useState<number>(2);
  const [schedulingResult, setSchedulingResult] = useState<SchedulingResult | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const handleAddProcess = (process: Process) => {
    setProcesses([...processes, process]);
  };

  const handleRemoveProcess = (id: string) => {
    setProcesses(processes.filter(p => p.id !== id));
  };

  const handleClearProcesses = () => {
    setProcesses([]);
    setSchedulingResult(null);
  };

  const runScheduling = () => {
    if (processes.length === 0) return;
    
    setIsRunning(true);
    
    setTimeout(() => {
      let result: SchedulingResult;
      
      switch (selectedAlgorithm) {
        case 'fcfs':
          result = firstComeFirstServe(processes);
          break;
        case 'sjf':
          result = shortestJobFirst(processes);
          break;
        case 'priority':
          result = priorityScheduling(processes);
          break;
        case 'rr':
          result = roundRobin(processes, timeQuantum);
          break;
        default:
          result = firstComeFirstServe(processes);
      }
      
      setSchedulingResult(result);
      setIsRunning(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            CPU Scheduling Algorithm Visualizer
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Visualize and compare different CPU scheduling algorithms including 
            FCFS, SJF, Priority Scheduling, and Round Robin
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Panel - Input */}
          <div className="lg:col-span-1 space-y-6">
            <AlgorithmSelector
              selectedAlgorithm={selectedAlgorithm}
              onAlgorithmChange={setSelectedAlgorithm}
              timeQuantum={timeQuantum}
              onTimeQuantumChange={setTimeQuantum}
            />
            
            <ProcessInput onAddProcess={handleAddProcess} />
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Process Queue ({processes.length})
                </h3>
                <button
                  onClick={handleClearProcesses}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  Clear All
                </button>
              </div>
              
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {processes.map((process) => (
                  <div
                    key={process.id}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex-1">
                      <span className="font-medium">{process.name}</span>
                      <div className="text-sm text-gray-500">
                        AT: {process.arrivalTime}, BT: {process.burstTime}
                        {process.priority !== undefined && `, P: ${process.priority}`}
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveProcess(process.id)}
                      className="text-red-500 hover:text-red-700 ml-2"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              
              <button
                onClick={runScheduling}
                disabled={processes.length === 0 || isRunning}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
              >
                {isRunning ? 'Running...' : 'Run Scheduling'}
              </button>
            </div>
          </div>

          {/* Right Panel - Visualization */}
          <div className="lg:col-span-2 space-y-6">
            <SchedulerVisualizer
              result={schedulingResult}
              algorithm={selectedAlgorithm}
              isRunning={isRunning}
            />
            
            {schedulingResult && (
              <MetricsDisplay result={schedulingResult} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
