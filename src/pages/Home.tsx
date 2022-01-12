import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    // Add new task
    const task: Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    setTasks(oldState => [...oldState, task]);
  }

  function handleToggleTaskDone(id: number) {
    // Toggle task done if exists

    // Copy the content of the array to be able to change it
    const updatedTasks = tasks.map(task => ({ ...task }));
    const task = updatedTasks.find((task) => task.id === id);
    if (task) {
      task.done = !task.done;
      setTasks(updatedTasks); 
    }
  }

  function handleRemoveTask(id: number) {
    // Remove task from state
    setTasks(tasks.filter((task) => task.id !== id));  
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})