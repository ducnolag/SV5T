const { spawn } = require('child_process');

const services = [
  { name: 'auth-service', cmd: 'npm', args: ['run', 'start:dev'] },
  { name: 'unit-service', cmd: 'npm', args: ['run', 'start:dev'] },
  { name: 'activity-service', cmd: 'npm', args: ['run', 'start:dev'] },
  { name: 'attendance-service', cmd: 'npm', args: ['run', 'start:dev'] },
  { name: 'proof-service', cmd: 'npm', args: ['run', 'start:dev'] },
  { name: 'application-service', cmd: 'npm', args: ['run', 'start:dev'] },
  { name: 'notification-service', cmd: 'npm', args: ['run', 'start:dev'] },
  { name: 'ai-service', cmd: 'node', args: ['index.js'] }
];

services.forEach(svc => {
  console.log(`Starting ${svc.name}...`);
  const p = spawn(svc.cmd, svc.args, {
    cwd: `d:\\hackathon\\services\\${svc.name}`,
    shell: true,
    stdio: 'inherit'
  });
  p.on('error', (err) => console.error(`Error starting ${svc.name}:`, err));
});
