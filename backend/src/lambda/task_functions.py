import json
from src.services.task_service import TaskService
from src.utils.db_connector import connect_to_db

def get_tasks(event, context):
    try:
        # Initialize database connection and service inside the handler
        db = connect_to_db()
        task_service = TaskService(db)
        
        tasks = task_service.get_all_tasks()
        
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": True
            },
            "body": json.dumps(tasks)
        }
    except Exception as e:
        print(f"Error in get_tasks: {str(e)}")
        return {
            "statusCode": 500,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": True
            },
            "body": json.dumps({"error": str(e)})
        }

def add_task(event, context):
    try:
        # Initialize database connection and service
        db = connect_to_db()
        task_service = TaskService(db)
        
        task_data = json.loads(event['body'])
        new_task = task_service.create_task(task_data)
        
        return {
            'statusCode': 201,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": True
            },
            'body': json.dumps(new_task)
        }
    except Exception as e:
        print(f"Error in add_task: {str(e)}")
        return {
            "statusCode": 500,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": True
            },
            "body": json.dumps({"error": str(e)})
        }

def update_task(event, context):
    try:
        # Initialize database connection and service
        db = connect_to_db()
        task_service = TaskService(db)
        
        task_id = event['pathParameters']['id']
        task_data = json.loads(event['body'])
        updated_task = task_service.update_task_status(task_id, task_data)
        
        return {
            'statusCode': 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": True
            },
            'body': json.dumps(updated_task)
        }
    except Exception as e:
        print(f"Error in update_task: {str(e)}")
        return {
            "statusCode": 500,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": True
            },
            "body": json.dumps({"error": str(e)})
        }

def delete_task(event, context):
    try:
        # Initialize database connection and service
        db = connect_to_db()
        task_service = TaskService(db)
        
        task_id = event['pathParameters']['id']
        success = task_service.delete_task(task_id)
        
        if success:
            return {
                'statusCode': 204,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": True
                },
                'body': ""  # 204 responses typically don't include a body
            }
        else:
            return {
                'statusCode': 404,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": True
                },
                'body': json.dumps({"error": "Task not found"})
            }
    except Exception as e:
        print(f"Error in delete_task: {str(e)}")
        return {
            "statusCode": 500,
            "headers": {
                "Access-Control-Allow-Origin": "*", 
                "Access-Control-Allow-Credentials": True
            },
            "body": json.dumps({"error": str(e)})
        }