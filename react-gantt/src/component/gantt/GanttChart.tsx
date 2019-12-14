import React, { useEffect } from 'react';
import 'dhtmlx-gantt';
import './style/custom.css';
import 'dhtmlx-gantt/codebase/ext/dhtmlxgantt_marker';
import 'dhtmlx-gantt/codebase/skins/dhtmlxgantt_material.css';
import GanttTask from './GanttTask';

declare const gantt: GanttStatic;

interface GanttChartProps {
    show: boolean;
    ganttWidth: string;
    data: GanttTask[];
}

const GanttChart: React.FC<GanttChartProps> = ({ show, ganttWidth, data }) => {

    useEffect(() => {
        gantt.config.xml_date = '%Y-%m-%d %H:%i';
        gantt.config.server_utc = true;
        gantt.init('gantt');
    }, []);

    useEffect(() => {
        gantt.config.show_chart = true;
    }, [show]);

    useEffect(() => {
        gantt.parse({
            data: data,
        });
        gantt.render();
    });

    return (
    <>
    {/* <div style={{ width: `${ganttWidth}`, height: '100%', position: 'absolute' }}> */}
    <div style={{ width: '100%', height: '100%', position: 'absolute' }}>
        <div id="gantt" />
    </div >
    </>
    );
}

export default GanttChart;