/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useEffect, useState } from "react";
import fApp from '../../feathers';
import GanttTask from './GanttTask';

const service = fApp.service('event');

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

const useFetchEvent = () => {
    const [state, setState] = useState([] as GanttTask[]);

    useEffect(() => {
        let cancel = false;

        const init = async () => {
            try {
                const responses = await service.find();
                const res: GanttTask[] = responses.map((r: any) => transformToGantt(r));
                if (!cancel) {
                    setState(res);
                }
            } catch (err) {
                console.error(err);
            }
        }

        init();

        return () => {
            cancel = true;
        };
    }, []);

    return [state];
};

export {
    useFetchEvent
}