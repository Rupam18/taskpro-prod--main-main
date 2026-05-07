const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Project = require('./models/Project');
const Task = require('./models/Task');
const Activity = require('./models/Activity');

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Project.deleteMany();
    await Task.deleteMany();
    await Activity.deleteMany();

    console.log('Data Cleared...');

    // Create Users
    console.log('Creating Users...');
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@taskpro.com',
      password: 'admin123',
      role: 'admin'
    });

    const designer = await User.create({
      name: 'Sarah Design',
      email: 'sarah@taskpro.com',
      password: 'password123',
      role: 'member'
    });

    const frontendDev = await User.create({
      name: 'Alex Frontend',
      email: 'alex@taskpro.com',
      password: 'password123',
      role: 'member'
    });

    const backendDev = await User.create({
      name: 'Mike Backend',
      email: 'mike@taskpro.com',
      password: 'password123',
      role: 'member'
    });

    console.log('Users Created...');

    // Create Projects
    const projects = await Project.insertMany([
      {
        name: 'Website Redesign',
        description: 'Overhaul the corporate website with a modern look.',
        color: '#7c3aed',
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        userId: admin._id
      },
      {
        name: 'Mobile App Dev',
        description: 'Build a task management mobile app.',
        color: '#06b6d4',
        deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        userId: admin._id
      }
    ]);

    console.log('Projects Created...');

    // Create Tasks
    const tasks = await Task.insertMany([
      {
        title: 'Design Hero Section',
        description: 'Create a stunning hero section for the landing page.',
        status: 'done',
        category: 'Design',
        deadline: new Date(),
        userId: admin._id,
        projectId: projects[0]._id,
        assignedTo: designer._id
      },
      {
        title: 'User Flow Mockups',
        description: 'Design the mobile app navigation flow.',
        status: 'done',
        category: 'Design',
        deadline: new Date(),
        userId: admin._id,
        projectId: projects[1]._id,
        assignedTo: designer._id
      },
      {
        title: 'Implement Auth API',
        description: 'Develop JWT-based authentication endpoints.',
        status: 'done',
        category: 'Backend',
        deadline: new Date(),
        userId: admin._id,
        projectId: projects[1]._id,
        assignedTo: backendDev._id
      },
      {
        title: 'Database Schema',
        description: 'Optimize MongoDB collections and relations.',
        status: 'done',
        category: 'Backend',
        deadline: new Date(),
        userId: admin._id,
        projectId: projects[1]._id,
        assignedTo: backendDev._id
      },
      {
        title: 'React Navigation setup',
        description: 'Configure routing for the frontend app.',
        status: 'done',
        category: 'Frontend',
        deadline: new Date(),
        userId: admin._id,
        projectId: projects[1]._id,
        assignedTo: frontendDev._id
      },
      {
        title: 'Responsive Dashboard',
        description: 'Sidebar is not responsive on mobile devices.',
        status: 'in-progress',
        category: 'Frontend',
        deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        userId: admin._id,
        projectId: projects[0]._id,
        assignedTo: frontendDev._id
      }
    ]);

    console.log('Tasks Created...');

    // Create Activities
    await Activity.insertMany([
      {
        user: admin._id,
        type: 'project_created',
        description: 'created project Website Redesign',
        project: projects[0]._id
      },
      {
        user: admin._id,
        type: 'task_created',
        description: 'created task Design Hero Section',
        task: tasks[0]._id,
        project: projects[0]._id
      }
    ]);

    console.log('Activities Created...');
    console.log('Database Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
