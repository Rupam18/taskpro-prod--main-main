const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Task = require('./models/Task');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to DB');
    await Task.updateMany({ category: 'Development' }, { category: 'Backend' });
    await Task.updateMany({ category: 'Bug' }, { category: 'Frontend' });
    await Task.updateMany({ category: 'Marketing' }, { category: 'General' });
    console.log('Categories updated successfully');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
