// ecosystem.config.js
module.exports = {
    apps: [
      {
        name: 'blog-cms',
        script: 'build/index.js',
        exec_mode: 'cluster',
        instances: 'max',
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
          NODE_ENV: 'production',
        },
      },
    ],
  };
  