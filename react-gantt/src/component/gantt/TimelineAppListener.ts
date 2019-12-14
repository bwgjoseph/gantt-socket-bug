import fApp from '../../feathers';
import GanttTask from './GanttTask';

declare const gantt: GanttStatic;

const transformToGantt = (event: any): GanttTask => {
  const { id = '' } = event;
  return {
    id,
    text: event.name,
    start_date: new Date(event.start_date),
    duration: event.duration,
    progress: event.progress,
    priority: event.priority
  };
};

const TimelineAppListener = () => {
    const service = fApp.service('event');

    service.on('created',
        (event: any) => {
            console.log('New event created', event);
            if (gantt.isTaskExists(event.id as string)) {
                console.log('created');
            } else {
                gantt.addTask(transformToGantt(event), "root_id");
            }
        }
    );

    service.on('patched', (event: any) => {
      console.log('Existing event patched', event);
      if (gantt.isTaskExists(event.id)) {
        const task = gantt.getTask(event.id);
        task.text = event.name;
        gantt.updateTask(task.id);
      }
    });

    return service;
};

export default TimelineAppListener;