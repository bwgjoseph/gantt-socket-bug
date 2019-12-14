/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState, useEffect } from 'react';
import GanttChart from './GanttChart';
import fApp from '../../feathers';
import TimelineAppListener from './TimelineAppListener';
import { Link } from 'react-router-dom';
import { useFetchEvent } from './useFetch';

// Somehow in older version, this has to be declared,
// noticed that in newer version, this does not need to declare.
// declare const gantt: GanttStatic;

const service = fApp.service('event');

const Gantt: React.FC = () => {

    const [show, setShow] = useState(false);
    const [ganttWidth, setGanttWidth] = useState('500px');
    const [newTaskId, setNewTaskId] = useState('');
    const [data] = useFetchEvent();

    const handleShow = () => {
        setShow(!show);
        setGanttWidth(show ? '500px': '100%');
    }

    useEffect(() => {
      const service = TimelineAppListener();

      return () => {
        service.removeAllListeners('created');
        service.removeAllListeners('patched');
      };
    }, []);

    const handleNewEvent = async () => {
      const newTask = await service.create({
        name: 'Task #' + Math.floor(Math.random() * 101),
        start_date: '2019-05-10 10:30',
        duration: 8,
        progress: 0.6,
        priority: 'high'
      });

      console.log('newTask', newTask);
      setNewTaskId(newTask.id);
      console.log(newTask.id);
    };

    return (
      <>
        <button onClick={handleShow}>show</button>
        <button onClick={handleNewEvent}>new task</button>
        <Link to={`/fake/${newTaskId}`}>Simulate edit page</Link>
        <GanttChart show={show} ganttWidth={ganttWidth} data={data} />
      </>
    );
};

export default Gantt;