from setuptools import setup, find_packages

setup(
    name='task-management-backend',
    version='0.1.0',
    description='A task management system with user authentication and task management features.',
    author='Kevin Quinones',
    author_email='kquinonesa14@gmail.com',
    packages=find_packages(where='src'),
    package_dir={'': 'src'},
    install_requires=[
        'boto3',
        'pymongo',
        'Flask',
        'Flask-JWT-Extended',
        'python-dotenv',
        'pytest'
    ],
    classifiers=[
        'Programming Language :: Python :: 3',
        'License :: OSI Approved :: MIT License',
        'Operating System :: OS Independent',
    ],
    python_requires='>=3.6',
)