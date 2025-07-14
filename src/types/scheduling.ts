
export interface Process {
  id: string;
  name: string;
  arrivalTime: number;
  burstTime: number;
  priority?: number;
  remainingTime?: number;
}

export interface GanttChartItem {
  processId: string;
  processName: string;
  startTime: number;
  endTime: number;
  color: string;
}

export interface ProcessMetrics {
  processId: string;
  processName: string;
  arrivalTime: number;
  burstTime: number;
  waitingTime: number;
  turnaroundTime: number;
  completionTime: number;
  responseTime: number;
}

export interface SchedulingResult {
  ganttChart: GanttChartItem[];
  processMetrics: ProcessMetrics[];
  averageWaitingTime: number;
  averageTurnaroundTime: number;
  averageResponseTime: number;
  totalTime: number;
}

export type SchedulingAlgorithm = 'fcfs' | 'sjf' | 'priority' | 'rr';
