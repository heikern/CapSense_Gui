import React from 'react'

import {useSelector} from 'react-redux'
import { Task } from '../store/taskSlice'


const TaskQueue: React.FC = () => {
    const taskList = useSelector((state: any) => state.tasksSlice.tasks)

    return(
        <div className="mt-6">
                <div className="max-h-70 overflow-y-auto">
                    {taskList
                        .slice()
                        .reverse()
                        .map((task: Task, index: number) => (
                            task.status === 'pending' && (
                            <div
                                key={index}
                                className="rounded-lg p-0.5 mb-1 bg-green-200"
                            >
                                <p>Task id: ***{task.id.slice(-3)}</p>
                            </div>
                            )
                        ))
                    }
                </div>
            </div>
    )
}

export default TaskQueue


