
import { Process, SchedulingResult, GanttChartItem, ProcessMetrics } from '../types/scheduling';

const PROCESS_COLORS = [
  '#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', 
  '#EF4444', '#6366F1', '#14B8A6', '#F97316'
];

export function firstComeFirstServe(processes: Process[]): SchedulingResult {
  const sortedProcesses = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
  const ganttChart: GanttChartItem[] = [];
  const processMetrics: ProcessMetrics[] = [];
  let currentTime = 0;

  sortedProcesses.forEach((process, index) => {
    const startTime = Math.max(currentTime, process.arrivalTime);
    const endTime = startTime + process.burstTime;
    
    ganttChart.push({
      processId: process.id,
      processName: process.name,
      startTime,
      endTime,
      color: PROCESS_COLORS[index % PROCESS_COLORS.length]
    });

    const waitingTime = startTime - process.arrivalTime;
    const turnaroundTime = endTime - process.arrivalTime;
    
    processMetrics.push({
      processId: process.id,
      processName: process.name,
      arrivalTime: process.arrivalTime,
      burstTime: process.burstTime,
      waitingTime,
      turnaroundTime,
      completionTime: endTime,
      responseTime: waitingTime
    });

    currentTime = endTime;
  });

  return calculateAverages({ ganttChart, processMetrics });
}

export function shortestJobFirst(processes: Process[]): SchedulingResult {
  const ganttChart: GanttChartItem[] = [];
  const processMetrics: ProcessMetrics[] = [];
  const remainingProcesses = [...processes];
  let currentTime = 0;
  let colorIndex = 0;

  while (remainingProcesses.length > 0) {
    // Find available processes
    const availableProcesses = remainingProcesses.filter(p => p.arrivalTime <= currentTime);
    
    if (availableProcesses.length === 0) {
      // No process available, jump to next arrival
      currentTime = Math.min(...remainingProcesses.map(p => p.arrivalTime));
      continue;
    }

    // Select shortest job
    const shortestJob = availableProcesses.reduce((shortest, current) =>
      current.burstTime < shortest.burstTime ? current : shortest
    );

    const startTime = currentTime;
    const endTime = startTime + shortestJob.burstTime;

    ganttChart.push({
      processId: shortestJob.id,
      processName: shortestJob.name,
      startTime,
      endTime,
      color: PROCESS_COLORS[colorIndex % PROCESS_COLORS.length]
    });

    const waitingTime = startTime - shortestJob.arrivalTime;
    const turnaroundTime = endTime - shortestJob.arrivalTime;

    processMetrics.push({
      processId: shortestJob.id,
      processName: shortestJob.name,
      arrivalTime: shortestJob.arrivalTime,
      burstTime: shortestJob.burstTime,
      waitingTime,
      turnaroundTime,
      completionTime: endTime,
      responseTime: waitingTime
    });

    currentTime = endTime;
    colorIndex++;
    
    // Remove processed job
    const index = remainingProcesses.findIndex(p => p.id === shortestJob.id);
    remainingProcesses.splice(index, 1);
  }

  return calculateAverages({ ganttChart, processMetrics });
}

export function priorityScheduling(processes: Process[]): SchedulingResult {
  const ganttChart: GanttChartItem[] = [];
  const processMetrics: ProcessMetrics[] = [];
  const remainingProcesses = [...processes];
  let currentTime = 0;
  let colorIndex = 0;

  while (remainingProcesses.length > 0) {
    const availableProcesses = remainingProcesses.filter(p => p.arrivalTime <= currentTime);
    
    if (availableProcesses.length === 0) {
      currentTime = Math.min(...remainingProcesses.map(p => p.arrivalTime));
      continue;
    }

    // Select highest priority (lower number = higher priority)
    const highestPriorityJob = availableProcesses.reduce((highest, current) =>
      (current.priority || 0) < (highest.priority || 0) ? current : highest
    );

    const startTime = currentTime;
    const endTime = startTime + highestPriorityJob.burstTime;

    ganttChart.push({
      processId: highestPriorityJob.id,
      processName: highestPriorityJob.name,
      startTime,
      endTime,
      color: PROCESS_COLORS[colorIndex % PROCESS_COLORS.length]
    });

    const waitingTime = startTime - highestPriorityJob.arrivalTime;
    const turnaroundTime = endTime - highestPriorityJob.arrivalTime;

    processMetrics.push({
      processId: highestPriorityJob.id,
      processName: highestPriorityJob.name,
      arrivalTime: highestPriorityJob.arrivalTime,
      burstTime: highestPriorityJob.burstTime,
      waitingTime,
      turnaroundTime,
      completionTime: endTime,
      responseTime: waitingTime
    });

    currentTime = endTime;
    colorIndex++;
    
    const index = remainingProcesses.findIndex(p => p.id === highestPriorityJob.id);
    remainingProcesses.splice(index, 1);
  }

  return calculateAverages({ ganttChart, processMetrics });
}

