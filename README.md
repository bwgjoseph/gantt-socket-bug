# Issue

This is an attempt to reproduce an issue whereby the client app crash when receiving an real-time update from server and updating gantt task.

# Run

This reproduce is split into two part, client and server.

To run the server, navigate to `feathers-gantt`

1. Run `npm ci`
2. Run `npm run dev`

To run the client, navigate to `react-gantt`

1. Run `npm ci`
2. Run `npm start`

# Usage

## Client

1. Navigate to the homepage (http://localhost:3000)
2. Click on `new task` button, a new task will be added to server, and upon receiving an socket event from server, client will add it to the gantt library (addTask)
3. Click on `Simulate edit page` to navigate to another page
4. Click on `Simulate edit task` to trigger a patch to `server`
5. Client will then receive an `patched` event from `server` and tries to call `gantt.updateTask` to update the task

## Client-Code

Most of the logic is in `src/component/gantt/**`