export function roundRobin(processes: Process[], timeQuantum: number): SchedulingResult {
  const ganttChart: GanttChartItem[] = [];
  const processMetrics: ProcessMetrics[] = [];
  const processQueue: (Process & { remainingTime: number; firstResponse?: number })[] = 
    processes.map(p => ({ ...p, remainingTime: p.burstTime }));
  
  const readyQueue: typeof processQueue = [];
  let currentTime = 0;
  let completedProcesses = 0;
  const processColors = new Map<string, string>();
  let colorIndex = 0;

  // Assign colors to processes
  processes.forEach(process => {
    processColors.set(process.id, PROCESS_COLORS[colorIndex % PROCESS_COLORS.length]);
    colorIndex++;
  });

  while (completedProcesses < processes.length) {
    // Add newly arrived processes to ready queue
    processQueue.forEach(process => {
      if (process.arrivalTime <= currentTime && 
          process.remainingTime > 0 && 
          !readyQueue.find(p => p.id === process.id)) {
        readyQueue.push(process);
      }
    });

    if (readyQueue.length === 0) {
      // No process in ready queue, jump to next arrival
      const nextArrival = processQueue
        .filter(p => p.remainingTime > 0)
        .reduce((min, p) => Math.min(min, p.arrivalTime), Infinity);
      currentTime = nextArrival;
      continue;
    }

    const currentProcess = readyQueue.shift()!;
    const executionTime = Math.min(timeQuantum, currentProcess.remainingTime);
    
    // Record first response time
    if (currentProcess.firstResponse === undefined) {
      currentProcess.firstResponse = currentTime - currentProcess.arrivalTime;
    }

    ganttChart.push({
      processId: currentProcess.id,
      processName: currentProcess.name,
      startTime: currentTime,
      endTime: currentTime + executionTime,
      color: processColors.get(currentProcess.id)!
    });

    currentTime += executionTime;
    currentProcess.remainingTime -= executionTime;

    if (currentProcess.remainingTime === 0) {
      // Process completed
      const waitingTime = currentTime - currentProcess.arrivalTime - currentProcess.burstTime;
      const turnaroundTime = currentTime - currentProcess.arrivalTime;

      processMetrics.push({
        processId: currentProcess.id,
        processName: currentProcess.name,
        arrivalTime: currentProcess.arrivalTime,
        burstTime: currentProcess.burstTime,
        waitingTime,
        turnaroundTime,
        completionTime: currentTime,
        responseTime: currentProcess.firstResponse || 0
      });

      completedProcesses++;
    } else {
      // Add newly arrived processes before re-adding current process
      processQueue.forEach(process => {
        if (process.arrivalTime <= currentTime && 
            process.remainingTime > 0 && 
            !readyQueue.find(p => p.id === process.id) &&
            process.id !== currentProcess.id) {
          readyQueue.push(process);
        }
      });
      
      // Re-add current process to end of queue
      readyQueue.push(currentProcess);
    }
  }

  return calculateAverages({ ganttChart, processMetrics });
}

function calculateAverages({ ganttChart, processMetrics }: { 
  ganttChart: GanttChartItem[]; 
  processMetrics: ProcessMetrics[] 
}): SchedulingResult {
  const totalProcesses = processMetrics.length;
  const averageWaitingTime = processMetrics.reduce((sum, p) => sum + p.waitingTime, 0) / totalProcesses;
  const averageTurnaroundTime = processMetrics.reduce((sum, p) => sum + p.turnaroundTime, 0) / totalProcesses;
  const averageResponseTime = processMetrics.reduce((sum, p) => sum + p.responseTime, 0) / totalProcesses;
  const totalTime = ganttChart.length > 0 ? Math.max(...ganttChart.map(g => g.endTime)) : 0;

  return {
    ganttChart,
    processMetrics,
    averageWaitingTime,
    averageTurnaroundTime,
    averageResponseTime,
    totalTime
  };
}
